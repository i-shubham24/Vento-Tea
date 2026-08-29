import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function ClickLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newLeaves = [];
      const numLeaves = Math.floor(Math.random() * 2) + 5; // 5 to 6 leaves

      for (let i = 0; i < numLeaves; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 60 + 40; // Scatter distance between 40px and 100px
        const rotation = Math.random() * 360;

        newLeaves.push({
          id: Date.now() + Math.random() + i, // Unique ID
          x: e.clientX,
          y: e.clientY,
          angle,
          distance,
          rotation
        });
      }

      setLeaves((prev) => [...prev, ...newLeaves]);

      // Remove leaves from state after animation finishes (800ms)
      setTimeout(() => {
        setLeaves((prev) => prev.filter(leaf => !newLeaves.some(nl => nl.id === leaf.id)));
      }, 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {leaves.map((leaf) => {
          // Calculate scatter target using trigonometry
          const targetX = Math.cos(leaf.angle) * leaf.distance;
          // Add a slight positive bias to Y for "gravity" falling effect
          const targetY = (Math.sin(leaf.angle) * leaf.distance) + 30; 

          return (
            <motion.div
              key={leaf.id}
              initial={{ 
                opacity: 1, 
                scale: 0, 
                x: leaf.x - 12, // Offset by half the icon size (24/2) to center on cursor
                y: leaf.y - 12,
                rotate: 0 
              }}
              animate={{ 
                opacity: 0, 
                scale: Math.random() * 0.5 + 0.7, // Random scale between 0.7 and 1.2
                x: leaf.x - 12 + targetX, 
                y: leaf.y - 12 + targetY,
                rotate: leaf.rotation + (Math.random() > 0.5 ? 90 : -90) // Spin while scattering
              }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              className="absolute text-vento-forest drop-shadow-sm"
              style={{ color: '#2F5233' }} // Rich green tea leaf color
            >
              <Leaf size={24} fill="currentColor" strokeWidth={1} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
