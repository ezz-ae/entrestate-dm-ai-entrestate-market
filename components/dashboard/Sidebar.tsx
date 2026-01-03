
import Link from "next/link";

export default function Sidebar() {
  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: "📊" },
    { name: "Leads", href: "/dashboard/leads", icon: "👤" },
    { name: "Listings", href: "/dashboard/listings", icon: "🏠" },
    { name: "Market Engine", href: "/dashboard/projects", icon: "⚙️" },
    { name: "Brand Identity", href: "/dashboard/brand", icon: "🎨" },
  ];

  return (
    <aside className="w-64 border-r border-apple-gray-100 min-h-screen bg-white hidden md:block">
      <div className="p-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-apple-gray-600">
          Entrestate
        </Link>
      </div>
      <nav className="mt-4 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-apple-lg text-sm font-semibold text-apple-gray-500 hover:bg-apple-gray-50 hover:text-apple-gray-600 transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-8 px-8">
        <div className="bg-apple-blue/5 rounded-2xl p-4 border border-apple-blue/10">
          <p className="text-[10px] font-bold text-apple-blue uppercase tracking-widest mb-1">Active Plan</p>
          <p className="text-sm font-bold text-apple-gray-600">Pro Expert</p>
          <Link href="/pricing" className="text-[11px] text-apple-blue font-bold hover:underline mt-2 block">Upgrade</Link>
        </div>
      </div>
    </aside>
  );
}
