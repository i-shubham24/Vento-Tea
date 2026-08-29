export default function FarmerPromise() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="w-full md:w-1/2">
        <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
           {/* Photo of farmers */}
          <div className="absolute inset-0 bg-vento-forest/20 mix-blend-overlay"></div>
          <img src="/brand/farmer-promise.jpg" alt="Tea farmers" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl font-serif text-vento-forest mb-6">Empowering Our Farmers</h2>
        <p className="text-gray-600 mb-6 text-lg">
          At Vento, we believe the best tea starts with the people who grow it. We work directly with farmers in Assam and Darjeeling, ensuring fair wages and sustainable practices.
        </p>
        <ul className="space-y-4 mb-8 text-gray-700">
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 bg-vento-gold rounded-full"></span>
            Direct Trade, Fair Pricing
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 bg-vento-gold rounded-full"></span>
            Sustainable Agriculture
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 bg-vento-gold rounded-full"></span>
            Community Development
          </li>
        </ul>
        <button className="border-2 border-vento-forest text-vento-forest hover:bg-vento-forest hover:text-vento-cream font-semibold py-3 px-8 rounded-full transition-colors">
          Read Our Story
        </button>
      </div>
    </section>
  );
}
