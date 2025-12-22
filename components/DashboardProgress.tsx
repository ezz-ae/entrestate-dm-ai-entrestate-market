"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

const steps = [
  { path: "/dashboard/brand", label: "Brand", tip: "Name + WhatsApp" },
  { path: "/dashboard/listings", label: "Listings", tip: "Add hero units" },
  { path: "/dashboard/events", label: "Events", tip: "Launch / roadshow" },
  { path: "/dashboard/projects", label: "Market data", tip: "Review schema" }
];

export default function DashboardProgress() {
  const pathname = usePathname();

  const progress = useMemo(() => {
    const index = steps.findIndex((step) => pathname.startsWith(step.path));
    return index === -1 ? 0 : index;
  }, [pathname]);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
      <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Setup guide</p>
      <div className="mt-3 grid gap-3 md:grid-cols-4">
        {steps.map((step, idx) => {
          const status = idx < progress ? "done" : idx === progress ? "current" : "todo";
          return (
            <div
              key={step.path}
              className={`rounded-2xl border px-3 py-3 text-center text-sm transition ${
                status === "done"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                  : status === "current"
                    ? "border-white/30 bg-white/5 text-white"
                    : "border-white/10 bg-transparent text-slate-400"
              }`}
            >
              <p className="font-semibold">{step.label}</p>
              <p className="text-xs text-slate-400">{step.tip}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
