import { CheckCircle2, XCircle } from 'lucide-react';

import SplitReveal from './SplitReveal';

export default function ComparisonChart() {
  const comparison = [
    { feature: "Tea Leaves", vento: "Premium Whole Leaf", ordinary: "Dust & Fannings" },
    { feature: "Sourcing", vento: "Direct from Estates", ordinary: "Multiple Middlemen" },
    { feature: "Ingredients", vento: "100% Natural Spices", ordinary: "Artificial Flavors" },
    { feature: "Packaging", vento: "Vacuum Sealed for Freshness", ordinary: "Open Sacks (Loses Aroma)" },
    { feature: "Health Benefits", vento: "High Antioxidants Maintained", ordinary: "Diminished Quality" },
  ];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <SplitReveal as="h2" className="text-4xl font-serif text-vento-forest mb-4" text="The Vento Difference" />
        <div className="w-20 h-1 bg-vento-gold mx-auto mb-6"></div>
        <p className="text-gray-600">See why connoisseurs choose Vento over ordinary tea brands.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-vento-cream-dark overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-3 bg-vento-cream-dark p-6 border-b border-gray-200">
          <div className="font-semibold text-gray-500 uppercase tracking-wider text-sm flex items-center">Feature</div>
          <div className="font-serif font-bold text-xl md:text-2xl text-vento-forest text-center flex items-center justify-center gap-2">
            <span className="text-vento-gold">★</span> Vento Tea
          </div>
          <div className="font-serif font-bold text-xl md:text-2xl text-gray-400 text-center flex items-center justify-center">Ordinary Tea</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {comparison.map((item, idx) => (
            <div key={idx} className="grid grid-cols-3 p-6 items-center hover:bg-gray-50 transition-colors">
              <div className="font-medium text-vento-forest">{item.feature}</div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left text-green-700 font-semibold bg-green-50 p-3 rounded-xl border border-green-100">
                <CheckCircle2 size={20} className="text-green-600 shrink-0" />
                <span className="text-sm md:text-base">{item.vento}</span>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left text-gray-500 p-3">
                <XCircle size={20} className="text-red-400 shrink-0" />
                <span className="text-sm md:text-base">{item.ordinary}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
