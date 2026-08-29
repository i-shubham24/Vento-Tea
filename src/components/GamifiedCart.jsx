import { useCart } from '../context/CartContext';
import { mockProducts, CART_REWARD_THRESHOLD } from '../data/mockData';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GamifiedCart() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal, rewardRemaining, addItem } = useCart();
  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsOpen]);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, (subtotal / CART_REWARD_THRESHOLD) * 100);
  const samplerPack = mockProducts.find(p => p.id === 'sku-sampler');

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-vento-forest/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-vento-cream h-full flex flex-col shadow-2xl transform transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-serif text-vento-forest flex items-center gap-2">
            <ShoppingBag /> Your Cart
          </h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-vento-forest" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-vento-cream-dark p-6 border-b border-gray-200">
          <p className="text-sm text-vento-forest font-medium mb-3 text-center">
            {rewardRemaining > 0 
              ? <>Add <span className="text-vento-gold-dark font-bold">₹{rewardRemaining}</span> more for a Free Glass Cup & Spices!</>
              : <span className="text-vento-forest font-bold">🎉 You've unlocked the Free Glass Cup & Spices!</span>
            }
          </p>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-vento-gold transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
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
            <button onClick={handleCheckout} className="w-full bg-vento-gold hover:bg-vento-gold-dark text-vento-forest font-bold text-lg py-4 rounded-full transition-colors shadow-lg">
              View Cart
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
