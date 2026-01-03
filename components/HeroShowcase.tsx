"use client";

import { useEffect, useState } from "react";

type Message = {
  role: "user" | "bot";
  content: string;
};

const script: Message[] = [
  { 
    role: "user", 
    content: "Hi, do you have any 2BR in Dubai Marina under 2.5M?"
  },
  { 
    role: "bot", 
    content: "Yes, Aura Residences has 2BR units with Marina views starting at 2.3M AED. They are ready to move in."
  },
  { 
    role: "user", 
    content: "What is the expected ROI for those units?"
  },
  { 
    role: "bot", 
    content: "Marina apartments currently yield 6-7% net. Aura is high demand for short-term rentals due to its location."
  },
  { 
    role: "user", 
    content: "I'm interested. Can I get more details?"
  },
  { 
    role: "bot", 
    content: "I can have our Marina specialist send you the floor plans and payment details on WhatsApp. What is your number?"
  },
  { 
    role: "user", 
    content: "+971 58 123 4567"
  },
  { 
    role: "bot", 
    content: "Thank you. Sara is sending the documents to your WhatsApp right now."
  }
];

export default function HeroShowcase() {
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (step < script.length) {
      const isBot = script[step].role === "bot";
      const delay = isBot ? 1500 : 2000;
      
      const timer = setTimeout(() => {
        if (isBot) {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setStep(s => s + 1);
          }, 1500);
        } else {
          setStep(s => s + 1);
        }
      }, delay);
      
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setStep(0);
      }, 5000);
      return () => clearTimeout(resetTimer);
    }
  }, [step]);

  const visibleMessages = script.slice(0, step);

  return (
    <div className="phone-container">
      <div className="phone-notch" />
      <div className="phone-screen">
        {/* Instagram Header */}
        <div className="h-16 border-b border-apple-gray-100 flex items-center px-4 pt-6 gap-3">
           <div className="w-8 h-8 rounded-full bg-apple-gray-100 flex items-center justify-center text-[10px] font-bold text-apple-gray-400">RE</div>
           <div className="flex-1 text-left">
              <p className="text-[13px] font-bold text-black leading-tight">Reality Expert</p>
              <p className="text-[11px] text-apple-gray-400 leading-tight">Active now</p>
           </div>
           <div className="flex gap-4 text-apple-gray-200">
              <span className="text-lg">⋯</span>
           </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto custom-scrollbar flex flex-col justify-end pb-6">
           {visibleMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                 <div className={m.role === 'user' ? 'ig-bubble-user' : 'ig-bubble-bot'}>
                    {m.content}
                 </div>
              </div>
           ))}
           {isTyping && (
             <div className="flex justify-start animate-fade-in">
                <div className="ig-bubble-bot !py-1 flex gap-1">
                   <span className="w-1 h-1 bg-apple-gray-400 rounded-full animate-bounce" />
                   <span className="w-1 h-1 bg-apple-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                   <span className="w-1 h-1 bg-apple-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
             </div>
           )}
        </div>

        {/* Instagram Footer */}
        <div className="p-4 border-t border-apple-gray-100">
           <div className="bg-apple-gray-50 rounded-full px-4 py-2 text-[13px] text-apple-gray-400 flex justify-between items-center">
              <span>Message...</span>
              <span className="text-apple-blue font-bold opacity-30">Send</span>
           </div>
        </div>
      </div>
    </div>
  );
}
