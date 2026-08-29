import TeaProductCard from './TeaProductCard';
import { mockProducts } from '../data/mockData';
import { Stagger, StaggerItem } from './Stagger';

export default function ProductCatalog({ limit }) {
  const displayProducts = limit ? mockProducts.slice(0, limit) : mockProducts;

  return (
    <section id="shop" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-vento-forest mb-4">Our Signature Blends</h2>
        <div className="gold-rule-flourish"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover the perfect cup for every mood, curated from the most esteemed gardens.
        </p>
      </div>

      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayProducts.map(product => (
          <StaggerItem key={product.id} className="h-full">
            <TeaProductCard product={product} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
