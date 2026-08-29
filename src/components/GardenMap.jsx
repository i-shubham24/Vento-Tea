import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SplitReveal from './SplitReveal';

const REGIONS = [
  {
    id: 'assam',
    name: 'Assam',
    x: '75%',
    y: '45%',
    desc: 'Known for its body, briskness, malty flavor, and strong, bright color. The birthplace of our Everyday Kadak Chai.',
    image: 'https://teawebsite-b65ea.web.app/images/web/craft-pickers.webp'
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    x: '62%',
    y: '35%',
    desc: 'The "Champagne of Teas". Grown in the foothills of the Himalayas, yielding a light, floral, and aromatic infusion.',
    image: 'https://teawebsite-b65ea.web.app/images/web/craft-harvest.webp'
  },
  {
    id: 'nilgiri',
    name: 'Nilgiri',
    x: '38%',
    y: '85%',
    desc: 'Grown in the dramatic Blue Mountains of South India. Famous for its intensely aromatic and flavorful cup.',
    image: 'https://teawebsite-b65ea.web.app/images/web/range-family.webp'
  }
];

export default function GardenMap() {
  const [activeRegion, setActiveRegion] = useState(null);

  return (
    <section className="py-24 px-4 md:px-8 bg-vento-cream relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Map Side */}
        <div className="w-full lg:w-1/2 relative aspect-square max-w-md mx-auto">
          {/* Abstract SVG Map of India */}
          <svg viewBox="0 0 400 450" className="w-full h-full text-vento-forest/10 drop-shadow-md">
            <path 
              fill="currentColor"
              d="M130.6,27.5c1.4-1.9,6.7-10.9,13.6-18.4c3.5-3.8,4.7-6,8.2-6.5c3.5-0.5,14,3.3,19.9,6c4.7,2.2,9.3,7.6,12.7,8.7 c11.5,3.8,17.4,12.9,25.6,12.9c3.7,0,8.4-1.6,13.2-1.6c6.2,0,10.6,2.2,16.2,2.7c3.2,0.3,5.6,2.7,8.2,3.3 c7.9,1.6,10.6-0.5,15.6,2.7c6.2,4,13.3,9.5,18.9,13.6c5.8,4.3,10.2,7.6,14.6,12.5c3.2,3.5,6,9.8,8.4,14.1 c3.2,5.7,8.9,8.4,11.3,14.1c1.9,4.6,1.4,11.7,3.5,16.2c3.5,7.6,9.8,12,12.7,19c3.2,7.9,3.5,14.6,5.3,22.7 c1.6,7.6,4.7,14,5.6,21.9c0.7,7.1-1.6,12.5-3.7,18.9c-2.3,7.1-6,12.5-10.6,17.9c-3.2,3.8-6.7,8.4-10.4,10.9 c-7.4,4.9-10.4,10.3-17.6,14.1c-10.2,5.4-14,9.5-23.4,12.9c-8.9,3.2-13.6,8.7-22.2,10.3c-7.9,1.6-15.6,4-22.7,7.1 c-4.7,1.9-8.4,6.7-12.7,9.5c-4,2.7-7.9,6.7-10.6,10.9c-3.2,4.9-3.7,9.8-6,14.6c-1.4,2.7-3.2,4.9-4.7,7.6 c-2.3,4-1.6,9.5-4,13.6c-1.9,3.2-4.7,5.4-7.4,7.6c-4.9,4-6,9.8-11.3,13.6c-4,2.7-8.9,4.9-12.5,8.2c-3.2,2.7-4,6.7-6,10.3 c-1.9,3.5-3.7,6.7-6,9.8c-2.3,3.2-3.7,6.7-6,10.3c-3.5,5.4-5.4,10.9-10.6,14.6c-4.9,3.5-8.9,6.7-14.6,9.8 c-4,2.2-7.4,6-11.3,8.7c-4.9,3.2-8.4,7.1-13.6,9.8c-7.4,4-10.6,9.5-18.4,12.5c-6.7,2.7-11.7,5.4-18.4,7.1c-4.7,1.1-10.4,0-15.1,0.5 c-3.2,0.3-6-1.6-8.9-2.7c-6.2-2.2-9.8-7.1-16.2-8.7c-7.4-1.9-11.7-6-18.9-6.5c-3.2-0.3-6.7,1.1-9.5-0.5c-4-2.2-6-7.6-9.8-9.8 c-4.7-2.7-8.4-6.7-12.7-9.5c-5.4-3.5-8.4-8.7-13.6-12c-4-2.7-8.9-4.9-12.5-8.2c-3.2-2.7-4-6.7-6-10.3c-1.9-3.5-3.7-6.7-6-9.8 c-2.3-3.2-3.7-6.7-6-10.3c-2.7-4-3.2-9.5-4.7-14.1c-1.9-5.4-4.7-9.8-5.6-15.6c-0.7-5.4-0.5-11.3,0.5-16.7 c0.7-4.6,3.2-9.5,4.7-14.1c1.9-5.4,3.2-10.9,5.6-16.2c3.5-7.6,7.4-13.6,11.3-21.1c2.7-4.9,5.4-9.5,8.4-14.1 c4-6.7,8.9-11.7,13.6-17.9c4.9-6.2,9.8-12,15.6-17.4c5.4-4.9,9.8-10.3,15.1-15.1c5.4-4.9,10.6-9.5,16.2-14.1 c3.2-2.7,6-6,9.5-8.2c3.2-1.9,8.4-1.6,11.3-4.3c4-3.5,5.4-9.5,8.4-14.1c2.7-4,6.7-6.7,9.5-10.9c4.9-6.7,6-13.6,11.3-19 c3.5-3.8,7.9-6,11.3-9.8c3.2-3.5,4.7-7.6,7.4-11.3c1.9-2.7,3.7-4.9,6-7.1c3.2-3.2,5.6-6,9.5-8.2c6.2-3.5,12.5-4.9,18.9-7.1 C117.9,32.4,124.7,29.9,130.6,27.5z"
            />
          </svg>

          {/* Region Markers */}
          {REGIONS.map(region => (
            <div
              key={region.id}
              className="absolute w-8 h-8 -ml-4 -mt-4 cursor-pointer group"
              style={{ left: region.x, top: region.y }}
              onMouseEnter={() => setActiveRegion(region)}
              onMouseLeave={() => setActiveRegion(null)}
            >
              <div className="absolute inset-0 bg-vento-gold/40 rounded-full animate-ping"></div>
              <div className="relative w-full h-full bg-vento-gold rounded-full flex items-center justify-center text-vento-forest transition-transform group-hover:scale-125 group-hover:bg-vento-forest group-hover:text-vento-gold shadow-lg">
                <MapPin size={16} />
              </div>
            </div>
          ))}

          {/* Map Overlay Text */}
          <div className="absolute -bottom-8 left-0 right-0 text-center pointer-events-none">
            <span className="font-serif italic text-vento-forest/40 text-2xl tracking-widest">Grown in India</span>
          </div>
        </div>

        {/* Info Side */}
        <div className="w-full lg:w-1/2 min-h-[400px]">
          <SplitReveal as="h2" className="text-4xl md:text-5xl font-serif text-vento-forest mb-6" text="Garden to Cup." />
          <div className="w-20 h-1 bg-vento-gold mb-8"></div>
          
          <AnimatePresence mode="wait">
            {activeRegion ? (
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-3xl shadow-xl border border-vento-gold/20"
              >
                <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-6 bg-vento-cream">
                  <img src={activeRegion.image} alt={activeRegion.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-3xl font-serif text-vento-forest mb-4 flex items-center gap-3">
                  <MapPin className="text-vento-gold" />
                  {activeRegion.name}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {activeRegion.desc}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col justify-center"
              >
                <p className="text-gray-600 text-xl leading-relaxed mb-6">
                  We partner directly with heritage tea estates across India's most celebrated growing regions. 
                </p>
                <p className="text-gray-600 text-xl leading-relaxed">
                  Hover over the map markers to discover the unique terroir that shapes the signature flavor of Vento Tea.
                </p>
                <div className="mt-8 inline-flex items-center gap-3 text-vento-gold font-bold uppercase tracking-widest text-sm">
                  <span className="w-8 h-8 rounded-full bg-vento-gold/20 flex items-center justify-center animate-bounce">
                    <MapPin size={16} className="text-vento-gold" />
                  </span>
                  Explore the regions
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
