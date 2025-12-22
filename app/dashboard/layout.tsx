import type { ReactNode } from "react";
import Link from "next/link";
import ActiveBotBanner from "@/components/ActiveBotBanner";
import DashboardProgress from "@/components/DashboardProgress";

const navLinks = [
  {
    label: "Brand setup",
    hint: "Name, tone & WhatsApp",
    href: "/dashboard/brand"
  },
  {
    label: "Listings",
    hint: "Add units to sell",
    href: "/dashboard/listings"
  },
  {
    label: "Events",
    hint: "Roadshows & zooms",
    href: "/dashboard/events"
  },
  {
    label: "Market data",
    hint: "Projects & CSV",
    href: "/dashboard/projects"
  }
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 md:flex">
      <aside className="hidden w-72 flex-col gap-6 border-r border-white/10 bg-gradient-to-b from-slate-950 to-slate-900 p-6 md:flex">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Entrestate</p>
          <p className="mt-2 text-xl font-semibold">DM Control Room</p>
          <p className="mt-1 text-sm text-slate-400">
            Follow the steps below. No tech words, no emails required. Just fill the cards and hit save.
          </p>
        </div>
        <nav className="flex flex-col gap-3 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-emerald-500/60 hover:bg-emerald-500/5"
            >
              <p className="font-semibold text-white">{link.label}</p>
              <p className="text-xs text-slate-400">{link.hint}</p>
            </Link>
          ))}
        </nav>
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-xs text-slate-400">
          <p className="text-sm font-semibold text-white">Need help?</p>
          <p>No email needed. Share your WhatsApp with support and we guide you live.</p>
        </div>
      </aside>

      <main className="flex-1 space-y-6 p-4 md:p-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-300">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-400">Start here</p>
              <p className="text-base text-white">
                Step 1: brand name & WhatsApp · Step 2: listings · Step 3: events · Step 4: market data.
              </p>
            </div>
            <div className="text-xs text-slate-400">
              No email, no ticket. Just click the card, fill the fields, press save.
            </div>
          </div>
        </div>
        <div className="grid gap-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
            >
              <p className="text-sm font-semibold text-white">{link.label}</p>
              <p className="text-xs text-slate-400">{link.hint}</p>
            </Link>
          ))}
        </div>
        <DashboardProgress />
        <ActiveBotBanner />
        {children}
      </main>
    </div>
  );
}
