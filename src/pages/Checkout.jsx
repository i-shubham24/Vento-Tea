import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder, updatePayment } = useOrder();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (items.length === 0) {
      navigate('/shop', { replace: true });
    }
  }, [items, navigate]);
  const [payMode, setPayMode] = useState('razorpay');
  const [processing, setProcessing] = useState(false);

  const totalMRP = items.reduce((sum, item) => sum + (Math.round(item.weight.priceInr * 1.3) * item.quantity), 0);
  const discountOnMRP = totalMRP - subtotal;
  const promoDiscount = 50;
  const finalTotal = subtotal > 0 ? subtotal - promoDiscount : 0;
  const totalSavings = discountOnMRP + promoDiscount;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center p-4">
      <SEO title="Checkout" description="Securely checkout your Vento Tea order." keywords="checkout" noindex />
        <h1 className="text-3xl font-serif text-vento-forest mb-4">Your cart is empty</h1>
        <Link to="/shop" className="bg-vento-forest text-vento-cream px-8 py-3 rounded-full font-semibold hover:bg-vento-forest-light transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    // Create order (localStorage, ready for Node/Mongo POST /api/orders)
    const order = createOrder({ user, items, subtotal, coupon: 'NEWUSER15', shippingAddress: { city:'New Delhi', state:'Delhi', pin:'110001' }, paymentMode: payMode });
    // Mock Razorpay: simulate payment sheet then verify
    if (payMode === 'cod') {
      updatePayment(order.id, 'success');
      if (clearCart) clearCart();
      navigate(`/order/${order.id}`);
      return;
    }
    // Simulate Razorpay checkout 1.2s
    setTimeout(()=>{
      const success = Math.random() > 0.08;
      updatePayment(order.id, success ? 'success' : 'failed');
      if (success && clearCart) clearCart();
      navigate(success ? `/order/${order.id}` : `/order/${order.id}?payment=failed`);
      setProcessing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-vento-cream pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-vento-forest">Checkout</h1>
          <p className="text-sm text-gray-500 mt-1">Complete your order securely.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Checkout Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Contact — Figma corner:8 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-vento-cream-dark">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-serif text-vento-forest font-semibold">Contact</h2>
                {user && <span className="text-xs bg-vento-mint text-vento-forest px-3 py-1 rounded-full font-medium">Logged in as {user.name}</span>}
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500">Email</label>
                <input 
                  type="email" 
                  defaultValue={user?.email || "customer@example.com"}
                  className="w-full py-3 px-4 bg-white rounded-lg border border-gray-200 outline-none focus:border-vento-forest transition-colors text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">Order confirmation and invoice will be sent here.</p>
              </div>
            </div>

            {/* Step 2: Delivery — Figma */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-vento-cream-dark">
              <h2 className="text-lg font-serif text-vento-forest font-semibold mb-5 flex items-center gap-2">
                <MapPin size={18} className="text-vento-forest" /> Delivery
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1">First Name <span className="text-red-500">*</span></label>
                    <input type="text" defaultValue={user?.name?.split(' ')[0] || ""} placeholder="First Name" className="w-full py-3 px-4 bg-white rounded-lg border border-gray-200 outline-none focus:border-vento-forest transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1">Last Name</label>
                    <input type="text" placeholder="Last Name" className="w-full py-3 px-4 bg-white rounded-lg border border-gray-200 outline-none focus:border-vento-forest transition-colors text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1">Address <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Apartment, suite, etc." className="w-full py-3 px-4 bg-white rounded-lg border border-gray-200 outline-none focus:border-vento-forest transition-colors text-sm" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1">City <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="City" className="w-full py-3 px-4 bg-white rounded-lg border border-gray-200 outline-none focus:border-vento-forest transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1">State</label>
                    <select className="w-full py-3 px-4 bg-white rounded-lg border border-gray-200 outline-none focus:border-vento-forest transition-colors text-sm"><option>Assam</option><option>Delhi</option><option>Maharashtra</option></select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1">PIN Code <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="000000" className="w-full py-3 px-4 bg-white rounded-lg border border-gray-200 outline-none focus:border-vento-forest transition-colors text-sm" />
                  </div>
                </div>
              </form>
            </div>

            {/* Payment — Figma + logos */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-vento-cream-dark">
              <h2 className="text-lg font-serif text-vento-forest font-semibold mb-5">Payment</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${payMode==='razorpay' ? 'border-vento-forest bg-vento-mint/40' : 'border-gray-200 bg-white'}`} onClick={()=> setPayMode('razorpay')}>
                  <input type="radio" name="pay" checked={payMode==='razorpay'} onChange={()=> setPayMode('razorpay')} className="accent-vento-forest w-4 h-4" />
                  <span className="text-sm font-semibold text-vento-forest flex-1 flex items-center gap-2"><CreditCard size={16}/> Razorpay</span>
                  <span className="text-xs text-gray-500">Cards, UPI, NetBanking</span>
                </label>
                <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${payMode==='cod' ? 'border-vento-forest bg-vento-mint/40' : 'border-gray-200 bg-white'}`} onClick={()=> setPayMode('cod')}>
                  <input type="radio" name="pay" checked={payMode==='cod'} onChange={()=> setPayMode('cod')} className="accent-vento-forest w-4 h-4" />
                  <span className="text-sm font-semibold text-vento-forest flex-1">Cash on Delivery</span>
                  <span className="text-xs text-gray-500">Pay on arrival</span>
                </label>
              </div>
              {/* Payment logos */}
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-xs text-gray-500 flex items-center gap-1"><ShieldCheck size={14}/> Secure:</span>
                <span className="bg-white border rounded px-2 py-1 text-xs font-bold">Razorpay</span>
                <span className="bg-white border rounded px-2 py-1 text-xs font-bold">UPI</span>
                <span className="bg-white border rounded px-2 py-1 text-xs font-bold">VISA</span>
                <span className="bg-white border rounded px-2 py-1 text-xs font-bold">Mastercard</span>
                <span className="bg-white border rounded px-2 py-1 text-xs font-bold">COD</span>
              </div>
              {/* Vehicle logos */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-xs text-gray-500 flex items-center gap-1"><Truck size={14}/> Ships via:</span>
                <span className="bg-white border rounded px-2 py-1 text-xs font-semibold">Delhivery</span>
                <span className="bg-white border rounded px-2 py-1 text-xs font-semibold">Shiprocket</span>
                <span className="bg-white border rounded px-2 py-1 text-xs font-semibold">BlueDart</span>
              </div>
            </div>

          </div>

          {/* Order Summary — Figma Aside */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-vento-cream-dark sticky top-28">
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

              {/* Coupon applied earlier in cart — checkout is just fill details and pay */}
              {false && <div className="hidden"></div>}

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
              <button onClick={handlePlaceOrder} disabled={processing} className="w-full bg-vento-forest text-white hover:bg-vento-gold hover:text-vento-forest font-bold py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md text-lg disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed">
                {processing ? 'Processing Razorpay...' : `Place Order · ₹${finalTotal}`}
              </button>
              <p className="text-xs text-center text-gray-400 mt-2">Payments are securely processed via Razorpay.</p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
