"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";

const mockListings = [
  { id: 1, title: "Modern 2BR in Downtown", area: "Downtown Dubai", type: "Apartment", price: "2,500,000 AED", status: "Active" },
  { id: 2, title: "Luxury Villa with Pool", area: "Palm Jumeirah", type: "Villa", price: "15,000,000 AED", status: "Active" },
  { id: 3, title: "Studio near Metro", area: "JLT", type: "Studio", price: "850,000 AED", status: "Sold" },
];

export default function ListingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Exclusive Listings" 
        description="Add your specific units for the AI to prioritize in conversations."
      />

      <div className="flex justify-end">
        <button className="bg-apple-blue text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-apple-blue/90 transition-colors">
          + Add New Listing
        </button>
      </div>

      <div className="bg-white rounded-apple-lg border border-apple-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-apple-gray-50 border-b border-apple-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-apple-gray-400 uppercase tracking-widest">Listing</th>
              <th className="px-6 py-4 text-xs font-bold text-apple-gray-400 uppercase tracking-widest">Area</th>
              <th className="px-6 py-4 text-xs font-bold text-apple-gray-400 uppercase tracking-widest">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-apple-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-apple-gray-400 uppercase tracking-widest"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-apple-gray-100">
            {mockListings.map((item) => (
              <tr key={item.id} className="hover:bg-apple-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-apple-gray-600">{item.title}</div>
                  <div className="text-[11px] text-apple-gray-400">{item.type}</div>
                </td>
                <td className="px-6 py-4 text-sm text-apple-gray-600">{item.area}</td>
                <td className="px-6 py-4 text-sm text-apple-gray-600 font-medium">{item.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'Active' ? 'bg-apple-green/10 text-apple-green' : 'bg-apple-gray-100 text-apple-gray-400'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-apple-blue text-xs font-bold hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
