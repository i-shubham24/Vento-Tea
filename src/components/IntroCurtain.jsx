import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroCurtain() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 2400); 

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ autoAlpha: 0, opacity: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] bg-vento-forest flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle glow background */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(70%_48%_at_50%_42%,rgba(232,198,124,0.22),transparent_66%),radial-gradient(60%_40%_at_50%_108%,rgba(232,198,124,0.12),transparent_60%)]" />
          
          {/* Breathing ring */}
          <motion.div 
            animate={{ scale: [0.94, 1.04, 0.94], opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[min(46vw,420px)] aspect-square border border-[#E8C67C]/20 rounded-full pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center gap-10">
            <img 
              src="https://teawebsite-b65ea.web.app/images/web/logo.png" 
              alt="Vento Tea" 
              className="w-[clamp(96px,14vw,132px)] h-auto drop-shadow-2xl" 
            />
            
            <span className="font-sans font-medium text-[0.66rem] leading-none tracking-[0.5em] uppercase text-vento-cream/60">
              Premium Indian Tea
            </span>
            
            <div className="font-serif font-medium text-[clamp(2.8rem,8vw,5.5rem)] tracking-[0.14em] text-vento-gold leading-none">
              VENTO&nbsp;TEA
            </div>
            
            <div className="w-[min(240px,60vw)] h-[1px] bg-vento-cream/20 overflow-hidden">
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="w-full h-full origin-left bg-gradient-to-r from-vento-gold/50 to-vento-gold"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
