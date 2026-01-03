
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-apple-gray-100 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
           <div className="max-w-xs">
              <Link href="/" className="text-xl font-semibold tracking-tight text-apple-gray-600 mb-4 block">
                Entrestate
              </Link>
              <p className="text-sm text-apple-gray-400 leading-relaxed">
                Empowering Dubai real estate brokers with intelligent AI assistants that qualify leads and close deals.
              </p>
           </div>
           
           <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                 <h4 className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-600">Product</h4>
                 <ul className="space-y-2">
                    <li><Link href="/features" className="text-sm text-apple-gray-400 hover:text-apple-blue transition-colors">Features</Link></li>
                    <li><Link href="/pricing" className="text-sm text-apple-gray-400 hover:text-apple-blue transition-colors">Pricing</Link></li>
                    <li><Link href="/audiences" className="text-sm text-apple-gray-400 hover:text-apple-blue transition-colors">Audiences</Link></li>
                 </ul>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[12px] font-bold uppercase tracking-widest text-apple-gray-600">Company</h4>
                 <ul className="space-y-2">
                    <li><Link href="/dashboard" className="text-sm text-apple-gray-400 hover:text-apple-blue transition-colors">Dashboard</Link></li>
                    <li><Link href="/support" className="text-sm text-apple-gray-400 hover:text-apple-blue transition-colors">Support</Link></li>
                 </ul>
              </div>
           </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-apple-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[12px] text-apple-gray-400">&copy; 2024 Entrestate. All rights reserved.</p>
           <div className="flex items-center gap-6">
              <Link href="/terms" className="text-[12px] text-apple-gray-400 hover:text-apple-gray-600 transition-colors">Terms</Link>
              <Link href="/privacy" className="text-[12px] text-apple-gray-400 hover:text-apple-gray-600 transition-colors">Privacy</Link>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
