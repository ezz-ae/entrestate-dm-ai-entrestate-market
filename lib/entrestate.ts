import type { EntrestateProjectRaw, ProjectOverrideMap, ProjectRecord } from "@/types/entrestate";
import type { EntrestateProject } from "@/types/entrestateProject";
// @ts-ignore
import fullProjectsRaw from "@/data/entrestate_projects_full.json";
// @ts-ignore
import rawProjects from "@/data/entrestate_projects_raw.json";
// @ts-ignore
import overridesRaw from "@/data/project_overrides.json";

const CITY_LABEL = process.env.ENTRESTATE_CITY_LABEL || "Dubai";

const baseProjects: EntrestateProject[] = fullProjectsRaw as any;
const overrides: ProjectOverrideMap = overridesRaw as any;

const rawProjectsMap: Record<string, EntrestateProjectRaw> = (rawProjects as EntrestateProjectRaw[]).reduce(
  (acc, raw) => {
    acc[raw.urlPathSegment] = raw;
    return acc;
  },
  {} as Record<string, EntrestateProjectRaw>
);

const hydratedProjects: ProjectRecord[] = baseProjects.map((project) => {
  const override = overrides[project.id];
  const rawFallback = rawProjectsMap[project.id];

  return {
    ...project,
    city: CITY_LABEL as "Dubai",
    tags:
      project.tags && project.tags.length > 0
        ? project.tags
        : (rawFallback?.tags || []).map((t) => t.code || t.name || "").filter(Boolean),
    updatedAt: project.updatedAt ?? rawFallback?.unitsStockUpdatedAt ?? null,
    externalRef: project.externalRef ?? rawFallback?.publicUrl ?? null,
    ...(override || {})
  };
});

export function getAllProjects(): ProjectRecord[] {
  return hydratedProjects;
}

export function searchProjectsByText(query: string, limit = 20): ProjectRecord[] {
  const q = query.toLowerCase().trim();
  const all = getAllProjects();
  if (!q) return all.slice(0, limit);

  const scored = all
    .map((p) => {
      const haystack = `${p.name} ${p.tags.join(" ")} ${p.developer ?? ""}`.toLowerCase();
      const score =
        (haystack.includes(q) ? 10 : 0) +
        (p.name.toLowerCase().startsWith(q) ? 5 : 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((x) => x.p);
}
