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

  const badgeColor = botMeta.active
    ? botMeta.expiresAt && botMeta.expiresAt < Date.now()
      ? "text-amber-400"
      : "text-emerald-400"
    : "text-slate-400";

  const expiresLabel = botMeta.expiresAt
    ? new Date(botMeta.expiresAt).toLocaleString()
    : "Not scheduled";

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-sm text-slate-200">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Step 1</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">Tell the bot who you are.</h1>
        <p className="mt-2 text-slate-300">
          Write the name people see on your Instagram, pick the tone, and drop the WhatsApp number that should receive
          leads. That’s it. The bot will mirror this instantly.
        </p>
        <p className="mt-2 rounded-2xl border border-white/10 bg-black/20 p-3 text-xs text-slate-400">
          You’re editing <code className="rounded bg-slate-800 px-1">bots/{botId}</code>. No email or support ticket needed.
          Hit save and continue to listings.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-[1.6fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Brand card</h2>
            {feedback && (
              <span
                className={`text-xs font-medium ${
                  feedback.type === "success" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {feedback.message}
              </span>
            )}
          </div>
          {loading ? (
            <p className="mt-4 text-sm text-slate-500">Loading your info…</p>
          ) : (
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Brand name *</p>
                <p className="text-[12px] text-slate-500">Use the name buyers recognise on Instagram.</p>
                <input
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  value={form.brand_name}
                  onChange={(event) => setForm((prev) => ({ ...prev, brand_name: event.target.value }))}
                  placeholder="Homes Real Estate"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">City focus</p>
                <p className="text-[12px] text-slate-500">Usually “Dubai”. Change only if your bot sells another city.</p>
                <input
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  value={form.city_focus}
                  onChange={(event) => setForm((prev) => ({ ...prev, city_focus: event.target.value }))}
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Tone</p>
                <p className="text-[12px] text-slate-500">Pick how the bot should talk.</p>
                <select
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  value={form.tone}
                  onChange={(event) => setForm((prev) => ({ ...prev, tone: event.target.value as BotFormState["tone"] }))}
                >
                  {toneOptions.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">WhatsApp number *</p>
                <p className="text-[12px] text-slate-500">Include the country code. Leads go straight here.</p>
                <input
                  className="mt-1 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  value={form.whatsapp_number}
                  onChange={(event) => setForm((prev) => ({ ...prev, whatsapp_number: event.target.value }))}
                  placeholder="+9715xxxxxxx"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setForm(createEmptyForm())}
                  className="rounded-full border border-white/10 px-5 py-2 text-xs text-slate-300"
                  disabled={saving}
                >
                  Clear form
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save brand"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-wide text-emerald-400">Bot status</p>
          <p className={`mt-2 text-2xl font-semibold text-white ${badgeColor}`}>
            {botMeta.active ? (botMeta.expiresAt && botMeta.expiresAt < Date.now() ? "Expired" : "Active") : "Inactive"}
          </p>
          <p className="text-xs text-slate-400">Renews: {expiresLabel}</p>
          <ul className="mt-4 space-y-2 text-xs text-slate-400">
            <li>• Each payment adds 30 days automatically.</li>
            <li>• Need to pause? Set expiresAt to yesterday.</li>
            <li>
              • Share <span className="text-emerald-400">/bot/{botId}</span> with your client to test.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
