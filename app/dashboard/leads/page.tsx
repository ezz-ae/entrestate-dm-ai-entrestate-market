"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";

const mockLeads = [
  { id: 1, name: "Ahmed R.", email: "ahmed@example.com", phone: "+971 50 111 2222", project: "Aura Residences", status: "Qualified", date: "2023-10-25 14:20" },
  { id: 2, name: "Sarah L.", email: "sarah.l@gmail.com", phone: "+44 7700 900000", project: "Dubai Marina", status: "Inquiry", date: "2023-10-25 14:05" },
  { id: 3, name: "Marcus K.", email: "m.keller@tech.de", phone: "+49 151 222333", project: "Palm Jebel Ali", status: "Handed Off", date: "2023-10-25 13:15" },
];

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Leads" 
        description="All potential buyers captured by your AI expert."
      />

      <div className="bg-white rounded-apple-lg border border-apple-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-apple-gray-50 border-b border-apple-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-apple-gray-400 uppercase tracking-widest">Lead</th>
              <th className="px-6 py-4 text-xs font-bold text-apple-gray-400 uppercase tracking-widest">Project</th>
              <th className="px-6 py-4 text-xs font-bold text-apple-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-apple-gray-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-apple-gray-400 uppercase tracking-widest"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-apple-gray-100">
            {mockLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-apple-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-apple-gray-600">{lead.name}</div>
                  <div className="text-[11px] text-apple-gray-400">{lead.phone}</div>
                </td>
                <td className="px-6 py-4 text-sm text-apple-gray-600">{lead.project}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    lead.status === 'Qualified' ? 'bg-apple-green/10 text-apple-green' : 
                    lead.status === 'Handed Off' ? 'bg-apple-gray-100 text-apple-gray-400' : 'bg-apple-blue/10 text-apple-blue'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-apple-gray-400">{lead.date}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-apple-blue text-xs font-bold hover:underline">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
