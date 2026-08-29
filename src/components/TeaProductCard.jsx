import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, Heart, Leaf } from 'lucide-react';

export default function TeaProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);

  const inWishlist = isInWishlist(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product, selectedWeight);
  };

  return (
    <div className="group h-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-vento-cream-dark relative">
      {/* Product image — static primary, crossfades to the alternate version on hover */}
      <Link to={`/product/${product.slug}`} className="relative aspect-[6/5] overflow-hidden bg-vento-cream block">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${product.images[1] ? 'group-hover:opacity-0' : ''}`}
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} — alternate view`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        )}
      </Link>
        
      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
        {product.discount && (
          <span className="bg-yellow-400 text-black text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm w-max">
            SAVE {product.discount}%
          </span>
        )}
        {product.badges.map(badge => (
          <span key={badge} className="bg-vento-forest/80 text-vento-cream text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm w-max backdrop-blur-sm">
            {badge}
          </span>
        ))}
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
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Benefit pills — surfaced from real product.features */}
        {product.features?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {product.features.slice(0, 2).map((f) => (
              <span
                key={f.title}
                title={f.desc}
                className="inline-flex items-center gap-1.5 rounded-full bg-vento-cream border border-vento-gold/40 text-vento-forest text-[11px] font-semibold px-2.5 py-1"
              >
                <Leaf size={12} className="text-vento-gold-dark" />
                {f.title}
              </span>
            ))}
          </div>
        )}

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
          <div className="flex flex-col">
            {product.discount && (
              <span className="text-sm text-gray-400 line-through">
                ₹{Math.round(selectedWeight.priceInr / (1 - product.discount / 100))}
              </span>
            )}
            <span className="text-2xl font-semibold text-vento-forest">
              ₹{selectedWeight.priceInr}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="group/add relative overflow-hidden flex items-center gap-2 bg-vento-gold text-vento-forest font-semibold py-2.5 px-6 rounded-full"
          >
            {/* Fill sweep on hover */}
            <span className="absolute inset-0 bg-vento-forest translate-y-full group-hover/add:translate-y-0 transition-transform duration-300 ease-out"></span>
            <span className="relative flex items-center gap-2 transition-colors duration-300 group-hover/add:text-vento-cream">
              <ShoppingBag size={18} />
              Add
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
