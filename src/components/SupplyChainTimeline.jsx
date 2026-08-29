import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Leaf, PackageCheck, Truck } from 'lucide-react';
import { Stagger, StaggerItem } from './Stagger';
import { EASE_OUT_SINE } from '../lib/motion';

const steps = [
  {
    icon: <Leaf size={32} />,
    title: "Plucked at Source",
    description: "Finest leaves from Assam & Darjeeling estates.",
  },
  {
    icon: <PackageCheck size={32} />,
    title: "Packed Fresh",
    description: "Vacuum sealed immediately, no middlemen involved.",
  },
  {
    icon: <Truck size={32} />,
    title: "Delivered Fast",
    description: "Directly to your door in 2-4 business days.",
  },
];

export default function SupplyChainTimeline() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Gentle parallax drift on the estate photograph.
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <motion.img
          src="/brand/vento-promise.jpg"
          alt="Vento Promise Background"
          style={{ y: bgY }}
          className="w-full h-[120%] -top-[10%] absolute inset-x-0 object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-vento-cream-dark/90 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif text-center text-vento-forest mb-16">The Vento Promise</h2>

        <div className="flex flex-col md:flex-row items-center justify-between relative">

          {/* Connector Line (Desktop) — draws left to right on scroll */}
          <motion.div
            className="hidden md:block absolute top-10 left-1/4 right-1/4 h-[2px] bg-vento-gold z-0 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: EASE_OUT_SINE, delay: 0.2 }}
          ></motion.div>

          {/* Connector Line (Mobile) — draws top to bottom */}
          <motion.div
            className="md:hidden absolute top-0 bottom-0 left-1/2 w-[2px] bg-vento-gold -translate-x-1/2 z-0 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.2, ease: EASE_OUT_SINE, delay: 0.2 }}
          ></motion.div>

          <Stagger className="flex flex-col md:flex-row items-center justify-between w-full">
            {steps.map((step) => (
              <StaggerItem key={step.title} className="relative z-10 w-full md:w-1/3 px-4">
                <div className="flex flex-col items-center text-center py-8 md:py-0 group">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-vento-forest shadow-lg border-4 border-vento-gold transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-vento-forest mb-2">{step.title}</h3>
                  <p className="text-gray-700 font-medium max-w-[220px]">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

        </div>
      </div>
    </section>
  );
}
