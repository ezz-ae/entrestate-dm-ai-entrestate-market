"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActiveBotId } from "@/hooks/useActiveBotId";

const sanitizeBase = (value?: string | null) => {
  if (!value) return "";
  return value.endsWith("/") ? value.slice(0, -1) : value;
};

const defaultBase = sanitizeBase(process.env.NEXT_PUBLIC_BASE_URL || "https://entrestate.com");
const configuredClientBase = sanitizeBase(process.env.NEXT_PUBLIC_CLIENT_BOT_BASE_URL || "");
const clientBotBase = configuredClientBase || `${defaultBase}/bot`;
const widgetBase = defaultBase;

export default function ActiveBotBanner() {
  const botId = useActiveBotId();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [inputValue, setInputValue] = useState(botId);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setInputValue(botId);
  }, [botId]);

  const handleSwitch = () => {
    const nextValue = inputValue.trim();
    if (!nextValue || nextValue === botId) return;

    const nextParams = new URLSearchParams(params.toString());
    nextParams.set("botId", nextValue);
    const queryString = nextParams.toString();

    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    });
  };

  const clientBotLink = `${clientBotBase}/${botId}`;
  const igPdfLink = `/api/instructions/ig?botId=${encodeURIComponent(botId)}`;

  return (
    <div className="bg-white rounded-apple-lg border border-apple-gray-100 p-6 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-apple-gray-50">
        <div>
           <label className="text-[10px] font-bold uppercase tracking-widest text-apple-gray-400 mb-1 block">Bot Switcher</label>
           <div className="flex items-center gap-2">
              <input
                className="bg-apple-gray-50 border border-apple-gray-100 rounded-apple-sm px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-apple-blue"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button 
                onClick={handleSwitch}
                disabled={isPending || inputValue === botId}
                className="text-[12px] font-semibold text-apple-blue hover:text-apple-blue/80 disabled:opacity-30 transition-colors"
              >
                {isPending ? 'Switching...' : 'Switch'}
              </button>
           </div>
        </div>
        
        <div className="text-right">
           <label className="text-[10px] font-bold uppercase tracking-widest text-apple-gray-400 mb-1 block">Active Identity</label>
           <p className="text-sm font-semibold text-apple-gray-600">{botId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
           <h4 className="text-[12px] font-bold text-apple-gray-600 mb-2">Connect to Instagram</h4>
           <p className="text-[12px] text-apple-gray-400 mb-4">Download the step-by-step instructions to link your AI bot to your Instagram account.</p>
           <a 
             href={igPdfLink}
             target="_blank"
             rel="noreferrer"
             className="apple-button-secondary w-full py-2 text-xs"
           >
             Download Setup Guide (PDF)
           </a>
        </div>
        
        <div>
           <h4 className="text-[12px] font-bold text-apple-gray-600 mb-2">Direct Link</h4>
           <p className="text-[12px] text-apple-gray-400 mb-4">Share this link with clients or use it in your bio to launch the AI assistant directly.</p>
           <div className="flex items-center gap-2">
              <code className="flex-1 bg-apple-gray-50 p-2 rounded text-[10px] text-apple-gray-500 truncate border border-apple-gray-100">
                {clientBotLink}
              </code>
              <button 
                onClick={() => navigator.clipboard.writeText(clientBotLink)}
                className="text-apple-blue hover:bg-apple-blue/5 p-2 rounded-full transition-colors"
              >
                📋
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
