
import Link from "next/link";

const Header = () => {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between p-6">
      <Link href="/" className="text-lg font-semibold text-white">
        Entrestate DM AI
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/features" className="text-sm text-slate-300 hover:text-white">
          Features
        </Link>
        <Link href="/pricing" className="text-sm text-slate-300 hover:text-white">
          Pricing
        </Link>
        <Link href="/payment" className="text-sm text-slate-300 hover:text-white">
          Payment
        </Link>
        <Link href="/dashboard" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
          Dashboard
        </Link>
      </nav>
    </header>
  );
};

export default Header;
