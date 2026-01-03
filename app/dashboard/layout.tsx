import type { ReactNode } from "react";
import Link from "next/link";
import ActiveBotBanner from "@/components/ActiveBotBanner";
import DashboardProgress from "@/components/DashboardProgress";

const navLinks = [
  {
    label: "Brand",
    icon: "🎨",
    href: "/dashboard/brand"
  },
  {
    label: "Listings",
    icon: "🏠",
    href: "/dashboard/listings"
  },
  {
    label: "Events",
    icon: "📅",
    href: "/dashboard/events"
  },
  {
    label: "Projects",
    icon: "🏙️",
    href: "/dashboard/projects"
  }
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-apple-gray-50 flex flex-col md:flex-row">
      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-apple-gray-100 z-50 px-6 py-3 flex justify-between items-center">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="flex flex-col items-center gap-1">
            <span className="text-xl">{link.icon}</span>
            <span className="text-[10px] font-medium text-apple-gray-500 uppercase tracking-tighter">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-apple-gray-100 p-6 fixed h-full">
        <div className="mb-10">
          <Link href="/" className="text-xl font-bold tracking-tight text-apple-gray-600">
            Entrestate
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-apple-sm text-sm font-medium text-apple-gray-500 hover:bg-apple-gray-50 hover:text-black transition-all"
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-4 rounded-apple-md bg-apple-gray-50 border border-apple-gray-100">
          <p className="text-xs font-semibold text-apple-gray-600 mb-1">Professional Plan</p>
          <p className="text-[10px] text-apple-gray-400 leading-relaxed">
            Your bot is active. Connect to Instagram to start qualifying leads.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-12 mb-20 md:mb-0">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-apple-gray-600">Dashboard</h1>
              <p className="text-apple-gray-400">Manage your AI real estate assistant.</p>
            </div>
            <Link href="/bot/demo-bot" className="apple-button-secondary text-sm px-4 py-2">
              Preview Bot
            </Link>
          </div>

          <DashboardProgress />
          <ActiveBotBanner />
          
          <div className="bg-white rounded-apple-lg border border-apple-gray-100 shadow-sm overflow-hidden">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
}
