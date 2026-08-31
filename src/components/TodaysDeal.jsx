import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Timer, Flame } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';

export default function TodaysDeal() {
  const mockProducts = useProducts();
  const product = mockProducts.find(p => p.slug === 'gold-tea') || mockProducts[0];
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    return Math.max(0, Math.floor((end - now) / 1000));
  });

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const s = String(timeLeft % 60).padStart(2, '0');
  const dealPrice = Math.round(product.priceInr * 0.8);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-vento-forest rounded-xl overflow-hidden border border-vento-gold/20 shadow-xl flex flex-col md:flex-row">
        <div className="md:w-1/2 relative min-h-[320px] bg-vento-cream-dark">
          <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <Flame size={14} /> 20% OFF — TODAY ONLY
          </div>
        </div>
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center text-vento-cream">
          <p className="text-vento-gold text-xs tracking-[0.2em] font-bold uppercase mb-2 flex items-center gap-2"><Timer size={14} /> Ends in {h}h {m}m {s}s</p>
          <h2 className="text-3xl md:text-4xl font-serif mb-3">Today&apos;s Deal</h2>
          <h3 className="text-xl font-sans font-semibold text-vento-gold">{product.name} — {product.tagline}</h3>
          <p className="text-vento-cream/80 text-sm mt-3 leading-relaxed line-clamp-2">{product.description}</p>
          <div className="flex items-baseline gap-3 mt-6">
            <span className="text-3xl font-bold text-white">₹{dealPrice}</span>
            <span className="text-sm line-through text-vento-cream/60">₹{product.priceInr}</span>
            <span className="text-xs bg-vento-gold text-vento-forest font-bold px-2 py-1 rounded-full">SAVE 20%</span>
          </div>
          <Link to={`/product/${product.slug}`} className="mt-8 inline-flex justify-center bg-vento-gold hover:bg-white text-vento-forest font-bold py-3 px-8 rounded-full transition-colors shadow-lg w-fit">
            Grab Today&apos;s Deal
          </Link>
          <p className="text-[11px] text-vento-cream/60 mt-3">FOMO — price resets at midnight. Free shipping over ₹499.</p>
        </div>
      </div>
    </section>
  );
}
