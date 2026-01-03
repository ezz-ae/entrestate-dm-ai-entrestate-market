
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">&copy; 2024 Entrestate DM AI</p>
        <div className="flex items-center gap-6">
          <Link href="/features" className="text-sm text-slate-400 hover:text-white">
            Features
          </Link>
          <Link href="/pricing" className="text-sm text-slate-400 hover:text-white">
            Pricing
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
