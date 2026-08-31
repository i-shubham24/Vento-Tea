import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, Heart, Leaf } from 'lucide-react';

export default function TeaProductCard({ product, singleImage = false, eager = false }) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);

  const inWishlist = isInWishlist(product.id);
  // Tier 4: deterministic social proof
  const reviewCount = (product.discount || 15) * 7 + 23; // 80-275 range
  const rating = product.badges.includes('Best Seller') ? '4.9' : product.badges.includes('Premium') ? '4.8' : '4.7';
  const stockLeft = (product.id.charCodeAt(4) % 8) + 3; // 3-10
  const isLowStock = stockLeft <= 5;

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product, selectedWeight);
  };

  return (
    <div className="group h-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(10,42,27,0.12)] hover:-translate-y-1.5 transition-all duration-300 border border-vento-cream-dark relative">
      {/* Product image — single image when singleImage (faster LCP), else crossfade */}
      <Link to={`/product/${product.slug}`} className="relative aspect-[6/5] overflow-hidden bg-vento-cream block">
        <img
          src={product.images[0]}
          alt={product.name}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          width="400"
          height="333"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${!singleImage && product.images[1] ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'}`}
        />
        {!singleImage && product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} — alternate view`}
            loading="lazy"
            decoding="async"
            width="400"
            height="333"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
          />
        )}
      </Link>
        
      {/* Badges — Tier 4: more prominent Bestseller */}
      <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
        {product.discount && (
          <span className="bg-vento-gold text-vento-forest text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md w-max border border-vento-gold-dark">
            SAVE {product.discount}%
          </span>
        )}
        {product.badges.map(badge => (
          <span key={badge} className={`${badge === 'Best Seller' ? 'bg-vento-gold text-vento-forest border border-vento-gold-dark shadow-md' : 'bg-vento-forest/85 text-vento-cream border border-white/10'} text-[10px] font-bold px-2.5 py-0.5 rounded-full w-max backdrop-blur-sm`}>
            {badge === 'Best Seller' ? '★ BESTSELLER' : badge.toUpperCase()}
          </span>
        ))}
        {isLowStock && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md w-max animate-pulse">
            ONLY {stockLeft} LEFT
          </span>
        )}
      </div>

      {/* Wishlist Pill */}
      <button 
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm hover:scale-110 transition-transform text-red-500 z-10"
        aria-label="Toggle Wishlist"
      >
        <Heart size={20} fill={inWishlist ? "currentColor" : "none"} className={inWishlist ? "text-red-500" : "text-gray-400"} />
      </button>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/product/${product.slug}`} className="mb-4 block hover:opacity-80 transition-opacity">
          <h3 className="text-2xl font-sans font-semibold text-vento-forest mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-vento-gold-dark text-sm font-medium line-clamp-1">{product.tagline}</p>
        </Link>
        {/* Tier 4: rating row */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-vento-gold text-xs tracking-tight">★★★★★</span>
          <span className="text-xs font-bold text-vento-forest">{rating}</span>
          <span className="text-xs text-gray-500">({reviewCount} reviews)</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-1">{product.description}</p>

        

        {/* Weight Selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1">
          {product.weights.map(w => (
            <button
              key={w.grams}
              onClick={(e) => { e.preventDefault(); setSelectedWeight(w); }}
              className={`shrink-0 whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
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
          <div className="flex flex-col">
            {product.discount && (
              <span className="text-sm">
                <span className="text-gray-400 line-through">₹{Math.round(selectedWeight.priceInr / (1 - product.discount / 100))}</span>
                <span className="text-green-600 font-bold ml-1">{product.discount}% OFF</span>
              </span>
            )}
            <span className="text-2xl font-semibold text-vento-forest">
              ₹{selectedWeight.priceInr}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-vento-gold text-vento-forest hover:bg-vento-forest hover:text-vento-cream font-bold py-2.5 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <ShoppingBag size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
