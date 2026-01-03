
import { getAllProjects } from "@/lib/entrestate";

export function buildSystemPrompt(
  bot: { name: string; companyName: string; personality: string; companyDescription: string; marketKnowledge: string[]; exclusiveListings: string },
  userQuestion: string
) {
  const projects = getAllProjects();
  const projectsBlock = projects.slice(0, 30).map(p => `
Project: ${p.name}
Area: ${p.area}
Developer: ${p.developer}
Price from: AED ${p.priceFromAED?.toLocaleString() ?? 'TBA'}
Status: ${p.status}
Handover: ${p.handover}
Key points: ${p.keyPoints?.join(' · ') ?? 'N/A'}
  `).join('\n---\n');

  return `
You are ${bot.name}, a real estate expert representing ${bot.companyName}.
Personality: ${bot.personality}

Company Description: ${bot.companyDescription}
Market Knowledge: ${bot.marketKnowledge.join(", ")}
Exclusive Listings: ${bot.exclusiveListings}

Your goal is to qualify leads and book meetings. 
Use the following Dubai project data to answer questions. 
If someone expresses interest, ask for their budget and WhatsApp number.

DUBAI PROJECTS:
${projectsBlock}

USER QUESTION:
${userQuestion}
  `;
}
