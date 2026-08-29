import { Link } from 'react-router-dom';

export default function Categories() {
  const categories = [
    { name: "Premium Chai", image: "/brand/media_1787991645076.jpg", link: "/shop" },
    { name: "Wellness Blends", image: "/brand/media_1787991645006.jpg", link: "/shop" },
    { name: "Green Teas", image: "/brand/media_1787991645100.jpg", link: "/shop" },
    { name: "Black Teas", image: "/brand/media_1787991645120.jpg", link: "/shop" },
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-vento-forest mb-4">Browse by Category</h2>
        <div className="w-20 h-1 bg-vento-gold mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <Link to={cat.link} key={idx} className="group flex flex-col items-center">
            <div className="w-full aspect-square rounded-full overflow-hidden shadow-md border-4 border-vento-cream transition-transform duration-500 group-hover:scale-105 group-hover:border-vento-gold relative mb-4">
              <div className="absolute inset-0 bg-vento-forest/10 group-hover:bg-transparent transition-colors z-10"></div>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-vento-forest group-hover:text-vento-gold-dark transition-colors text-center">{cat.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
