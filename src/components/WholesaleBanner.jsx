import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function WholesaleBanner() {
  const logos = [
    <div key="1" className="font-serif text-2xl font-bold text-vento-forest shrink-0">The Ritz-Carlton</div>,
    <div key="2" className="font-sans text-xl font-light tracking-widest text-vento-forest shrink-0">P.F. CHANG'S</div>,
    <div key="3" className="font-serif text-3xl italic text-vento-forest shrink-0">Taj</div>,
    <div key="4" className="font-sans text-2xl font-bold tracking-tight text-vento-forest shrink-0">NOVOTEL</div>,
    <div key="5" className="font-serif text-xl uppercase tracking-widest text-vento-forest shrink-0">Marriott</div>,
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-vento-forest mb-12 max-w-4xl mx-auto leading-tight"
        >
          Complement your menu with our award-winning tea
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Link 
            to="/wholesale" 
            className="inline-block px-12 py-4 bg-vento-forest text-vento-cream hover:bg-vento-gold hover:text-vento-forest font-bold tracking-widest text-sm uppercase transition-all duration-300 rounded-full shadow-lg"
          >
            Become a Wholesaler
          </Link>
        </motion.div>

        {/* Simulating the beautiful top-down tea cups via CSS and imagery */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative w-full max-w-5xl mx-auto h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl bg-gray-50 flex items-center justify-center group mb-20"
        >
          <img 
            src="/brand/hero-chai.jpg" 
            alt="Wholesale Tea Collection" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-1000"></div>
        </motion.div>

        {/* Continuous Logo Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-full relative"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-10 text-center">Trusted by Premium Partners</p>
          
          {/* Marquee Wrapper with Faded Edges */}
          <div className="relative flex overflow-hidden w-full opacity-60 hover:opacity-100 transition-opacity duration-500 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
              className="flex items-center gap-16 md:gap-32 pr-16 md:pr-32 whitespace-nowrap"
            >
              {/* Render logos multiple times to ensure seamless loop */}
              {logos}
              {logos}
              {logos}
              {logos}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
