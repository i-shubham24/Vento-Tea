/**
 * Full-width client-designed banner image, framed as an editorial band.
 * Used for the marketing graphics the client supplied (process, trust,
 * delivery, farmer promise, etc.). Wrap in <ScrollReveal> at the call site.
 */
export default function ImageBand({ src, alt, maxWidth = 'max-w-7xl', className = '' }) {
  return (
    <div className={`px-4 md:px-8 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${maxWidth} w-full mx-auto h-auto rounded-xl shadow-xl border border-vento-cream-dark`}
      />
    </div>
  );
}
