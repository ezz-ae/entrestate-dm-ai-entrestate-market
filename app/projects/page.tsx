
import Link from "next/link";
import { getProjects, Project } from "@/lib/datastore";
import PageHeader from "@/components/ui/PageHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <PageHeader
        title="Explore Our Projects"
        subtitle="Browse our curated list of top real estate projects in Dubai."
        eyebrow="PROJECTS"
      />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
