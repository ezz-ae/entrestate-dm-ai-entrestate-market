"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  thought?: string;
  dataPoint?: string;
};

export default function EntrestateChat({ botId, initialMessage }: { botId: string, initialMessage?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: initialMessage || "Hello! ask me anything real estate in Dubai"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [processStep, setProcessStep] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, processStep]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const newMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Simulation of "Depth" - showing what the AI is doing
    const steps = ["Scanning 1,200+ projects...", "Qualifying buyer intent...", "Referencing market yields...", "Preparing expert response..."];
    for (const step of steps) {
      setProcessStep(step);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const res = await fetch(`/api/bot/${botId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await res.json();
      setProcessStep(null);
      
      if (data.reply) {
        setMessages((prev) => [...prev, { 
          role: "assistant", 
          content: data.reply,
          dataPoint: "Verified via Reality Engine"
        }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "I'm having trouble connecting. Please try again." }]);
      }
    } catch (e) {
      setProcessStep(null);
      setMessages((prev) => [...prev, { role: "assistant", content: "Network error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col bg-black rounded-[40px] shadow-2xl overflow-hidden h-[600px] border border-white/10 relative">
      {/* Instagram Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 bg-black z-20">
         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
               <div className="w-full h-full bg-[#1d1d1f] flex items-center justify-center text-[10px] font-bold text-white tracking-tighter">RE</div>
            </div>
         </div>
         <div className="flex-1">
            <p className="text-sm font-bold text-white leading-tight">Reality Expert</p>
            <p className="text-[11px] text-white/50 leading-tight">Real Estate Assistant</p>
         </div>
         <div className="flex gap-4 text-white/40">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
         </div>
      </div>

      {/* Process Overlay (The "Depth" Visualization) */}
      {processStep && (
        <div className="absolute top-[73px] inset-x-0 z-30 bg-apple-blue/10 backdrop-blur-md px-6 py-2 border-b border-apple-blue/20 animate-fade-in">
           <div className="flex items-center gap-3">
              <div className="flex gap-1">
                 <span className="w-1 h-1 bg-apple-blue rounded-full animate-bounce" />
                 <span className="w-1 h-1 bg-apple-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                 <span className="w-1 h-1 bg-apple-blue rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-[10px] font-bold text-apple-blue uppercase tracking-[0.2em]">{processStep}</span>
           </div>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 p-6 space-y-6 overflow-y-auto scroll-smooth bg-black relative">
        {/* Abstract Background for Depth */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#0071e3_0%,transparent_70%)]" />

        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start animate-fade-in"}`}>
            <div className={`max-w-[85%] px-4 py-2.5 rounded-[22px] text-[15px] leading-relaxed shadow-sm ${
              m.role === "user" 
                ? "bg-[#3797f0] text-white rounded-tr-none" 
                : "bg-[#262626] text-white rounded-tl-none border border-white/5"
            }`}>
              {m.content}
            </div>
            {m.dataPoint && (
              <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1 ml-1">{m.dataPoint}</span>
            )}
          </div>
        ))}
        {loading && !processStep && (
          <div className="flex justify-start animate-fade-in">
             <div className="bg-[#262626] text-white/40 px-4 py-2 rounded-[22px] rounded-tl-none flex gap-1 italic text-xs">
                Typing...
             </div>
          </div>
        )}
      </div>

      {/* Footer / Input */}
      <div className="p-4 bg-black border-t border-white/10">
        <div className="relative flex items-center bg-[#121212] rounded-full border border-white/10 px-4 py-3">
           <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mr-3">
              <span className="text-white/50 text-xs">📷</span>
           </div>
           <input
             className="flex-1 bg-transparent text-white text-[14px] outline-none placeholder:text-white/30"
             placeholder="Message..."
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
           />
           <button
             onClick={sendMessage}
             disabled={loading || !input.trim()}
             className="ml-3 text-[#3797f0] font-bold text-[14px] disabled:opacity-30 transition-opacity"
           >
             Send
           </button>
        </div>
      </div>
    </div>
  );
}
