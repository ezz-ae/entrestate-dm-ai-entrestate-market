"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

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
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-6 bg-[#f5f5f7]">
        <div className="max-w-[1200px] mx-auto text-center animate-fade-in">
           <span className="text-apple-blue font-bold tracking-widest text-[12px] uppercase mb-4 block">Audience Intelligence</span>
           <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-apple-gray-600 mb-8 leading-[1.1]">
              Targeting built for <br /> the Dubai market.
           </h1>
           <p className="text-xl md:text-2xl text-apple-gray-400 max-w-2xl mx-auto mb-12">
              Generate custom audiences, lookalike seeds, and keyword plans designed specifically for real estate conversion.
           </p>
           <Link href="/dashboard" className="apple-button-primary text-xl px-12 py-5">
              Launch your ads
           </Link>
        </div>
      </section>

      {/* Lab Interface Simulation */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Control Panel */}
            <div className="lg:col-span-5 space-y-12">
               <div className="space-y-6">
                  <h2 className="text-3xl font-semibold text-apple-gray-600 tracking-tight">Audience Lab</h2>
                  <p className="text-apple-gray-400 text-lg leading-relaxed">
                     Fine-tune who sees your property listings. Our presets are built on millions of data points from successful Dubai campaigns.
                  </p>
               </div>

               <div className="bg-apple-gray-50 rounded-[32px] p-8 border border-apple-gray-100 space-y-6">
                  <div className="space-y-2">
                     <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Audience Region</label>
                     <select 
                       className="w-full bg-white border border-apple-gray-200 rounded-apple-sm px-4 py-3 outline-none focus:ring-2 focus:ring-apple-blue/10 appearance-none"
                       value={selectedPreset}
                       onChange={(e) => setSelectedPreset(e.target.value)}
                     >
                        {audiencePresets.map(p => <option key={p.region} value={p.region}>{p.region}</option>)}
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Budget Range</label>
                     <input 
                       className="w-full bg-white border border-apple-gray-200 rounded-apple-sm px-4 py-3 outline-none focus:ring-2 focus:ring-apple-blue/10"
                       value={budget}
                       onChange={(e) => setBudget(e.target.value)}
                     />
                  </div>
               </div>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-7">
               <div className="bg-white rounded-[40px] border border-apple-gray-100 shadow-[0_32px_64px_rgba(0,0,0,0.06)] overflow-hidden">
                  <div className="px-10 py-8 border-b border-apple-gray-50 bg-apple-gray-50/30">
                     <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-apple-gray-600">Audience Strategy</h3>
                        <span className="text-[10px] font-bold text-apple-green bg-apple-green/10 px-3 py-1 rounded-full uppercase tracking-widest">Optimized</span>
                     </div>
                  </div>
                  <div className="p-10 space-y-10">
                     <div className="grid grid-cols-2 gap-8">
                        <div>
                           <p className="text-[10px] font-bold text-apple-gray-400 uppercase tracking-widest mb-2">Meta Audience</p>
                           <p className="text-xl font-semibold text-apple-gray-600 mb-4">{preset.buyers}</p>
                           <div className="flex flex-wrap gap-2">
                              {preset.behaviors.map(b => (
                                 <span key={b} className="text-[12px] bg-apple-gray-50 border border-apple-gray-100 px-3 py-1 rounded-full text-apple-gray-500">{b}</span>
                              ))}
                           </div>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-apple-gray-400 uppercase tracking-widest mb-2">Lookalike Seed</p>
                           <p className="text-sm font-medium text-apple-gray-600 bg-apple-blue/5 border border-apple-blue/10 p-3 rounded-apple-sm">
                              {preset.lookalikeSeed}
                           </p>
                        </div>
                     </div>

                     <div className="pt-10 border-t border-apple-gray-50">
                        <p className="text-[10px] font-bold text-apple-gray-400 uppercase tracking-widest mb-4">Google Search Keywords</p>
                        <div className="flex flex-wrap gap-3">
                           {preset.keywords.map(k => (
                              <code key={k} className="text-[13px] bg-apple-gray-600 text-white px-3 py-1 rounded-apple-sm">+{k.replace(/\s/g, ' +')}</code>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-24 bg-apple-gray-50 px-6">
         <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-semibold text-apple-gray-600 mb-4 tracking-tight">Export and Launch.</h2>
               <p className="text-xl text-apple-gray-400">The last mile of your marketing workflow.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                  { title: "Meta Business Suite", desc: "Copy/paste your behavior stack and upload custom seeds directly into Meta Ads Manager." },
                  { title: "Google Ads Editor", desc: "Export keyword clusters designed to capture high-intent property searchers in Dubai." },
                  { title: "WhatsApp Direct", desc: "Leads qualified by your Reality Expert flow directly into your WhatsApp with audience context." }
               ].map(item => (
                  <div key={item.title} className="space-y-4">
                     <h4 className="text-xl font-semibold text-apple-gray-600">{item.title}</h4>
                     <p className="text-apple-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-32 px-6 text-center">
         <h2 className="text-5xl font-semibold tracking-tight text-apple-gray-600 mb-8">Stop wasting ad spend.</h2>
         <Link href="/dashboard" className="apple-button-primary text-xl px-12 py-5">
            Get Targeted Now
         </Link>
      </section>
    </main>
  );
}
