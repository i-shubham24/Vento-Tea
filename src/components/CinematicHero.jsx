import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, easeOut } from 'framer-motion';

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;
const HERO_SRC = `/brand/hero/hero-${IS_MOBILE ? '720' : '1080'}.mp4`;
const HERO_POSTER = '/brand/hero/poster.jpg';

const CRAFTED_WORDS = ['Crafted', 'in', 'Every', 'Leaf.'];

export default function CinematicHero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();
  const REVIEWS = [
    { text: '“Aromatic and truly kadak — the best chai we’ve had at home.”', author: '— Priya S., Mumbai — Verified buyer', rating: '4.8' },
    { text: '“Whole leaves unfurl beautifully. Malt and honey in every cup.”', author: '— Arjun K., Delhi — Verified buyer', rating: '4.9' },
    { text: '“Cardamom opens first, then ginger bites gently. Perfect masala.”', author: '— Neha R., Pune — Verified buyer', rating: '4.8' },
    { text: '“Bold, dark, unapologetic. My morning ritual now.”', author: '— Rohit M., Bangalore — Verified buyer', rating: '4.9' },
  ];
  const [review] = useState(() => REVIEWS[Math.floor(Math.random() * REVIEWS.length)]);
  const [showReview, setShowReview] = useState(false);
  
  useEffect(() => {
    const show = setTimeout(() => setShowReview(true), 2000);
    const hide = setTimeout(() => setShowReview(false), 5000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  // Use battle-tested framer-motion scroll tracker to prevent NaN or desync on iOS
  const { scrollYProgress: p } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const hintOpacity = useTransform(p, [0.01, 0.035], [1, 0]);

  // Stage 1
  const op1 = useTransform(p, [0, 0.11, 0.16], [1, 1, 0]);
  const y1 = useTransform(p, [0.11, 0.16], [0, -70]);
  const scale1 = useTransform(p, [0.11, 0.16], [1, 1.04]);

  // Stage 2
  const c2op = useTransform(p, [0.17, 0.22, 0.29, 0.33], [0, 1, 1, 0]);
  const c2y = useTransform(p, [0.29, 0.33], [0, -60]);
  const w0 = useTransform(p, [0.175, 0.220], ['118%', '0%'], { ease: easeOut });
  const w1 = useTransform(p, [0.184, 0.229], ['118%', '0%'], { ease: easeOut });
  const w2 = useTransform(p, [0.193, 0.238], ['118%', '0%'], { ease: easeOut });
  const w3 = useTransform(p, [0.202, 0.247], ['118%', '0%'], { ease: easeOut });
  const words = [w0, w1, w2, w3];
  
  // Ensure stage 2 subtitle ALSO fades out so it doesn't overlap with stage 3
  const sub2op = useTransform(p, [0.21, 0.245, 0.29, 0.33], [0, 1, 1, 0]);
  const sub2y = useTransform(p, [0.21, 0.245], [26, 0]);

  // Stage 3
  const op3 = useTransform(p, [0.35, 0.395, 0.46, 0.50], [0, 1, 1, 0]);
  const y3 = useTransform(p, [0.46, 0.50], [0, -50]);
  const scale3 = useTransform(p, [0.35, 0.44], [1.06, 1], { ease: easeOut });
  const ruleScaleX = useTransform(p, [0.375, 0.415, 0.46, 0.50], [0, 1, 1, 0]);

  // The film dissolves into the page near the very end.
  const filmOpacity = useTransform(p, [0.91, 0.99], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let objectUrl;
    let cancelled = false;
    fetch(HERO_SRC)
      .then((r) => r.blob())
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
        video.load();
      })
      .catch(() => { if (!cancelled) { video.src = HERO_SRC; video.load(); } });
    return () => { cancelled = true; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, []);

  // Video scrub loop (decoupled from text opacity to avoid NaN bugs)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video) video.pause();
    const FPS = 30;
    let lastFrame = -1;
    let playhead = 0;
    let last = performance.now();
    let raf;
    const seekTo = (prog, force) => {
      if (!video) return;
      const d = video.duration;
      if (!d || Number.isNaN(d) || video.seeking) return;
      const t = Math.min(prog * d, d - 0.05);
      const frame = Math.round(t * FPS);
      if (!force && frame === lastFrame) return;
      lastFrame = frame;
      try { video.currentTime = t; } catch { /* not seekable yet */ }
    };
    
    // Subscribe to framer-motion's scroll value directly for the scrub
    const unsubscribe = p.on("change", (latest) => {
      if (reduce) return; // Skip scrub if reduced motion
      const now = performance.now();
      const dt = now - last;
      last = now;
      if (Math.abs(latest - playhead) < 0.003) {
        playhead = latest;
        seekTo(playhead, true);
      } else {
        playhead += (latest - playhead) * (1 - Math.exp(-dt / 42));
        seekTo(playhead, false);
      }
    });

    return () => unsubscribe();
  }, [reduce, p]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-vento-forest" style={{ color: '#FAF7F0' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'translateZ(0)', opacity: filmOpacity }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(18,32,25,0.34) 0%, rgba(18,32,25,0.42) 55%, rgba(18,32,25,0.62) 100%), linear-gradient(to bottom, rgba(18,32,25,0.55), rgba(18,32,25,0.12) 22%, rgba(18,32,25,0.16) 64%, rgba(18,32,25,0.72))',
          }}
        ></div>

        {/* ---- Stage 1: VENTO TEA ---- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-[6vw] pointer-events-none"
          style={{ opacity: op1, y: y1, scale: scale1, display: useTransform(op1, v => v > 0 ? 'flex' : 'none') }}
        >
          <p className="font-sans uppercase text-[0.65rem] md:text-[0.72rem] tracking-[0.4em] md:tracking-[0.55em] text-[#F0DCA8] mb-8 md:mb-12">
            Premium Indian Tea
          </p>
          <h1 className="font-serif text-[clamp(3.5rem,15vw,13rem)] leading-[0.98] tracking-[0.06em] font-medium">
            VENTO TEA
          </h1>
          <p className="font-serif italic mt-8 text-[clamp(0.95rem,2vw,1.5rem)] text-[#FAF7F0]/90">
            The taste of tradition, poured slowly.
          </p>
        </motion.div>

        {/* Tier 4: Floating review snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: showReview ? 1 : 0, y: showReview ? 0 : 20, scale: showReview ? 1 : 0.96 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="absolute bottom-20 right-4 md:right-8 lg:right-12 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-4 max-w-[280px] hidden md:block pointer-events-none"
        >
          <div className="flex items-center gap-1 text-[#F0DCA8] text-sm mb-1">★★★★★ <span className="text-vento-forest font-bold text-xs ml-1">{review.rating}</span></div>
          <p className="text-sm text-vento-forest leading-snug font-story italic">{review.text}</p>
          <p className="text-[11px] text-gray-500 mt-1 font-sans">{review.author}</p>
        </motion.div>

        {/* ---- Stage 2: Crafted in Every Leaf ---- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-[6vw] pointer-events-none"
          style={{ opacity: c2op, y: c2y, display: useTransform(c2op, v => v > 0 ? 'flex' : 'none') }}
        >
          <div className="max-w-4xl">
            <h2 className="font-serif text-[clamp(2.4rem,7.5vw,6.5rem)] leading-[1.08] font-medium" aria-label="Crafted in Every Leaf.">
              {CRAFTED_WORDS.map((word, i) => (
                <span key={word} className="inline-block overflow-hidden align-bottom px-1" aria-hidden="true">
                  <motion.span className="inline-block" style={{ y: words[i] }}>{word}</motion.span>
                </span>
              ))}
            </h2>
            <motion.p
              style={{ opacity: sub2op, y: sub2y }}
              className="font-sans text-[clamp(0.9rem,1.6vw,1.2rem)] tracking-[0.06em] font-light text-[#FAF7F0]/90 mt-8"
            >
              From the finest tea gardens
            </motion.p>
          </div>
        </motion.div>

        {/* ---- Stage 3: Directly To Your Cup ---- */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-[6vw] pointer-events-none"
          style={{ opacity: op3, y: y3, display: useTransform(op3, v => v > 0 ? 'flex' : 'none') }}
        >
          <motion.h2 className="font-serif text-[clamp(1.8rem,5.6vw,5.5rem)] tracking-[0.05em] md:tracking-[0.12em] font-medium" style={{ scale: scale3 }}>
            Directly To Your Cup
          </motion.h2>
          <motion.div style={{ scaleX: ruleScaleX }} className="origin-center mt-10" >
            <div className="w-[72px] h-[1px] bg-[#E8C67C]"></div>
          </motion.div>
        </motion.div>

        {/* Scroll down hint */}
        <motion.div style={{ opacity: hintOpacity }} className="absolute bottom-10 inset-x-0 flex justify-center pointer-events-none">
          <div className="flex flex-col items-center text-white/50 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest mb-2 font-bold">Scroll to brew</span>
            <div className="w-px h-6 bg-gradient-to-b from-white/50 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
