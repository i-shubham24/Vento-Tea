import { Link } from 'react-router-dom';

export default function DeliveryBanner() {
  return (
    <section className="relative h-[50vh] md:h-80 overflow-hidden flex items-center justify-center text-white">
      <Link to="/shop" className="absolute inset-0 z-20" aria-label="Shop Now for Fast Delivery"></Link>
      <img src="/brand/delivery.jpg" alt="Fast Delivery" className="absolute inset-0 w-full h-full object-cover md:object-center object-left" />
    </section>
  );
}
