import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { EASE_OUT_SINE } from '../lib/motion';

/**
 * Editorial page banner shared across the inner pages.
 * Parallax estate photograph, a gold eyebrow + rule, and a staggered
 * headline entrance. `eyebrow` is optional — omit for a bare title.
 */
export default function PageBanner({ title, subtitle, imagePath, eyebrow, compact = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '28%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.1, 1.28]);

  return (
    <div ref={ref} className={`relative w-full overflow-hidden mb-12 shadow-md bg-vento-forest ${compact ? 'h-[38vh] md:h-[44vh]' : 'h-[65vh] md:h-[80vh]'}`}>
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-x-0 -top-[15%] h-[130%] bg-cover bg-center will-change-transform"
      >
        <div style={{ backgroundImage: `url('${imagePath || '/brand/media_1787991645006.jpg'}')` }} className="w-full h-full bg-cover bg-center"></div>
      </motion.div>

      {/* Cinematic grade + vignette for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-vento-forest/90 via-vento-forest/60 to-black/30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-vento-forest/80 via-transparent to-transparent"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-4 pt-32 w-full">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_SINE }}
              className="text-vento-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-sans"
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_SINE, delay: eyebrow ? 0.1 : 0 }}
            className="text-5xl md:text-7xl font-serif text-white mb-5 leading-[0.98]"
          >
            {title}
          </motion.h1>

          

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_SINE, delay: 0.35 }}
              className="text-gray-100 max-w-xl text-base md:text-lg font-medium leading-relaxed drop-shadow-md"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
