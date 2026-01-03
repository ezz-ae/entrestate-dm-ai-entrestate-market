
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const features = [
  {
    name: "Instagram DM Bot",
    description: "Automate your Instagram DMs and never miss a lead again. Qualify leads, answer questions, and schedule appointments 24/7."
  },
  {
    name: "WhatsApp Lead Handoff",
    description: "Seamlessly transfer qualified leads from your Instagram DMs to your sales team on WhatsApp. No more manual data entry."
  },
  {
    name: "Website Embed",
    description: "Embed your DM bot on your website to capture leads from your website traffic. Turn your website into a lead generation machine."
  },
  {
    name: "QR Code Generation",
    description: "Generate custom QR codes that link to your DM bot. Use them in your marketing materials to drive traffic to your bot."
  },
  {
    name: "Advanced Analytics",
    description: "Track your bot\'s performance with our advanced analytics dashboard. See how many leads you\'re generating, your conversion rate, and more."
  },
  {
    name: "Team Collaboration",
    description: "Collaborate with your team on your DM bots. Assign conversations, leave notes, and track your team\'s performance."
  }
];

export default function FeaturesPage() {
  return (
    <main>
      <Section>
        <PageHeader subtitle="Everything you need to succeed" title="Features" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.name}>
              <h3 className="text-xl font-semibold text-white">{feature.name}</h3>
              <p className="mt-2 text-slate-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
