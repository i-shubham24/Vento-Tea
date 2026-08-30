import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show randomly between 10 to 20 seconds after component mounts (load/refresh)
    const minTime = 10000; // 10 seconds
    const maxTime = 20000; // 20 seconds
    const randomDelay = Math.floor(Math.random() * (maxTime - minTime + 1) + minTime);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, randomDelay);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-vento-forest/70 backdrop-blur-sm"
            onClick={() => setIsVisible(false)}
          ></motion.div>

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-vento-cream rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            
            {/* Close Button */}
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/50 hover:bg-white rounded-full text-vento-forest transition-colors shadow-sm"
            >
              <X className="hover:rotate-90 transition-transform duration-300" size={20} />
            </button>

            {/* Left Image Section */}
            <div className="md:w-1/2 relative bg-vento-cream-dark min-h-[250px] md:min-h-[500px]">
              <img 
                src="/brand/media_1787991645006.jpg" 
                alt="Premium Tea Selection" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vento-forest/80 to-transparent flex items-end p-8">
                <p className="text-vento-cream font-serif text-2xl drop-shadow-md">
                  Discover the taste of authentic Assam.
                </p>
              </div>
            </div>

            {/* Right Content Section */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center text-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative">
              <div className="absolute inset-0 bg-white/90 backdrop-blur-[1px]"></div>
              
              <div className="relative z-10 w-full max-w-sm">
                <h2 className="text-3xl md:text-4xl font-serif text-vento-forest mb-2">
                  Your Order Could Be
                </h2>
                
                <h1 className="text-7xl md:text-8xl font-black text-vento-gold-dark tracking-tighter leading-none mb-4 drop-shadow-sm">
                  FREE
                </h1>
                
                <p className="text-gray-600 font-medium mb-8">
                  Get a chance to win a Premium Sampler Pack & 100% Cashback on your next order!
                </p>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-2xl font-semibold"
                  >
                    🎉 You're in! Keep an eye on your inbox.
                  </motion.div>
                ) : (
                  <form 
                    onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                    className="flex flex-col gap-4"
                  >
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Drop your email" 
                      className="w-full py-4 px-6 bg-gray-50 border border-gray-200 rounded-full outline-none focus:border-vento-gold focus:ring-4 focus:ring-vento-gold/20 transition-all text-center placeholder:text-gray-400 font-medium text-gray-700"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-vento-forest hover:bg-vento-forest-light text-vento-gold font-bold tracking-widest py-4 px-6 rounded-full transition-colors shadow-lg shadow-vento-forest/30"
                    >
                      TRY YOUR LUCK
                    </button>
                  </form>
                )}
                
                <p className="text-[10px] text-gray-400 mt-6 uppercase tracking-wider">
                  No purchase necessary. T&C Apply.
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
