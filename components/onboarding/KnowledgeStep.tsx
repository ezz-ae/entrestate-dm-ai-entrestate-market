'use client';

import { OnboardingData } from "@/app/onboarding/page";

interface Props {
    data: OnboardingData;
    onUpdate: (data: Partial<OnboardingData>) => void;
    onNext: () => void;
    onBack: () => void;
}

const markets = [
    { name: "Dubai", icon: "🏙️" },
    { name: "Abu Dhabi", icon: "🕌" },
    { name: "Sharjah", icon: "🏛️" },
    { name: "Ras Al Khaimah", icon: "⛰️" }
];

export default function KnowledgeStep({ data, onUpdate, onNext, onBack }: Props) {
    
    const handleMarketToggle = (marketName: string) => {
        const newMarkets = data.marketKnowledge.includes(marketName) 
            ? data.marketKnowledge.filter(m => m !== marketName)
            : [...data.marketKnowledge, marketName];
        onUpdate({ marketKnowledge: newMarkets });
    }

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-5xl font-bold tracking-tighter text-apple-gray-600">Build the Brain</h1>
                <p className="text-xl text-apple-gray-400 mt-4">Grant your Expert access to market data and your exclusive listings to make it a true specialist.</p>
            </div>

            <div className="bg-white p-12 rounded-2xl shadow-lg border border-apple-gray-100 space-y-10">
                <div>
                    <label className="text-xl font-semibold text-apple-gray-600">Market Knowledge</label>
                    <p className="text-apple-gray-400 mb-4">Select the markets your agent should be an expert in. The AI comes pre-trained on project data for these regions.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {markets.map(market => (
                            <button 
                                key={market.name}
                                onClick={() => handleMarketToggle(market.name)}
                                className={`p-6 rounded-xl border-2 text-left font-bold transition-all flex flex-col justify-between h-32 ${
                                    data.marketKnowledge.includes(market.name) 
                                        ? 'bg-apple-blue/5 border-apple-blue text-apple-blue' 
                                        : 'bg-white hover:bg-apple-gray-50 border-apple-gray-200'
                                }`}
                            >
                                <span className="text-4xl">{market.icon}</span>
                                <span>{market.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-xl font-semibold text-apple-gray-600">Exclusive Listings (Optional)</label>
                    <p className="text-apple-gray-400 mb-3">Add your private or exclusive listings here, one per line. The AI will prioritize these in conversations.</p>
                    <textarea 
                        value={data.exclusiveListings}
                        onChange={(e) => onUpdate({ exclusiveListings: e.target.value })}
                        placeholder="e.g., Stella Maris, 5BR Penthouse, 25M AED\nAura Residences, 2BR, 2.3M AED"
                        rows={6}
                        className="w-full p-4 text-lg rounded-lg border border-apple-gray-200 focus:ring-2 focus:ring-apple-blue focus:border-apple-blue transition"
                    />
                </div>
            </div>

            <div className="flex justify-between">
                <button onClick={onBack} className="apple-button-secondary !px-8 !py-4 !text-lg">Back</button>
                <button onClick={onNext} className="apple-button-primary !px-12 !py-4 !text-lg">Next: Test your Expert</button>
            </div>
        </div>
    );
}