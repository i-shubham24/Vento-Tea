import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LEAF_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2C7.58 2 4 5.58 4 10c0 4.42 8 12 8 12s8-7.58 8-12c0-4.42-3.58-8-8-8zm0 18c-3.15-4.22-6-8.55-6-10 0-3.31 2.69-6 6-6s6 2.69 6 6c0 1.45-2.85 5.78-6 10z" />
    <path d="M12 4c-3.31 0-6 2.69-6 6 0 1.45 2.85 5.78 6 10 3.15-4.22 6-8.55 6-10 0-3.31-2.69-6-6-6z" opacity="0.4" />
  </svg>
);

export default function FloatingLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // Generate initial leaves
    const initialLeaves = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * -100, // start above screen
      scale: Math.random() * 0.8 + 0.4,
      rotation: Math.random() * 360,
      duration: Math.random() * 15 + 15, // 15-30 seconds to fall
      delay: Math.random() * 5
    }));
    setLeaves(initialLeaves);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <AnimatePresence>
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            initial={{ 
              x: `${leaf.x}vw`, 
              y: `${leaf.y}vh`, 
              rotate: leaf.rotation,
              opacity: 0
            }}
            animate={{ 
              y: '120vh', 
              rotate: leaf.rotation + 360,
              opacity: [0, 0.15, 0.15, 0] // Fade in, stay, fade out
            }}
            transition={{ 
              duration: leaf.duration, 
              repeat: Infinity,
              delay: leaf.delay,
              ease: "linear"
            }}
            className="absolute text-vento-forest"
            style={{ width: `${leaf.scale * 30}px`, height: `${leaf.scale * 30}px` }}
          >
            {LEAF_SVG}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
