import React from 'react';
import { Leaf, Box, Sparkles } from 'lucide-react';

export default function WhyVento() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-vento-forest" strokeWidth={1.5} />,
      title: "Organically Grown",
      description: "We source from the top 2% of all teas produced in the world, ensuring no harmful pesticides."
    },
    {
      icon: <Box className="w-8 h-8 text-vento-forest" strokeWidth={1.5} />,
      title: "Fresh Inventory",
      description: "Direct from the estates to your cup. Our supply chain ensures maximum freshness."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-vento-forest" strokeWidth={1.5} />,
      title: "Hand Blended",
      description: "Expertly crafted in small batches to guarantee the perfect flavor profile every time."
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center">
          
          <div className="md:col-span-1 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200 pb-12 md:pb-0 md:pr-8">
            <h2 className="text-3xl md:text-4xl font-serif text-vento-forest mb-4 leading-tight">
              Why Vento
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Experience the unmatched quality of India's finest tea, curated with passion.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full border border-gray-300 flex items-center justify-center mb-6 group-hover:border-vento-gold transition-colors duration-500 bg-white shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-bold tracking-widest text-gray-800 uppercase mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
