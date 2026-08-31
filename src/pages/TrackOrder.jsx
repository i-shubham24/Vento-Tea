import { useState } from 'react';
import SEO from '../components/SEO';
import PageBanner from '../components/PageBanner';
import ScrollReveal from '../components/ScrollReveal';
import { Package, Truck, CheckCircle, Search } from 'lucide-react';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId && email) {
      setIsTracking(true);
      // Simulate API call
      setTimeout(() => {
        setIsTracking(false);
        setShowResult(true);
      }, 1500);
    }
  };

  return (
    <div className="pb-24 bg-vento-cream min-h-screen">
      <SEO 
        title="Track Your Order" 
        description="Track your Vento Tea order status in real-time. Fast, reliable delivery of fresh tea across India." 
        keywords="track order, vento tea tracking, delivery status"
        noindex
      />

      <PageBanner
        eyebrow="Order Tracking"
        title="Track Order"
        subtitle="Follow your fresh tea's journey from our estate to your doorstep."
        imagePath="/brand/media_1787994118797.png"
        compact
      />

      <div className="max-w-3xl mx-auto px-4 mt-16">
        <ScrollReveal>
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-vento-cream-dark">
            
            {!showResult ? (
              <form onSubmit={handleTrack} className="flex flex-col gap-6">
                <div className="text-center mb-6">
                  <Package size={48} className="mx-auto text-vento-gold mb-4" />
                  <h2 className="text-2xl font-serif text-vento-forest mb-2">Find Your Package</h2>
                  <p className="text-gray-500 text-sm">Enter your tracking details below to see the latest updates.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-vento-forest mb-2">Order ID</label>
                  <input 
                    type="text" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. VT-109283" 
                    required
                    className="w-full bg-vento-cream border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-vento-forest transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-vento-forest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter the email used during checkout" 
                    required
                    className="w-full bg-vento-cream border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-vento-forest transition-colors"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isTracking}
                  className="mt-4 bg-vento-forest hover:bg-vento-forest-light text-white font-bold py-4 rounded-full transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {isTracking ? 'Searching...' : (
                    <>
                      <Search size={20} />
                      Track Order
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="animate-fade-in">
                <div className="text-center mb-10">
                  <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                  <h2 className="text-2xl font-serif text-vento-forest mb-2">Order Found</h2>
                  <p className="text-gray-500 text-sm">Order #{orderId}</p>
                </div>

                <div className="relative pl-8 border-l-2 border-green-500 space-y-8 py-2">
                  <div className="relative">
                    <div className="absolute -left-[41px] bg-green-500 p-1.5 rounded-full ring-4 ring-white">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <h3 className="font-bold text-vento-forest">Order Placed</h3>
                    <p className="text-sm text-gray-500">Your order was successfully placed and verified.</p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-[41px] bg-green-500 p-1.5 rounded-full ring-4 ring-white">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <h3 className="font-bold text-vento-forest">Packed & Sealed</h3>
                    <p className="text-sm text-gray-500">Your tea has been vacuum sealed for maximum freshness.</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[41px] bg-vento-gold p-1.5 rounded-full ring-4 ring-white">
                      <Truck size={16} className="text-white" />
                    </div>
                    <h3 className="font-bold text-vento-forest">In Transit</h3>
                    <p className="text-sm text-vento-gold-dark">Currently out for delivery with our logistics partner.</p>
                    <p className="text-xs text-gray-400 mt-1">Expected delivery by tomorrow, 8:00 PM</p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowResult(false)}
                  className="mt-12 w-full border-2 border-vento-forest text-vento-forest font-bold py-3 rounded-full hover:bg-vento-forest hover:text-white transition-colors"
                >
                  Track Another Order
                </button>
              </div>
            )}

          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
