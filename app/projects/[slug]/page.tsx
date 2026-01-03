
import { getProject, Project } from "@/lib/datastore";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <PageHeader
                title={project.name}
                subtitle={`${project.area} • ${project.developer}`}
                eyebrow="PROJECT DETAIL"
                className="!text-left !mb-0"
              />
              <p className="text-xl text-apple-gray-400 leading-relaxed">
                {project.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-apple-gray-50 p-6 rounded-2xl border border-apple-gray-100">
                    <p className="text-[10px] font-bold text-apple-gray-400 uppercase tracking-widest mb-1">Starting Price</p>
                    <p className="text-2xl font-bold text-apple-gray-600">AED {project.priceFromAED?.toLocaleString()}</p>
                </div>
                <div className="bg-apple-gray-50 p-6 rounded-2xl border border-apple-gray-100">
                    <p className="text-[10px] font-bold text-apple-gray-400 uppercase tracking-widest mb-1">Handover</p>
                    <p className="text-2xl font-bold text-apple-gray-600">{project.handover}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-apple-gray-400 uppercase tracking-widest">Key Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.keyPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 text-apple-gray-500">
                            <CheckCircle weight="bold" className="text-green-500 mt-1" size={18} />
                            <span>{point}</span>
                        </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="space-y-8 sticky top-24">
               <img src={project.imageUrl} alt={project.name} className="w-full rounded-[32px] shadow-2xl" />
               <Card className="p-8 border-apple-blue/20 bg-apple-blue/5">
                  <h4 className="text-xl font-bold text-apple-gray-600 mb-2">Interested in {project.name}?</h4>
                  <p className="text-apple-gray-500 mb-6">Our AI expert can provide the full brochure, floor plans, and current availability instantly.</p>
                  <Button href="/onboarding" className="w-full">
                    Talk to an Expert
                  </Button>
               </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
