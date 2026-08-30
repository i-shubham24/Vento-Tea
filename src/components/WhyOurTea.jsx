import { Leaf, PackageCheck, BadgePercent } from 'lucide-react';

export default function WhyOurTea() {
  return (
    <section className="py-14 px-4 md:px-8 bg-white border-y border-vento-cream-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-vento-forest">Why Our Tea?</h2>
          <div className="w-16 h-1 bg-vento-gold mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-vento-cream rounded-3xl p-8 border border-vento-cream-dark">
            <div className="w-14 h-14 rounded-full bg-vento-forest text-vento-gold flex items-center justify-center mx-auto mb-4">
              <Leaf size={24} />
            </div>
            <h3 className="font-serif text-xl text-vento-forest font-semibold mb-2">Garden-Direct</h3>
            <p className="text-sm text-gray-600 leading-relaxed">We buy straight from the source — hand-plucked in Assam, no middlemen, no auctions.</p>
          </div>
          <div className="text-center bg-vento-cream rounded-3xl p-8 border border-vento-cream-dark">
            <div className="w-14 h-14 rounded-full bg-vento-forest text-vento-gold flex items-center justify-center mx-auto mb-4">
              <PackageCheck size={24} />
            </div>
            <h3 className="font-serif text-xl text-vento-forest font-semibold mb-2">Fresh in 7 Days</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Packed within 7 days of harvest and vacuum-sealed to lock aroma.</p>
          </div>
          <div className="text-center bg-vento-cream rounded-3xl p-8 border border-vento-cream-dark">
            <div className="w-14 h-14 rounded-full bg-vento-forest text-vento-gold flex items-center justify-center mx-auto mb-4">
              <BadgePercent size={24} />
            </div>
            <h3 className="font-serif text-xl text-vento-forest font-semibold mb-2">No Middlemen</h3>
            <p className="text-sm text-gray-600 leading-relaxed">You save ~40% vs retail — same estate quality, honest price.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
