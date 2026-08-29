import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

export default function WishlistSidebar() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { addItem } = useCart();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsWishlistOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsWishlistOpen]);

  if (!isWishlistOpen) return null;

  const wishlistProducts = wishlist.map(id => mockProducts.find(p => p.id === id)).filter(Boolean);

  const handleMoveToCart = (product) => {
    addItem(product, product.weights[0]);
    toggleWishlist(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-vento-forest/40 backdrop-blur-sm"
        onClick={() => setIsWishlistOpen(false)}
      ></div>

      <div className="relative w-full max-w-md bg-vento-cream h-full flex flex-col shadow-2xl transform transition-transform duration-300">
        
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-serif text-vento-forest flex items-center gap-2">
            <Heart className="fill-current text-red-500" /> Your Wishlist
          </h2>
          <button onClick={() => setIsWishlistOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-vento-forest" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {wishlistProducts.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <Heart size={48} className="mx-auto mb-4 opacity-20" />
              <p>Your wishlist is empty.</p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 relative group">
                <img src={product.images[0]} alt={product.name} className="w-24 h-24 object-cover rounded-xl bg-vento-cream" />
                <div className="flex-1">
                  <h4 className="font-semibold text-vento-forest pr-6">{product.name}</h4>
                  <div className="text-vento-gold-dark font-semibold mt-1">₹{product.weights[0].priceInr}</div>
                  <button 
                    onClick={() => handleMoveToCart(product)}
                    className="mt-3 flex items-center gap-2 bg-vento-forest text-vento-cream text-xs px-4 py-2 rounded-full hover:bg-vento-forest-light transition-colors"
                  >
                    <ShoppingBag size={14} /> Move to Cart
                  </button>
                </div>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
