export default function ProcessSection() {
  return (
    <section className="py-24 bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <h2 className="text-4xl md:text-5xl font-serif text-vento-forest mb-6">Our Process</h2>
          <div className="w-20 h-1 bg-vento-gold mb-8"></div>
          
          <div className="space-y-8">
            <div className="border-l-2 border-vento-gold pl-6 py-2">
              <h3 className="text-2xl font-serif text-vento-forest font-semibold mb-2">1. Handpicking</h3>
              <p className="text-gray-600">Only the tender two leaves and a bud are delicately plucked by experienced artisans, ensuring the finest flavor profile.</p>
            </div>
            <div className="border-l-2 border-vento-gold pl-6 py-2">
              <h3 className="text-2xl font-serif text-vento-forest font-semibold mb-2">2. Processing</h3>
              <p className="text-gray-600">The leaves undergo precise withering, rolling, oxidation, and drying in state-of-the-art facilities to lock in the aroma.</p>
            </div>
            <div className="border-l-2 border-vento-gold pl-6 py-2">
              <h3 className="text-2xl font-serif text-vento-forest font-semibold mb-2">3. Tasting & Blending</h3>
              <p className="text-gray-600">Our master blenders taste hundreds of cups to create the perfect signature Vento blends you love.</p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <div className="rounded-[40px] overflow-hidden shadow-2xl relative">
            <img src="/brand/process.jpg" alt="Tea Processing" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
