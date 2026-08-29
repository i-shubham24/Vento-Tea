import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function DeliveryBanner() {
  return (
    <section className="relative h-64 md:h-80 overflow-hidden flex items-center justify-center text-white">
      <img src="/brand/delivery.jpg" alt="Fast Delivery" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-vento-forest/70"></div>
      
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <Zap size={48} className="mx-auto text-vento-gold mb-4" />
        <h2 className="text-3xl md:text-5xl font-serif mb-4">Want it Fast?</h2>
        <p className="text-lg md:text-xl font-medium">
          Order now for Next-Day Delivery in metro cities. Freshness guaranteed.
        </p>
        <Link to="/shop" className="inline-block mt-6 bg-vento-gold hover:bg-vento-gold-dark text-vento-forest font-bold py-3 px-8 rounded-full transition-colors">
          Shop Now
        </Link>
      </div>
    </section>
  );
}
