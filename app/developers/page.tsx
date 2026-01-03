
import Link from "next/link";
import { getDevelopers, Developer } from "@/lib/datastore";
import PageHeader from "@/components/ui/PageHeader";
import { DeveloperCard } from "@/components/ui/DeveloperCard";

export default async function DevelopersPage() {
  const developers = await getDevelopers();

  return (
    <main>
      <PageHeader
        title="Our Trusted Developers"
        subtitle="We partner with the most reputable developers in the UAE."
        eyebrow="DEVELOPERS"
      />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((dev: Developer) => (
              <DeveloperCard key={dev.id} developer={dev} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
