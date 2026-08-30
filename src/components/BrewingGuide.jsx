import SplitReveal from './SplitReveal';

export default function BrewingGuide() {
  return (
    <section className="bg-vento-cream-dark py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
          <SplitReveal as="h2" className="text-4xl md:text-5xl font-serif text-vento-forest mb-6" text="How to Brew" />
          <div className="w-20 h-1 bg-vento-gold mb-6"></div>
          <p className="text-gray-600 mb-8 text-lg">
            Brewing tea is an art. Follow these simple steps to unlock the full flavor and aroma of your Vento leaves.
          </p>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-vento-gold text-white flex items-center justify-center font-bold text-xl shrink-0">1</div>
              <div>
                <h4 className="text-xl font-serif text-vento-forest font-semibold">Boil Fresh Water</h4>
                <p className="text-gray-600 text-sm">Always start with freshly drawn, cold water to ensure optimal oxygen levels.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-vento-gold text-white flex items-center justify-center font-bold text-xl shrink-0">2</div>
              <div>
                <h4 className="text-xl font-serif text-vento-forest font-semibold">Measure the Leaves</h4>
                <p className="text-gray-600 text-sm">Use 2.5g (1 tsp) of tea for every 200ml of water.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-vento-gold text-white flex items-center justify-center font-bold text-xl shrink-0">3</div>
              <div>
                <h4 className="text-xl font-serif text-vento-forest font-semibold">Steep to Perfection</h4>
                <p className="text-gray-600 text-sm">Steep black teas for 3-5 minutes, and green teas for 2-3 minutes.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <div className="aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white">
            <img src="/brand/cup.jpg" alt="Perfect Cup of Tea" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
