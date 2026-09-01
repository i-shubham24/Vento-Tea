import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('exit-intent-shown')) return;
    const handler = (e) => {
      if (e.clientY < 10 && !visible) {
        setVisible(true);
        sessionStorage.setItem('exit-intent-shown', '1');
        document.removeEventListener('mouseleave', handler);
      }
    };
    document.addEventListener('mouseleave', handler);
    return () => document.removeEventListener('mouseleave', handler);
  }, [visible]);

  if (!visible) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100001] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-vento-forest/60 backdrop-blur-sm" onClick={() => setVisible(false)} />
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} className="relative bg-vento-cream rounded-[1.5rem] p-8 max-w-md w-full shadow-2xl border border-vento-gold/20 text-center">
          <button onClick={() => setVisible(false)} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"><X size={16} /></button>
          <h2 className="text-2xl font-serif text-vento-forest mb-2">Wait! Get 10% off</h2>
          <p className="text-sm text-gray-600 mb-6">Still deciding? Leave your email and we&apos;ll text you a code.</p>
          {done ? <div className="bg-green-50 text-green-700 p-4 rounded-xl font-semibold">🎉 Code SENT10 sent to your inbox!</div> : (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex flex-col gap-3">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="w-full py-3 px-5 bg-white border border-vento-gold/30 rounded-full outline-none focus:border-vento-gold text-center" />
              <button type="submit" className="bg-vento-forest text-vento-cream font-bold py-3 rounded-full hover:bg-vento-gold hover:text-vento-forest transition-colors">Get my 10% off</button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
