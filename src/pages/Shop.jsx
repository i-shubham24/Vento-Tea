import SEO from '../components/SEO';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCatalog from '../components/ProductCatalog';
import PageBanner from '../components/PageBanner';
import TeaProductCard from '../components/TeaProductCard';
import { mockProducts } from '../data/mockData';
import { ChevronDown } from 'lucide-react';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [selectedCategory, setSelectedCategory] = useState('All products');
  const [sortOption, setSortOption] = useState('Newest');
  
  const categories = ['All products', 'Everyday Chai', 'Whole Leaf', 'Masala Chai', 'Gift Boxes'];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...mockProducts];

    // Filter by search
    if (initialSearch) {
      result = result.filter(p => p.name.toLowerCase().includes(initialSearch.toLowerCase()));
    }

    // Filter by category
    if (selectedCategory !== 'All products') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    if (sortOption === 'Price: Low to High') {
      result.sort((a, b) => a.priceInr - b.priceInr);
    } else if (sortOption === 'Price: High to Low') {
      result.sort((a, b) => b.priceInr - a.priceInr);
    }

    return result;
  }, [selectedCategory, sortOption, initialSearch]);

  return (
    <div className="pb-20 bg-vento-cream min-h-screen">
      <SEO title="Shop Premium Tea" description="Browse our collection of fresh Assam, Darjeeling, and Wellness teas." keywords="buy tea online, shop tea, premium indian tea" />
      <PageBanner 
        title="Shop All"
        subtitle={initialSearch ? `Search results for "${initialSearch}"` : "Explore our entire premium collection of authentic Indian teas."}
        imagePath="/brand/media_1787991645120.jpg"
      />
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-1">
              {categories.map(category => (
                <li key={category}>
                  <button 
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category 
                        ? 'bg-vento-forest text-vento-cream font-bold shadow-md' 
                        : 'text-gray-600 hover:bg-vento-forest/10 hover:text-vento-forest'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <p className="text-sm text-gray-500">{filteredAndSortedProducts.length} products</p>
              
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Sort</span>
                <div className="relative">
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 text-vento-forest py-2 pl-4 pr-10 rounded-lg outline-none focus:border-vento-gold cursor-pointer font-medium"
                  >
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map(product => (
                <TeaProductCard key={product.id} product={product} />
              ))}
              {filteredAndSortedProducts.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-500">
                  No products found matching your criteria.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
