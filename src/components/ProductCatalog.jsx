import { Link } from 'react-router-dom';
import TeaProductCard from './TeaProductCard';
import { getProducts } from '../data/mockData';
import { Stagger, StaggerItem } from './Stagger';
import SplitReveal from './SplitReveal';

export default function ProductCatalog({ limit, singleImage = false, eager = false }) {
  const all = getProducts();
  const displayProducts = limit ? all.slice(0, limit) : all;

  return (
    <section id="shop" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <SplitReveal as="h2" className="text-4xl md:text-5xl font-serif text-vento-forest mb-4" text="Our Signature Blends" />
        <div className="w-20 h-1 bg-vento-gold mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover the perfect cup for every mood, curated from the most esteemed gardens.
        </p>
      </div>

      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayProducts.map((product, idx) => (
          <StaggerItem key={product.id} className="h-full">
            <TeaProductCard product={product} singleImage={singleImage} eager={eager && idx < 2} />
          </StaggerItem>
        ))}
      </Stagger>

      {limit && (
        <div className="text-center mt-12 pb-12">
          <Link to="/shop" className="inline-block border-2 border-vento-forest text-vento-forest hover:bg-vento-forest hover:text-vento-cream font-semibold py-3 px-8 rounded-full transition-colors">
            View All Teas
          </Link>
        </div>
      )}
    </section>
  );
}
