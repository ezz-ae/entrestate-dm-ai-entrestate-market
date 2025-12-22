"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/components/DMChatPreview";

const accentPalette = {
  emerald: "bg-emerald-500/90",
  blue: "bg-sky-500/90",
  purple: "bg-purple-500/90"
};

interface InstagramDMPreviewProps {
  profileName: string;
  profileUsername: string;
  script: ChatMessage[];
  accent?: keyof typeof accentPalette;
  loopMs?: number;
}

export default function InstagramDMPreview({
  profileName,
  profileUsername,
  script,
  accent = "emerald",
  loopMs = 2300
}: InstagramDMPreviewProps) {
  const [visible, setVisible] = useState<ChatMessage[]>([script[0]]);
  const indexRef = useRef(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(script.slice(0, indexRef.current + 1));
      indexRef.current += 1;
      if (indexRef.current >= script.length) {
        indexRef.current = 1;
        setVisible([script[0]]);
      }
    }, loopMs);

    return () => clearInterval(timer);
  }, [loopMs, script]);

  const accentClass = accentPalette[accent] || accentPalette.emerald;

  return (
    <div className="w-full max-w-sm rounded-[32px] border border-slate-800 bg-[#0b0f17] text-white shadow-2xl">
      <div className="border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-800" />
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold">{profileName}</p>
            <p className="text-xs text-slate-400">{profileUsername}</p>
          </div>
          <span className="text-xs text-slate-400">⋯</span>
        </div>
      </div>
      <div className="space-y-3 px-4 py-5">
        {visible.map((message, idx) => (
          <div key={`${message.role}-${idx}`} className={`flex ${message.role === "buyer" ? "justify-start" : "justify-end"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                message.role === "buyer" ? "bg-white/10" : `${accentClass}`
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <div className="rounded-full bg-white/5 px-4 py-2 text-xs text-slate-500">Message…</div>
      </div>
    </div>
  );
}
