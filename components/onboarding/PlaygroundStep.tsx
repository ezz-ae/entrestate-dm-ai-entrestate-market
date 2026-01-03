'use client';

import { OnboardingData } from "@/app/onboarding/page";
import EntrestateChat from "@/components/EntrestateChat";

interface Props {
    data: OnboardingData;
    onNext: () => void;
    onBack: () => void;
}

export default function PlaygroundStep({ data, onNext, onBack }: Props) {
    
    const initialMessage = `Hello! I'm ${data.agentName}, your AI expert from ${data.companyName}. Ask me anything about our listings or the ${data.marketKnowledge.join(', ')} real estate market.`;

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-5xl font-bold tracking-tighter text-apple-gray-600">Test Your Expert</h1>
                <p className="text-xl text-apple-gray-400 mt-4">Have a conversation with your new AI. See how it uses the knowledge you provided to qualify leads.</p>
            </div>

            <div className="max-w-md mx-auto">
                <div className="phone-mockup shadow-2xl">
                    <div className="phone-reflection" />
                    <div className="h-[680px]">
                        <EntrestateChat botId="onboarding-demo" initialMessage={initialMessage} />
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center pt-8">
                <button onClick={onBack} className="apple-button-secondary !px-8 !py-4 !text-lg">Back</button>
                <div className="text-center">
                    <p className="text-apple-gray-500 font-medium">Happy with the result?</p>
                    <p className="text-sm text-apple-gray-400">You can always train it more later.</p>
                </div>
                <button onClick={onNext} className="apple-button-primary !px-12 !py-4 !text-lg">Next: Go Live</button>
            </div>
        </div>
    );
}