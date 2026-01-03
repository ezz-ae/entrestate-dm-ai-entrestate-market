
import Link from "next/link";

const metrics = [
  { name: "Total Conversions", value: "842", trend: "+12%" },
  { name: "Qualified Leads", value: "156", trend: "+5%" },
  { name: "Response Rate", value: "99.8%", trend: "0%" }
];

const recentActivity = [
  { lead: "Ahmed R.", project: "Aura Residences", time: "2m ago", status: "Qualified" },
  { lead: "Sarah L.", project: "Dubai Marina", time: "15m ago", status: "Inquiry" },
  { lead: "Marcus K.", project: "Palm Jebel Ali", time: "1h ago", status: "Handed Off" }
];

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-12">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m) => (
          <div key={m.name} className="bg-white p-6 rounded-apple-lg border border-apple-gray-100 shadow-sm">
             <p className="text-[10px] font-bold uppercase tracking-widest text-apple-gray-400 mb-1">{m.name}</p>
             <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-apple-gray-600 tracking-tight">{m.value}</span>
                <span className="text-xs font-semibold text-apple-green">{m.trend}</span>
             </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Activity List */}
         <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
               <h3 className="text-sm font-bold uppercase tracking-widest text-apple-gray-400">Live Activity</h3>
               <Link href="/dashboard/leads" className="text-[12px] text-apple-blue font-semibold hover:underline">View all leads</Link>
            </div>
            
            <div className="space-y-3">
               {recentActivity.map((a, i) => (
                  <div key={i} className="bg-white px-6 py-4 rounded-apple-lg border border-apple-gray-100 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-apple-gray-50 flex items-center justify-center text-lg">👤</div>
                        <div>
                           <p className="text-sm font-semibold text-apple-gray-600">{a.lead}</p>
                           <p className="text-[11px] text-apple-gray-400">{a.project} • {a.time}</p>
                        </div>
                     </div>
                     <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        a.status === 'Qualified' ? 'bg-apple-green/10 text-apple-green' : 'bg-apple-blue/10 text-apple-blue'
                     }`}>
                        {a.status}
                     </span>
                  </div>
               ))}
            </div>
         </div>

         {/* Quick Actions / Status Card */}
         <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-apple-gray-400">System Status</h3>
            <div className="bg-apple-gray-600 rounded-apple-lg p-8 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h4 className="text-xl font-semibold mb-2">Reality Expert is Online</h4>
                  <p className="text-apple-gray-200 text-sm mb-6 max-w-[240px]">The AI is currently monitoring your Instagram DMs and qualifying leads.</p>
                  <Link href="/bot/demo-bot" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-semibold transition-colors">
                     Open Preview Chat
                  </Link>
               </div>
               {/* Abstract background element */}
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-apple-green rounded-full blur-[60px] opacity-40" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <Link href="/dashboard/brand" className="bg-white p-4 rounded-apple-lg border border-apple-gray-100 text-center hover:bg-apple-gray-50 transition-colors">
                  <span className="block text-xl mb-1">🎨</span>
                  <span className="text-[11px] font-bold text-apple-gray-600 uppercase tracking-tight">Setup Brand</span>
               </Link>
               <Link href="/dashboard/listings" className="bg-white p-4 rounded-apple-lg border border-apple-gray-100 text-center hover:bg-apple-gray-50 transition-colors">
                  <span className="block text-xl mb-1">🏠</span>
                  <span className="text-[11px] font-bold text-apple-gray-600 uppercase tracking-tight">Add Units</span>
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}
