import SplitReveal from './SplitReveal';

export default function OurStorySection() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
      <div className="w-full md:w-1/2">
        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative bg-vento-forest/5">
          <img src="https://teawebsite-b65ea.web.app/images/web/craft-pickers.webp" alt="Vento Journey" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <SplitReveal as="h2" className="text-4xl md:text-5xl font-serif text-vento-forest mb-6" text="Crafted to be Savoured." />
        <div className="w-20 h-1 bg-vento-gold mb-6"></div>
        <p className="text-gray-600 mb-4 text-lg leading-relaxed">
          Every expression of one obsession. Flavour without compromise. 
          Delivered fresh from the finest gardens of Assam and Darjeeling.
        </p>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          From the everyday kadak cup to whole gold long leaf, every Vento pack is sealed at origin and built on the same promise: the kadak, honest flavour India grew up on.
        </p>
        <button className="bg-vento-forest text-vento-cream hover:bg-vento-forest-light font-semibold py-3 px-8 rounded-full transition-colors">
          Discover Our Heritage
        </button>
      </div>
    </section>
  );
}
