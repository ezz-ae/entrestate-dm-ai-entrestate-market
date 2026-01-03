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
    <div className="p-8 space-y-12">
      {/* Header Info */}
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold text-apple-gray-600 mb-2">Property Listings</h2>
        <p className="text-apple-gray-400">Add the specific units you are promoting. The AI will prioritize these in conversations.</p>
      </div>

      {/* Form Section */}
      <div className="bg-apple-gray-50 rounded-apple-md border border-apple-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
           <h3 className="text-sm font-bold uppercase tracking-widest text-apple-gray-400">
             {form.id ? 'Edit Listing' : 'New Listing'}
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
                placeholder="e.g. Luxury 3BR with Marina View"
              />
           </div>
           <div className="space-y-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Community</label>
              <input
                className="w-full bg-white border border-apple-gray-100 rounded-apple-sm px-4 py-3 focus:ring-2 focus:ring-apple-blue/10 focus:border-apple-blue outline-none transition-all"
                value={form.area}
                onChange={(e) => setForm(f => ({ ...f, area: e.target.value }))}
                placeholder="e.g. Dubai Marina"
              />
           </div>

           <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                 <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Type</label>
                 <select 
                   className="w-full bg-white border border-apple-gray-100 rounded-apple-sm px-3 py-3 text-sm"
                   value={form.type}
                   onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}
                 >
                    <option value="apartment">Apt</option>
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Beds</label>
                 <input
                   type="number"
                   className="w-full bg-white border border-apple-gray-100 rounded-apple-sm px-3 py-3"
                   value={form.beds}
                   onChange={(e) => setForm(f => ({ ...f, beds: e.target.value }))}
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Price (AED)</label>
                 <input
                   type="number"
                   className="w-full bg-white border border-apple-gray-100 rounded-apple-sm px-3 py-3"
                   value={form.price_aed}
                   onChange={(e) => setForm(f => ({ ...f, price_aed: e.target.value }))}
                 />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Status</label>
                 <select 
                    className="w-full bg-white border border-apple-gray-100 rounded-apple-sm px-3 py-3 text-sm"
                    value={form.status}
                    onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
                 >
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Handover</label>
                 <input
                   className="w-full bg-white border border-apple-gray-100 rounded-apple-sm px-4 py-3"
                   value={form.handover}
                   onChange={(e) => setForm(f => ({ ...f, handover: e.target.value }))}
                   placeholder="Q4 2025"
                 />
              </div>
           </div>

           <div className="md:col-span-2 space-y-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-400">Key Selling Points</label>
              <textarea
                rows={3}
                className="w-full bg-white border border-apple-gray-100 rounded-apple-sm px-4 py-3 focus:ring-2 focus:ring-apple-blue/10 focus:border-apple-blue outline-none transition-all"
                value={form.keyPointsInput}
                onChange={(e) => setForm(f => ({ ...f, keyPointsInput: e.target.value }))}
                placeholder="High ROI, Prime Location, Fully Furnished..."
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
             {saving ? 'Saving...' : form.id ? 'Update Listing' : 'Add Listing'}
           </button>
        </div>
      </div>

      {/* List Section */}
      <div className="space-y-4">
         <h3 className="text-sm font-bold uppercase tracking-widest text-apple-gray-400">Your Inventory</h3>
         
         {loading ? (
            <div className="text-center py-20 bg-white rounded-apple-lg border border-apple-gray-50 text-apple-gray-300">
               Loading inventory...
            </div>
         ) : listings.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-apple-lg border border-dashed border-apple-gray-200 text-apple-gray-400 italic">
               No properties listed yet.
            </div>
         ) : (
            <div className="grid grid-cols-1 gap-4">
               {listings.map(listing => (
                  <div key={listing.id} className="bg-white p-6 rounded-apple-lg border border-apple-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-sm transition-shadow">
                     <div className="space-y-1">
                        <div className="flex items-center gap-3">
                           <h4 className="text-lg font-semibold text-apple-gray-600">{listing.title}</h4>
                           <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              listing.active ? 'bg-apple-green/10 text-apple-green' : 'bg-apple-gray-100 text-apple-gray-400'
                           }`}>
                              {listing.active ? 'Active' : 'Paused'}
                           </span>
                        </div>
                        <p className="text-sm text-apple-gray-400">{listing.area} • {listing.beds} BR • {listing.type}</p>
                     </div>
                     
                     <div className="flex items-center gap-8">
                        <div className="text-right">
                           <p className="text-lg font-bold text-apple-gray-600">{priceFormatter.format(listing.price_aed)}</p>
                           <p className="text-[10px] text-apple-gray-400 uppercase tracking-widest font-bold">{listing.status}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                           <button 
                             onClick={() => handleEdit(listing)}
                             className="p-2 hover:bg-apple-gray-50 rounded-full transition-colors"
                             title="Edit"
                           >
                              ✏️
                           </button>
                           <button 
                             onClick={() => handleDelete(listing)}
                             className="p-2 hover:bg-apple-red/5 text-apple-red rounded-full transition-colors"
                             title="Delete"
                           >
                              🗑️
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
    </div>
  );
}
