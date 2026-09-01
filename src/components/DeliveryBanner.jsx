import { Link } from 'react-router-dom';

export default function DeliveryBanner() {
  return (
    <section className="relative h-[50vh] md:h-80 overflow-hidden flex items-center justify-center text-white">
      <Link to="/shop" className="absolute inset-0 z-20" aria-label="Shop Now for Fast Delivery"></Link>
      <img src="/brand/delivery.jpg" alt="Fast Delivery" className="absolute inset-0 w-full h-full object-cover md:object-center object-left" />
      {/* Subtle gradient at the bottom just in case we still want to show the real HTML button, but if we want it clickable everywhere we can just wrap it in a Link */}
      
      {/* 
        The background image itself has text and a button. 
        We make the entire section clickable via the absolute Link above.
        We'll keep the HTML button centered at the bottom for accessibility and explicit call-to-action if needed,
        but since the user said "just keep shop now button", maybe they mean the HTML one?
        Let's put an HTML button at the bottom center just in case. 
      */}
      <div className="absolute z-10 bottom-4 md:bottom-8 left-0 w-full text-center pointer-events-none">
        <span className="inline-block bg-vento-gold hover:bg-white text-vento-forest font-bold py-3 px-8 rounded-full transition-colors shadow-lg pointer-events-auto shadow-black/20">
          Shop Now
        </span>
      </div>
    </section>
  );
}
