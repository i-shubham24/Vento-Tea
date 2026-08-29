import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-vento-forest text-vento-cream pt-16 pb-4 md:pb-6 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        <div className="col-span-1 md:col-span-1">
          <img src="/brand/media_1787991645085.jpg" alt="Vento Logo" className="h-20 w-auto object-contain bg-white rounded-full p-2 mb-6" />
          <p className="font-serif text-lg text-vento-gold mb-2">Pure leaves. Rich aroma. Perfect cup.</p>
          <p className="text-sm text-gray-400">Direct from gardens to your doorstep.</p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4 text-vento-gold">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/shop" className="hover:text-white transition-colors">All Teas</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Best Sellers</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Wellness Range</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Gift Boxes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4 text-vento-gold">Learn</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="#" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Sourcing</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Brewing Guide</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4 text-vento-gold">Contact</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2"><Mail size={16} className="text-vento-gold" /> support@ventotea.com</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-vento-gold" /> +91 98765 43210</li>
            <li className="mt-4 pt-4 border-t border-vento-forest-light flex items-center gap-4">
              <a href="#" className="text-vento-gold hover:text-white transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-vento-gold hover:text-white transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-vento-gold hover:text-white transition-colors" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 pt-8 pb-4 px-4 md:px-12 lg:px-16 border-t border-vento-forest-light relative z-10">
        <p className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} Vento Tea. All rights reserved.</p>
        <p className="font-medium">Crafted by <span className="text-vento-gold">Humble Solutions</span></p>
      </div>

      {/* Huge Faded Brand Marquee */}
      <div className="w-full -mt-4 md:-mt-8 pointer-events-none select-none relative z-0 mb-0">
        <div className="animate-marquee flex whitespace-nowrap font-serif font-black text-[15vw] leading-none text-green-500/20 tracking-tighter">
          <span className="mx-8">VENTO TEA</span>
          <span className="mx-8">VENTO TEA</span>
          <span className="mx-8">VENTO TEA</span>
          <span className="mx-8">VENTO TEA</span>
          <span className="mx-8">VENTO TEA</span>
          <span className="mx-8">VENTO TEA</span>
        </div>
      </div>
    </footer>
  );
}
