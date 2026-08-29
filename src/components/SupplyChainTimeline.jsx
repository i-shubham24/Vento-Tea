import { Leaf, PackageCheck, Truck } from 'lucide-react';

export default function SupplyChainTimeline() {
  const steps = [
    {
      icon: <Leaf size={32} />,
      title: "Plucked at Source",
      description: "Finest leaves from Assam & Darjeeling estates."
    },
    {
      icon: <PackageCheck size={32} />,
      title: "Packed Fresh",
      description: "Vacuum sealed immediately, no middlemen involved."
    },
    {
      icon: <Truck size={32} />,
      title: "Delivered Fast",
      description: "Directly to your door in 2-4 business days."
    }
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/brand/vento-promise.jpg" alt="Vento Promise Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-vento-cream-dark/90 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif text-center text-vento-forest mb-16">The Vento Promise</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-[2px] bg-vento-gold z-0"></div>
          
          {/* Connector Line (Mobile) */}
          <div className="md:hidden absolute top-0 bottom-0 left-1/2 w-[2px] bg-vento-gold -translate-x-1/2 z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center w-full md:w-1/3 py-8 md:py-0 px-4 group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-vento-forest shadow-lg border-4 border-vento-gold transition-transform duration-300 group-hover:scale-110 mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-vento-forest mb-2">{step.title}</h3>
              <p className="text-gray-700 font-medium max-w-[220px]">{step.description}</p>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
