
import Link from "next/link";
import { Developer } from "@/lib/datastore";
import Card from "@/components/ui/Card";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function DeveloperCard({ developer }: { developer: Developer }) {
    return (
        <Link href={`/developers/${developer.slug}`}>
            <Card className="text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center justify-center h-full">
                <h3 className="text-2xl font-bold text-apple-gray-700">{developer.name}</h3>
                <div className="mt-4 flex items-center text-apple-gray-500">
                View Projects <ArrowRight className="ml-2" />
                </div>
            </Card>
        </Link>
    );
}
