import EntrestateChat from "@/components/EntrestateChat";

export default function BotPage({ params }: { params: { botId: string } }) {
  const { botId } = params;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full space-y-4">
        <h1 className="text-xl font-semibold text-center mb-2">
          AI Assistant for {botId}
        </h1>
        <EntrestateChat botId={botId} />
        <p className="text-[11px] text-slate-400 text-center mt-2">
          This is the same AI brain that can answer your Instagram DMs.
        </p>
      </div>
    </main>
  );
}
