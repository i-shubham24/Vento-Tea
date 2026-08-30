import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Gift, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CART_REWARD_THRESHOLD } from '../data/mockData';

export default function CartProgressBar() {
  const { subtotal } = useCart();
  
  // Example Thresholds: Free Shipping at 500, Free Gift at 1000
  const freeShippingThreshold = 500;
  const freeGiftThreshold = 1000;
  
  const progressPercent = Math.min(100, (subtotal / freeGiftThreshold) * 100);
  const shipMarkerPercent = (freeShippingThreshold / freeGiftThreshold) * 100;
  
  const freeShipUnlocked = subtotal >= freeShippingThreshold;
  const giftUnlocked = subtotal >= freeGiftThreshold;
  
  let rewardMessage;
  if (!freeShipUnlocked) {
    const diff = freeShippingThreshold - subtotal;
    rewardMessage = <span>Add{" "}<strong className="text-vento-gold-dark">{"\u20B9"}{diff}</strong>{" "}more to unlock{" "}<strong>Free Express Shipping!</strong></span>;
  } else if (!giftUnlocked) {
    const diff = freeGiftThreshold - subtotal;
    rewardMessage = <span>You got Free Shipping! Add{" "}<strong className="text-vento-gold-dark">{"\u20B9"}{diff}</strong>{" "}more for a{" "}<strong>Free Tea Sampler Gift!</strong></span>;
  } else {
    rewardMessage = <span className="flex items-center justify-center gap-2 text-vento-gold-dark"><Sparkles size={18} /> <strong>Amazing! You've unlocked Free Shipping & a Free Gift!</strong></span>;
  }

  return (
    <div className="mt-10 mb-16 pb-8 relative">
      {/* Subtle background glow when fully unlocked */}
      <AnimatePresence>
        {giftUnlocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="absolute inset-0 bg-vento-gold"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <motion.p
          key={subtotal} // animate when subtotal changes
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-vento-forest text-base md:text-lg mb-8 min-h-[1.5rem]"
        >
          {rewardMessage}
        </motion.p>

        <div className="relative max-w-2xl mx-auto mt-4 px-4">
          {/* Main Track */}
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-vento-forest to-vento-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            ></motion.div>
          </div>

          {/* Start Marker (₹0) */}
          <div className="absolute -top-3 left-0 -translate-x-1/2 flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-vento-forest text-vento-cream flex items-center justify-center border-4 border-white shadow-md z-10">
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="text-[10px] uppercase font-bold text-gray-400 mt-2 tracking-widest">Cart</span>
          </div>

          {/* Shipping Milestone */}
          <div 
            className="absolute -top-3" 
            style={{ left: `${shipMarkerPercent}%`, transform: 'translateX(-50%)' }}
          >
            <motion.div
              animate={{ scale: freeShipUnlocked ? 1.1 : 1 }}
              className={`w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow-md z-10 transition-colors duration-500 ${
                freeShipUnlocked ? 'bg-vento-gold text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {freeShipUnlocked ? <Check size={14} strokeWidth={3} /> : <Truck size={14} />}
            </motion.div>
            <span className={`absolute top-10 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${freeShipUnlocked ? 'text-vento-gold' : 'text-gray-400'}`}>
              Free Ship
            </span>
          </div>

          {/* Free Gift Milestone */}
          <div className="absolute -top-3 right-0 translate-x-1/2 flex flex-col items-center">
            <motion.div
              animate={{ scale: giftUnlocked ? 1.1 : 1 }}
              className={`w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow-md z-10 transition-colors duration-500 ${
                giftUnlocked ? 'bg-vento-gold text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {giftUnlocked ? <Check size={14} strokeWidth={3} /> : <Gift size={14} />}
            </motion.div>
            <span className={`absolute top-10 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${giftUnlocked ? 'text-vento-gold' : 'text-gray-400'}`}>
              Free Gift
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
