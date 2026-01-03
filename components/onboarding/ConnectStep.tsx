'use client';

import { InstagramLogo } from "@phosphor-icons/react";

interface Props {
    onBack: () => void;
}

export default function ConnectStep({ onBack }: Props) {
    return (
        <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-5xl font-bold tracking-tighter text-apple-gray-600">Go Live</h1>
                <p className="text-xl text-apple-gray-400 mt-4">Activate your Expert by connecting it to your lead sources. Start capturing every opportunity.</p>
            </div>

            <div className="bg-white p-12 rounded-2xl shadow-lg border border-apple-gray-100 space-y-6">
                
                <div className="flex flex-col md:flex-row items-center justify-between p-8 rounded-xl border-2 border-apple-gray-200 bg-white">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                            <InstagramLogo size={36} weight="bold" color="white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-apple-gray-600">Connect to Instagram</h3>
                            <p className="text-apple-gray-400 text-lg">Never miss a DM again. Your Expert will respond instantly, 24/7.</p>
                        </div>
                    </div>
                    <button className="apple-button-secondary mt-4 md:mt-0 !bg-transparent !border-apple-blue !text-apple-blue hover:!bg-apple-blue/5">Connect Account</button>
                </div>

                <div className="text-center pt-10 pb-4 border-t-2 border-apple-gray-100 mt-10">
                    <h2 className="text-5xl font-bold tracking-tight text-apple-gray-600">$19<span className="text-3xl text-apple-gray-400">/mo</span></h2>
                    <p className="text-apple-gray-400 mt-2 text-lg">Billed monthly. Unlimited conversations. Cancel anytime.</p>
                    <button className="apple-button-primary !px-16 !py-5 !text-xl mt-8 shadow-xl shadow-apple-blue/20">Subscribe & Activate</button>
                </div>
            </div>

            <div className="text-center">
                <button onClick={onBack} className="text-apple-gray-400 hover:text-apple-gray-600 font-semibold">or go back</button>
            </div>
        </div>
    );
}