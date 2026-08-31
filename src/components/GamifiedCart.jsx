import { useCart } from '../context/CartContext';
import { CART_REWARD_THRESHOLD, FREE_SHIPPING_THRESHOLD } from '../data/mockData';
import { useProducts } from '../hooks/useProducts';
import { X, Minus, Plus, ShoppingBag, Truck, Gift, Check } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollLock from '../hooks/useScrollLock';
import { EASE_OUT_SINE, overlay, drawerRight } from '../lib/motion';

export default function GamifiedCart() {
  const mockProducts = useProducts();
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal, rewardRemaining, addItem } = useCart();
  const navigate = useNavigate();

  useScrollLock(isOpen);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsOpen]);

  const progressPercent = Math.min(100, (subtotal / CART_REWARD_THRESHOLD) * 100);
  const shipMarkerPercent = (FREE_SHIPPING_THRESHOLD / CART_REWARD_THRESHOLD) * 100;
  const shipRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShipUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const giftUnlocked = subtotal >= CART_REWARD_THRESHOLD;
  const samplerPack = mockProducts.find(p => p.id === 'sku-sampler');

  // The active reward message + a key so it can pop when the tier changes.
  let rewardMessage;
  let rewardKey;
  if (!freeShipUnlocked) {
    rewardKey = 'ship';
    rewardMessage = <span>Add{" "}<span className="text-vento-gold-dark font-bold">{"\u20B9"}{shipRemaining}</span>{" "}more to unlock{" "}<span className="font-bold">Free Shipping</span></span>;
  } else if (!giftUnlocked) {
    rewardKey = 'gift';
    rewardMessage = <span><span className="text-vento-forest font-bold">{"\u{1F389}"} Free Shipping unlocked!</span>{" "}Add{" "}<span className="text-vento-gold-dark font-bold">{"\u20B9"}{rewardRemaining}</span>{" "}more for a Free Glass Cup &amp; Spices</span>;
  } else {
    rewardKey = 'done';
    rewardMessage = <span className="text-vento-forest font-bold">{"\u{1F389}"} You&apos;ve unlocked Free Shipping + a Free Glass Cup &amp; Spices!</span>;
  }

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <motion.div
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-vento-forest/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></motion.div>

          {/* Drawer */}
          <motion.div
            variants={drawerRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md bg-vento-cream h-full flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-serif text-vento-forest flex items-center gap-2">
                <ShoppingBag /> Your Cart
              </h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} className="text-vento-forest" />
              </button>
            </div>

            {/* Two-tier Progress */}
            <div className="bg-vento-cream-dark px-6 pt-5 pb-6 border-b border-gray-200">
              <AnimatePresence mode="wait">
                <motion.p
                  key={rewardKey}
                  initial={{ opacity: 0, scale: 0.96, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_SINE }}
                  className="text-sm text-vento-forest font-medium mb-4 text-center min-h-[2.5rem] flex items-center justify-center"
                >
                  {rewardMessage}
                </motion.p>
              </AnimatePresence>

              <div className="relative">
                {/* Track */}
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-vento-gold rounded-full"
                    initial={false}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: EASE_OUT_SINE }}
                  ></motion.div>
                </div>

                {/* Milestone: Free Shipping */}
                <Milestone percent={shipMarkerPercent} unlocked={freeShipUnlocked} icon={<Truck size={12} />} label="Ship" />
                {/* Milestone: Free Gift */}
                <Milestone percent={100} unlocked={giftUnlocked} icon={<Gift size={12} />} label="Gift" />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.productId}-${item.weight.grams}`} className="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl bg-vento-cream" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-vento-forest">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">{item.weight.label}</p>
                      <div className="text-vento-gold-dark font-semibold mt-1">₹{item.weight.priceInr}</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-3 bg-vento-cream rounded-full px-2 py-1">
                        <button onClick={() => updateQty(item.productId, item.weight.grams, -1)} className="text-vento-forest hover:text-vento-gold-dark"><Minus size={16} /></button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item.productId, item.weight.grams, 1)} className="text-vento-forest hover:text-vento-gold-dark"><Plus size={16} /></button>
                      </div>
                      <button onClick={() => removeItem(item.productId, item.weight.grams)} className="text-xs text-red-400 hover:text-red-600 underline">Remove</button>
                    </div>
                  </div>
                ))
              )}

              {/* Cross-Sell */}
              {items.length > 0 && samplerPack && !items.find(i => i.productId === 'sku-sampler') && (
                <div className="mt-8 bg-white border border-vento-gold/30 rounded-2xl p-4">
                  <h5 className="text-sm font-bold text-vento-forest mb-3">Frequently Bought Together</h5>
                  <div className="flex items-center gap-4">
                    <img src={samplerPack.images[0]} alt={samplerPack.name} className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{samplerPack.name}</p>
                      <p className="text-xs text-gray-500">{samplerPack.weights[0].label} • ₹{samplerPack.weights[0].priceInr}</p>
                    </div>
                    <button
                      onClick={() => addItem(samplerPack, samplerPack.weights[0])}
                      className="bg-vento-forest text-vento-cream text-xs px-4 py-2 rounded-full hover:bg-vento-forest-light transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg text-gray-600">Subtotal</span>
                  <span className="text-2xl font-bold text-vento-forest">₹{subtotal}</span>
                </div>
                <button onClick={handleCheckout} className="w-full bg-vento-forest text-vento-cream hover:bg-white hover:text-vento-forest font-bold text-lg py-4 rounded-full transition-all duration-300 shadow-lg">
                  View Cart
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** A milestone dot sitting on the progress track; pops gold when reached. */
function Milestone({ percent, unlocked, icon, label }) {
  return (
    <div
      className="absolute -top-1 -translate-x-1/2"
      style={{ left: `${percent}%` }}
    >
      <motion.div
        initial={false}
        animate={{ scale: unlocked ?1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className={`w-4 h-4 rounded-full flex items-center justify-center border-2 shadow-sm ${
          unlocked ?'bg-vento-gold border-vento-gold text-vento-forest' : 'bg-white border-gray-300 text-gray-400'
        }`}
      >
        {unlocked ?<Check size={10} strokeWidth={3} /> : icon}
      </motion.div>
      <span className={`absolute top-5 left-1/2 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-wide ${unlocked ?'text-vento-gold-dark' : 'text-gray-400'}`}>
        {label}
      </span>
    </div>
  );
}
