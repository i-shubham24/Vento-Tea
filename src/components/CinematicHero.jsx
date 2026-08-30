import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion, easeOut } from 'framer-motion';

// The exact hero film + poster from the previous Vento site, self-hosted so the
// blob fetch is same-origin (CORS-safe) and every scroll seek is instant.
const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;
const HERO_SRC = `/brand/hero/hero-${IS_MOBILE ? '720' : '1080'}.mp4`;
const HERO_POSTER = '/brand/hero/poster.jpg';

const CRAFTED_WORDS = ['Crafted', 'in', 'Every', 'Leaf.'];

/**
 * Cinematic hero — a faithful port of the previous site's 800vh scroll-scrubbed
 * film. The overlay timeline (0..1 of scroll) matches the original 0..100 units:
 *   VENTO TEA departs ~11%, "Crafted in Every Leaf" rises word-by-word ~17-33%,
 *   "Directly To Your Cup" scales in with a rule draw ~35-50%, film dissolves ~91%.
 */
export default function CinematicHero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();

  // Progress (0..1) across the 800vh hero, computed manually from the
  // container's own position — framer's target-based useScroll was
  // saturating early here and compressing all stages into the first screen.
  const p = useMotionValue(0);

  // Scroll hint retires as the journey begins.
  const hintOpacity = useTransform(p, [0.01, 0.035], [1, 0]);

  // Stage 1 - VENTO TEA (visible at rest, departs ~11-16%)
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
  const sub2op = useTransform(p, [0.21, 0.245], [0, 1]);
  const sub2y = useTransform(p, [0.21, 0.245], [26, 0]);

  // Stage 3
  const op3 = useTransform(p, [0.35, 0.395, 0.46, 0.50], [0, 1, 1, 0]);
  const y3 = useTransform(p, [0.46, 0.50], [0, -50]);
  const scale3 = useTransform(p, [0.35, 0.44], [1.06, 1], { ease: easeOut });
  const ruleScaleX = useTransform(p, [0.375, 0.415], [0, 1]);

  // The film dissolves into the page near the very end.
  

  // Fetch the whole film once (blob) so every scroll seek is instant — this is
  // what makes the scrub buttery rather than janky off a streamed file.
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

  // One rAF loop drives the overlay progress (p) and the frame-quantised
  // (30p) video scrub, both off the container's live scroll position.
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container) return;
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
    const tick = (now) => {
      const dt = now - last; last = now;
      const range = container.offsetHeight - window.innerHeight;
      const prog = range > 0
        ? Math.min(1, Math.max(0, -container.getBoundingClientRect().top / range))
        : 0;
      p.set(prog);
      if (!reduce) {
        if (Math.abs(prog - playhead) < 0.003) {
          playhead = prog;
          seekTo(playhead, true);
        } else {
          playhead += (prog - playhead) * (1 - Math.exp(-dt / 42));
          seekTo(playhead, false);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, p]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-vento-forest" style={{ color: '#FAF7F0' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Scroll-scrubbed background film (src set from blob in effect) */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'translateZ(0)' }}
        />

        {/* Exact two-layer vignette from the original */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(18,32,25,0.34) 0%, rgba(18,32,25,0.42) 55%, rgba(18,32,25,0.62) 100%), linear-gradient(to bottom, rgba(18,32,25,0.55), rgba(18,32,25,0.12) 22%, rgba(18,32,25,0.16) 64%, rgba(18,32,25,0.72))',
          }}
        ></div>

        {/* ---- Stage 1: VENTO TEA ---- */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-[6vw] pointer-events-none">
          <motion.div style={{ opacity: op1, y: y1, scale: scale1 }}>
            <p
              className="font-sans uppercase"
              style={{ fontSize: '0.72rem', letterSpacing: '0.55em', color: '#F0DCA8', marginBottom: '3rem' }}
            >
              Premium Indian Tea
            </p>
            <h1
              className="font-serif"
              style={{ fontSize: 'clamp(4.2rem, 15vw, 13rem)', lineHeight: 0.98, letterSpacing: '0.06em', fontWeight: 500 }}
            >
              VENTO TEA
            </h1>
            <p
              className="font-serif italic"
              style={{ marginTop: '2.4rem', fontSize: 'clamp(1.05rem, 2vw, 1.5rem)', color: 'rgba(250,247,240,0.88)' }}
            >
              The taste of tradition, poured slowly.
            </p>
          </motion.div>
        </div>

        {/* ---- Stage 2: Crafted in Every Leaf (word by word) ---- */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-[6vw] pointer-events-none">
          <motion.div style={{ opacity: c2op, y: c2y }} className="max-w-4xl">
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(2.6rem, 7.5vw, 6.5rem)', lineHeight: 1.08, fontWeight: 500 }}
              aria-label="Crafted in Every Leaf."
            >
              {CRAFTED_WORDS.map((word, i) => (
                <span key={word} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
                  <motion.span className="inline-block" style={{ y: words[i] }}>{word}</motion.span>
                  {i < CRAFTED_WORDS.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h2>
            <motion.p
              style={{ opacity: sub2op, y: sub2y, fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)', letterSpacing: '0.06em', fontWeight: 300, color: 'rgba(250,247,240,0.88)', marginTop: '2rem' }}
              className="font-sans"
            >
              From the finest tea gardens
            </motion.p>
          </motion.div>
        </div>

        {/* ---- Stage 3: Directly To Your Cup ---- */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-[6vw] pointer-events-none">
          <motion.div style={{ opacity: op3, y: y3 }} className="flex flex-col items-center">
            <motion.h2
              className="font-serif whitespace-nowrap"
              style={{ fontSize: 'clamp(1.2rem, 5.6vw, 5.5rem)', letterSpacing: '0.12em', fontWeight: 500, scale: scale3 }}
            >
              Directly To Your Cup
            </motion.h2>
            <motion.div style={{ scaleX: ruleScaleX }} className="origin-center" >
              <div style={{ width: '72px', height: '1px', background: '#E8C67C', marginTop: '2.4rem' }}></div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-[4.5vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none font-sans uppercase"
        >
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.5em', color: 'rgba(250,247,240,0.82)' }}>Scroll</span>
          <span className="hero-hint-line" style={{ width: '1px', height: '46px', background: 'linear-gradient(to bottom, #E8C67C, transparent)' }}></span>
        </motion.div>

        

      </div>
    </div>
  );
}
