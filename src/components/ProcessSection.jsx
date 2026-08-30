export default function ProcessSection() {
  return (
    <section className="py-24 bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <h2 className="text-4xl md:text-5xl font-serif text-vento-forest mb-6">How We Make Your Tea</h2>
          <div className="w-20 h-1 bg-vento-gold mb-8"></div>
          
          <div className="space-y-6">
            <div className="border-l-2 border-vento-gold pl-6 py-2">
              <h3 className="text-2xl font-serif text-vento-forest font-semibold mb-2">1. Carefully Picked</h3>
              <p className="text-gray-600">Handpicked at the peak of freshness to ensure only the finest two leaves and a bud.</p>
            </div>
            <div className="border-l-2 border-vento-gold pl-6 py-2">
              <h3 className="text-2xl font-serif text-vento-forest font-semibold mb-2">2. Naturally Processed</h3>
              <p className="text-gray-600">Withered and rolled by time-honoured methods that keep the leaf's own character intact.</p>
            </div>
            <div className="border-l-2 border-vento-gold pl-6 py-2">
              <h3 className="text-2xl font-serif text-vento-forest font-semibold mb-2">3. Sorted & Cleaned</h3>
              <p className="text-gray-600">Expertly graded and cleaned, so every spoonful pours the same strength and colour.</p>
            </div>
            <div className="border-l-2 border-vento-gold pl-6 py-2">
              <h3 className="text-2xl font-serif text-vento-forest font-semibold mb-2">4. Packed & Sealed</h3>
              <p className="text-gray-600">Sealed at origin to lock in freshness, so the pack opens on the aroma of the garden.</p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <div className="rounded-[40px] overflow-hidden shadow-2xl relative bg-vento-forest/5">
            <img src="https://teawebsite-b65ea.web.app/images/web/craft-harvest.webp" alt="Tea Processing" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
