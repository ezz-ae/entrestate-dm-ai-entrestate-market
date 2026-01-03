'use client';

import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import EntrestateChat from "@/components/EntrestateChat";
import { CheckCircle, Info } from "@phosphor-icons/react/dist/ssr";

export default function FeaturesPage() {
  return (
    <main>
      {/* 01. HERO */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <PageHeader 
            title="Engineered for Conversion"
            subtitle="Meet the AI expert that doesn\'t just answer questions—it qualifies leads, builds trust, and drives sales."
            eyebrow="FEATURES"
          />
        </div>
      </section>
      
      {/* SECTIONS */}
      <div className="space-y-40 py-20">

        {/* 02. INSTANT RESPONSE */}
        <section className="px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16">
              <div className="flex-1 space-y-8 max-w-[540px]">
                <h2 className="text-6xl font-bold tracking-tighter text-apple-gray-600">Instantaneous Response. Always.</h2>
                <p className="text-xl text-apple-gray-400">
                  Speed is everything. Our AI expert is trained to provide immediate, intelligent, and context-aware answers to any inquiry, ensuring you never lose a lead to follow-up delays.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={24} weight="bold" className="text-green-500" />
                    <span className="text-lg text-apple-gray-500">Average response time {'<'} 2 seconds</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={24} weight="bold" className="text-green-500" />
                    <span className="text-lg text-apple-gray-500">24/7 availability. Never miss a lead.</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full max-w-[440px]">
                <div className="phone-mockup shadow-2xl">
                   <div className="phone-reflection" />
                   <div className="h-[680px]">
                      <EntrestateChat botId="demo-bot" initialMessage="Hi! I\'m your AI real estate expert. Ask me about any project in Dubai or my available listings." />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03. EXPERT QUALIFICATION */}
        <section className="px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-16">
              <div className="flex-1 w-full max-w-[500px] order-2 md:order-1">
                 <div className="bg-apple-gray-50 border border-apple-gray-200 rounded-2xl p-8">
                    <div className="rounded-xl shadow-lg bg-white p-6 text-center italic text-apple-gray-400 border border-apple-gray-100">
                        Qualification visualization placeholder
                    </div>
                 </div>
              </div>
              <div className="flex-1 space-y-8 max-w-[540px] order-1 md:order-2">
                <h2 className="text-6xl font-bold tracking-tighter text-apple-gray-600">Qualification on Autopilot</h2>
                <p className="text-xl text-apple-gray-400">
                  Your expert is more than a chatbot. It is a trained sales development representative that identifies serious buyers, understands their needs, and encourages clear next steps.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={24} weight="bold" className="text-green-500" />
                    <span className="text-lg text-apple-gray-500">Understands budget, timeline, and preferences</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={24} weight="bold" className="text-green-500" />
                    <span className="text-lg text-apple-gray-500">Nurtures leads with relevant project info</span>
                  </div>
                   <div className="flex items-center gap-3">
                    <Info size={24} weight="bold" className="text-blue-500" />
                    <span className="text-lg text-apple-gray-500">Agent handoff for high-intent buyers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 04. OMNICHANNEL */}
        <section className="py-32 px-6 bg-apple-gray-50 border-y border-apple-gray-200">
          <div className="max-w-[1200px] mx-auto text-center">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 text-apple-gray-600">One Brain. Every Touchpoint.</h2>
            <p className="text-2xl text-apple-gray-400 max-w-3xl mx-auto mb-20">Deploy your expert across all your digital channels to create a unified, lead-generating presence.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              
              {/* Card 1: Instagram */}
              <div className="bg-white p-8 rounded-2xl border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold text-apple-gray-600 mb-3">Instagram DMs</h3>
                <p className="text-lg text-apple-gray-400">Connect to your Instagram account and let the expert handle incoming DMs instantly, providing project details and qualifying leads while you sleep.</p>
              </div>

              {/* Card 2: Link in Bio */}
              <div className="bg-white p-8 rounded-2xl border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold text-apple-gray-600 mb-3">Link-in-Bio Landing Page</h3>
                <p className="text-lg text-apple-gray-400">Direct traffic from social media to a dedicated, conversion-optimized chat page. It\'s the fastest path from interest to conversation.</p>
              </div>

              {/* Card 3: Website Widget */}
              <div className="bg-white p-8 rounded-2xl border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-bold text-apple-gray-600 mb-3">Embeddable Website Widget</h3>
                <p className="text-lg text-apple-gray-400">Add the expert to your existing company website with a single line of code. Greet visitors, answer questions, and capture leads proactively.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 05. FINAL CTA */}
        <section className="py-20 px-6 bg-white text-center">
           <div className="max-w-[800px] mx-auto space-y-12">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-apple-gray-600 leading-none">Ready to build your expert?</h2>
              <p className="text-2xl text-apple-gray-400 font-medium">It takes less than 5 minutes to go live.</p>
              <div className="pt-8">
                 <Link href="/onboarding" className="apple-button-primary !text-2xl !px-20 !py-8 !shadow-2xl !shadow-apple-blue/30">
                    Get Started for Free
                 </Link>
              </div>
           </div>
        </section>
      </div>
    </main>
  );
}
