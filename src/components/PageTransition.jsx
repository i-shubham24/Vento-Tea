import { motion } from 'framer-motion';

/**
 * Tier 3 — PageTransition: smooth fade between routes.
 * Wrapped by AnimatedRoutes with AnimatePresence mode="wait".
 * Respects reducedMotion via MotionConfig.
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
