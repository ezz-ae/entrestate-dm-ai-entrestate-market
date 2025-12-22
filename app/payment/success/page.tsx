export default function PaymentSuccessPage({
  searchParams
}: {
  searchParams: { botId?: string };
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-3">
        <h1 className="text-2xl font-semibold text-emerald-400">
          Payment successful
        </h1>
        <p className="text-sm text-slate-300">
          Your AI assistant is now active{searchParams?.botId ? ` for bot ${searchParams.botId}` : ""}.
        </p>
        <p className="text-xs text-slate-500">
          You can now send traffic to your bot URL and start collecting leads.
        </p>
      </div>
    </main>
  );
}
