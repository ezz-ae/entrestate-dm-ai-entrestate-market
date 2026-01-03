
import Link from "next/link";
import { Project } from "@/lib/datastore";
import Card from "@/components/ui/Card";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link href={`/projects/${project.slug}`}>
            <Card className="overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <img src={project.imageUrl} alt={project.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                <h3 className="text-xl font-bold text-apple-gray-700">{project.name}</h3>
                <p className="text-apple-gray-500 mt-2">{project.area}</p>
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-semibold text-apple-blue">
                    AED {project.priceFromAED?.toLocaleString()}
                    </p>
                    <ArrowRight className="text-apple-gray-400" />
                </div>
                </div>
            </Card>
        </Link>
    );
}
