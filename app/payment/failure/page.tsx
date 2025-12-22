export default function PaymentFailurePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-3">
        <h1 className="text-2xl font-semibold text-red-400">
          Payment failed
        </h1>
        <p className="text-sm text-slate-300">
          Something went wrong processing your payment. Please try again or contact support.
        </p>
      </div>
    </main>
  );
}
