export default function TrustStrip() {
  return (
    <div className="relative py-12 px-4 overflow-hidden">
      <img src="/brand/trust-products.jpg" alt="Vento Trust" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-vento-forest/85"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-wrap justify-center md:justify-around gap-10 text-center text-vento-gold">
        <div>
          <p className="text-4xl md:text-5xl font-serif font-bold">10k+</p>
          <p className="text-sm md:text-base tracking-widest uppercase mt-2">Happy Customers</p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-serif font-bold">1M+</p>
          <p className="text-sm md:text-base tracking-widest uppercase mt-2">Cups Brewed</p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-serif font-bold">100%</p>
          <p className="text-sm md:text-base tracking-widest uppercase mt-2">Natural Ingredients</p>
        </div>
      </div>
    </div>
  );
}
