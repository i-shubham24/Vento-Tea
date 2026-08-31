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
    <section className="py-16 px-4 max-w-4xl mx-auto w-full">
      <div className="text-center mb-8">
        <SplitReveal as="h2" className="text-4xl md:text-5xl font-serif text-vento-forest mb-4" text="Vento vs Ordinary" />
        <div className="w-12 h-0.5 bg-vento-gold mx-auto mb-3"></div>
        <p className="text-sm text-gray-500">The difference is clear at a glance.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-vento-cream-dark overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 bg-vento-cream-dark px-4 py-4 border-b border-gray-200 text-xs sm:text-sm">
          <div className="font-semibold text-gray-500 uppercase tracking-widest flex items-center">Feature</div>
          <div className="font-bold text-sm text-vento-forest text-center flex items-center justify-center gap-1"><span className="text-vento-gold">★</span> Vento</div>
          <div className="font-bold text-sm text-gray-400 text-center">Ordinary</div>
        </div>
        {/* Body compact */}
        <div className="divide-y divide-gray-100">
          {comparison.map((item, idx) => (
            <div key={idx} className="grid grid-cols-3 px-4 py-4 items-center hover:bg-gray-50/60 transition-colors">
              <div className="text-xs sm:text-sm font-semibold text-vento-forest">{item.feature}</div>
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-green-700 bg-green-50 px-2 py-1.5 rounded-lg border border-green-100 mx-1">
                <CheckCircle2 size={14} className="text-green-600 shrink-0" />
                <span className="truncate">{item.vento}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-gray-500 px-2 py-1.5 mx-1">
                <XCircle size={14} className="text-red-300 shrink-0" />
                <span className="truncate">{item.ordinary}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
