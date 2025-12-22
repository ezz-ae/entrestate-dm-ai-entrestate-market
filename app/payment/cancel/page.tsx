export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-3">
        <h1 className="text-2xl font-semibold text-yellow-400">
          Payment cancelled
        </h1>
        <p className="text-sm text-slate-300">
          You cancelled the payment. Your AI assistant was not activated.
        </p>
      </div>
    </main>
  );
}
