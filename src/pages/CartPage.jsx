import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Minus, Plus, Trash2, Tag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CartProgressBar from '../components/CartProgressBar';

const COUPONS = [
  { code: 'NEWUSER15', label: 'Save ₹75', desc: 'Best deal', discount: 75, min: 299 },
  { code: 'VENTO10', label: 'Save ₹50', desc: 'On orders ₹499+', discount: 50, min: 499 },
  { code: 'FREESHIP', label: 'Free Ship', desc: 'Extra free delivery', discount: 40, min: 199 },
  { code: 'FESTIVE20', label: 'Save 20%', desc: 'Up to ₹120', discount: 120, min: 699 },
  { code: 'WELCOME5', label: 'Save ₹30', desc: 'First order', discount: 30, min: 199 },
];

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, cartCount } = useCart();
  const { user, openAuth } = useAuth();
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCoupons, setShowCoupons] = useState(false);
  const [couponError, setCouponError] = useState('');

  const totalMRP = items.reduce((sum, item) => sum + (Math.round(item.weight.priceInr / (1 - (item.product.discount || 0)/100)) * item.quantity), 0);
  const discountOnMRP = totalMRP - subtotal;
  const promoDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const shipping = 0;
  const finalTotal = Math.max(0, subtotal - promoDiscount + shipping);
  const totalSavings = discountOnMRP + promoDiscount;

  const handleApply = (code) => {
    const upper = code.trim().toUpperCase();
    const found = COUPONS.find(c => c.code === upper);
    if (!found) { setCouponError('Invalid coupon'); return; }
    if (subtotal < found.min) { setCouponError(`Min order ₹${found.min} required`); return; }
    setAppliedCoupon(found);
    setCouponInput(upper);
    setCouponError('');
    setShowCoupons(false);
  };
  const handleRemoveCoupon = () => { setAppliedCoupon(null); setCouponInput(''); setCouponError(''); };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center p-4">
      <SEO title="Your Cart" description="Review your selected premium teas before checkout." keywords="shopping cart" noindex />
        <h1 className="text-3xl font-serif text-vento-forest mb-4">Your cart is empty</h1>
        <Link to="/shop" className="bg-vento-forest text-vento-cream px-8 py-3 rounded-full font-semibold hover:bg-vento-forest-light transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif text-vento-forest mb-8">
          Your cart <span className="text-xl text-gray-500 font-sans">({cartCount} items)</span>
        </h1>

        <CartProgressBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              {items.map((item, index) => (
                <div key={`${item.productId}-${item.weight.grams}`} className={`flex flex-col sm:flex-row gap-6 ${index !== 0 ? 'mt-6 pt-6 border-t border-gray-100' : ''}`}>
                  <div className="w-24 h-24 shrink-0 bg-vento-cream rounded-2xl overflow-hidden border border-gray-100">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-vento-forest text-lg">{item.product.name} - {item.weight.label}</h3>
                        <p className="text-sm text-gray-500 mt-1 max-w-md line-clamp-2">{item.product.description}</p>
                      </div>
                      <button onClick={() => removeItem(item.productId, item.weight.grams)} className="text-gray-400 hover:text-red-500 p-2">
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-4 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-200">
                        <button onClick={() => updateQty(item.productId, item.weight.grams, -1)} className="text-gray-500 hover:text-vento-forest p-1">
                          <Minus size={16} />
                        </button>
                        <span className="font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item.productId, item.weight.grams, 1)} className="text-gray-500 hover:text-vento-forest p-1">
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-vento-forest">₹{item.weight.priceInr * item.quantity}</div>
                        <div className="text-sm">
                          <span className="text-gray-400 line-through mr-2">₹{Math.round(item.weight.priceInr * 1.3) * item.quantity}</span>
                          <span className="text-green-600 font-semibold">23% OFF</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-xl font-serif text-vento-forest font-semibold mb-6">Order summary</h2>

              {/* Coupon Highlight — only interactive, no auto-apply */}
              {appliedCoupon ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white px-3 py-1 rounded border border-green-300 text-xs font-bold text-green-700">{appliedCoupon.code}</div>
                    <div>
                      <p className="font-semibold text-sm text-green-700">Save ₹{appliedCoupon.discount} applied</p>
                      <p className="text-xs text-green-600">{appliedCoupon.desc}</p>
                    </div>
                  </div>
                  <button onClick={handleRemoveCoupon} className="text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-green-300 text-green-700 hover:bg-green-100 flex items-center gap-1"><X size={12} />Remove</button>
                </div>
              ) : (() => {
                  const available = COUPONS.filter(c => subtotal >= c.min).sort((a,b) => b.discount - a.discount);
                  const best = available[0] || COUPONS[0];
                  return (
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-vento-cream px-3 py-1 rounded border border-vento-gold/30 text-xs font-bold text-vento-forest">{best.code}</div>
                        <div>
                          <p className="font-semibold text-sm text-vento-forest">Save ₹{best.discount}</p>
                          <p className="text-xs text-gray-500">{subtotal >= best.min ? 'Best deal for you' : `Add ₹${best.min - subtotal} more to unlock`}</p>
                        </div>
                      </div>
                      <button disabled={subtotal < best.min} onClick={() => handleApply(best.code)} className={`text-xs font-bold px-4 py-2 rounded-full transition-colors ${subtotal >= best.min ? 'bg-vento-forest text-white hover:bg-vento-forest-light' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>APPLY</button>
                    </div>
                  );
                })()}

              {/* Coupon Input */}
              <div className="flex gap-2 mb-2">
                <input 
                  type="text" 
                  value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                  placeholder="ENTER COUPON CODE" 
                  className="flex-1 border border-gray-200 rounded-full px-4 text-sm outline-none focus:border-vento-gold uppercase"
                />
                <button disabled={!couponInput || appliedCoupon?.code === couponInput} onClick={() => handleApply(couponInput)} className="border border-gray-200 text-vento-forest font-semibold px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors text-sm">Apply</button>
              </div>
              {couponError && <p className="text-xs text-red-500 mb-3 px-1">{couponError}</p>}
              <button onClick={() => setShowCoupons(v => !v)} className="text-vento-forest text-sm font-semibold flex items-center gap-2 mb-2 hover:underline">
                <Tag size={16} /> View all available coupons ({COUPONS.length}) {showCoupons ? '↑' : '→'}
              </button>
              {showCoupons && (
                <div className="mb-6 border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100 bg-gray-50">
                  {COUPONS.map(c => (
                    <div key={c.code} className="flex items-center justify-between p-3 bg-white">
                      <div>
                        <p className="text-xs font-bold text-vento-forest tracking-widest">{c.code}</p>
                        <p className="text-xs text-gray-500">{c.label} • {c.desc} • Min ₹{c.min}</p>
                      </div>
                      <button disabled={appliedCoupon?.code === c.code} onClick={() => handleApply(c.code)} className={`text-xs font-bold px-3 py-1.5 rounded-full border ${appliedCoupon?.code === c.code ? 'bg-green-600 text-white border-green-600' : 'bg-vento-cream border-vento-gold/30 text-vento-forest hover:bg-vento-gold hover:text-white'}`}>{appliedCoupon?.code === c.code ? 'Applied' : 'Apply'}</button>
                    </div>
                  ))}
                </div>
              )}

              {/* Pricing Breakdown */}
              <div className="space-y-3 text-sm mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Total MRP</span>
                  <span>Total MRP</span>
                  <span>₹{totalMRP}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount on MRP</span>
                  <span>-₹{discountOnMRP}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo ({appliedCoupon.code})</span>
                    <span>-₹{promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
              </div>

              {/* Final Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-lg text-vento-forest">Total</span>
                <span className="font-bold text-2xl text-vento-forest">₹{finalTotal}</span>
              </div>

              {/* Savings Alert */}
              <div className="bg-green-50 text-green-700 p-3 rounded-xl flex items-center justify-between font-medium text-sm mb-6 border border-green-100">
                <span className="flex items-center gap-2">✨ You're saving on this order</span>
                <span>₹{totalSavings}</span>
              </div>

              {/* Checkout Action */}
              {user ? (
                <Link to="/checkout" className="block text-center w-full bg-vento-forest text-vento-cream hover:bg-vento-gold hover:text-vento-forest font-bold py-4 rounded-full transition-all duration-300 shadow-md">
                  Checkout Now
                </Link>
              ) : (
                <button onClick={openAuth} className="w-full bg-vento-forest text-vento-cream hover:bg-vento-gold hover:text-vento-forest font-bold py-4 rounded-full transition-all duration-300 shadow-md">
                  Login to checkout
                </button>
              )}
              
              <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                🔒 256-Bit Secure Checkout · Free Express Delivery
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
