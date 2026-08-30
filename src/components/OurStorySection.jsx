import { Link } from 'react-router-dom';
import SplitReveal from './SplitReveal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function OurStorySection() {
  const ref = useRef(null);
  
  // Create a parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // The image will move down slower than the container scrolls up
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // A subtle scale effect
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section ref={ref} className="py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16 relative overflow-hidden">
      <div className="w-full md:w-1/2 relative">
        <div className="w-full max-w-sm mx-auto lg:max-w-md aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative bg-vento-forest/5 group">
          <motion.img 
            style={{ y: yParallax, scale: scaleParallax }}
            src="https://teawebsite-b65ea.web.app/images/web/craft-pickers.webp" 
            alt="Vento Journey" 
            className="absolute inset-0 w-full h-full object-cover origin-center" 
          />
          {/* Subtle vignette/overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-vento-forest/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
        
        {/* Floating Decorative Element layered over the image */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-8 -left-8 bg-vento-gold text-vento-forest font-serif p-8 rounded-full shadow-xl hidden md:flex items-center justify-center h-32 w-32 z-10 border-4 border-white"
        >
          <span className="text-center text-sm font-bold leading-tight">Since<br/>1920</span>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 relative z-10">
        <SplitReveal as="h2" className="text-4xl md:text-5xl lg:text-6xl font-serif text-vento-forest mb-6 leading-tight" text="Crafted to be Savoured." />
        <div className="w-24 h-1 bg-vento-gold mb-8"></div>
        <p className="text-vento-forest mb-6 text-lg leading-relaxed font-medium">
          Every expression of one obsession. Flavour without compromise. 
          Delivered fresh from the finest gardens of Assam and Darjeeling.
        </p>
        <p className="text-vento-forest/90 mb-10 text-lg leading-relaxed">
          From the everyday kadak cup to whole gold long leaf, every Vento pack is sealed at origin and built on the same promise: the kadak, honest flavour India grew up on.
        </p>
        <Link to="/about" className="inline-block bg-vento-forest text-vento-cream hover:bg-vento-gold hover:text-vento-forest font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl">
          Discover Our Heritage
        </Link>
      </div>
    </section>
  );
}
