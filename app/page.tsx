'use client';

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import EntrestateChat from "@/components/EntrestateChat";
import Button from "@/components/ui/Button";
import SecondaryButton from "@/components/ui/SecondaryButton";

export default function Home() {
  return (
    <main className="bg-white">

      {/* 01. HERO */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-apple-gray-700 leading-tight">
                Meet the AI Expert that Closes Real Estate Deals.
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-apple-gray-500">
                Train a dedicated AI expert on your brand and listings. It works 24/7 to qualify leads, book meetings, and help you focus on what you do best: selling.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button href="/onboarding" className="!text-lg !px-10 !py-4">
                  Build Your Expert for Free
                </Button>
                <SecondaryButton href="/features" className="!text-lg !px-10 !py-4">
                  Explore Features
                </SecondaryButton>
              </div>
              <p className="mt-8 text-sm text-apple-gray-400 text-center lg:text-left">No credit card required. Go live in minutes.</p>
            </div>

            {/* Chat Mockup */}
            <div className="w-full max-w-lg mx-auto">
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
      
      {/* 02. BENEFITS */}
      <section className="py-32 px-6 bg-apple-gray-50 border-y border-apple-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-apple-gray-600">Never Lose a Lead Again</h2>
            <p className="mt-4 text-xl md:text-2xl text-apple-gray-400">
              Instantly engage every potential buyer, any time of day, on any channel.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-apple-gray-600">24/7 Lead Capture</h3>
              <p className="text-lg text-apple-gray-400">Your AI expert works around the clock to ensure every inquiry is answered instantly.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-apple-gray-600">Automated Qualification</h3>
              <p className="text-lg text-apple-gray-400">The expert qualifies leads based on your criteria, so you only talk to serious buyers.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-apple-gray-600">Omnichannel Presence</h3>
              <p className="text-lg text-apple-gray-400">Connect to Instagram, your website, and more. One brain, every touchpoint.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. FINAL CTA */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-apple-gray-600 leading-none">Go live in 5 minutes.</h2>
          <p className="text-2xl text-apple-gray-400 font-medium">Ready to see how an AI expert can transform your business? Get started for free, no strings attached.</p>
          <div className="pt-8">
            <Button href="/onboarding" className="!text-2xl !px-20 !py-8 !shadow-2xl !shadow-apple-blue/30">
              Build Your Expert
              <ArrowRight weight="bold" className="ml-3" />
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
