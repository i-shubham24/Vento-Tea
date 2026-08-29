import { Fragment } from 'react';
import { motion } from 'framer-motion';

// Subtle word-by-word masked rise for section headings — the same effect the
// previous site used for its `.split` headlines (words wipe up behind a mask).
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const wordInner = {
  hidden: { y: '120%' },
  visible: { y: '0%', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * <SplitReveal text="Our Signature Blends" as="h2" className="..." />
 * Renders `as` (default h2) with each word masked, revealing on scroll (once).
 */
export default function SplitReveal({ text, as = 'h2', className = '', margin = '-8% 0px' }) {
  const MotionTag = motion[as] || motion.h2;
  const words = String(text).trim().split(/\s+/);

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: '0.14em', marginBottom: '-0.14em' }}
            aria-hidden="true"
          >
            <motion.span className="inline-block will-change-transform" variants={wordInner}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
