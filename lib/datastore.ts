
import path from 'path';
import fs from 'fs/promises';

export interface Project {
  id: string;
  name: string;
  slug: string;
  city: string;
  developer: string;
  area: string;
  subArea?: string;
  propertyTypes: string[];
  status: string;
  priceFromAED?: number;
  priceNote?: string;
  handover: string;
  paymentPlan: string;
  yieldEstimate?: string;
  bestFor: string[];
  keyPoints: string[];
  description: string;
  imageUrl: string;
  externalRef?: string;
  tags: string[];
  updatedAt: string;
}

export interface Developer {
  id: string;
  name: string;
  slug: string;
}

export interface Bot {
  id: string;
  name: string;
  instagramPageId: string;
  tenantId: string;
}

interface Datastore {
  projects: Project[];
  developers: Developer[];
  bots: Bot[];
}

// --- Main Datastore Functions ---

// Function to read the datastore from the JSON file
async function readDatastore(): Promise<Datastore> {
  const filePath = path.join(process.cwd(), 'data', 'entrestate_ai_datastore_v2.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent) as Datastore;
}

/**
 * Fetches a single project by its slug.
 * @param slug The slug of the project to fetch.
 * @returns The project object or null if not found.
 */
export async function getProject(slug: string): Promise<Project | null> {
  const db = await readDatastore();
  const project = db.projects.find(p => p.slug === slug);
  return project || null;
}

/**
 * Fetches a list of projects with optional filters.
 * @param filters Optional filters to apply.
 * @returns A list of projects.
 */
export async function getProjects(filters: any = {}): Promise<Project[]> {
  const db = await readDatastore();
  // For now, we return all projects as no specific filters are implemented.
  // This can be extended to filter by developer, area, etc.
  return db.projects;
}

/**
 * Fetches a single developer by its slug.
 * @param slug The slug of the developer to fetch.
 * @returns The developer object or null if not found.
 */
export async function getDeveloper(slug: string): Promise<Developer | null> {
  const db = await readDatastore();
  const developer = db.developers.find(d => d.slug === slug);
  return developer || null;
}

/**
 * Fetches all developers.
 * @returns A list of all developers.
 */
export async function getDevelopers(): Promise<Developer[]> {
  const db = await readDatastore();
  return db.developers;
}

/**
 * Fetches a bot by its Instagram Page ID.
 * @param pageId The Instagram Page ID to look up.
 * @returns The bot object or null if not found.
 */
export async function getBotByInstagramPageId(pageId: string): Promise<Bot | null> {
  const db = await readDatastore();
  const bot = db.bots.find(b => b.instagramPageId === pageId);
  return bot || null;
}
