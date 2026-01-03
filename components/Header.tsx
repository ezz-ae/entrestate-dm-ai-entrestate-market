
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#1d1d1f] border-b border-white/5">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 h-12">
        <Link href="/" className="text-[19px] font-semibold tracking-tight text-white/90">
          Entrestate
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/features" className="text-xs font-medium text-white/60 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/audiences" className="text-xs font-medium text-white/60 hover:text-white transition-colors">
            Audiences
          </Link>
          <Link href="/pricing" className="text-xs font-medium text-white/60 hover:text-white transition-colors">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-[11px] px-4 py-1.5 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-colors uppercase tracking-wider">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
