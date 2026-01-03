'use client';

import { OnboardingData } from "@/app/onboarding/page";

interface Props {
    data: OnboardingData;
    onUpdate: (data: Partial<OnboardingData>) => void;
    onNext: () => void;
}

export default function AgentStep({ data, onUpdate, onNext }: Props) {
    return (
        <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-5xl font-bold tracking-tighter text-apple-gray-600">Let's build your Expert</h1>
                <p className="text-xl text-apple-gray-400 mt-4">First, tell us about your brand. This helps the AI adopt your company's voice and personality.</p>
            </div>

            <div className="bg-white p-12 rounded-2xl shadow-lg border border-apple-gray-100 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <label className="text-xl font-semibold text-apple-gray-600">Agent Name</label>
                        <p className="text-apple-gray-400 mb-3">Give your AI a name.</p>
                        <input 
                            type="text" 
                            value={data.agentName}
                            onChange={(e) => onUpdate({ agentName: e.target.value })}
                            placeholder="e.g., Sara, your AI Expert"
                            className="w-full p-4 text-lg rounded-lg border border-apple-gray-200 focus:ring-2 focus:ring-apple-blue focus:border-apple-blue transition"
                        />
                    </div>
                    <div>
                         <label className="text-xl font-semibold text-apple-gray-600">Company Name</label>
                         <p className="text-apple-gray-400 mb-3">Your official company or brand name.</p>
                         <input 
                            type="text" 
                            value={data.companyName}
                            onChange={(e) => onUpdate({ companyName: e.target.value })}
                            placeholder="e.g., Premium Properties Dubai"
                            className="w-full p-4 text-lg rounded-lg border border-apple-gray-200 focus:ring-2 focus:ring-apple-blue focus:border-apple-blue transition"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xl font-semibold text-apple-gray-600">Company Description</label>
                    <p className="text-apple-gray-400 mb-3">Describe your company in a few sentences. The AI will use this to understand your market position.</p>
                    <textarea 
                        value={data.companyDescription}
                        onChange={(e) => onUpdate({ companyDescription: e.target.value })}
                        placeholder="e.g., We are a top-tier real estate agency in Dubai, specializing in luxury villas and waterfront apartments in areas like Palm Jumeirah and Dubai Marina..."
                        rows={5}
                        className="w-full p-4 text-lg rounded-lg border border-apple-gray-200 focus:ring-2 focus:ring-apple-blue focus:border-apple-blue transition"
                    />
                </div>
            </div>

            <div className="text-right">
                <button onClick={onNext} className="apple-button-primary !px-12 !py-4 !text-lg">Next: Add Knowledge</button>
            </div>
        </div>
    );
}