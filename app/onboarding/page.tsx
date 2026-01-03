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

    const updateOnboardingData = (data: Partial<OnboardingData>) => {
        setOnboardingData(prev => ({ ...prev, ...data }));
    };

    return (
        <main className="bg-apple-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto py-12 px-6">
                {step === 1 && <AgentStep data={onboardingData} onUpdate={updateOnboardingData} onNext={() => setStep(2)} />}
                {step === 2 && <KnowledgeStep data={onboardingData} onUpdate={updateOnboardingData} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                {step === 3 && <PlaygroundStep data={onboardingData} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
                {step === 4 && <ConnectStep onBack={() => setStep(3)} />}
            </div>
        </main>
    );
}