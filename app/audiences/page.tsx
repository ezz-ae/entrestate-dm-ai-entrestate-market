"use client";

import { useMemo, useState } from "react";

const audiencePresets = [
  {
    region: "Dubai Marina",
    buyers: "Luxury buyers",
    lookalikeSeed: "High-value WhatsApp leads",
    behaviors: ["Mortgage interest", "Property portal visitors", "Expats relocating"],
    keywords: ["dubai marina apartments", "dmcc freehold", "marina penthouse price"]
  },
  {
    region: "JVC",
    buyers: "Investors",
    lookalikeSeed: "Cash buyer list",
    behaviors: ["Rental yield", "Off-plan collectors", "Gulf investors"],
    keywords: ["jvc offplan", "dubai 1br investment", "jvc payment plan"]
  },
  {
    region: "Palm",
    buyers: "Ultra luxury",
    lookalikeSeed: "Private listings",
    behaviors: ["Yacht lifestyle", "Fine dining spenders", "Premium expats"],
    keywords: ["palm jumeirah penthouse", "palm townhouse", "palm villa price"]
  }
];

const behaviors = [
  "Property portals",
  "Mortgage intent",
  "Frequent travelers",
  "High net worth",
  "Investment content",
  "Luxury retail"
];

const googleBuckets = [
  { label: "Community", values: ["Dubai Marina", "Business Bay", "Downtown", "Palm"] },
  { label: "Intent", values: ["buy", "invest", "payment plan", "ROI"] },
  { label: "Asset", values: ["1br", "2br", "townhouse", "villa"] }
];

export default function AudiencesPage() {
  const [selectedPreset, setSelectedPreset] = useState<string>(audiencePresets[0].region);
  const [customAudienceName, setCustomAudienceName] = useState("Dubai Marina buyers");
  const [budget, setBudget] = useState("2M AED+");
  const [nationality, setNationality] = useState("GCC");

  const preset = useMemo(() => audiencePresets.find((p) => p.region === selectedPreset) ?? audiencePresets[0], [
    selectedPreset
  ]);

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-6 py-16">
      <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">Audience Lab</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Launch Meta + Google ads without waiting on a marketer.</h1>
        <p className="mt-4 text-slate-300">
          Build custom audiences, lookalikes, behavior stacks, and keyword plans in seconds. Export the list, plug into
          Meta Ads or Google Ads, and keep your Dubai pipeline moving.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 space-y-4">
            <p className="text-sm uppercase tracking-wide text-emerald-400">Custom audience</p>
            <h2 className="text-2xl font-semibold text-white">Choose who should see your ad.</h2>
            <div className="space-y-4 text-sm text-slate-200">
              <label className="block">
                <span className="text-xs uppercase tracking-wide text-slate-400">Audience name</span>
                <input
                  value={customAudienceName}
                  onChange={(event) => setCustomAudienceName(event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-2"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-wide text-slate-400">Budget / ticket size</span>
                <input
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-2"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-wide text-slate-400">Nationality focus</span>
                <input
                  value={nationality}
                  onChange={(event) => setNationality(event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-2"
                />
              </label>
            </div>
          </div>
          <div className="flex-1 rounded-3xl border border-slate-800 bg-slate-900/40 p-5 text-sm text-slate-200">
            <p className="text-xs uppercase tracking-wide text-slate-500">Audience output</p>
            <div className="mt-2 space-y-2">
              <p><span className="text-slate-400">Name:</span> {customAudienceName}</p>
              <p><span className="text-slate-400">Budget:</span> {budget}</p>
              <p><span className="text-slate-400">Nationality:</span> {nationality}</p>
              <p><span className="text-slate-400">Behavior:</span> Mortgage intent • Property portal visitors • High net worth</p>
              <p><span className="text-slate-400">Exclude:</span> Existing CRM leads</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
          <p className="text-sm uppercase tracking-wide text-emerald-400">Lookalike & behavior set</p>
          <div className="mt-3 flex flex-col gap-4">
            <label className="text-xs uppercase tracking-wide text-slate-400">
              Choose preset
              <select
                className="mt-1 w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-2"
                value={selectedPreset}
                onChange={(event) => setSelectedPreset(event.target.value)}
              >
                {audiencePresets.map((preset) => (
                  <option key={preset.region} value={preset.region}>
                    {preset.region} · {preset.buyers}
                  </option>
                ))}
              </select>
            </label>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-200">
              <p className="text-xs uppercase tracking-wide text-slate-500">Recommended stack</p>
              <p className="mt-1 text-lg font-semibold text-white">{preset.region} • {preset.buyers}</p>
              <p className="text-xs text-slate-400">Lookalike seed: {preset.lookalikeSeed}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {preset.behaviors.map((item) => (
                  <span key={item} className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
          <p className="text-sm uppercase tracking-wide text-emerald-400">Google keyword plan</p>
          <div className="mt-3 grid gap-4 text-sm text-slate-200 md:grid-cols-2">
            {googleBuckets.map((bucket) => (
              <div key={bucket.label} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">{bucket.label}</p>
                <ul className="mt-2 space-y-1 text-slate-200">
                  {bucket.values.map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">Mix any combination and push straight into Google Ads Editor.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-wide text-emerald-400">Behavior library</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200">
              {behaviors.map((item) => (
                <span key={item} className="rounded-full border border-slate-700 px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-200">
            <p className="text-xs uppercase tracking-wide text-slate-500">Export checklist</p>
            <ul className="mt-2 space-y-2">
              <li>• Download CSV of custom + lookalike audiences.</li>
              <li>• Copy/paste behavior stack into Meta Ads.</li>
              <li>• Export Google keyword clusters.</li>
              <li>• Share with your media buyer or run it yourself.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
