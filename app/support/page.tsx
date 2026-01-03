
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function SupportPage() {
  return (
    <main>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <PageHeader
            title="Support Center"
            description="We're here to help! Find answers to your questions or get in touch with our support team."
            eyebrow="HELP"
          />

          <div className="space-y-8">
            <Card>
              <h2 className="text-xl font-semibold text-apple-gray-600 mb-4">Frequently Asked Questions</h2>
              <ul className="space-y-4 text-apple-gray-500 text-lg leading-relaxed">
                <li>
                  <h3 className="font-semibold text-apple-gray-600">How do I set up my AI expert?</h3>
                  <p>You can set up your AI expert in minutes through our onboarding flow. Just provide your brand details, market knowledge, and any exclusive listings you want the AI to promote.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-apple-gray-600">What integrations are available?</h3>
                  <p>Our AI currently integrates seamlessly with Instagram DMs and can be embedded as a chat widget on any website. We also provide data export for Meta Ads Manager and Google Ads Editor.</p>
                </li>
                <li>
                  <h3 className="font-semibold text-apple-gray-600">How can I upgrade my plan?</h3>
                  <p>You can upgrade your plan at any time from your <Link href="/dashboard" className="text-apple-blue hover:underline">dashboard</Link>. We offer flexible pricing options to suit your business needs.</p>
                </li>
              </ul>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-apple-gray-600 mb-4">Contact Support</h2>
              <p className="text-apple-gray-500 text-lg leading-relaxed">
                Can't find what you're looking for? Our support team is available to assist you.
              </p>
              <div className="mt-6">
                <Link href="mailto:support@entrestate.com" className="bg-apple-blue text-white px-8 py-3 rounded-full font-bold hover:bg-apple-blue/90 transition-colors inline-block">
                  Email Support
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
