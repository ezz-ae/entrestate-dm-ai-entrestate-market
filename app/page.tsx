import Link from "next/link";
import { type ChatMessage } from "@/components/DMChatPreview";
import InstagramDMPreview from "@/components/InstagramDMPreview";

const heroScript: ChatMessage[] = [
  { role: "bot", content: "Hey! I'm your Homes Real Estate assistant. What deal are you chasing today?" },
  { role: "buyer", content: "Need a Marina 2BR under AED 2.5M." },
  { role: "bot", content: "Aura Residences has 2BR at 2.3M with ready handover. Want a WhatsApp intro?" },
  { role: "buyer", content: "Yes, send it." },
  { role: "bot", content: "Done. Ali is messaging you in 15 seconds." }
];

const conceptPairs = [
  {
    label: "Instant trust",
    headline: "Your AI speaks exactly like your agency.",
    copy: "You load the brand voice once. Every DM opens with your energy, languages, and WhatsApp CTA.",
    script: [
      { role: "bot", content: "Hello! I'm your assistant from Skyline Properties." },
      { role: "buyer", content: "Looking for a Downtown deal with 20% down." },
      { role: "bot", content: "I have two towers at AED 2.4M. Want the WhatsApp details?" }
    ]
  },
  {
    label: "Market brain",
    headline: "Dubai projects, prices, handovers updated every 24h.",
    copy: "No guessing. The bot knows payment plans, developers, and your private inventory before the portals do.",
    script: [
      { role: "buyer", content: "Payment plan for Sobha Hartland?" },
      { role: "bot", content: "20% booking · 60% build · 20% handover. Need the PDF?" }
    ]
  },
  {
    label: "Channel flood",
    headline: "Instagram DM, QR landing, website widget. One assistant everywhere.",
    copy: "Every lead, every entry point, one chat history. No more cold inboxes or missed booth scans.",
    script: [
      { role: "buyer", content: "I'm at your Cityscape booth." },
      { role: "bot", content: "Great. Same assistant from your Instagram bio is here to help." }
    ]
  }
];

const stackItems = [
  {
    title: "DM Bot",
    detail: "24/7 Instagram + web assistant with WhatsApp handoff, tone control, and billing-based access."
  },
  {
    title: "Audience Vault",
    detail: "Meta custom + lookalike audiences, behavioral stacks, and Google keyword plans built for Dubai."
  },
  {
    title: "Market Engine",
    detail: "Structured dataset of every Dubai project, refreshed daily, no external links, exportable sheets."
  },
  {
    title: "Launch Driver",
    detail: "Feed your next sales event and let the bot push RSVPs, roadshow slots, and reminders." 
  },
  {
    title: "SMS + WhatsApp Relay",
    detail: "Every qualified lead gets pushed to WhatsApp and optional SMS so your closer jumps instantly."
  }
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

const dataHighlights = [
  "All projects, prices, stock, payment plans in one table",
  "Pick columns, add your own, download instantly",
  "Filter by developer, community, budget, status",
  "Data never leaves your dashboard"
];

const audienceHighlights = [
  "Custom audiences segmented by nationality, budget, intent",
  "Lookalike seeds from real WhatsApp conversions",
  "Behavioral stacks ready for Meta lead ads",
  "Google keyword clusters grouped by community"
];

const pricingBenefits = [
  "Unlimited Instagram + web conversations",
  "Daily Dubai Market Engine refresh",
  "Audience Lab access (Meta + Google)",
  "WhatsApp + SMS relay",
  "Billing automation (Ziina, PayPal, Stripe)",
  "White-label IG activation PDF"
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row lg:items-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl animate-blob" />
          <div className="absolute right-0 top-48 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-blob-fast" />
        </div>
        <div className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Entrestate DM AI</p>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Sell 200 Dubai accounts a day. Never lose a DM, lead, or launch again.
          </h1>
          <p className="text-lg text-slate-200">
            One dashboard, one brand, one AI brain. It handles Instagram, landing pages, QR scans, WhatsApp handoffs,
            payment activations, and full market intelligence so your brokers close faster.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-full bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-600/30"
            >
              Enter dashboard
            </Link>
            <Link
              href="/bot/demo-bot"
              className="rounded-full border border-slate-700 px-6 py-3 text-center text-sm font-semibold text-slate-200"
            >
              Watch the DM bot
            </Link>
          </div>
        </div>
        <div className="flex justify-center lg:flex-1">
          <InstagramDMPreview profileName="Homes Real Estate" profileUsername="homes.dubai" script={heroScript} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-16 px-6 pb-16">
        {conceptPairs.map((concept, index) => (
          <div key={concept.label} className={`grid gap-10 md:grid-cols-2 ${index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wide text-emerald-400">{concept.label}</p>
              <h2 className="text-3xl font-semibold text-white">{concept.headline}</h2>
              <p className="text-sm text-slate-300">{concept.copy}</p>
            </div>
            <InstagramDMPreview
              profileName="Homes Real Estate"
              profileUsername="homes.dubai"
              script={concept.script}
              accent={index % 3 === 0 ? "emerald" : index % 3 === 1 ? "blue" : "purple"}
            />
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8">
          <div className="mb-8 flex flex-col gap-4 text-center">
            <p className="text-sm uppercase tracking-wide text-emerald-400">Proof it closes</p>
            <h2 className="text-3xl font-semibold text-white">Dubai brokers already run their DMs with Entrestate.</h2>
          </div>
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8">
          <p className="text-sm uppercase tracking-wide text-emerald-400">The Entrestate stack</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Everything a Dubai brokerage needs in one subscription.</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {stackItems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <p className="text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm text-slate-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-emerald-600/10 via-slate-900 to-slate-950 p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-emerald-400">One plan</p>
              <h2 className="text-3xl font-semibold text-white">AED 3,700 / month • Cancel anytime.</h2>
              <p className="text-sm text-slate-300">
                Activate via Ziina, Stripe, or PayPal. Billing flips the bot “active” for 30 days and auto-extends when
                payment clears. No hidden seats.
              </p>
              <ul className="space-y-2 text-sm text-slate-200">
                {pricingBenefits.map((benefit) => (
                  <li key={benefit}>• {benefit}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard/brand" className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white">
                  Start setup
                </Link>
                <Link href="/payment" className="rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200">
                  View billing guide
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-sm text-slate-200">
              <p className="text-xs uppercase tracking-wide text-slate-500">Activation flow</p>
              <ol className="mt-3 space-y-2 list-decimal pl-5">
                <li>Connect your Firebase + payments tokens.</li>
                <li>Drop in brand voice, WhatsApp, listings.</li>
                <li>Share the IG instructions PDF with your client.</li>
                <li>Go live in Instagram, website, QR, SMS — same day.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wide text-emerald-400">Market control</p>
              <h2 className="text-3xl font-semibold text-white">Full Dubai data, refreshed daily, export-ready.</h2>
              <p className="text-slate-300">
                Open the Market Engine dashboard, toggle the columns you want, add private fields, export a sheet, and feed
                the bot prompt instantly.
              </p>
              <ul className="space-y-2 text-sm text-slate-200">
                {dataHighlights.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard/projects" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                  Open data dashboard
                </Link>
                <Link href="/api/projects/export" className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200">
                  Download CSV
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-sm text-slate-200">
              <p className="text-xs uppercase tracking-wide text-slate-500">Sheet builder</p>
              <p className="text-lg font-semibold text-white">Pick fields → add custom columns → export.</p>
              <p className="mt-2 text-slate-400">No outside links, no shared Google Sheets. Everything lives inside your stack.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-wide text-emerald-400">Audience lab</p>
            <h2 className="text-3xl font-semibold text-white">Launch Meta + Google ads without waiting on an agency.</h2>
            <p className="mt-3 text-slate-300">
              Custom audiences, lookalikes, behavior stacks, and Google keyword clusters are prebuilt for Dubai. Export in
              seconds.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {audienceHighlights.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <div className="mt-5">
              <Link href="/audiences" className="rounded-full bg-indigo-500/80 px-4 py-2 text-sm font-semibold text-white">
                Explore audience kits
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-wide text-emerald-400">WhatsApp relay</p>
            <h2 className="text-3xl font-semibold text-white">Every qualified lead lands inside your closer’s phone.</h2>
            <p className="mt-3 text-slate-300">
              Budget captured, timeframe noted, WhatsApp + SMS triggered. Billing keeps the bot active for 30-day cycles so
              renewals are automatic.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• Single-brand dashboard. Crystal clear ownership.</li>
              <li>• Stripe / Ziina / PayPal webhooks re-activate access.</li>
              <li>• Optional SMS backup when a lead drops a number.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
        <p className="text-sm uppercase tracking-wide text-emerald-400">Ready by Monday</p>
        <h2 className="text-3xl font-semibold text-white">Plug in your voice, listings, and launch the DM machine.</h2>
        <p className="mt-3 text-slate-400">
          You focus on signing 200 Dubai accounts a day. Entrestate DM AI runs the bot, the audiences, the payments, and
          the data so nothing slips.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30"
          >
            Go to dashboard
          </Link>
          <Link
            href="/bot/demo-bot"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200"
          >
            Preview the bot
          </Link>
        </div>
      </section>
    </main>
  );
}
