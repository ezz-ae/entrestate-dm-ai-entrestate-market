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
