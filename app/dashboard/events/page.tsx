"use client";

import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useActiveBotId } from "@/hooks/useActiveBotId";

type EventRecord = {
  id: string;
  botId: string;
  title: string;
  type: string;
  start_datetime: number | null;
  location: string;
  related_project?: string;
  short_description: string;
  cta_text: string;
  active: boolean;
  createdAt?: number;
  updatedAt?: number;
};

type EventFormState = {
  id?: string;
  title: string;
  type: string;
  location: string;
  startDateTime: string;
  related_project: string;
  short_description: string;
  cta_text: string;
  active: boolean;
};

const createEmptyForm = (): EventFormState => ({
  id: undefined,
  title: "",
  type: "launch",
  location: "",
  startDateTime: "",
  related_project: "",
  short_description: "",
  cta_text: "RSVP on WhatsApp",
  active: true
});

type FeedbackState = {
  type: "success" | "error";
  message: string;
} | null;

const formatDateLabel = (value: number | null | undefined) => {
  if (!value) return "TBA";
  return new Date(value).toLocaleString();
};

const toDateInputValue = (value: number | null | undefined) => {
  if (!value) return "";
  const offset = new Date(value).getTimezoneOffset();
  const local = new Date(value - offset * 60000);
  return local.toISOString().slice(0, 16);
};

export default function EventsPage() {
  const botId = useActiveBotId();
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [form, setForm] = useState<EventFormState>(createEmptyForm());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const feedbackTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) {
        clearTimeout(feedbackTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    setForm(createEmptyForm());
    setFeedback(null);
    setLoading(true);

    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("botId", "==", botId));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as Partial<EventRecord>;
          return {
            id: docSnap.id,
            botId,
            title: data.title ?? "",
            type: data.type ?? "",
            location: data.location ?? "",
            start_datetime:
              typeof data.start_datetime === "number" ? data.start_datetime : Number(data.start_datetime) || null,
            related_project: data.related_project ?? "",
            short_description: data.short_description ?? "",
            cta_text: data.cta_text ?? "RSVP on WhatsApp",
            active: data.active ?? true,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          } satisfies EventRecord;
        });
        docs.sort((a, b) => (b.start_datetime ?? 0) - (a.start_datetime ?? 0));
        setEvents(docs);
        setLoading(false);
      },
      (error) => {
        console.error("events snapshot error", error);
        setFeedback({ type: "error", message: "Unable to load events." });
        setLoading(false);
      }
    );

    return () => unsubscribe();
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

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      showFeedback({ type: "error", message: "Event title is required." });
      return;
    }

    const parsedDate = form.startDateTime ? Date.parse(form.startDateTime) : null;
    if (!parsedDate || Number.isNaN(parsedDate)) {
      showFeedback({ type: "error", message: "Date + time is required." });
      return;
    }

    const payload = {
      botId,
      title: form.title.trim(),
      type: form.type.trim(),
      location: form.location.trim(),
      start_datetime: parsedDate,
      related_project: form.related_project.trim() || null,
      short_description: form.short_description.trim(),
      cta_text: form.cta_text.trim(),
      active: form.active,
      updatedAt: Date.now()
    } satisfies Omit<EventRecord, "id">;

    setSaving(true);
    try {
      if (form.id) {
        await updateDoc(doc(db, "events", form.id), payload);
        showFeedback({ type: "success", message: "Event updated." });
      } else {
        await addDoc(collection(db, "events"), { ...payload, createdAt: Date.now() });
        showFeedback({ type: "success", message: "Event added." });
      }
      setForm(createEmptyForm());
    } catch (err) {
      console.error("Failed to save event", err);
      showFeedback({ type: "error", message: "Failed to save event." });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (event: EventRecord) => {
    setForm({
      id: event.id,
      title: event.title,
      type: event.type,
      location: event.location,
      startDateTime: toDateInputValue(event.start_datetime),
      related_project: event.related_project ?? "",
      short_description: event.short_description,
      cta_text: event.cta_text,
      active: event.active
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (eventRecord: EventRecord) => {
    if (!confirm(`Delete ${eventRecord.title}?`)) return;
    try {
      await deleteDoc(doc(db, "events", eventRecord.id));
      showFeedback({ type: "success", message: "Event deleted." });
    } catch (err) {
      console.error("Failed to delete event", err);
      showFeedback({ type: "error", message: "Failed to delete event." });
    }
  };

  const handleToggleActive = async (eventRecord: EventRecord) => {
    try {
      await updateDoc(doc(db, "events", eventRecord.id), {
        active: !eventRecord.active,
        updatedAt: Date.now()
      });
      showFeedback({
        type: "success",
        message: eventRecord.active ? "Event paused." : "Event activated."
      });
    } catch (err) {
      console.error("Failed to toggle event", err);
      showFeedback({ type: "error", message: "Unable to update event." });
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-sm text-slate-200">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Step 3</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">Tell the bot about your launches + roadshows.</h1>
        <p className="mt-2 text-slate-300">
          Just enter the name, date, and where it happens. The assistant will invite every interested buyer and send them
          to WhatsApp. Pause any event anytime.
        </p>
      </section>

      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-400">Event form</p>
            <h2 className="text-lg font-semibold text-white">{form.id ? "Update event" : "Add event"}</h2>
          </div>
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
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Title</label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Palm Jumeirah launch"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Type</label>
            <select
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.type}
              onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
            >
              <option value="launch">Launch</option>
              <option value="webinar">Webinar</option>
              <option value="open-house">Open house</option>
              <option value="investment-clinic">Investment clinic</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Location / link</label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.location}
              onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
              placeholder="Venue or Zoom link"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Start time</label>
            <input
              type="datetime-local"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.startDateTime}
              onChange={(event) => setForm((prev) => ({ ...prev, startDateTime: event.target.value }))}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Related project (optional)</label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.related_project}
              onChange={(event) => setForm((prev) => ({ ...prev, related_project: event.target.value }))}
              placeholder="Project name"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">CTA text</label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.cta_text}
              onChange={(event) => setForm((prev) => ({ ...prev, cta_text: event.target.value }))}
              placeholder="RSVP on WhatsApp +971..."
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Short description</label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.short_description}
              onChange={(event) => setForm((prev) => ({ ...prev, short_description: event.target.value }))}
              placeholder="What is the hook for this event?"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="event-active"
              checked={form.active}
              onChange={(event) => setForm((prev) => ({ ...prev, active: event.target.checked }))}
              className="h-4 w-4"
            />
            <label htmlFor="event-active" className="text-xs uppercase tracking-wide text-slate-400">
              Active
            </label>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
          {form.id && (
            <button
              onClick={() => setForm(createEmptyForm())}
              className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300"
              disabled={saving}
            >
              Cancel edit
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : form.id ? "Update event" : "Publish event"}
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-400">Invites</p>
            <h2 className="text-lg font-semibold text-white">Upcoming events</h2>
          </div>
          {loading && <span className="text-xs text-slate-500">Loading...</span>}
        </div>
        {events.length === 0 && !loading ? (
          <p className="mt-4 rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
            No events listed. Add your next launch above so the AI can start sending RSVPs.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {events.map((eventRecord) => (
              <div
                key={eventRecord.id}
                className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-sm"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-base font-semibold text-white">{eventRecord.title}</p>
                    <p className="text-xs text-slate-400">
                      {formatDateLabel(eventRecord.start_datetime)} · {eventRecord.location || "TBA"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide">
                    <span className="rounded-full bg-slate-800 px-3 py-1">{eventRecord.type}</span>
                    <span
                      className={`rounded-full px-3 py-1 ${
                        eventRecord.active ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {eventRecord.active ? "Active" : "Paused"}
                    </span>
                  </div>
                </div>
                {eventRecord.related_project ? (
                  <p className="mt-1 text-xs text-slate-400">Project: {eventRecord.related_project}</p>
                ) : null}
                <p className="mt-2 text-xs text-slate-300">{eventRecord.short_description}</p>
                <p className="mt-2 text-xs text-emerald-400">{eventRecord.cta_text}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <button
                    className="rounded-lg border border-slate-700 px-3 py-1 text-slate-200"
                    onClick={() => handleEdit(eventRecord)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-lg border border-slate-700 px-3 py-1 text-slate-200"
                    onClick={() => handleToggleActive(eventRecord)}
                  >
                    {eventRecord.active ? "Pause" : "Activate"}
                  </button>
                  <button
                    className="rounded-lg border border-red-500/40 px-3 py-1 text-red-300"
                    onClick={() => handleDelete(eventRecord)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
