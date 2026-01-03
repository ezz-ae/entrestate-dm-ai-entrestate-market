
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

export default function PricingPage() {
  return (
    <main>
      <PageHeader
        title="Simple, transparent pricing."
        subtitle="Get started for free. Pay only when you're ready to go live."
        eyebrow="PRICING"
      />

      <section className="py-20 px-6">
        <div className="max-w-md mx-auto">
            <Card className="p-12 text-center border-apple-blue shadow-xl">
                <h2 className="text-2xl font-semibold text-apple-gray-600 mb-2">Professional</h2>
                <div className="flex items-baseline justify-center gap-1 mb-8">
                    <span className="text-5xl font-bold text-apple-gray-600">$19</span>
                    <span className="text-xl text-apple-gray-400 font-medium">/connection</span>
                </div>
                
                <ul className="text-left space-y-4 mb-10">
                    <li className="flex items-center gap-3 text-apple-gray-500">
                        <CheckCircle weight="bold" className="text-green-500" size={20} />
                        Unlimited AI responses
                    </li>
                    <li className="flex items-center gap-3 text-apple-gray-500">
                        <CheckCircle weight="bold" className="text-green-500" size={20} />
                        Real-time WhatsApp handoff
                    </li>
                    <li className="flex items-center gap-3 text-apple-gray-500">
                        <CheckCircle weight="bold" className="text-green-500" size={20} />
                        Full Dubai project database
                    </li>
                    <li className="flex items-center gap-3 text-apple-gray-500">
                        <CheckCircle weight="bold" className="text-green-500" size={20} />
                        Lead qualification & data
                    </li>
                </ul>
                
                <Button href="/dashboard" className="w-full text-lg">
                    Get Started Now
                </Button>
                <p className="mt-4 text-[12px] text-apple-gray-400">
                    No credit card required to set up.
                </p>
            </Card>
        </div>
      </section>
      
      <section className="py-24 bg-apple-gray-50 px-6">
         <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl font-semibold text-apple-gray-600 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-8">
               <Card>
                  <h3 className="text-lg font-semibold text-apple-gray-600 mb-2">How does the $19 fee work?</h3>
                  <p className="text-apple-gray-400">It's a simple, flat fee per Instagram connection. You only pay when you decide to activate the bot on your account. No hidden monthly subscriptions.</p>
               </Card>
               <Card>
                  <h3 className="text-lg font-semibold text-apple-gray-600 mb-2">Can I test it before paying?</h3>
                  <p className="text-apple-gray-400">Yes! You can set up your entire brand, listings, and projects, and test the bot in our preview environment without paying a cent.</p>
               </Card>
            </div>
         </div>
      </section>
    </main>
  );
}
