import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Search, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import useScrollLock from '../hooks/useScrollLock';
import { EASE_OUT_SINE } from '../lib/motion';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Our Story', path: '/about' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'WhatsApp', href: 'https://wa.me/919876543210' },
];

// Explicit per-element reveal — index-based stagger, no reliance on
// parent→child variant propagation (which proved flaky here).
const reveal = (i) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
  transition: { duration: 0.5, ease: EASE_OUT_SINE, delay: 0.08 + i * 0.06 },
});

/**
 * Full-screen editorial mobile navigation. Rendered inside an <AnimatePresence>
 * in the Header so it animates in and out. Closes on Esc, backdrop/link click,
 * and route change; locks body scroll while open.
 */
export default function MobileMenu({ onClose }) {
  const { user, openAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const prevPath = useRef(location.pathname);

  useScrollLock(true);

  // Close when the route actually changes (guard against parent re-renders).
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      onClose();
    }
  }, [location.pathname, onClose]);

  // Esc to close.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const handleLogin = () => {
    onClose();
    openAuth();
  };

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT_SINE }}
      className="lg:hidden fixed inset-0 z-[60] bg-vento-forest/95 backdrop-blur-xl text-vento-cream flex flex-col overflow-y-auto"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <img src="https://teawebsite-b65ea.web.app/images/web/logo.png" alt="Vento Logo" className="h-10 object-contain" />
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={26} />
        </button>
      </div>

      <div className="flex-1 flex flex-col px-6 py-8 gap-8">
        {/* Search — surfaced here because it is hidden on phones in the header */}
        <motion.form {...reveal(0)} onSubmit={submitSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teas..."
            className="w-full bg-white/10 border border-white/20 text-vento-cream placeholder:text-vento-cream/50 rounded-full pl-5 pr-12 py-3 outline-none focus:border-vento-gold transition-colors"
          />
          <button type="submit" aria-label="Search" className="absolute right-4 top-1/2 -translate-y-1/2 text-vento-gold">
            <Search size={20} />
          </button>
        </motion.form>

        {/* Primary nav — large Cormorant */}
        <nav className="flex flex-col">
          {NAV_LINKS.map((link, i) => (
            <motion.div key={link.name} {...reveal(1 + i)}>
              <Link
                to={link.path}
                onClick={onClose}
                className={`group flex items-center justify-between py-4 border-b border-white/10 font-serif text-4xl transition-colors ${
                  location.pathname === link.path ? 'text-vento-gold' : 'text-vento-cream hover:text-vento-gold'
                }`}
              >
                {link.name}
                <ArrowRight size={22} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-vento-gold" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Account */}
        <motion.div {...reveal(1 + NAV_LINKS.length)}>
          {user ? (
            <Link to="/account" onClick={onClose} className="inline-flex items-center gap-3 text-lg text-vento-cream hover:text-vento-gold transition-colors">
              <User size={20} /> My Account
            </Link>
          ) : (
            <button onClick={handleLogin} className="inline-flex items-center gap-3 text-lg text-vento-cream hover:text-vento-gold transition-colors">
              <User size={20} /> Login / Register
            </button>
          )}
        </motion.div>
      </div>

      {/* Footer of the overlay: CTA + socials */}
      <motion.div {...reveal(2 + NAV_LINKS.length)} className="px-6 py-8 border-t border-white/10 flex flex-col gap-6">
        <Link
          to="/shop"
          onClick={onClose}
          className="w-full text-center bg-vento-gold hover:bg-vento-gold-dark text-vento-forest font-semibold text-lg py-4 rounded-full transition-colors"
        >
          Shop the Collection
        </Link>
        <div className="flex items-center justify-center gap-6 text-sm tracking-wide text-vento-cream/70">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-vento-gold transition-colors">
              {s.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
