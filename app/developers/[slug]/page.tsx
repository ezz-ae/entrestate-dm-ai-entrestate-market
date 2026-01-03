
import Link from "next/link";
import { getDeveloper, getDevelopers, getProjects, Developer, Project } from "@/lib/datastore";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";

export async function generateStaticParams() {
  const developers = await getDevelopers();
  return developers.map(d => ({ slug: d.slug }));
}

export default async function DeveloperPage({ params }: { params: { slug: string } }) {
  const developer = await getDeveloper(params.slug);
  
  if (!developer) {
    notFound();
  }

  const allProjects = await getProjects();
  const developerProjects = allProjects.filter(p => p.developer === developer.name);

  return (
    <main>
      <PageHeader
        title={developer.name}
        subtitle={`Explore projects by ${developer.name}`}
        eyebrow="DEVELOPER"
      />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-apple-gray-700 tracking-tighter mb-10">Projects by {developer.name}</h2>
          
          {developerProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {developerProjects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-xl text-apple-gray-500">No projects found for this developer at the moment.</p>
          )}
        </div>
      </section>
    </main>
  );
}
