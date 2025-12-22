import { getAllProjects } from "@/lib/entrestate";
import { findProjectsBy, getPlaces, getProjectEntities } from "@/lib/datastore";
import type { DatastoreEntity } from "@/types/entrestateDatastore";

export type BotConfig = {
  brand_name: string;
  city_focus: string;
  tone: string;
  whatsapp_number: string;
};

export type Listing = {
  title: string;
  area: string;
  type: string;
  beds: number;
  baths: number;
  price_aed: number;
  status: string;
  handover?: string;
  key_points: string[];
  purpose: string;
};

export type EventInfo = {
  title: string;
  type: string;
  start_datetime: number;
  location: string;
  related_project?: string;
  short_description: string;
  cta_text: string;
  active: boolean;
};

export function buildSystemPrompt(
  bot: BotConfig,
  listings: Listing[],
  events: EventInfo[],
  userQuestion: string
) {
  const listingsBlock =
    listings.length === 0
      ? "No listings yet."
      : listings
          .map((l) => {
            return `
Listing: ${l.title}
Area: ${l.area}
Type: ${l.type}, Beds: ${l.beds}, Baths: ${l.baths}
Price: AED ${l.price_aed.toLocaleString()}
Status: ${l.status}
Key points: ${l.key_points.join(" | ")}
Handover: ${l.handover ?? "N/A"}
Purpose: ${l.purpose}
`;
          })
          .join("\n-----------------\n");

  const activeEvents = events.filter((e) => e.active);
  const eventsBlock =
    activeEvents.length === 0
      ? "No active events."
      : activeEvents
          .map((e) => {
            const when = new Date(e.start_datetime).toISOString();
            return `
Event: ${e.title}
Type: ${e.type}
When: ${when}
Where: ${e.location}
Related project: ${e.related_project ?? "N/A"}
Description: ${e.short_description}
CTA: ${e.cta_text}
`;
          })
          .join("\n-----------------\n");

  const projectsBlock = buildProjectsBlock(userQuestion);

  return `
You are the AI assistant for "${bot.brand_name}", a real estate brokerage in ${bot.city_focus}.

Tone: ${bot.tone}. Short, clear, and professional. Maximum 2–4 short paragraphs.

User question:
${userQuestion}

Your priorities:
1. Use THIS BRAND'S LISTINGS first (section LISTINGS) when answering questions.
2. If no listing matches, use PROJECTS section (Dubai projects from the Entrestate Market Engine snapshot).
3. If any EVENT is relevant to what the user asks, mention it briefly at the end and invite them to join via WhatsApp ${bot.whatsapp_number}.

Lead capture:
- If the user shows buying or investing intent (asks about price, availability, ROI, says "interested", etc.):
  - Ask their approximate budget in AED.
  - Ask for their WhatsApp number with country code.
  - Confirm you will pass details to a senior agent at ${bot.brand_name}.

Rules:
- Do NOT invent project names or fake payment plans.
- Use only the data given in LISTINGS and PROJECTS. If you do not find anything suitable, say that clearly.
- When you mention a project, include its name and suggest continuing on WhatsApp ${bot.whatsapp_number}.
- Answer only property-related questions. Politely refuse unrelated topics.

LISTINGS:
${listingsBlock}

EVENTS:
${eventsBlock}

PROJECTS (Entrestate Market Engine):
${projectsBlock}
`;
}

function buildProjectsBlock(question: string) {
  const curated = curateProjects(question);
  if (curated.length === 0) {
    const fallback = getAllProjects().slice(0, 40);
    return fallback
      .map((p) => formatProjectEntry({
        name: p.name,
        developer: p.developer,
        area: p.area,
        subArea: p.subArea,
        status: p.status,
        priceFrom: p.priceFromAED,
        priceNote: p.priceNote,
        paymentPlan: p.paymentPlan,
        handover: p.handover,
        yieldEstimate: p.yieldEstimate,
        bestFor: p.bestFor,
        keyPoints: p.keyPoints,
        tags: p.tags,
        updatedAt: p.updatedAt
      }))
      .join("\n-----------------\n");
  }

  return curated
    .map((entity) => {
      const a = (entity.attributes || {}) as Record<string, any>;
      return formatProjectEntry({
        name: (a.project_name as string) || entity.name,
        developer: (a.developer_name as string) || undefined,
        area: (a.area_location as string) || undefined,
        subArea: (a.location_city as string) || undefined,
        status: ((a.current_status as string) || (a.status as string)) ?? undefined,
        propertyTypes: (a.property_types as string[]) || [],
        priceFrom: typeof a.price_from === "number" ? (a.price_from as number) : Number(a.price_from) || undefined,
        priceNote: (a.price_note as string) || undefined,
        paymentPlan: (a.payment_plan as string) || undefined,
        handover: (a.handover as string) || undefined,
        yieldEstimate:
          typeof a.yield_estimate === "number" ? (a.yield_estimate as number) : Number(a.yield_estimate) || undefined,
        bestFor: (a.best_for as string[]) || [],
        keyPoints: (a.key_points as string[]) || [],
        tags: (a.tags as string[]) || [],
        updatedAt: (a.updated_at as string) || null
      });
    })
    .join("\n-----------------\n");
}

function formatProjectEntry(entry: {
  name: string;
  developer?: string | null;
  area?: string | null;
  subArea?: string | null;
  status?: string | null;
  propertyTypes?: string[];
  priceFrom?: number | null;
  priceNote?: string | null;
  paymentPlan?: string | null;
  handover?: string | null;
  yieldEstimate?: number | null;
  bestFor?: string[];
  keyPoints?: string[];
  tags?: string[];
  updatedAt?: string | null;
}) {
  const priceText = entry.priceFrom
    ? `AED ${entry.priceFrom.toLocaleString()}${entry.priceNote ? ` (${entry.priceNote})` : ""}`
    : entry.priceNote ?? "N/A";

  return `
Project: ${entry.name}
Developer: ${entry.developer ?? "N/A"}
Area: ${entry.area ?? "N/A"}${entry.subArea ? ` • ${entry.subArea}` : ""}
Status: ${entry.status ?? "N/A"}
Types: ${entry.propertyTypes && entry.propertyTypes.length ? entry.propertyTypes.join(", ") : "N/A"}
Price from: ${priceText}
Payment plan: ${entry.paymentPlan ?? "N/A"}
Handover: ${entry.handover ?? "N/A"}
Yield: ${entry.yieldEstimate ? `${entry.yieldEstimate}%` : "N/A"}
Best for: ${entry.bestFor && entry.bestFor.length ? entry.bestFor.join(", ") : "N/A"}
Highlights: ${entry.keyPoints && entry.keyPoints.length ? entry.keyPoints.join(" | ") : "N/A"}
Updated: ${entry.updatedAt ?? "N/A"}
Tags: ${entry.tags && entry.tags.length ? entry.tags.join(", ") : "N/A"}`;
}

function curateProjects(question: string) {
  try {
    const lower = question.toLowerCase();
    const maxPrice = extractBudget(question);
    const status = lower.includes("ready") ? "ready" : lower.includes("offplan") ? "offplan" : undefined;
    const areaPlaceId = detectAreaFromQuestion(lower);

    const curated = findProjectsBy({
      maxPrice,
      status,
      areaPlaceId: areaPlaceId ?? undefined,
      limit: 60
    });

    if (curated.length > 0) {
      return curated;
    }
  } catch (err) {
    console.error("Project curation failed", err);
  }
  return getProjectEntities().slice(0, 40);
}

function extractBudget(question: string) {
  const budgetPattern = /([0-9]+(?:\.[0-9]+)?)(\s?m|\s?million|\s?k|\s?aed)?/gi;
  let match;
  let found: number | null = null;
  while ((match = budgetPattern.exec(question)) !== null) {
    const value = parseFloat(match[1]);
    const modifier = match[2]?.trim().toLowerCase();
    if (!Number.isFinite(value) || value === 0) continue;
    let amount = value;
    if (modifier === "m" || modifier === "million") amount = value * 1_000_000;
    if (modifier === "k") amount = value * 1_000;
    if (modifier === "aed" || !modifier) amount = value;
    if (!found || amount > found) {
      found = amount;
    }
  }
  return found ?? undefined;
}

function detectAreaFromQuestion(lowerQuestion: string) {
  const areaPlaces = getPlaces("area");
  const match = areaPlaces.find((place) => {
    const name = place.name.toLowerCase();
    return lowerQuestion.includes(name);
  });
  return match?.id ?? null;
}
