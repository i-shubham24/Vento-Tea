import { useState, useEffect } from 'react';

export default function WeeklyOffers() {
  const [timeLeft, setTimeLeft] = useState({ hours: 48, minutes: 23, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-vento-forest text-white py-16 px-4 my-16 relative overflow-hidden border-y-[6px] border-vento-gold">
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
         <img src="/brand/media_1787991645085.jpg" className="w-full h-full object-cover" alt="" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h2 className="text-sm tracking-[0.2em] text-vento-gold font-bold uppercase mb-2">Deal of the Week</h2>
          <h3 className="text-4xl md:text-5xl font-serif mb-4">Buy 2, Get 1 Free!</h3>
          <p className="text-gray-300 text-lg max-w-lg">Stock up on your favorite blends. Add any 3 items to your cart, and the lowest priced item is absolutely free.</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-vento-gold/30 flex flex-col items-center min-w-[300px]">
          <p className="text-vento-gold font-semibold mb-4">Offer Ends In:</p>
          <div className="flex gap-4 text-center">
            <div className="flex flex-col">
              <span className="text-4xl font-serif font-bold w-16">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-xs uppercase tracking-widest text-gray-400 mt-1">Hours</span>
            </div>
            <span className="text-4xl font-serif font-bold text-vento-gold">:</span>
            <div className="flex flex-col">
              <span className="text-4xl font-serif font-bold w-16">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-xs uppercase tracking-widest text-gray-400 mt-1">Mins</span>
            </div>
            <span className="text-4xl font-serif font-bold text-vento-gold">:</span>
            <div className="flex flex-col">
              <span className="text-4xl font-serif font-bold w-16">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-xs uppercase tracking-widest text-gray-400 mt-1">Secs</span>
            </div>
          </div>
          <button className="w-full mt-6 bg-vento-gold hover:bg-white text-vento-forest font-bold py-3 px-8 rounded-full transition-colors shadow-lg">
            Claim Offer
          </button>
        </div>
      </div>
    </section>
  );
}
