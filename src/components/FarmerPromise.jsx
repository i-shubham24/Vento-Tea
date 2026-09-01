import { Link } from 'react-router-dom';

export default function FarmerPromise({ hideCta = false }) {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="w-full md:w-1/2">
        <div className="w-full max-w-sm mx-auto lg:max-w-md aspect-square lg:aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative bg-vento-forest/5">
          <div className="absolute inset-0 bg-vento-forest/10 mix-blend-overlay pointer-events-none"></div>
          <img src="https://teawebsite-b65ea.web.app/images/web/range-family.webp" alt="Tea farmers" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl font-serif text-vento-forest mb-6">Growing Together.</h2>
        <p className="text-gray-600 mb-6 text-lg italic border-l-4 border-vento-forest/30 pl-4">
          “Behind every cup of Vento Tea is the dedication of the people who nurture every leaf.”
        </p>
        <ul className="space-y-6 mb-8 text-gray-700">
          <li>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2 h-2 bg-vento-forest rounded-full"></span>
              <strong className="text-vento-forest font-bold">Fair & respectful partnerships</strong>
            </div>
            <p className="pl-5 text-sm text-gray-500">Long-term relationships with trusted growers who value their craft as much as we do.</p>
          </li>
          <li>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2 h-2 bg-vento-forest rounded-full"></span>
              <strong className="text-vento-forest font-bold">Responsible sourcing</strong>
            </div>
            <p className="pl-5 text-sm text-gray-500">Leaf drawn from gardens where careful cultivation and responsible farming are the norm.</p>
          </li>
          <li>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-2 h-2 bg-vento-forest rounded-full"></span>
              <strong className="text-vento-forest font-bold">Supporting local communities</strong>
            </div>
            <p className="pl-5 text-sm text-gray-500">Every purchase sustains tea-growing families and preserves generations of expertise.</p>
          </li>
        </ul>
        {!hideCta && (
          <Link to="/about" className="inline-block border-2 border-vento-forest text-vento-forest hover:bg-vento-forest hover:text-vento-cream font-semibold py-3 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
            Read Our Story
          </Link>
        )}
      </div>
    </section>
  );
}
