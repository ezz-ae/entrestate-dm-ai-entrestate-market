"use client";

import { useEffect, useRef, useState } from "react";

export type ChatMessage = {
  role: "buyer" | "bot";
  content: string;
};

const defaultScript: ChatMessage[] = [
  { role: "buyer", content: "Hey Entrestate, do you have any 2BR in Dubai Marina under 2.5M?" },
  { role: "bot", content: "Yes – Aura Residences has a 2BR marina view at AED 2.3M ready to move in." },
  { role: "buyer", content: "Is there a WhatsApp number to speak with an agent?" },
  { role: "bot", content: "Share your WhatsApp plus timeframe and I'll connect you instantly." },
  { role: "buyer", content: "+97158 123 4567, ready to buy this month." },
  { role: "bot", content: "Perfect. I just looped in Sara, your senior broker in Dubai Marina." }
];

const accentStyles = {
  emerald: "bg-emerald-500/90",
  blue: "bg-sky-500/90",
  orange: "bg-orange-500/90"
};

type DMChatPreviewProps = {
  title?: string;
  subtitle?: string;
  badge?: string;
  script?: ChatMessage[];
  accent?: keyof typeof accentStyles;
  loopMs?: number;
  className?: string;
};

export default function DMChatPreview({
  title = "Instagram DM • Entrestate Bot",
  subtitle = "Always-on Dubai assistant",
  badge = "Live",
  script = defaultScript,
  accent = "emerald",
  loopMs = 2200,
  className = ""
}: DMChatPreviewProps) {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([script[0]]);
  const indexRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleMessages(script.slice(0, indexRef.current + 1));
      indexRef.current += 1;
      if (indexRef.current >= script.length) {
        indexRef.current = 1;
        setVisibleMessages([script[0]]);
      }
    }, loopMs);

    return () => clearInterval(interval);
  }, [loopMs, script]);

  const accentClass = accentStyles[accent] || accentStyles.emerald;

  return (
    <div
      className={`w-full max-w-md rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-4 shadow-2xl ${className}`}
    >
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse-line" />
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-[11px] text-slate-400">{subtitle}</p>
          </div>
        </div>
        <span className="text-[11px] text-slate-500">{badge}</span>
      </div>
      <div className="space-y-3">
        {visibleMessages.map((message, idx) => (
          <div
            key={`${message.role}-${idx}`}
            className={`flex ${message.role === "buyer" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-lg ${
                message.role === "buyer"
                  ? "bg-white/90 text-slate-900"
                  : `${accentClass} text-white`
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
