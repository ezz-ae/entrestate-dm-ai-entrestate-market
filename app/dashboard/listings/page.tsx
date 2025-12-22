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

type ListingRecord = {
  id: string;
  botId: string;
  title: string;
  area: string;
  type: string;
  beds: number;
  baths: number;
  price_aed: number;
  status: string;
  handover?: string | null;
  purpose: string;
  key_points: string[];
  active: boolean;
  createdAt?: number;
  updatedAt?: number;
};

type ListingFormState = {
  id?: string;
  title: string;
  area: string;
  type: string;
  beds: string;
  baths: string;
  price_aed: string;
  status: string;
  handover: string;
  purpose: string;
  keyPointsInput: string;
  active: boolean;
};

const createEmptyForm = (): ListingFormState => ({
  id: undefined,
  title: "",
  area: "",
  type: "apartment",
  beds: "2",
  baths: "2",
  price_aed: "",
  status: "available",
  handover: "Ready",
  purpose: "buy",
  keyPointsInput: "",
  active: true
});

type FeedbackState = {
  type: "success" | "error";
  message: string;
} | null;

const priceFormatter = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  maximumFractionDigits: 0
});

const parseKeyPoints = (value: string) =>
  value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

export default function ListingsPage() {
  const botId = useActiveBotId();
  const [listings, setListings] = useState<ListingRecord[]>([]);
  const [form, setForm] = useState<ListingFormState>(createEmptyForm());
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

    const listingsRef = collection(db, "listings");
    const q = query(listingsRef, where("botId", "==", botId));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as Partial<ListingRecord>;
          return {
            id: docSnap.id,
            botId,
            title: data.title ?? "",
            area: data.area ?? "",
            type: data.type ?? "",
            beds: typeof data.beds === "number" ? data.beds : Number(data.beds) || 0,
            baths: typeof data.baths === "number" ? data.baths : Number(data.baths) || 0,
            price_aed:
              typeof data.price_aed === "number" ? data.price_aed : Number(data.price_aed) || 0,
            status: data.status ?? "",
            handover: data.handover ?? null,
            purpose: data.purpose ?? "buy",
            key_points: data.key_points ?? [],
            active: data.active ?? true,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
          } satisfies ListingRecord;
        });
        docs.sort((a, b) => (b.updatedAt ?? b.createdAt ?? 0) - (a.updatedAt ?? a.createdAt ?? 0));
        setListings(docs);
        setLoading(false);
      },
      (error) => {
        console.error("listings snapshot error", error);
        setFeedback({ type: "error", message: "Unable to load listings." });
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
      showFeedback({ type: "error", message: "Listing title is required." });
      return;
    }
    if (!form.price_aed.trim()) {
      showFeedback({ type: "error", message: "Price is required." });
      return;
    }

    const payload = {
      botId,
      title: form.title.trim(),
      area: form.area.trim(),
      type: form.type.trim(),
      beds: Number(form.beds) || 0,
      baths: Number(form.baths) || 0,
      price_aed: Number(form.price_aed) || 0,
      status: form.status.trim(),
      handover: form.handover.trim() || null,
      purpose: form.purpose.trim() || "buy",
      key_points: parseKeyPoints(form.keyPointsInput),
      active: form.active,
      updatedAt: Date.now()
    } satisfies Omit<ListingRecord, "id">;

    setSaving(true);
    try {
      if (form.id) {
        await updateDoc(doc(db, "listings", form.id), payload);
        showFeedback({ type: "success", message: "Listing updated." });
      } else {
        await addDoc(collection(db, "listings"), { ...payload, createdAt: Date.now() });
        showFeedback({ type: "success", message: "Listing added." });
      }
      setForm(createEmptyForm());
    } catch (err) {
      console.error("Failed to save listing", err);
      showFeedback({ type: "error", message: "Failed to save listing." });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (listing: ListingRecord) => {
    setForm({
      id: listing.id,
      title: listing.title,
      area: listing.area,
      type: listing.type,
      beds: listing.beds ? String(listing.beds) : "",
      baths: listing.baths ? String(listing.baths) : "",
      price_aed: listing.price_aed ? String(listing.price_aed) : "",
      status: listing.status,
      handover: listing.handover ?? "",
      purpose: listing.purpose,
      keyPointsInput: (listing.key_points || []).join("\n"),
      active: listing.active
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (listing: ListingRecord) => {
    if (!confirm(`Delete ${listing.title}?`)) return;
    try {
      await deleteDoc(doc(db, "listings", listing.id));
      showFeedback({ type: "success", message: "Listing deleted." });
    } catch (err) {
      console.error("Failed to delete listing", err);
      showFeedback({ type: "error", message: "Failed to delete listing." });
    }
  };

  const handleToggleActive = async (listing: ListingRecord) => {
    try {
      await updateDoc(doc(db, "listings", listing.id), {
        active: !listing.active,
        updatedAt: Date.now()
      });
      showFeedback({
        type: "success",
        message: listing.active ? "Listing paused." : "Listing activated."
      });
    } catch (err) {
      console.error("Failed to toggle listing", err);
      showFeedback({ type: "error", message: "Unable to update listing." });
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-sm text-slate-200">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Step 2</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">Drop your listings in plain language.</h1>
        <p className="mt-2 text-slate-300">
          Fill what you know. Leave what you don’t. The AI will use every active listing first, so even one unit makes your
          bot smarter than portals.
        </p>
      </section>

      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-400">Listing form</p>
            <h2 className="text-lg font-semibold text-white">{form.id ? "Update listing" : "Add a new listing"}</h2>
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
              placeholder="Sea View 2BR – Palm Jumeirah"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Area / community</label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.area}
              onChange={(event) => setForm((prev) => ({ ...prev, area: event.target.value }))}
              placeholder="Palm Jumeirah"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Type</label>
            <select
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.type}
              onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
            >
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="townhouse">Townhouse</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Beds</label>
              <input
                type="number"
                min={0}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                value={form.beds}
                onChange={(event) => setForm((prev) => ({ ...prev, beds: event.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Baths</label>
              <input
                type="number"
                min={0}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
                value={form.baths}
                onChange={(event) => setForm((prev) => ({ ...prev, baths: event.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Price (AED)</label>
            <input
              type="number"
              min={0}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.price_aed}
              onChange={(event) => setForm((prev) => ({ ...prev, price_aed: event.target.value }))}
              placeholder="2000000"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Status</label>
            <select
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Handover</label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.handover}
              onChange={(event) => setForm((prev) => ({ ...prev, handover: event.target.value }))}
              placeholder="Q4 2025"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">Purpose</label>
            <select
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.purpose}
              onChange={(event) => setForm((prev) => ({ ...prev, purpose: event.target.value }))}
            >
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
              <option value="investment">Investment</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
              Key points (one per line or comma)
            </label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              value={form.keyPointsInput}
              onChange={(event) => setForm((prev) => ({ ...prev, keyPointsInput: event.target.value }))}
              placeholder={"Marina view\nPost-handover payment plan"}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="listing-active"
              checked={form.active}
              onChange={(event) => setForm((prev) => ({ ...prev, active: event.target.checked }))}
              className="h-4 w-4"
            />
            <label htmlFor="listing-active" className="text-xs uppercase tracking-wide text-slate-400">
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
            {saving ? "Saving..." : form.id ? "Update listing" : "Publish listing"}
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-400">Your units</p>
            <h2 className="text-lg font-semibold text-white">Current listings</h2>
          </div>
          {loading && <span className="text-xs text-slate-500">Loading...</span>}
        </div>
        {listings.length === 0 && !loading ? (
          <p className="mt-4 rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
            No listings yet. Add your hero unit above and the AI will start selling it right away.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-sm"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-base font-semibold text-white">{listing.title}</p>
                    <p className="text-xs text-slate-400">
                      {listing.area} · {listing.type} · {listing.beds} BR / {listing.baths} BA
                    </p>
                  </div>
                  <div className="text-right text-sm font-semibold text-emerald-400">
                    {priceFormatter.format(listing.price_aed)}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] uppercase tracking-wide">
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">{listing.status}</span>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">{listing.purpose}</span>
                  {listing.handover && (
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">Handover: {listing.handover}</span>
                  )}
                  <span
                    className={`rounded-full px-3 py-1 ${
                      listing.active ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {listing.active ? "Active" : "Paused"}
                  </span>
                </div>
                {listing.key_points?.length ? (
                  <p className="mt-3 text-xs text-slate-400">
                    Key points: {listing.key_points.slice(0, 6).join(" · ")}
                  </p>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <button
                    className="rounded-lg border border-slate-700 px-3 py-1 text-slate-200"
                    onClick={() => handleEdit(listing)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-lg border border-slate-700 px-3 py-1 text-slate-200"
                    onClick={() => handleToggleActive(listing)}
                  >
                    {listing.active ? "Pause" : "Activate"}
                  </button>
                  <button
                    className="rounded-lg border border-red-500/40 px-3 py-1 text-red-300"
                    onClick={() => handleDelete(listing)}
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
