import React from 'react';
import { motion } from 'framer-motion';

export default function NewsletterBanner() {
  return (
    <section className="bg-vento-cream py-20 relative overflow-hidden border-t border-vento-gold/20">
      {/* Decorative faint background element (simulate the etched background) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1E3F33 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif text-vento-forest mb-6 leading-tight">
              Want 10% off your<br />first purchase?
            </h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto md:mx-0">
              Sign up to receive updates on product launches, tea guides, and save 10% off your first order.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end w-full">
            <form className="w-full max-w-md flex flex-col sm:flex-row gap-0 shadow-xl rounded-none">
              <input 
                type="email" 
                placeholder="Your email here" 
                className="flex-1 px-6 py-4 bg-white border border-gray-200 outline-none focus:border-vento-gold text-vento-forest placeholder-gray-400"
                required
              />
              <button 
                type="submit" 
                className="bg-vento-gold hover:bg-vento-gold-dark text-vento-forest font-bold tracking-widest text-sm uppercase px-8 py-4 transition-colors"
              >
                Get My 10% Off
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center md:text-right w-full max-w-md font-medium">
              We respect your data and privacy. Unsubscribe anytime.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
