import fs from "fs";
import path from "path";

type RawProject = {
  name: string;
  urlPathSegment: string;
  tags?: { name?: string; code?: string }[];
  unitsStockUpdatedAt?: string | null;
  publicUrl?: string;
};

const rawPath = path.join(process.cwd(), "data", "entrestate_projects_raw.json");
const outPath = path.join(process.cwd(), "data", "entrestate_projects_full.json");

export type EntrestateProject = {
  id: string;
  name: string;
  slug: string;
  city: "Dubai";
  developer: string | null;
  area: string | null;
  subArea: string | null;
  propertyTypes: string[];
  status: "offplan" | "ready" | "under_construction" | null;
  priceFromAED: number | null;
  priceNote: string | null;
  handover: string | null;
  paymentPlan: string | null;
  yieldEstimate: number | null;
  bestFor: string[];
  keyPoints: string[];
  description: string | null;
  imageUrl: string | null;
  externalRef: string | null;
  tags: string[];
  updatedAt: string | null;
};

function main() {
  if (!fs.existsSync(rawPath)) {
    throw new Error(`Raw projects file not found at ${rawPath}`);
  }

  const raw: RawProject[] = JSON.parse(fs.readFileSync(rawPath, "utf8"));

  const full: EntrestateProject[] = raw.map((project) => ({
    id: project.urlPathSegment,
    name: project.name,
    slug: project.urlPathSegment,
    city: "Dubai",
    developer: null,
    area: null,
    subArea: null,
    propertyTypes: [],
    status: null,
    priceFromAED: null,
    priceNote: null,
    handover: null,
    paymentPlan: null,
    yieldEstimate: null,
    bestFor: [],
    keyPoints: [],
    description: null,
    imageUrl: null,
    externalRef: project.publicUrl ?? null,
    tags: (project.tags || []).map((t) => t.code || t.name || "").filter(Boolean),
    updatedAt: project.unitsStockUpdatedAt ?? null
  }));

  fs.writeFileSync(outPath, JSON.stringify(full, null, 2), "utf8");
  console.log(`Wrote ${full.length} projects to ${outPath}`);
}

main();
