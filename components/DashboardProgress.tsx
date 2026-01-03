"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

const steps = [
  { path: "/dashboard/brand", label: "Brand", tip: "Identity" },
  { path: "/dashboard/listings", label: "Listings", tip: "Inventory" },
  { path: "/dashboard/events", label: "Events", tip: "Schedule" },
  { path: "/dashboard/projects", label: "Projects", tip: "Data" }
];

export default function DashboardProgress() {
  const pathname = usePathname();

  const progress = useMemo(() => {
    const index = steps.findIndex((step) => pathname.startsWith(step.path));
    return index === -1 ? 0 : index;
  }, [pathname]);

  return (
    <div className="bg-white rounded-apple-lg border border-apple-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
         <p className="text-xs font-bold uppercase tracking-widest text-apple-gray-400">Setup Progress</p>
         <p className="text-xs font-medium text-apple-blue">{Math.round(((progress + 1) / steps.length) * 100)}% Complete</p>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {steps.map((step, idx) => {
          const isDone = idx < progress;
          const isCurrent = idx === progress;
          
          return (
            <div key={step.path} className="space-y-2">
               <div className={`h-1.5 rounded-full transition-colors duration-500 ${
                  isDone ? "bg-apple-blue" : isCurrent ? "bg-apple-blue/30" : "bg-apple-gray-100"
               }`} />
               <div className="hidden md:block">
                  <p className={`text-[10px] font-bold uppercase tracking-tight ${
                     isCurrent || isDone ? "text-apple-gray-600" : "text-apple-gray-300"
                  }`}>{step.label}</p>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
