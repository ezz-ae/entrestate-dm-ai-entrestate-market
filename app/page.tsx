
import HeroShowcase from "@/components/HeroShowcase";
import MiniChat from "@/components/MiniChat";
import Link from "next/link";

const stats = [
  { value: "4.5x", label: "Faster handoff", detail: "Compared to manual qualification" },
  { value: "+62%", label: "Capture rate", detail: "Growth in Instagram lead volume" },
  { value: "24/7", label: "Expert coverage", detail: "Instant response in any timezone" }
];

export default function Home() {
  return (
    <main className="bg-white selection:bg-apple-blue/10">
      {/* 01. HERO: Clean & Professional */}
      <section className="relative px-6 pt-32 pb-40 overflow-hidden bg-mesh-light">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-20 lg:gap-32 animate-fade-in">
          
          <div className="flex-1 text-left space-y-12 z-10">
            <h1 className="text-hero">
              Capture DMs. <br />
              <span className="text-apple-blue">Close on WhatsApp.</span>
            </h1>
            
            <p className="text-subhero max-w-xl">
              Automated lead response for Dubai brokers. <br /> Qualify buyers with verified project data instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
              <Link href="/dashboard" className="apple-button-primary text-xl px-12 py-5">
                Launch Dashboard
              </Link>
              <div className="flex flex-col">
                 <span className="text-apple-gray-600 font-bold text-lg">No connection fee</span>
                 <span className="text-apple-gray-400 text-sm font-medium">Pay only when you go live</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-[340px] relative">
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* 02. STATS */}
      <section className="py-24 border-y border-apple-gray-100 bg-soft-gray">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <p className="text-7xl font-semibold text-apple-gray-600 tracking-tighter mb-4">{s.value}</p>
                <p className="text-xl font-bold text-apple-gray-600 mb-2">{s.label}</p>
                <p className="text-apple-gray-400 font-medium text-lg leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. FEATURES: Demonstrated through Chat */}
      <section className="py-40 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-6xl md:text-8xl font-semibold text-apple-gray-600 tracking-tighter leading-none">Automated <br /> Lead Flow.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="content-holder flex flex-col justify-between min-h-[550px]">
               <div className="space-y-6">
                  <h3 className="text-3xl font-semibold text-apple-gray-600 tracking-tight leading-tight">Instant <br /> Engagement.</h3>
                  <MiniChat script={[
                    { role: "user", content: "Is this unit still available?" },
                    { role: "bot", content: "Yes, it is! Aura Residences 2BR at 2.3M AED. Would you like to see the floor plans?" }
                  ]} />
               </div>
               <p className="text-apple-gray-400 text-lg leading-relaxed mt-6">
                  The AI monitors your DMs 24/7. It responds instantly, so leads never go cold.
               </p>
            </div>
            
            <div className="content-holder flex flex-col justify-between min-h-[550px]">
               <div className="space-y-6">
                  <h3 className="text-3xl font-semibold text-apple-gray-600 tracking-tight leading-tight">Expert <br /> Qualification.</h3>
                  <MiniChat script={[
                    { role: "user", content: "What is the ROI?" },
                    { role: "bot", content: "Marina units average 7% net. Aura is prime for short-term rentals. Are you buying for investment?" }
                  ]} />
               </div>
               <p className="text-apple-gray-400 text-lg leading-relaxed mt-6">
                  It identifies budget and urgency—separating serious investors from window shoppers.
               </p>
            </div>

            <div className="content-holder flex flex-col justify-between min-h-[550px]">
               <div className="space-y-6">
                  <h3 className="text-3xl font-semibold text-apple-gray-600 tracking-tight leading-tight">WhatsApp <br /> Handoff.</h3>
                  <MiniChat script={[
                    { role: "user", content: "+971 58 123 4567" },
                    { role: "bot", content: "Perfect. Sara from our Marina team is sending you the details on WhatsApp now." }
                  ]} />
               </div>
               <p className="text-apple-gray-400 text-lg leading-relaxed mt-6">
                  Qualified leads are delivered directly to your phone. You enter the chat ready to close.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04. TRAINING: The Brain */}
      <section className="py-40 px-6 bg-apple-gray-600 text-white overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
             <div className="flex-1 space-y-12">
                <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter leading-none">Training the <br /> Expert.</h2>
                <div className="space-y-10">
                   <div className="border-l-2 border-white/20 pl-8">
                      <h4 className="text-2xl font-bold mb-2">City-Wide Data</h4>
                      <p className="text-white/60 text-lg">Pre-trained on 1,200+ Dubai projects. Every floor plan, payment plan, and ROI is verified.</p>
                   </div>
                   <div className="border-l-2 border-white/20 pl-8">
                      <h4 className="text-2xl font-bold mb-2">Your Listings</h4>
                      <p className="text-white/60 text-lg">Upload your exclusive units. The AI prioritizes your inventory in every conversation.</p>
                   </div>
                   <div className="border-l-2 border-white/20 pl-8">
                      <h4 className="text-2xl font-bold mb-2">Brand Voice</h4>
                      <p className="text-white/60 text-lg">Pick your tone—Luxury, Direct, or Friendly. The Expert speaks exactly like your brand.</p>
                   </div>
                </div>
             </div>
             
             <div className="flex-1 w-full bg-white/5 backdrop-blur-3xl rounded-[60px] p-24 border border-white/10 flex flex-col items-center justify-center text-center">
                <div className="w-1 h-20 bg-apple-blue rounded-full mb-8 shadow-[0_0_20px_rgba(0,113,227,0.8)]" />
                <p className="text-4xl font-bold tracking-tighter mb-2">Reality Engine</p>
                <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Knowledge Core</p>
             </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/cologic_grid_bg.png')] bg-center bg-cover" />
      </section>

      {/* 05. FINAL CALL */}
      <section className="py-56 px-6 text-center bg-white overflow-hidden">
        <div className="max-w-[1100px] mx-auto animate-slide-up">
           <h2 className="text-hero mb-16">
              Scale your <br /> Pipeline.
           </h2>
           <Link href="/dashboard" className="apple-button-primary !text-2xl px-16 py-8">
              Launch Dashboard
           </Link>
           <p className="mt-10 text-apple-gray-400 font-bold text-2xl tracking-tight">
              Professional Grade Automation.
           </p>
        </div>
      </section>
    </main>
  );
}
