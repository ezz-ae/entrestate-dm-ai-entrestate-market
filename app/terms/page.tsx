
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <PageHeader
            title="Terms of Service"
            description="These terms and conditions outline the rules and regulations for the use of Entrestate\'s Website."
            eyebrow="LEGAL"
          />

          <div className="space-y-8 text-apple-gray-500 text-lg leading-relaxed">
            <Card>
              <h2 className="text-xl font-semibold text-apple-gray-600 mb-4">1. Acceptance of Terms</h2>
              <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Entrestate if you do not agree to take all of the terms and conditions stated on this page.</p>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold text-apple-gray-600 mb-4">2. License</h2>
              <p>Unless otherwise stated, Entrestate and/or its licensors own the intellectual property rights for all material on Entrestate. All intellectual property rights are reserved. You may access this from Entrestate for your own personal use subjected to restrictions set in these terms and conditions.</p>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold text-apple-gray-600 mb-4">3. User Comments</h2>
              <p>This Agreement shall begin on the date hereof. Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Entrestate does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Entrestate,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions.</p>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold text-apple-gray-600 mb-4">4. Hyperlinking to our Content</h2>
              <p>The following organizations may link to our Website without prior written approval: Government agencies; Search engines; News organizations; Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
