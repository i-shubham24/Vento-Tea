import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import SplitReveal from './SplitReveal';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { 
      question: "Where are your teas sourced from?", 
      answer: "We source our premium teas directly from the finest estates in Assam and Darjeeling. By cutting out the middlemen, we ensure maximum freshness and fair wages for the farmers." 
    },
    { 
      question: "Are there any artificial flavors in your blends?", 
      answer: "Absolutely not! We pride ourselves on using 100% natural ingredients. Our spices are sourced from Kerala and blended naturally with our tea leaves." 
    },
    { 
      question: "How long does delivery take?", 
      answer: "We offer Next-Day Delivery for most metro cities. For other regions across India, standard delivery takes 2-4 business days." 
    },
    { 
      question: "What is the shelf life of Vento Tea?", 
      answer: "Our vacuum-sealed packaging ensures that the tea remains fresh for up to 18 months from the date of packaging. Once opened, we recommend storing it in an airtight container and consuming it within 6 months." 
    },
    { 
      question: "Do you offer bulk or wholesale pricing?", 
      answer: "Yes, we do! If you're a cafe, restaurant, or just looking to buy in bulk for an event, please reach out to us via our Contact page for special wholesale rates." 
    }
  ];

  return (
    <section className="py-24 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <SplitReveal as="h2" className="text-4xl font-serif text-vento-forest mb-4" text="Frequently Asked Questions" />
        <div className="w-20 h-1 bg-vento-gold mx-auto mb-6"></div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === idx ? 'border-vento-gold bg-vento-cream/30' : 'border-gray-200 bg-white hover:border-vento-gold/50'}`}
          >
            <button 
              className="w-full px-6 py-5 flex items-center justify-between font-semibold text-vento-forest text-left focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            >
              <span>{faq.question}</span>
              <ChevronDown 
                className={`transform transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-vento-gold' : 'text-gray-400'}`} 
                size={20} 
              />
            </button>
            
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === idx ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
