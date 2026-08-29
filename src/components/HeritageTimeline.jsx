import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
  {
    year: "1823 CE",
    title: "The Discovery",
    desc: "Wild tea plants were discovered thriving in the forests of Assam. That moment changed history — marking the beginning of Indian tea cultivation and influencing how the world enjoys tea today.",
    position: "bottom"
  },
  {
    year: "1850s",
    title: "The Himalayan Pearl",
    desc: "British planters established the first tea gardens in the cool Himalayan foothills. The crisp mountain air and fertile soil produced a tea so delicate and aromatic that First Flush became legendary across the world.",
    position: "top"
  },
  {
    year: "1980s",
    title: "The Golden Era",
    desc: "Indian tea estates perfected the orthodox rolling methods, creating the rich, malty flavor profiles that Assam is globally renowned for today.",
    position: "bottom"
  },
  {
    year: "Present",
    title: "Your Cup",
    desc: "Every cup you brew holds centuries of culture, craft, and care. With each sip, you join an ancient journey — becoming part of the story it continues to tell.",
    position: "top"
  }
];

export default function HeritageTimeline() {
  return (
    <section className="bg-[#1C1814] text-vento-cream py-32 relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 opacity-20">
        <img src="/brand/journey.jpg" alt="Tea Background" className="w-full h-full object-cover mix-blend-overlay grayscale" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C1814] via-transparent to-[#1C1814]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-serif text-vento-gold mb-4">The Vento Journey</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">A rich heritage tracing back centuries, brought to your cup today.</p>
        </div>

        <div className="relative">
          {/* Dashed line connecting nodes (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px border-t-2 border-dashed border-vento-gold/30 -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            {timelineData.map((node, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col items-center ${node.position === 'top' ? 'md:flex-col-reverse md:-mt-48' : 'md:mt-24'}`}
              >
                {/* Node Dot */}
                <div className="w-6 h-6 rounded-full bg-[#1C1814] border-4 border-vento-gold z-10 my-6 md:my-8 shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
                
                {/* Card */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-full max-w-sm hover:bg-white/10 transition-colors duration-300">
                  <div className="text-vento-gold font-bold tracking-widest text-sm mb-2">{node.year}</div>
                  <h3 className="text-xl font-serif text-white mb-4">{node.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{node.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
