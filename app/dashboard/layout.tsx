
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-apple-gray-50/50">
        <header className="h-16 border-b border-apple-gray-100 bg-white flex items-center justify-between px-8">
           <h2 className="text-sm font-bold uppercase tracking-widest text-apple-gray-400">Agent Dashboard</h2>
           <div className="flex items-center gap-4">
              <div className="text-right">
                 <p className="text-xs font-bold text-apple-gray-600">John Agent</p>
                 <p className="text-[10px] text-apple-gray-400 uppercase tracking-tight">Luxury Specialist</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-apple-gray-100 flex items-center justify-center text-xs">JA</div>
           </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
