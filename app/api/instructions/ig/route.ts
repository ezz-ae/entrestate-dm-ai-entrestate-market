
import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const sanitizeBase = (value?: string | null) => {
  if (!value) return "";
  return value.endsWith("/") ? value.slice(0, -1) : value;
};

const defaultBase = sanitizeBase(process.env.NEXT_PUBLIC_BASE_URL || "https://entrestate.com");
const configuredClientBase = sanitizeBase(process.env.NEXT_PUBLIC_CLIENT_BOT_BASE_URL || "");
const clientBase = configuredClientBase || `${defaultBase}/bot`;

export async function GET(req: NextRequest) {
  // 1. Enforce and get botId from query params
  const url = new URL(req.url);
  const botId = url.searchParams.get("botId");
  if (!botId) {
    return NextResponse.json({ error: "botId is a required query parameter" }, { status: 400 });
  }

  // 2. Authenticate the user
  const bearer = req.headers.get("Authorization");
  if (!bearer) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = bearer.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decodedToken;
  try {
    decodedToken = await adminAuth.verifyIdToken(token);
  } catch (error) {
    console.error("Authentication error", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 3. Authorize the user against the bot
    const botRef = adminDb.collection("bots").doc(botId);
    const botSnap = await botRef.get();

    if (!botSnap.exists) {
      return NextResponse.json({ error: "Bot not found" }, { status: 404 });
    }

    const botData = botSnap.data();
    if (botData?.tenantId !== decodedToken.uid) {
      return NextResponse.json({ error: "Forbidden: You do not have access to this bot" }, { status: 403 });
    }

    // 4. If authorized, proceed to generate the PDF
    const brandName = botData?.name || "Entrestate Client";
    const clientBotLink = `${clientBase}/${botId}`;
    const embedSnippet = `<iframe src="${defaultBase}/bot/${botId}" width="100%" height="520" style="border:0;border-radius:24px;max-width:420px;"></iframe>`;

    const doc = new PDFDocument({ size: "A4", margin: 48 });
    const chunks: Uint8Array[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    const pdfBufferPromise = new Promise<Buffer>((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
    });

    doc.fontSize(20).text("Entrestate DM AI – Instagram DM Activation Guide");
    doc.moveDown();
    doc.fontSize(12).text(`Brand: ${brandName}`);
    doc.text(`Bot ID: ${botId}`);
    doc.text(`Client bot link: ${clientBotLink}`);
    doc.moveDown();
    doc.fontSize(14).text("Deployment checklist");
    doc.moveDown(0.5);

    const steps = [
      "Inside Instagram: Settings & privacy → Messages and story replies → Connected tools → Add tool.",
      "Paste the bot link so your team can test responses inside Instagram DMs.",
      `Build a Meta webhook (Zapier/Make/etc.) that forwards every DM to ${defaultBase}/api/bot/${botId}/chat with the full message history`,
      "Send the assistant reply back through the Instagram Graph API so the user gets an instant branded response.",
      "Capture WhatsApp numbers and budget in every response, then sync into CRM or notify your sales lead."
    ];

    steps.forEach((step, index) => {
      doc.fontSize(12).text(`${index + 1}. ${step}`, { lineGap: 4 });
    });

    doc.moveDown();
    doc.fontSize(14).text("Website embed snippet");
    doc.fontSize(11).text("Drop this anywhere on a landing page:");
    doc.moveDown(0.3);
    doc.font("Courier").fontSize(10).text(embedSnippet, { lineGap: 2 });
    doc.font("Helvetica").fontSize(11);
    doc.moveDown();
    doc.text("Need to expire a client? Mark their bot inactive or set expiresAt in Firestore. Each payment extends access by 30 days.");

    doc.end();
    const pdfBuffer = await pdfBufferPromise;

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="entrestate-ig-dm-${botId}.pdf"`
      }
    });

  } catch (err: any) {
    console.error(`Error generating instructions for bot ${botId}:`, err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
