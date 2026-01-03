import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
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

    const { name, companyName, companyDescription, personality, marketKnowledge, exclusiveListings } = await req.json();

    if (!name || !companyName || !personality || !marketKnowledge) {
      return NextResponse.json({ error: "Missing required bot fields" }, { status: 400 });
    }

    const newBotRef = await adminDb.collection("bots").add({
      tenantId: decodedToken.uid,
      name,
      companyName,
      companyDescription,
      personality,
      marketKnowledge,
      exclusiveListings,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      active: true,
      instagramPageId: "", // This will be set during Instagram connection
    });

    return NextResponse.json({ botId: newBotRef.id }, { status: 201 });

  } catch (error) {
    console.error("Error creating bot:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
