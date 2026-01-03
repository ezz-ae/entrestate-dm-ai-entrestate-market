
import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // 1. Authenticate the user
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

  // 2. Validate request body
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { siteId, prompt } = body;
  if (!siteId || !prompt) {
    return NextResponse.json({ error: "siteId and prompt are required" }, { status: 400 });
  }

  try {
    // 3. Authorize against the site
    const siteRef = adminDb.collection("sites").doc(siteId);
    const siteSnap = await siteRef.get();

    if (!siteSnap.exists) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    const siteData = siteSnap.data();
    if (siteData?.tenantId !== decodedToken.uid) {
      return NextResponse.json({ error: "Forbidden: You do not own this site" }, { status: 403 });
    }

    // 4. Create and dispatch the job
    const jobId = uuidv4();
    const job = {
      id: jobId,
      siteId,
      prompt,
      status: "queued",
      tenantId: decodedToken.uid, // Add tenantId to the job for ownership tracking
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await adminDb.collection("jobs").doc(jobId).set(job);

    // Return the job ID to the client so it can poll for status
    return NextResponse.json({ jobId });

  } catch (err: any) {
    console.error(`Error creating refine job for site ${siteId}:`, err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
