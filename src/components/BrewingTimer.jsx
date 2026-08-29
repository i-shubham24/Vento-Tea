import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, RefreshCcw, Coffee } from 'lucide-react';

export default function BrewingTimer({ category = 'Whole Leaf' }) {
  // Determine optimal brewing time and temp based on category
  const getBrewSettings = (cat) => {
    switch (cat) {
      case 'Whole Leaf': return { time: 300, temp: '95°C' }; // 5 mins
      case 'Masala Chai': return { time: 300, temp: '100°C' }; // 5 mins
      case 'Everyday Chai': return { time: 240, temp: '100°C' }; // 4 mins
      default: return { time: 180, temp: '90°C' }; // 3 mins fallback
    }
  };

  const settings = getBrewSettings(category);
  const totalSeconds = settings.time;

  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(settings.time);
    setIsActive(false);
  }, [category, settings.time]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // Optional: Play a sound here
      try {
        const audio = new Audio('https://teawebsite-b65ea.web.app/assets/chime.mp3'); // Fallback or harmless failure
        audio.play().catch(() => {});
      } catch (e) {}
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(totalSeconds);
  };

  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white border border-vento-gold/30 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6 mt-8">
      {/* Circular Progress */}
      <div className="relative w-32 h-32 flex-shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="transparent"
            stroke="#f3f4f6"
            strokeWidth="8"
          />
          <motion.circle
            cx="50" cy="50" r="45"
            fill="transparent"
            stroke="#85590C"
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            strokeLinecap="round"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {timeLeft === 0 ? (
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="text-vento-gold flex flex-col items-center"
            >
              <Coffee size={28} className="mb-1 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-vento-forest text-center leading-tight">Ready</span>
            </motion.div>
          ) : (
            <span className="text-2xl font-serif font-bold text-vento-forest">{formatTime(timeLeft)}</span>
          )}
        </div>
      </div>

      {/* Info & Controls */}
      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-xl font-serif text-vento-forest font-semibold mb-2 flex items-center justify-center sm:justify-start gap-2">
          <Coffee size={20} className="text-vento-gold" />
          {timeLeft === 0 ? "Your tea is perfectly brewed!" : "Smart Brewing Timer"}
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          {timeLeft === 0 
            ? "Carefully remove the leaves and enjoy your cup." 
            : <span>Optimal brew for {category}: <strong>{formatTime(settings.time)}</strong> at <strong>{settings.temp}</strong>.</span>
          }
        </p>
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-colors ${
              isActive 
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-vento-forest text-vento-cream hover:bg-green-900'
            }`}
          >
            {isActive ? <Square size={16} /> : <Play size={16} />}
            {isActive ? 'Pause' : (timeLeft === totalSeconds ? 'Start Timer' : 'Resume')}
          </button>
          
          <button
            onClick={resetTimer}
            className="p-2.5 text-gray-500 hover:text-vento-forest bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            title="Reset Timer"
          >
            <RefreshCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
