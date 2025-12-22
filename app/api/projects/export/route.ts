import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/entrestate";

export const dynamic = "force-dynamic";

const serializeCell = (value: string | number | null | undefined) => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

export async function GET() {
  const projects = getAllProjects();

  const header = [
    "id",
    "name",
    "slug",
    "city",
    "developer",
    "area",
    "subArea",
    "propertyTypes",
    "status",
    "priceFromAED",
    "priceNote",
    "handover",
    "paymentPlan",
    "yieldEstimate",
    "bestFor",
    "keyPoints",
    "description",
    "imageUrl",
    "externalRef",
    "tags",
    "updatedAt"
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
}
