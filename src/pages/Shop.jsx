import SEO from '../components/SEO';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import TeaProductCard from '../components/TeaProductCard';
import { Stagger, StaggerItem } from '../components/Stagger';
import { useProducts } from '../hooks/useProducts';
import { ChevronDown } from 'lucide-react';
import NewsletterBanner from '../components/NewsletterBanner';

export default function Shop() {
  const mockProducts = useProducts();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [selectedCategory, setSelectedCategory] = useState('All products');
  const [sortOption, setSortOption] = useState('Price: Low to High');
  
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

    // Filter & Sort based on dropdown option
    if (sortOption === 'Price: Low to High') {
      result.sort((a, b) => a.priceInr - b.priceInr);
    } else if (sortOption === 'Price: High to Low') {
      result.sort((a, b) => b.priceInr - a.priceInr);
    } else if (sortOption === 'Best Sellers') {
      // Filter strictly to items with the 'Best Seller' badge, or top 2 highest rated/discounted
      result = result.filter(p => p.badges?.includes('Best Seller') || p.discount > 30).slice(0, 3);
      result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    } else if (sortOption === 'New Arrivals') {
      // Filter to just the 2 most recent/newest items (mocked by taking the last 2 in array or specific badges)
      result = result.reverse().slice(0, 2);
    } else if (sortOption === 'Sale') {
      // Filter strictly to items that actually have a discount, show highest discount first
      result = result.filter(p => p.discount && p.discount > 0);
      result.sort((a, b) => b.discount - a.discount);
    }

    return result;
  }, [selectedCategory, sortOption, initialSearch]);

  return (
    <div className="pb-20 bg-vento-cream min-h-screen">
      <SEO title="Shop Premium Tea" description="Browse our collection of fresh Assam, Darjeeling, and Wellness teas." keywords="buy tea online, shop tea, premium indian tea" />
      <PageBanner
        eyebrow="The Collection"
        title="Shop All"
        subtitle={initialSearch ? `Search results for "${initialSearch}"` : "Explore our entire premium collection of authentic Indian teas."}
        imagePath="/brand/media_1787991645120.jpg"
      />
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col gap-6 mt-4">
          
          {/* Mobile Categories Dropdown */}
          <div className="md:hidden relative w-full mb-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-vento-gold/30 text-vento-forest py-3 pl-4 pr-10 rounded-xl outline-none focus:border-vento-forest cursor-pointer font-semibold shadow-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-vento-gold pointer-events-none" />
          </div>

          {/* Desktop Horizontal Categories */}
          <div className="hidden md:block w-full overflow-hidden">
            <div className="flex overflow-x-auto gap-3 pb-4 pt-2 px-1 -mx-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {categories.map(category => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border shadow-sm ${
                      active
                        ? 'bg-vento-forest text-vento-cream border-vento-forest'
                        : 'bg-white text-gray-700 border-vento-gold/30 hover:border-vento-gold hover:text-vento-forest'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full">
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
                    <option>New Arrivals</option>
                    <option>Best Sellers</option>
                    <option>Sale</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                No products found matching your criteria.
              </div>
            ) : (
              <Stagger key={`${selectedCategory}-${sortOption}`} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredAndSortedProducts.map(product => (
                  <StaggerItem key={product.id} className="h-full">
                    <TeaProductCard product={product} />
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </div>

        </div>
      </div>
      <NewsletterBanner />
    </div>
  );
}
