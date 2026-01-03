
import EntrestateChat from "@/components/EntrestateChat";
import Link from "next/link";
import MiniChat from "@/components/MiniChat";

export default function FeaturesPage() {
  return (
    <main className="bg-white">
      {/* 01. SMART HERO: Live Chat Playground */}
      <section className="py-24 px-6 bg-[#f5f5f7]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            <div className="flex-1 space-y-8 animate-slide-up text-center lg:text-left">
               <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-apple-gray-600 leading-[1.05]">
                  Try the Expert <br /> 
                  <span className="text-apple-blue">Intelligence.</span>
               </h1>
               <p className="text-xl md:text-2xl text-apple-gray-400 font-medium max-w-xl mx-auto lg:mx-0">
                  Ask anything about Dubai real estate. Experience how the AI qualifies, references data, and prepares for handoff.
               </p>
               <div className="pt-4">
                  <Link href="/dashboard" className="apple-button-primary">
                    Launch your connection
                  </Link>
               </div>
            </div>

            <div className="flex-1 w-full max-w-[440px] animate-fade-in [animation-delay:0.3s]">
               <div className="phone-mockup">
                  <div className="phone-reflection" />
                  <div className="h-[680px]">
                     <EntrestateChat botId="demo-bot" initialMessage="Hello! ask me anything real estate in Dubai" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. DETAILED CAPABILITIES */}
      <section className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
             <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-apple-gray-600 tracking-tighter">Market-Wide <br /> Awareness.</h2>
                <p className="text-lg text-apple-gray-400 leading-relaxed">
                   Your assistant is pre-trained on the entire Dubai project ecosystem. From payment plans in Emaar Beachfront to community ROI in Dubai Hills.
                </p>
                <div className="bg-apple-gray-50 p-8 rounded-[32px] border border-apple-gray-100">
                   <p className="text-sm font-bold text-apple-gray-400 uppercase tracking-widest mb-4">Demonstration</p>
                   <MiniChat script={[
                     { role: "user", content: "What is the handover for Ocean Heights?" },
                     { role: "bot", content: "Ocean Heights is already completed and ready to move in. It's one of the premium towers in Dubai Marina." }
                   ]} />
                </div>
             </div>

             <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-apple-gray-600 tracking-tighter">Instant Lead <br /> Qualification.</h2>
                <p className="text-lg text-apple-gray-400 leading-relaxed">
                   The Expert identifies buyer intent, budget, and urgency through natural dialogue. No forms required.
                </p>
                <div className="bg-apple-gray-50 p-8 rounded-[32px] border border-apple-gray-100">
                   <p className="text-sm font-bold text-apple-gray-400 uppercase tracking-widest mb-4">Demonstration</p>
                   <MiniChat script={[
                     { role: "user", content: "I want to buy a 3BR villa." },
                     { role: "bot", content: "I can help you with that. Are you looking for a ready villa or off-plan? And what is your budget range?" }
                   ]} />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 03. OMNICHANNEL DEPLOYMENT */}
      <section className="py-32 px-6 bg-apple-gray-50">
         <div className="max-w-[1200px] mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-apple-gray-600 tracking-tighter mb-20">One brain. Every channel.</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {[
                 { title: "Instagram", detail: "Automated DM responses" },
                 { title: "Bio Links", detail: "Conversion-optimized landing" },
                 { title: "Websites", detail: "Direct inquiry widgets" },
                 { title: "QR Codes", detail: "Physical listing activation" }
               ].map(item => (
                 <div key={item.title} className="content-holder !p-12 !rounded-[40px] border-none shadow-sm flex flex-col items-center justify-center gap-2">
                    <h4 className="text-2xl font-bold text-apple-gray-600">{item.title}</h4>
                    <p className="text-xs font-bold text-apple-blue uppercase tracking-widest">{item.detail}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </main>
  );
}
