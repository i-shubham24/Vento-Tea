import { Star } from 'lucide-react';

import SplitReveal from './SplitReveal';

export default function ReviewCarousel() {
  const reviews = [
    { name: "Rahul S.", rating: 5, text: "The Punjabi Masala tea is absolutely incredible. Smells amazing and the taste is super authentic." },
    { name: "Priya M.", rating: 5, text: "Switched to Vento Gold a month ago and I'm never going back. The freshness is unmatched." },
    { name: "Amit K.", rating: 5, text: "Love the premium packaging and the whole leaves. Makes a perfect cup every morning." },
    { name: "Sneha V.", rating: 5, text: "Kadak Chai lives up to its name. Exactly what I need to jumpstart my day!" },
    { name: "Karan D.", rating: 5, text: "Fast delivery and the sampler pack is a great way to try everything. Highly recommended." },
  ];

  // Duplicate for seamless infinite scroll
  const items = [...reviews, ...reviews];

  return (
    <section className="bg-vento-cream-dark py-20 overflow-hidden border-t border-vento-gold/20">
      <div className="text-center mb-12 px-4">
        <SplitReveal as="h2" className="text-4xl font-serif text-vento-forest mb-4" text="What Our Tea Family Says" />
        <div className="w-20 h-1 bg-vento-gold mx-auto mb-4"></div>
        <div className="flex items-center justify-center gap-2 text-vento-forest font-semibold">
           <span className="text-xl">4.9/5</span> 
           <div className="flex text-vento-gold">
             {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
           </div>
           <span className="text-gray-500 font-normal">Based on 10,000+ reviews</span>
        </div>
      </div>

      <div className="relative w-full flex whitespace-nowrap overflow-hidden py-4">
        
        {/* Left/Right Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-vento-cream-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-vento-cream-dark to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee flex gap-6 px-4">
          {items.map((rev, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-80 md:w-96 shrink-0 whitespace-normal">
              <div className="flex text-vento-gold mb-4">
                 {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">"{rev.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-vento-forest text-vento-cream font-bold flex items-center justify-center rounded-full">
                  {rev.name.charAt(0)}
                </div>
                <p className="font-semibold text-vento-forest">{rev.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
