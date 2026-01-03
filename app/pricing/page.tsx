
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="bg-white">
      <section className="py-24 px-6 text-center">
        <div className="max-w-[800px] mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-apple-gray-600 mb-6">
            Simple, transparent <br /> pricing.
          </h1>
          <p className="text-xl text-apple-gray-400 mb-16">
            Get started for free. Pay only when you're ready to go live.
          </p>
          
          <div className="max-w-md mx-auto apple-card p-12 text-center border-apple-blue shadow-xl">
             <h2 className="text-2xl font-semibold text-apple-gray-600 mb-2">Professional</h2>
             <div className="flex items-baseline justify-center gap-1 mb-8">
                <span className="text-5xl font-bold text-apple-gray-600">$19</span>
                <span className="text-xl text-apple-gray-400 font-medium">/connection</span>
             </div>
             
             <ul className="text-left space-y-4 mb-10">
                <li className="flex items-center gap-3 text-apple-gray-500">
                   <span className="text-apple-green text-lg">✓</span>
                   Unlimited AI responses
                </li>
                <li className="flex items-center gap-3 text-apple-gray-500">
                   <span className="text-apple-green text-lg">✓</span>
                   Real-time WhatsApp handoff
                </li>
                <li className="flex items-center gap-3 text-apple-gray-500">
                   <span className="text-apple-green text-lg">✓</span>
                   Full Dubai project database
                </li>
                <li className="flex items-center gap-3 text-apple-gray-500">
                   <span className="text-apple-green text-lg">✓</span>
                   Lead qualification & data
                </li>
             </ul>
             
             <Link href="/dashboard" className="apple-button-primary w-full text-lg">
                Get Started Now
             </Link>
             <p className="mt-4 text-[12px] text-apple-gray-400">
                No credit card required to set up.
             </p>
          </div>
        </div>
      </section>
      
      <section className="py-24 bg-apple-gray-50 px-6">
         <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-3xl font-semibold text-apple-gray-600 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-8 text-left">
               <div>
                  <h3 className="text-lg font-semibold text-apple-gray-600 mb-2">How does the $19 fee work?</h3>
                  <p className="text-apple-gray-400">It's a simple, flat fee per Instagram connection. You only pay when you decide to activate the bot on your account. No hidden monthly subscriptions.</p>
               </div>
               <div>
                  <h3 className="text-lg font-semibold text-apple-gray-600 mb-2">Can I test it before paying?</h3>
                  <p className="text-apple-gray-400">Yes! You can set up your entire brand, listings, and projects, and test the bot in our preview environment without paying a cent.</p>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
