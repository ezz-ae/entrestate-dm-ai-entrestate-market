
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const pricingTiers = [
  {
    name: "Solo Broker",
    price: "$49/mo",
    features: [
      "Instagram DM Bot",
      "WhatsApp Lead Handoff",
      "Website Embed",
      "QR Code Generation",
      "Basic Analytics"
    ]
  },
  {
    name: "Agency",
    price: "$199/mo",
    features: [
      "All Solo Broker features",
      "Up to 5 Broker Accounts",
      "Advanced Analytics",
      "Team Collaboration",
      "Priority Support"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "All Agency features",
      "Unlimited Broker Accounts",
      "Custom Integrations",
      "Dedicated Account Manager",
      "White-labeling"
    ]
  }
];

export default function PricingPage() {
  return (
    <main>
      <Section>
        <PageHeader subtitle="Find the perfect plan for your business" title="Pricing" />
        <div className="grid gap-6 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white">{tier.name}</h3>
                <p className="mt-2 text-4xl font-bold text-white">{tier.price}</p>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <svg
                        className="h-5 w-5 text-emerald-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button href="/payment" className="mt-8 w-full bg-emerald-600 shadow-emerald-600/30">
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
