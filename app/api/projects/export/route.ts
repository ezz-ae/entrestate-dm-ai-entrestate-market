
import { NextRequest, NextResponse } from "next/server";
import { getAllProjects } from "@/lib/entrestate";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

const serializeCell = (value: string | number | null | undefined) => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('\"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

export async function GET(req: NextRequest) {
  // 1. Authenticate the user
  const bearer = req.headers.get("Authorization");
  if (!bearer) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = bearer.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Verify token and check for admin role
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();

    if (!userDoc.exists || userDoc.data()?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: You do not have admin privileges" }, { status: 403 });
    }

    // 3. If authorized, proceed to generate the CSV
    const projects = getAllProjects();

    const header = [
      "id", "name", "slug", "city", "developer", "area", "subArea",
      "propertyTypes", "status", "priceFromAED", "priceNote", "handover",
      "paymentPlan", "yieldEstimate", "bestFor", "keyPoints", "description",
      "imageUrl", "externalRef", "tags", "updatedAt"
    ].join(",");

    const rows = projects.map((p) =>
      [
        serializeCell(p.id),
        serializeCell(p.name),
        serializeCell(p.slug),
        serializeCell(p.city),
        serializeCell(p.developer),
        serializeCell(p.area),
        serializeCell(p.subArea),
        serializeCell(p.propertyTypes.join(" | ")),
        serializeCell(p.status),
        serializeCell(p.priceFromAED),
        serializeCell(p.priceNote),
        serializeCell(p.handover),
        serializeCell(p.paymentPlan),
        serializeCell(p.yieldEstimate),
        serializeCell(p.bestFor.join(" | ")),
        serializeCell(p.keyPoints.join(" | ")),
        serializeCell(p.description),
        serializeCell(p.imageUrl),
        serializeCell(p.externalRef),
        serializeCell(p.tags.join(" | ")),
        serializeCell(p.updatedAt)
      ].join(",")
    );

    const csv = [header, ...rows].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=\"entrestate-projects.csv\""
      }
    });

  } catch (error: any) {
    console.error("Export error:", error);
    if (error.code === 'auth/id-token-expired') {
        return NextResponse.json({ error: "Unauthorized: Token has expired" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal ServerError" }, { status: 500 });
  }
}
