import SEO from '../components/SEO';
import PageBanner from '../components/PageBanner';
import { Stagger, StaggerItem } from '../components/Stagger';
import { Star, Quote } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Aarti Sharma",
      location: "New Delhi",
      rating: 5,
      text: "Vento's Kadak Chai is my absolute favorite. It has that perfect strong flavor I need to start my mornings. Better than anything else in the local market!",
      date: "August 10, 2026"
    },
    {
      id: 2,
      name: "Rahul Desai",
      location: "Mumbai",
      rating: 5,
      text: "The Gold Long Leaf tea is exceptional. You can literally smell the freshness of Assam. A premium experience from the packaging to the last drop.",
      date: "August 2, 2026"
    },
    {
      id: 3,
      name: "Priya V.",
      location: "Bangalore",
      rating: 4,
      text: "I bought the Punjabi Masala Tea and I love the authentic spices. It tastes exactly like the chai my grandmother used to make. Highly recommended.",
      date: "July 28, 2026"
    },
    {
      id: 4,
      name: "Siddharth K.",
      location: "Pune",
      rating: 5,
      text: "Fast delivery, beautifully sealed packaging, and incredible aroma. Vento is definitely the best local tea business I've ordered from online.",
      date: "July 15, 2026"
    },
    {
      id: 5,
      name: "Neha Gupta",
      location: "Kolkata",
      rating: 5,
      text: "Being from the east, I am very picky about my tea. Vento Gold exceeded my expectations. Pure leaves and no dust.",
      date: "July 5, 2026"
    },
    {
      id: 6,
      name: "Anand M.",
      location: "Chennai",
      rating: 5,
      text: "Excellent service and the wellness green tea range has become a staple in my diet. It feels very clean and natural.",
      date: "June 20, 2026"
    }
  ];

  return (
    <div className="pb-24 bg-vento-cream min-h-screen">
      <SEO 
        title="Customer Reviews & Testimonials" 
        description="Read what our happy customers have to say about Vento Tea's premium blends. See why we are the #1 local tea business in India." 
        keywords="tea reviews, Vento tea customer reviews, best tea brand reviews India, buy premium tea" 
      />

      <PageBanner
        eyebrow="Loved across India"
        title="Customer Reviews"
        subtitle="Don't just take our word for it. Hear from tea lovers across the country."
        imagePath="/brand/media_1787991645076.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <StaggerItem key={review.id} className="h-full">
              <div className="relative bg-white p-8 rounded-xl shadow-sm border border-vento-cream-dark h-full flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <Quote size={40} className="absolute top-6 right-6 text-vento-gold/15" fill="currentColor" />
                <div className="flex text-vento-gold mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 flex-grow relative z-10">"{review.text}"</p>
                <div className="mt-auto border-t border-gray-100 pt-4">
                  <p className="font-bold text-vento-forest">{review.name}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500">{review.location}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
