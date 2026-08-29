import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function TeaProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const inWishlist = isInWishlist(product.id);

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product, selectedWeight);
  };

  return (
    <div className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-vento-cream-dark">
      {/* Image Gallery */}
      <div className="relative aspect-square overflow-hidden bg-vento-cream">
        <img 
          src={product.images[currentImageIdx]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badges.map(badge => (
            <span key={badge} className="bg-vento-forest text-vento-cream text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {badge}
            </span>
          ))}
        </div>

        {/* Wishlist Pill */}
        <button 
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm hover:scale-110 transition-transform text-red-500"
          aria-label="Toggle Wishlist"
        >
          <Heart size={20} fill={inWishlist ? "currentColor" : "none"} className={inWishlist ? "text-red-500" : "text-gray-400"} />
        </button>

        {/* Carousel Controls */}
        {product.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow hover:bg-white text-vento-forest opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow hover:bg-white text-vento-forest opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl font-serif text-vento-forest mb-1">{product.name}</h3>
          <p className="text-vento-gold-dark text-sm font-medium">{product.tagline}</p>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 flex-grow">{product.description}</p>

        {/* Weight Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.weights.map(w => (
            <button
              key={w.grams}
              onClick={(e) => { e.preventDefault(); setSelectedWeight(w); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                selectedWeight.grams === w.grams 
                  ? 'bg-vento-forest text-white border-vento-forest' 
                  : 'bg-white text-vento-forest border-gray-200 hover:border-vento-forest'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-auto">
          <div className="text-2xl font-semibold text-vento-forest">
            ₹{selectedWeight.priceInr}
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 bg-vento-gold hover:bg-vento-gold-dark text-vento-forest font-semibold py-2.5 px-6 rounded-full transition-colors"
          >
            <ShoppingBag size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
