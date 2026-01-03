"use client";

import { useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useActiveBotId } from "@/hooks/useActiveBotId";

const toneOptions = ["friendly expert", "luxury", "direct"] as const;

type BotFormState = {
  brand_name: string;
  city_focus: string;
  tone: (typeof toneOptions)[number];
  whatsapp_number: string;
};

type FeedbackState = {
  type: "success" | "error";
  message: string;
} | null;

const createEmptyForm = (): BotFormState => ({
  brand_name: "",
  city_focus: "Dubai",
  tone: "friendly expert",
  whatsapp_number: ""
});

const extractMillis = (value: unknown): number | null => {
  if (!value) return null;
  if (typeof value === "number") return value;
  if (typeof value === "object" && "toMillis" in (value as any)) {
    try {
      return (value as { toMillis: () => number }).toMillis();
    } catch (err) {
      console.error("Failed to read Firestore timestamp", err);
      return null;
    }
  }
  return null;
};

export default function BrandPage() {
  const botId = useActiveBotId();
  const [form, setForm] = useState<BotFormState>(createEmptyForm());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [botMeta, setBotMeta] = useState<{ active?: boolean; expiresAt?: number | null }>({});
  const feedbackTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) {
        clearTimeout(feedbackTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    setFeedback(null);
    setForm(createEmptyForm());
    setLoading(true);

    const loadBot = async () => {
      try {
        const botRef = doc(db, "bots", botId);
        const snap = await getDoc(botRef);
        if (snap.exists()) {
          const data = snap.data() as Partial<BotFormState> & {
            active?: boolean;
            expiresAt?: number;
          };
          setForm({
            brand_name: data.brand_name ?? "",
            city_focus: data.city_focus ?? "Dubai",
            tone: (data.tone as BotFormState["tone"]) ?? "friendly expert",
            whatsapp_number: data.whatsapp_number ?? ""
          });
          setBotMeta({
            active: Boolean(data.active),
            expiresAt: extractMillis(data.expiresAt)
          });
        } else {
          setBotMeta({ active: false, expiresAt: null });
        }
      } catch (err) {
        console.error("Failed to load bot doc", err);
        setFeedback({ type: "error", message: "Unable to load bot settings." });
      } finally {
        setLoading(false);
      }
    };

    loadBot();
  }, [botId]);

  const showFeedback = (nextFeedback: FeedbackState) => {
    setFeedback(nextFeedback);
    if (feedbackTimer.current) {
      clearTimeout(feedbackTimer.current);
    }
    if (nextFeedback) {
      feedbackTimer.current = setTimeout(() => setFeedback(null), 5000);
    }
  };

  const handleSave = async () => {
    if (!form.brand_name.trim()) {
      showFeedback({ type: "error", message: "Brand name is required." });
      return;
    }
    if (!form.whatsapp_number.trim()) {
      showFeedback({ type: "error", message: "WhatsApp number is required." });
      return;
    }

    setSaving(true);
    try {
      const botRef = doc(db, "bots", botId);
      await setDoc(
        botRef,
        {
          ...form,
          botId,
          updatedAt: Date.now()
        },
        { merge: true }
      );
      showFeedback({ type: "success", message: "Brand settings saved." });
    } catch (err) {
      console.error("Failed to save bot doc", err);
      showFeedback({ type: "error", message: "Failed to save brand settings." });
    } finally {
      setSaving(false);
    }
  };

  const statusColor = botMeta.active
    ? botMeta.expiresAt && botMeta.expiresAt < Date.now()
      ? "bg-amber-100 text-amber-700"
      : "bg-apple-green text-white"
    : "bg-apple-gray-100 text-apple-gray-400";

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 space-y-8">
           <div>
              <h2 className="text-2xl font-semibold text-apple-gray-600 mb-2">Brand Identity</h2>
              <p className="text-apple-gray-400">Configure how your AI assistant represents your brand.</p>
           </div>

           {loading ? (
             <div className="h-64 flex items-center justify-center">
                <p className="text-apple-gray-300">Loading settings...</p>
             </div>
           ) : (
             <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Brand Name</label>
                  <input
                    className="w-full bg-apple-gray-50 border border-apple-gray-100 rounded-apple-sm px-4 py-3 focus:bg-white focus:ring-2 focus:ring-apple-blue/10 focus:border-apple-blue outline-none transition-all"
                    value={form.brand_name}
                    onChange={(e) => setForm(f => ({ ...f, brand_name: e.target.value }))}
                    placeholder="e.g. Luxe Habitats"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">City Focus</label>
                    <input
                      className="w-full bg-apple-gray-50 border border-apple-gray-100 rounded-apple-sm px-4 py-3 focus:bg-white focus:ring-2 focus:ring-apple-blue/10 focus:border-apple-blue outline-none transition-all"
                      value={form.city_focus}
                      onChange={(e) => setForm(f => ({ ...f, city_focus: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Tone of Voice</label>
                    <select
                      className="w-full bg-apple-gray-50 border border-apple-gray-100 rounded-apple-sm px-4 py-3 focus:bg-white focus:ring-2 focus:ring-apple-blue/10 focus:border-apple-blue outline-none transition-all appearance-none"
                      value={form.tone}
                      onChange={(e) => setForm(f => ({ ...f, tone: e.target.value as any }))}
                    >
                      {toneOptions.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">WhatsApp Number</label>
                  <input
                    className="w-full bg-apple-gray-50 border border-apple-gray-100 rounded-apple-sm px-4 py-3 focus:bg-white focus:ring-2 focus:ring-apple-blue/10 focus:border-apple-blue outline-none transition-all"
                    value={form.whatsapp_number}
                    onChange={(e) => setForm(f => ({ ...f, whatsapp_number: e.target.value }))}
                    placeholder="+971 50 000 0000"
                  />
                  <p className="text-[10px] text-apple-gray-400 italic">Leads will be sent here instantly.</p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                   <button
                     onClick={handleSave}
                     disabled={saving}
                     className="apple-button-primary"
                   >
                     {saving ? "Saving..." : "Save Changes"}
                   </button>
                   {feedback && (
                     <span className={`text-sm font-medium ${feedback.type === 'success' ? 'text-apple-green' : 'text-apple-red'}`}>
                        {feedback.message}
                     </span>
                   )}
                </div>
             </div>
           )}
        </div>

        <div className="w-full md:w-72">
           <div className="bg-apple-gray-50 rounded-apple-md p-6 border border-apple-gray-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-apple-gray-400 mb-4">Status</h3>
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold mb-4 ${statusColor}`}>
                 {botMeta.active ? 'ACTIVE' : 'INACTIVE'}
              </div>
              <div className="space-y-4 text-[12px] text-apple-gray-500">
                 <p>Your bot is currently {botMeta.active ? 'live' : 'offline'}.</p>
                 <div className="pt-4 border-t border-apple-gray-100">
                    <p className="font-bold text-apple-gray-600 mb-1">Bot ID</p>
                    <code className="bg-apple-gray-200 px-2 py-0.5 rounded text-[10px]">{botId}</code>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
