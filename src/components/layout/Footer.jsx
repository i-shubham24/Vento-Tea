import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-vento-forest text-vento-cream pt-16 pb-4 md:pb-6 px-4 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">
        
        {/* Brand Col */}
        <div className="col-span-2 lg:col-span-1">
          <img src="https://teawebsite-b65ea.web.app/images/web/logo.png" alt="Vento Logo" className="h-12 w-auto object-contain mb-6" />
          <p className="font-serif italic text-vento-gold text-[15px] leading-relaxed pr-4">
            Delivered fresh from Assam and Darjeeling
          </p>
        </div>

        {/* About */}
        <div>
          <h4 className="font-bold text-[11px] tracking-widest uppercase mb-6 text-vento-gold">About</h4>
          <ul className="space-y-4 text-[13px] text-vento-cream/80">
            <li><Link to="/about" className="hover:text-vento-gold hover:underline decoration-vento-gold underline-offset-4 transition-all">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-vento-gold hover:underline decoration-vento-gold underline-offset-4 transition-all">Contact Us</Link></li>
            <li><Link to="/reviews" className="hover:text-vento-gold hover:underline decoration-vento-gold underline-offset-4 transition-all">Reviews</Link></li>
            <li><Link to="/blogs" className="hover:text-vento-gold hover:underline decoration-vento-gold underline-offset-4 transition-all">Blog</Link></li>
          </ul>
        </div>

        {/* Your Account */}
        <div>
          <h4 className="font-bold text-[11px] tracking-widest uppercase mb-6 text-vento-gold">Your Account</h4>
          <ul className="space-y-4 text-[13px] text-vento-cream/80">
            <li><Link to="/account" className="hover:text-vento-gold hover:underline decoration-vento-gold underline-offset-4 transition-all">My Account</Link></li>
            <li><Link to="/track-order" className="hover:text-vento-gold hover:underline decoration-vento-gold underline-offset-4 transition-all">Track Order</Link></li>
            <li><Link to="/cart" className="hover:text-vento-gold hover:underline decoration-vento-gold underline-offset-4 transition-all">Cart</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="font-bold text-[11px] tracking-widest uppercase mb-6 text-vento-gold">Policies</h4>
          <ul className="space-y-4 text-[13px] text-vento-cream/80">
            <li><Link to="/return-policy" className="hover:text-vento-gold hover:underline decoration-vento-gold underline-offset-4 transition-all">Return Policy</Link></li>
            <li><Link to="/refund-policy" className="hover:text-vento-gold hover:underline decoration-vento-gold underline-offset-4 transition-all">Refund Policy</Link></li>
            <li><Link to="/terms-of-use" className="hover:text-vento-gold hover:underline decoration-vento-gold underline-offset-4 transition-all">Terms of Use</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-vento-gold hover:underline decoration-vento-gold underline-offset-4 transition-all">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Let's Connect */}
        <div>
          <h4 className="font-bold text-[11px] tracking-widest uppercase mb-6 text-vento-gold">Let's Connect</h4>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-vento-cream/80 hover:text-vento-gold transition-colors" aria-label="WhatsApp">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-vento-cream/80 hover:text-vento-gold transition-colors" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-vento-cream/80 hover:text-vento-gold transition-colors" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-vento-cream/80 hover:text-vento-gold transition-colors" aria-label="YouTube">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 7.1C2.5 7.1 2.3 5.4 3.1 4.6C4 3.7 5 3.7 5.5 3.6C8.5 3.4 12 3.4 12 3.4C12 3.4 15.5 3.4 18.5 3.6C19 3.7 20 3.7 20.9 4.6C21.7 5.4 21.5 7.1 21.5 7.1C21.7 8.5 21.8 9.9 21.8 11.3V12.7C21.8 14.1 21.7 15.5 21.5 16.9C21.5 16.9 21.7 18.6 20.9 19.4C20 20.3 18.8 20.3 18.3 20.4C15.1 20.7 12 20.6 12 20.6C12 20.6 8.5 20.6 5.5 20.4C5 20.3 4 20.3 3.1 19.4C2.3 18.6 2.5 16.9 2.5 16.9C2.3 15.5 2.2 14.1 2.2 12.7V11.3C2.2 9.9 2.3 8.5 2.5 7.1Z"/>
                <polygon points="9.5,15.5 16,12 9.5,8.5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Also Available At */}
        <div>
          <h4 className="font-bold text-[11px] tracking-widest uppercase mb-6 text-vento-gold">Also Available At</h4>
          <a href="https://www.amazon.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-gray-500 rounded-md p-3 hover:border-vento-gold hover:bg-white/5 transition-all w-32 h-12">
            <svg viewBox="0 0 100 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full text-white">
              <path d="M57.6,18.9c-0.1-0.2-0.2-0.4-0.4-0.5c-0.6-0.5-2.2-1.3-4.1-1.3c-2.3,0-4.6,1-6.1,2.8c-1.5,1.7-2,3.8-2,5.5c0,1.8,0.6,4,2.3,5.6 c1.5,1.5,3.6,2.3,5.9,2.3c2.2,0,4-0.9,4.9-1.5v1.2c0,0.5,0.4,0.9,0.9,0.9h3.7c0.5,0,0.9-0.4,0.9-0.9V13c0-3-0.8-5.2-2.3-6.6 c-1.6-1.5-3.8-2.1-6.6-2.1c-2,0-4.5,0.4-6.4,1.4c-0.4,0.2-0.6,0.6-0.6,1l0.6,3c0.1,0.4,0.5,0.6,0.9,0.5c1.6-0.8,3.7-1.3,5.4-1.3 c1.6,0,2.8,0.3,3.7,1.1c0.9,0.8,1.2,2,1.2,3.9v1.4C59,16.2,58.3,17.2,57.6,18.9z M54.6,27.1c-0.8,0.5-1.9,0.9-3.2,0.9 c-2.3,0-4.1-1.4-4.1-3.6c0-2.3,1.9-3.8,4.5-3.8c1.3,0,2.2,0.3,2.8,0.5V27.1z M34.9,23.3V5.1c0-0.5-0.4-0.9-0.9-0.9h-4.3 c-0.5,0-0.9,0.4-0.9,0.9v17.5c0,2.4,0.6,4.4,1.8,5.8c1.2,1.4,3.1,2.1,5.5,2.1c1.9,0,3.6-0.3,4.7-0.7c0.4-0.1,0.6-0.6,0.5-1L40.4,26 c-0.1-0.4-0.5-0.6-0.9-0.4c-0.8,0.3-2,0.6-3.2,0.6c-0.9,0-1.6-0.3-2-0.9C35.1,24.8,34.9,24.2,34.9,23.3z M18.9,21.7v1.1c0,0.5,0.4,0.9,0.9,0.9h4.3c0.5,0,0.9-0.4,0.9-0.9v-2.8c-1.3,0.7-3,1.2-5,1.2c-2.3,0-4.3-0.8-5.8-2.2 c-1.5-1.5-2.2-3.4-2.2-5.7c0-2.2,0.8-4.2,2.3-5.7c1.6-1.6,3.7-2.3,6.2-2.3c3.4,0,5.7,1.1,5.8,1.2c0.4,0.2,0.6,0.6,0.5,1l-0.9,2.8 c-0.1,0.4-0.6,0.6-1,0.4c-1.2-0.6-2.9-1.2-4.5-1.2c-2.6,0-4.7,1.6-4.7,4.3C15.8,19.9,16.8,21.7,18.9,21.7z M26.4,14.6 c-0.5-0.8-1.4-1.3-2.6-1.3c-1.5,0-2.7,0.7-3.4,1.7v4.6c0.6,1,1.9,1.7,3.4,1.7c1.3,0,2.2-0.5,2.7-1.3v-5.4H26.4z"/>
              <path d="M78.6,18.9c-0.1-0.2-0.2-0.4-0.4-0.5c-0.6-0.5-2.2-1.3-4.1-1.3c-2.3,0-4.6,1-6.1,2.8c-1.5,1.7-2,3.8-2,5.5c0,1.8,0.6,4,2.3,5.6 c1.5,1.5,3.6,2.3,5.9,2.3c2.2,0,4-0.9,4.9-1.5v1.2c0,0.5,0.4,0.9,0.9,0.9h3.7c0.5,0,0.9-0.4,0.9-0.9V13c0-3-0.8-5.2-2.3-6.6 c-1.6-1.5-3.8-2.1-6.6-2.1c-2,0-4.5,0.4-6.4,1.4c-0.4,0.2-0.6,0.6-0.6,1l0.6,3c0.1,0.4,0.5,0.6,0.9,0.5c1.6-0.8,3.7-1.3,5.4-1.3 c1.6,0,2.8,0.3,3.7,1.1c0.9,0.8,1.2,2,1.2,3.9v1.4C80,16.2,79.3,17.2,78.6,18.9z M75.6,27.1c-0.8,0.5-1.9,0.9-3.2,0.9 c-2.3,0-4.1-1.4-4.1-3.6c0-2.3,1.9-3.8,4.5-3.8c1.3,0,2.2,0.3,2.8,0.5V27.1z"/>
              <path d="M88.9,21.7v1.1c0,0.5,0.4,0.9,0.9,0.9h4.3c0.5,0,0.9-0.4,0.9-0.9v-2.8c-1.3,0.7-3,1.2-5,1.2c-2.3,0-4.3-0.8-5.8-2.2 c-1.5-1.5-2.2-3.4-2.2-5.7c0-2.2,0.8-4.2,2.3-5.7c1.6-1.6,3.7-2.3,6.2-2.3c3.4,0,5.7,1.1,5.8,1.2c0.4,0.2,0.6,0.6,0.5,1l-0.9,2.8 c-0.1,0.4-0.6,0.6-1,0.4c-1.2-0.6-2.9-1.2-4.5-1.2c-2.6,0-4.7,1.6-4.7,4.3C85.8,19.9,86.8,21.7,88.9,21.7z M96.4,14.6 c-0.5-0.8-1.4-1.3-2.6-1.3c-1.5,0-2.7,0.7-3.4,1.7v4.6c0.6,1,1.9,1.7,3.4,1.7c1.3,0,2.2-0.5,2.7-1.3v-5.4H96.4z"/>
              <path fill="#FF9900" d="M68.5,37.3c-8.9,4.4-19.1,6.8-29.7,6.8c-9.1,0-17.9-1.8-26-5.2c-1.3-0.5-1.8,1.1-0.6,1.9c10,6.5,21.8,10.2,34.3,10.2 c11.3,0,22.1-3.1,31.5-8.6C69.3,41.7,70,36.5,68.5,37.3z"/>
              <path fill="#FF9900" d="M72.9,34.5c-0.8-0.9-2.9-0.1-4.7,1c-1.8,1.1-3.6,2.7-3.3,3.8c0.2,0.8,1,1,1.7,1c2.1,0.1,4.7-0.7,6.4-1.9 C74.6,37.4,73.8,35.4,72.9,34.5z"/>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-vento-cream/70 pt-8 pb-4 border-t border-vento-forest-light relative z-10">
        <p className="mb-2 md:mb-0">&copy; 2026 VENTO TEA - Redplum Private Ltd.</p>
        <p className="font-medium text-vento-cream/60">Crafted by <a href="https://humblesolutions.in" target="_blank" rel="noopener noreferrer" className="text-vento-gold hover:underline decoration-vento-gold underline-offset-4 transition-all">Humble Solutions</a></p>
      </div>

      {/* Huge Faded Brand Marquee */}
      <div className="w-full -mt-4 md:-mt-8 pointer-events-none select-none relative z-0 mb-0">
        <div className="animate-marquee flex whitespace-nowrap font-serif font-black text-[15vw] leading-none text-green-500/10 tracking-tighter">
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
