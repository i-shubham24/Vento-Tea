export default function OurStorySection() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
      <div className="w-full md:w-1/2">
        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
          <img src="/brand/journey.jpg" alt="Vento Journey" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl md:text-5xl font-serif text-vento-forest mb-6">A Journey of Passion</h2>
        <div className="w-20 h-1 bg-vento-gold mb-6"></div>
        <p className="text-gray-600 mb-4 text-lg leading-relaxed">
          It started with a simple belief: every cup of tea should tell a story. From the misty hills of Assam to the vibrant spice markets of Kerala, we set out to capture the true essence of Indian Chai.
        </p>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Vento is more than a brand; it's a celebration of heritage, crafted by master blenders who pour their soul into every batch. Experience the aroma, taste the passion, and let the journey unfold in your cup.
        </p>
        <button className="bg-vento-forest text-vento-cream hover:bg-vento-forest-light font-semibold py-3 px-8 rounded-full transition-colors">
          Discover Our Heritage
        </button>
      </div>
    </section>
  );
}
