"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function EntrestateChat({ botId }: { botId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I am your Dubai project assistant, powered by the Entrestate Market Engine. Ask about any project, prices, payment plans, or yields."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const newMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

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
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Error processing your request."
          }
        ]);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border rounded-xl flex flex-col bg-white/90 text-slate-900 shadow-lg overflow-hidden">
      <div className="px-4 py-3 border-b bg-slate-900 text-slate-50 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Entrestate DM AI</div>
          <div className="text-xs text-slate-300">
            Dubai projects · Entrestate Market Engine
          </div>
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-wide">
          v1
        </span>
      </div>

      <div className="flex-1 px-3 py-2 space-y-2 overflow-y-auto max-h-96">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-2xl text-sm ${
                m.role === "user"
                  ? "bg-emerald-600 text-white rounded-br-sm"
                  : "bg-slate-100 text-slate-900 rounded-bl-sm"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-2xl text-sm bg-slate-100 text-slate-500">
              Typing...
            </div>
          </div>
        )}
      </div>

      <div className="px-3 py-2 border-t bg-white flex items-center gap-2">
        <input
          className="flex-1 text-sm px-3 py-2 border rounded-full outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="Ask about any Dubai project..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="text-sm px-3 py-2 rounded-full bg-emerald-600 text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
