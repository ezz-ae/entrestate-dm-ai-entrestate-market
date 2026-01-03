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
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
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
    <div className="p-8 space-y-12">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold text-apple-gray-600 mb-2">Events & Roadshows</h2>
        <p className="text-apple-gray-400">Promote your upcoming launches or investment clinics. The AI will invite interested buyers.</p>
      </div>

      <div className="bg-apple-gray-50 rounded-apple-md border border-apple-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
           <h3 className="text-sm font-bold uppercase tracking-widest text-apple-gray-400">
             {form.id ? 'Edit Event' : 'New Event'}
           </h3>
           {feedback && (
             <span className={`text-sm font-medium ${feedback.type === 'success' ? 'text-apple-green' : 'text-apple-red'}`}>
                {feedback.message}
             </span>
           )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Title</label>
              <input
                className="w-full bg-white border border-apple-gray-100 rounded-apple-sm px-4 py-3 focus:ring-2 focus:ring-apple-blue/10 focus:border-apple-blue outline-none transition-all"
                value={form.title}
                onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Palm Jumeirah Launch Event"
              />
           </div>
           <div className="space-y-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Type</label>
              <select 
                className="w-full bg-white border border-apple-gray-100 rounded-apple-sm px-4 py-3 text-sm outline-none"
                value={form.type}
                onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}
              >
                <option value="launch">Launch</option>
                <option value="webinar">Webinar</option>
                <option value="open-house">Open house</option>
                <option value="investment-clinic">Investment clinic</option>
              </select>
           </div>

           <div className="space-y-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Location / Link</label>
              <input
                className="w-full bg-white border border-apple-gray-100 rounded-apple-sm px-4 py-3 outline-none"
                value={form.location}
                onChange={(e) => setForm(f => ({ ...f, location: e.target.value }))}
                placeholder="Venue or Zoom link"
              />
           </div>
           <div className="space-y-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Start Time</label>
              <input
                type="datetime-local"
                className="w-full bg-white border border-apple-gray-100 rounded-apple-sm px-4 py-3 outline-none"
                value={form.startDateTime}
                onChange={(e) => setForm(f => ({ ...f, startDateTime: e.target.value }))}
              />
           </div>

           <div className="md:col-span-2 space-y-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Short Description</label>
              <textarea
                rows={3}
                className="w-full bg-white border border-apple-gray-100 rounded-apple-sm px-4 py-3 outline-none"
                value={form.short_description}
                onChange={(e) => setForm(f => ({ ...f, short_description: e.target.value }))}
                placeholder="Briefly describe why buyers should attend..."
              />
           </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
           {form.id && (
             <button 
               onClick={() => setForm(createEmptyForm())}
               className="text-apple-gray-400 hover:text-apple-gray-600 font-medium"
             >
               Cancel
             </button>
           )}
           <button
             onClick={handleSubmit}
             disabled={saving}
             className="apple-button-primary px-8"
           >
             {saving ? 'Saving...' : form.id ? 'Update Event' : 'Add Event'}
           </button>
        </div>
      </div>

      <div className="space-y-4">
         <h3 className="text-sm font-bold uppercase tracking-widest text-apple-gray-400">Upcoming Events</h3>
         
         {loading ? (
            <div className="text-center py-20 bg-white rounded-apple-lg border border-apple-gray-50 text-apple-gray-300">
               Loading events...
            </div>
         ) : events.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-apple-lg border border-dashed border-apple-gray-200 text-apple-gray-400 italic">
               No events scheduled yet.
            </div>
         ) : (
            <div className="grid grid-cols-1 gap-4">
               {events.map(event => (
                  <div key={event.id} className="bg-white p-6 rounded-apple-lg border border-apple-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                     <div className="space-y-1">
                        <div className="flex items-center gap-3">
                           <h4 className="text-lg font-semibold text-apple-gray-600">{event.title}</h4>
                           <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              event.active ? 'bg-apple-blue/10 text-apple-blue' : 'bg-apple-gray-100 text-apple-gray-400'
                           }`}>
                              {event.type}
                           </span>
                        </div>
                        <p className="text-sm text-apple-gray-400">{formatDateLabel(event.start_datetime)} • {event.location}</p>
                     </div>
                     
                     <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleEdit(event)}
                          className="p-2 hover:bg-apple-gray-50 rounded-full transition-colors"
                        >
                           ✏️
                        </button>
                        <button 
                          onClick={() => handleDelete(event)}
                          className="p-2 hover:bg-apple-red/5 text-apple-red rounded-full transition-colors"
                        >
                           🗑️
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
