import { Link } from 'react-router-dom';

export default function Categories() {
  const categories = [
    { name: "Premium Chai", image: "/brand/media_1787991645076.jpg", link: "/shop" },
    { name: "Wellness Blends", image: "/brand/media_1787991645006.jpg", link: "/shop" },
    { name: "Green Teas", image: "/brand/media_1787991645100.jpg", link: "/shop" },
    { name: "Black Teas", image: "/brand/media_1787991645120.jpg", link: "/shop" },
  ];

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif text-vento-forest mb-2">Curated Collection</h2>
        <p className="text-sm text-gray-500 mb-4">Hand-picked from our estates</p>
        <div className="w-16 h-1 bg-vento-gold mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, idx) => (
          <Link to={cat.link} key={idx} className="group relative rounded-xl overflow-hidden shadow-sm border border-vento-cream-dark bg-white hover:shadow-md transition-all">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img src={cat.image} alt={cat.name} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors"></div>
              <h3 className="absolute bottom-4 left-4 right-4 text-white font-serif font-bold text-xl md:text-2xl leading-tight drop-shadow">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
