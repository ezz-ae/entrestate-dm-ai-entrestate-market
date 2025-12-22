import type { EntrestateProject } from "./entrestateProject";

export type EntrestateTag = {
  name: string;
  code: string;
};

export type EntrestateProjectRaw = {
  name: string;
  urlPathSegment: string;
  publicUrl: string;
  tags?: EntrestateTag[];
  unitsStockUpdatedAt?: string | null;
};

export type ProjectRecord = EntrestateProject;

export type ProjectOverride = Partial<
  Pick<
    EntrestateProject,
    "developer" | "area" | "subArea" | "propertyTypes" | "status" | "priceFromAED" | "priceNote" | "handover" | "paymentPlan" | "yieldEstimate" | "bestFor" | "keyPoints" | "description" | "imageUrl" | "externalRef"
  >
>;

export type ProjectOverrideMap = Record<string, ProjectOverride>;
