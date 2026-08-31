import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, Check } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 1,
    title: "When do you usually drink tea?",
    options: [
      { id: 'morning', label: "Morning Boost" },
      { id: 'afternoon', label: "Afternoon Pick-me-up" },
      { id: 'evening', label: "Evening Unwind" },
    ]
  },
  {
    id: 2,
    title: "What's your preferred flavor profile?",
    options: [
      { id: 'strong', label: "Strong & Kadak" },
      { id: 'smooth', label: "Smooth & Aromatic" },
      { id: 'spiced', label: "Spiced & Zesty" },
    ]
  }
];

export default function TeaMatchmaker() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const { addItem, setIsOpen: setCartOpen } = useCart();

  const handleOpen = () => setIsOpen(true);
  
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(0);
      setAnswers({});
      setResult(null);
    }, 300);
  };

  const handleAnswer = (questionId, optionId) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    // Simple mock logic for matching
    const profile = finalAnswers[2]; // strong, smooth, spiced
    
    let matchedSlug = 'gold-regular';
    if (profile === 'strong') matchedSlug = 'kadak-chai';
    if (profile === 'spiced') matchedSlug = 'punjabi-masala';
    if (profile === 'smooth') matchedSlug = 'gold-long-leaf';

    const product = mockProducts.find(p => p.slug === matchedSlug) || mockProducts[0];
    setResult(product);
    setStep(step + 1);
  };

  const handleAddToCart = () => {
    if (result) {
      addItem(result, result.weights[0]);
      handleClose();
      setTimeout(() => setCartOpen(true), 400);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 left-6 z-50 bg-vento-forest text-vento-cream p-4 rounded-full shadow-2xl hover:scale-105 hover:bg-green-900 transition-all flex items-center gap-2 group border-2 border-vento-gold/20"
        aria-label="Find Your Perfect Tea"
      >
        <Sparkles size={20} className="text-vento-gold" />
        <span className="font-semibold max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out">
          Matchmaker
        </span>
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-vento-cream rounded-xl shadow-2xl z-[101] overflow-hidden border border-vento-gold/20"
            >
              <div className="bg-vento-forest p-5 text-center relative shrink-0">
                {step > 0 && (
                  <button 
                    onClick={() => setStep(step - 1)}
                    className="absolute top-4 left-4 text-vento-cream/70 hover:text-vento-gold transition-colors flex items-center text-sm font-semibold"
                  >
                    &larr; Back
                  </button>
                )}
                <button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-vento-cream/70 hover:text-vento-gold transition-colors"
                >
                  <X className="hover:rotate-90 transition-transform duration-300" size={24} />
                </button>
                <Sparkles size={24} className="text-vento-gold mx-auto mb-2 mt-2" />
                <h3 className="text-xl font-serif text-vento-cream">Find Your Perfect Cup</h3>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 overflow-y-auto max-h-[75vh]">
                <AnimatePresence mode="wait">
                  {step < QUESTIONS.length ? (
                    <motion.div
                      key={step}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-xs font-bold text-vento-gold tracking-widest uppercase mb-3">
                        Question {step + 1} of {QUESTIONS.length}
                      </p>
                      <h4 className="text-2xl font-serif text-vento-forest mb-5">
                        {QUESTIONS[step].title}
                      </h4>
                      <div className="space-y-3">
                        {QUESTIONS[step].options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleAnswer(QUESTIONS[step].id, opt.id)}
                            className="w-full text-left p-4 rounded-xl border border-vento-forest/20 hover:border-vento-gold hover:bg-white transition-all text-vento-forest font-medium flex items-center justify-between group"
                          >
                            {opt.label}
                            <ArrowRight size={18} className="text-vento-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center"
                    >
                      <p className="text-xs font-bold text-vento-gold tracking-widest uppercase mb-2">
                        Your Perfect Match
                      </p>
                      <h4 className="text-2xl font-serif text-vento-forest mb-4">
                        {result?.name}
                      </h4>
                      
                      {/* Reduced height of the image to prevent overflowing the screen */}
                      <div className="h-40 md:h-48 rounded-2xl overflow-hidden mb-5 bg-white flex items-center justify-center p-2 shadow-inner">
                        <img src={result?.images[0]} alt={result?.name} className="h-full object-contain mix-blend-multiply" />
                      </div>

                      <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                        {result?.description}
                      </p>

                      <div className="flex gap-3">
                        <button
                          onClick={handleAddToCart}
                          className="flex-1 bg-vento-gold hover:bg-vento-gold-dark text-vento-forest font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Check size={18} /> Add to Cart
                        </button>
                        <Link
                          to={`/product/${result?.slug}`}
                          onClick={handleClose}
                          className="px-5 bg-white border border-vento-forest text-vento-forest hover:bg-vento-forest hover:text-white font-bold py-3 rounded-full transition-colors text-sm"
                        >
                          Details
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
