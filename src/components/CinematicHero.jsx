import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HERO_VIDEO_SRC = "https://cdn.pixabay.com/video/2019/11/04/28745-372132766_large.mp4"; // Placeholder tea video

export default function CinematicHero() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Panel 1: 0 to 0.3
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  // Panel 2: 0.3 to 0.6
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.65], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.65], [100, -100]);

  // Panel 3: 0.6 to 1.0
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.7, 1], [0, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.55, 1], [100, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-vento-forest">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          poster="/brand/hero-chai.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-vento-forest/70 via-transparent to-vento-forest/90"></div>

        {/* Text Panels */}
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-vento-cream">
          
          <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute">
            <h1 className="text-5xl md:text-7xl font-serif mb-4 drop-shadow-lg text-vento-gold-dark">Premium Indian Tea</h1>
            <p className="text-xl md:text-2xl max-w-xl mx-auto font-light drop-shadow">A sensory journey in every sip, rooted in heritage.</p>
          </motion.div>

          <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute">
            <h2 className="text-5xl md:text-7xl font-serif mb-4 drop-shadow-lg text-vento-gold-dark">Crafted in Every Leaf</h2>
            <p className="text-xl md:text-2xl max-w-xl mx-auto font-light drop-shadow">Handpicked from the finest estates to ensure pristine quality.</p>
          </motion.div>

          <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute">
            <h2 className="text-5xl md:text-7xl font-serif mb-4 drop-shadow-lg text-vento-gold-dark">Directly To Your Cup</h2>
            <p className="text-xl md:text-2xl max-w-xl mx-auto font-light drop-shadow mb-8">No middlemen, just freshness delivered fast.</p>
            <a href="#shop" className="inline-block bg-vento-gold hover:bg-vento-gold-dark text-vento-forest font-semibold py-3 px-8 rounded-full transition-colors">
              Explore Our Collection
            </a>
          </motion.div>

        </div>
        
      </div>
    </div>
  );
}
