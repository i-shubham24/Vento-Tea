import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { items, subtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalMRP = items.reduce((sum, item) => sum + (Math.round(item.weight.priceInr * 1.3) * item.quantity), 0);
  const discountOnMRP = totalMRP - subtotal;
  const promoDiscount = 50;
  const finalTotal = subtotal > 0 ? subtotal - promoDiscount : 0;
  const totalSavings = discountOnMRP + promoDiscount;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center p-4">
      <SEO title="Checkout" description="Securely checkout your Vento Tea order." keywords="checkout" />
        <h1 className="text-3xl font-serif text-vento-forest mb-4">Your cart is empty</h1>
        <Link to="/shop" className="bg-vento-forest text-vento-cream px-8 py-3 rounded-full font-semibold hover:bg-vento-forest-light transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert("Proceeding to Razorpay checkout...");
    // Mock successful checkout redirection could go here
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif text-vento-forest mb-8">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Checkout Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif text-vento-forest font-semibold">Contact Information</h2>
                {user && <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">Logged in as {user.name}</span>}
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={user?.email || "customer@example.com"}
                  className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors"
                />
                <p className="text-xs text-gray-400 mt-2">Order confirmation and invoice will be sent here.</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif text-vento-forest font-semibold mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-vento-gold" /> Shipping Address
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Country / Region</label>
                  <select className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors text-gray-700">
                    <option>India</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" defaultValue={user?.name || ""} className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" defaultValue={user?.phone || ""} className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Street Address / House No. / Flat <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors" />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Apartment / Suite (Optional)</label>
                    <input type="text" className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Landmark (Optional)</label>
                    <input type="text" className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">City <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">State <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">PIN Code <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors" />
                  </div>
                </div>
              </form>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif text-vento-forest font-semibold mb-6">Payment Method</h2>
              <div className="border border-vento-gold bg-vento-cream/20 rounded-xl p-4 flex items-center gap-3 cursor-pointer">
                <div className="w-5 h-5 rounded-full border-4 border-vento-gold bg-white shrink-0"></div>
                <div className="flex-1">
                  <span className="font-semibold text-vento-forest block">Razorpay (Cards, UPI, NetBanking)</span>
                  <span className="text-xs text-gray-500">Secure payment gateway</span>
                </div>
                <CheckCircle2 size={24} className="text-vento-gold" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif text-vento-forest font-semibold mb-4">Additional Information</h2>
              <textarea 
                rows="3"
                placeholder="Any special notes for delivery? (Optional)"
                className="w-full py-3 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors resize-none"
              ></textarea>
            </div>

          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-28">
              <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-serif text-vento-forest font-semibold">Order Summary</h2>
                <span className="text-sm text-gray-400">{items.length} item(s)</span>
              </div>

              {/* Items Compact List */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.weight.grams}`} className="flex gap-4">
                    <div className="relative">
                      <img src={item.product.images[0]} className="w-16 h-16 rounded-lg object-cover bg-vento-cream border border-gray-100" alt="" />
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-vento-forest line-clamp-1">{item.product.name}</h4>
                      <p className="text-xs text-green-600 mt-1">Save ₹{Math.round(item.weight.priceInr * 1.3) - item.weight.priceInr}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">₹{item.weight.priceInr * item.quantity}</div>
                      <div className="text-xs text-gray-400 line-through">₹{Math.round(item.weight.priceInr * 1.3) * item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Highlight */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-vento-cream px-3 py-1 rounded border border-vento-gold/30 text-xs font-bold text-vento-forest">
                    NEWUSER15
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-vento-forest">Save ₹75</p>
                    <p className="text-xs text-gray-500">Best deal</p>
                  </div>
                </div>
                <button className="bg-vento-forest text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-vento-forest-light">
                  APPLY
                </button>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 text-sm mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Total MRP</span>
                  <span>₹{totalMRP}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount on MRP</span>
                  <span>-₹{discountOnMRP}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Promo (Welcome Special)</span>
                  <span>-₹{promoDiscount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
              </div>

              {/* Final Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-lg text-vento-forest">Total Amount</span>
                <span className="font-bold text-2xl text-vento-forest">₹{finalTotal}</span>
              </div>

              {/* Savings Alert */}
              <div className="bg-green-50 text-green-700 p-3 rounded-xl flex items-center justify-between font-medium text-sm mb-6 border border-green-100">
                <span className="flex items-center gap-2">✨ Total Savings</span>
                <span>₹{totalSavings}</span>
              </div>

              {/* Checkout Action */}
              <button onClick={handlePlaceOrder} className="w-full bg-vento-forest hover:bg-vento-forest-light text-white font-bold py-4 rounded-full transition-colors shadow-md text-lg">
                Place Order · ₹{finalTotal}
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
