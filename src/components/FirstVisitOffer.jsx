import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FirstVisitOffer() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('vento-first-visit-seen')) return;
    const t = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    localStorage.setItem('vento-first-visit-seen', '1');
  };

  if (!visible) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100002] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-vento-forest/60 backdrop-blur-sm" onClick={close} />
        <motion.div initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} className="relative bg-white rounded-[1.5rem] p-8 max-w-md w-full shadow-2xl border border-vento-gold/20 text-center">
          <button onClick={close} className="absolute top-3 right-3 w-8 h-8 bg-vento-cream rounded-full flex items-center justify-center"><X size={16} /></button>
          <div className="w-12 h-12 rounded-full bg-vento-gold text-vento-forest flex items-center justify-center mx-auto mb-4"><Gift size={20} /></div>
          <h2 className="text-2xl font-serif text-vento-forest">New here? Get 15% off + free sample</h2>
          <p className="text-sm text-gray-600 mt-2 mb-6">Welcome to Vento — authentic Assam, garden-direct.</p>
          {done ? <div className="bg-green-50 text-green-700 p-4 rounded-xl font-semibold">🎉 Your code WELCOME15 is ready! Check inbox.</div> : (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); localStorage.setItem('vento-first-visit-seen','1'); }} className="flex flex-col gap-3">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="w-full py-3 px-5 bg-vento-cream border border-vento-gold/30 rounded-full outline-none focus:border-vento-gold text-center" />
              <button type="submit" className="bg-vento-forest text-vento-cream font-bold py-3 rounded-full hover:bg-white hover:text-vento-forest transition-colors">Claim welcome offer</button>
            </form>
          )}
          <p className="text-[11px] text-gray-400 mt-4">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
