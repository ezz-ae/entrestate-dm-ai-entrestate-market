
import { type ChatMessage } from "@/components/DMChatPreview";
import InstagramDMPreview from "@/components/InstagramDMPreview";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";

const heroScript: ChatMessage[] = [
  { role: "bot", content: "Hey! I'm your Homes Real Estate assistant. What deal are you chasing today?" },
  { role: "buyer", content: "Need a Marina 2BR under AED 2.5M." },
  { role: "bot", content: "Aura Residences has 2BR at 2.3M with ready handover. Want a WhatsApp intro?" },
  { role: "buyer", content: "Yes, send it." },
  { role: "bot", content: "Done. Ali is messaging you in 15 seconds." }
];

const testimonials = [
  {
    name: "Mariam Al Falasi",
    role: "Founder, Luxe Habitats",
    metric: "+62% IG replies captured",
    quote:
      "We dropped the assistant into our Instagram and QR codes and stopped missing midnight DMs. Buyers think it's our senior broker texting them."
  },
  {
    name: "Hassan G.",
    role: "Sales Director, Vista Capital",
    metric: "4.5x faster WhatsApp handoff",
    quote:
      "Every lead lands in our closer's phone with budget + project already qualified. We start meetings instead of interrogation."
  },
  {
    name: "Caitlin DeSouza",
    role: "Marketing Lead, Harbour & Co",
    metric: "Campaigns live in 30 min",
    quote:
      "The audience vault and data dashboard replaced three freelancers. Launching a roadshow is literally picking a preset and toggling the bot."
  }
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Section className="relative flex min-h-screen flex-col gap-12 lg:flex-row lg:items-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl animate-blob" />
          <div className="absolute right-0 top-48 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-blob-fast" />
        </div>
        <div className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">DM AI</p>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            in hero DM AI Sell 200 Dubai accounts a day.
          </h1>
          <p className="text-lg text-slate-200">
            Get you AI qualify your lead, answer any question about projects, Dubai, or your company. then send the lead to your whatsapp perfecly
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/dashboard" className="bg-emerald-600 shadow-emerald-600/30">
              Enter dashboard
            </Button>
            <Button href="/bot/demo-bot" className="border border-slate-700 text-slate-200">
              Watch the DM bot
            </Button>
          </div>
        </div>
        <div className="flex justify-center lg:flex-1">
          <InstagramDMPreview profileName="Homes Real Estate" profileUsername="homes.dubai" script={heroScript} />
        </div>
      </Section>

      <Section>
        <Card>
          <PageHeader subtitle="Proof it closes" title="Dubai brokers already run their DMs with Entrestate." />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-left">
                <p className="text-xs uppercase tracking-wide text-emerald-400">{testimonial.metric}</p>
                <p className="mt-2 text-sm text-slate-300">“{testimonial.quote}”</p>
                <div className="mt-4 text-sm text-slate-400">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section className="text-center">
        <PageHeader subtitle="Ready by Monday" title="use it on instagram chat, bio link, website, landing page, or even QRcode" />
        <p className="mt-3 text-slate-400">
          You focus on signing 200 Dubai accounts a day. Entrestate DM AI runs the bot, the audiences, the payments, and the data so nothing slips.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/dashboard" className="bg-emerald-600 shadow-emerald-600/30">
            Go to dashboard
          </Button>
          <Button href="/bot/demo-bot" className="border border-slate-700">
            Preview the bot
          </Button>
        </div>
      </Section>
    </main>
  );
}
