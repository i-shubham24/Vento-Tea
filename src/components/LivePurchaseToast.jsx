import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const events = [
  'Rohit from Mumbai just ordered Gold Tea',
  'Ananya from Delhi just ordered Masala Tea',
  'Priya from Bangalore just ordered Gold Long Leaf',
  'Aman from Pune just ordered Kadak Chai',
];

export default function LivePurchaseToast() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const first = setTimeout(() => setVisible(true), 6000);
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % events.length);
        setVisible(true);
      }, 800);
    }, 10000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  return (
    <div className="fixed bottom-6 left-4 md:left-8 z-40 pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white rounded-full shadow-xl border border-vento-gold/20 px-4 py-3 flex items-center gap-3 max-w-[320px]"
          >
            <span className="w-8 h-8 rounded-full bg-vento-forest text-vento-gold flex items-center justify-center shrink-0"><ShoppingBag size={14} /></span>
            <p className="text-sm text-vento-forest font-medium leading-tight">{events[idx]}</p>
            <span className="text-[11px] text-gray-500 shrink-0">just now</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
