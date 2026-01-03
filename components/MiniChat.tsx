"use client";

import { useEffect, useState } from "react";

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function MiniChat({ script }: { script: Message[] }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % (script.length + 1));
    }, 2500);
    return () => clearInterval(timer);
  }, [script.length]);

  const visibleMessages = script.slice(0, step);

  return (
    <div className="w-full bg-white rounded-2xl border border-apple-gray-100 shadow-sm overflow-hidden flex flex-col h-[280px]">
      <div className="p-3 border-b border-apple-gray-50 bg-apple-gray-50/50 flex items-center gap-2">
         <div className="w-5 h-5 rounded-full bg-apple-gray-200" />
         <div className="h-2 w-16 bg-apple-gray-200 rounded-full" />
      </div>
      <div className="flex-1 p-4 space-y-3 overflow-y-auto flex flex-col justify-end">
        {visibleMessages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
             <div className={`max-w-[85%] px-3 py-1.5 rounded-[14px] text-[12px] leading-tight ${
                m.role === 'user' ? 'bg-[#3797f0] text-white' : 'bg-apple-gray-50 text-black border border-apple-gray-100'
             }`}>
                {m.content}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
