import ProductCatalog from '../components/ProductCatalog';

export default function Shop() {
  return (
    <div className="pt-32 pb-20 bg-vento-cream">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h1 className="text-4xl font-serif text-vento-forest mb-4">All Teas</h1>
        <p className="text-gray-600 max-w-2xl">Browse our complete collection of premium Indian teas, sourced directly from the finest estates.</p>
      </div>
      <ProductCatalog />
    </div>
  );
}
