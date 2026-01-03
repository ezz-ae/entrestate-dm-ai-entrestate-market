'use client';

import { useState } from 'react';
import AgentStep from '@/components/onboarding/AgentStep';
import KnowledgeStep from '@/components/onboarding/KnowledgeStep';
import PlaygroundStep from '@/components/onboarding/PlaygroundStep';
import ConnectStep from '@/components/onboarding/ConnectStep';

export type OnboardingData = {
    agentName: string;
    companyName: string;
    companyDescription: string;
    marketKnowledge: string[];
    exclusiveListings: string;
}

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [onboardingData, setOnboardingData] = useState<OnboardingData>({
        agentName: '',
        companyName: '',
        companyDescription: '',
        marketKnowledge: [],
        exclusiveListings: '',
    });
    const [botId, setBotId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateOnboardingData = (data: Partial<OnboardingData>) => {
        setOnboardingData(prev => ({ ...prev, ...data }));
    };

    const createBot = async () => {
        setLoading(true);
        setError(null);
        try {
            // In a real app, you'd get the user's ID token here for authentication.
            // For this demo, we'll assume a dummy token or no auth for simplicity.
            const token = "dummy-token"; // Replace with actual token retrieval

            const res = await fetch('/api/bots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: onboardingData.agentName,
                    companyName: onboardingData.companyName,
                    companyDescription: onboardingData.companyDescription,
                    personality: "professional and helpful", // Default personality
                    marketKnowledge: onboardingData.marketKnowledge,
                    exclusiveListings: onboardingData.exclusiveListings,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Failed to create bot');
            }
            setBotId(data.botId);
            setStep(4);
        } catch (err: any) {
            console.error("Error creating bot:", err);
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-apple-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto py-12 px-6">
                {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-8">{error}</div>}
                {step === 1 && <AgentStep data={onboardingData} onUpdate={updateOnboardingData} onNext={() => setStep(2)} />}
                {step === 2 && <KnowledgeStep data={onboardingData} onUpdate={updateOnboardingData} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                {step === 3 && (
                    <PlaygroundStep 
                        data={onboardingData} 
                        onNext={createBot} // Call createBot on next from Playground
                        onBack={() => setStep(2)} 
                        loading={loading}
                    />
                )}
                {step === 4 && botId && <ConnectStep botId={botId} onBack={() => setStep(3)} />}
            </div>
        </main>
    );
}