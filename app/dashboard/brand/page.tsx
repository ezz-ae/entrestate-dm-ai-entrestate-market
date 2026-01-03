"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";

export default function BrandPage() {
  const [brand, setBrand] = useState({
    name: "Reality Expert",
    tone: "Professional & Helpful",
    whatsapp: "+971 50 123 4567",
    website: "https://example.com"
  });

  const handleSave = () => {
    alert("Brand settings saved!");
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Brand Identity" 
        description="Configure how your AI expert presents itself to customers."
      />

      <div className="grid gap-6 max-w-2xl">
        <div className="bg-white p-6 rounded-apple-lg border border-apple-gray-100 space-y-4">
          <div>
            <label className="block text-xs font-bold text-apple-gray-400 uppercase tracking-widest mb-2">Expert Name</label>
            <input 
              type="text" 
              value={brand.name}
              onChange={(e) => setBrand({...brand, name: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-apple-gray-200 focus:outline-none focus:ring-2 focus:ring-apple-blue/20"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-apple-gray-400 uppercase tracking-widest mb-2">Voice & Tone</label>
            <select 
              value={brand.tone}
              onChange={(e) => setBrand({...brand, tone: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-apple-gray-200 focus:outline-none focus:ring-2 focus:ring-apple-blue/20"
            >
              <option>Professional & Helpful</option>
              <option>Casual & Friendly</option>
              <option>Sophisticated & Elite</option>
              <option>Direct & Results-Oriented</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-apple-gray-400 uppercase tracking-widest mb-2">WhatsApp for Handoff</label>
            <input 
              type="text" 
              value={brand.whatsapp}
              onChange={(e) => setBrand({...brand, whatsapp: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-apple-gray-200 focus:outline-none focus:ring-2 focus:ring-apple-blue/20"
            />
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="bg-apple-blue text-white px-8 py-3 rounded-full font-bold hover:bg-apple-blue/90 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
