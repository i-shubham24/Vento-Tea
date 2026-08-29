import { Leaf } from 'lucide-react';

export default function Marquee() {
  const words = [
    "100% Natural", "Direct from Assam", "No Artificial Colors", 
    "Handpicked Leaves", "Premium Quality", "Vacuum Sealed"
  ];
  
  // Duplicate array to ensure seamless infinite scroll
  const duplicatedWords = [...words, ...words, ...words, ...words];

  return (
    <div className="bg-vento-forest text-vento-gold py-4 overflow-hidden flex whitespace-nowrap border-y border-vento-gold/20">
      <div className="animate-marquee">
        {duplicatedWords.map((word, idx) => (
          <div key={idx} className="flex items-center mx-8 text-sm md:text-base font-semibold tracking-wide uppercase">
            <Leaf size={16} className="mr-3" />
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}
