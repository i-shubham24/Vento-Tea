import { motion } from 'framer-motion';
import { stagger, staggerItem } from '../lib/motion';

/**
 * Choreographs its children into a staggered fade-up as the group scrolls
 * into view. Wrap items in <StaggerItem> (or any motion child using the
 * `staggerItem` variant). Reveals once — no replay flicker on scroll-up.
 */
export function Stagger({ children, className = '', margin = '-60px' }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}
