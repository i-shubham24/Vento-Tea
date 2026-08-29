import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Truck, ShieldCheck, Flame } from 'lucide-react';
import TeaProductCard from '../components/TeaProductCard';
import SEO from '../components/SEO';

export default function ProductDetails() {
  const { slug } = useParams();
  const { addItem, setIsOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const product = mockProducts.find(p => p.slug === slug) || mockProducts[0];
  
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  
  // Reset state when product changes (navigating from "You may also like")
  useEffect(() => {
    setSelectedWeight(product.weights[0]);
    setActiveImage(product.images[0]);
    window.scrollTo(0,0);
  }, [product]);

  const handleAddToCart = () => {
    addItem(product, selectedWeight);
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
  };

  const relatedProducts = mockProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-32 pb-20 bg-vento-cream min-h-screen">
      <SEO 
        title={product.name} 
        description={product.description.substring(0, 160)} 
        keywords={`${product.name}, premium tea, buy ${product.category} tea online`} 
      />
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          
          {/* Left: Images */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] max-h-[500px] rounded-3xl overflow-hidden bg-white">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${activeImage === img ? 'border-vento-forest' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-sans font-semibold text-vento-forest mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">{product.description}</p>

            <div className="flex items-end gap-3 mb-8">
              <div className="text-3xl font-bold text-vento-forest">
                ₹{selectedWeight.priceInr}
              </div>
              {product.discount && (
                <div className="flex flex-col justify-end pb-1">
                  <span className="text-sm text-gray-400 line-through">
                    ₹{Math.round(selectedWeight.priceInr / (1 - product.discount / 100))}
                  </span>
                </div>
              )}
              {product.discount && (
                <div className="pb-1">
                  <span className="bg-yellow-400 text-black text-[11px] font-bold px-2.5 py-0.5 rounded-full ml-2">
                    SAVE {product.discount}%
                  </span>
                </div>
              )}
              <span className="text-sm font-normal text-gray-500 pb-1 ml-auto">incl. of all taxes</span>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-vento-forest uppercase tracking-wider mb-3">Select Quantity</h3>
              <div className="flex flex-wrap gap-3">
                {product.weights.map(weight => (
                  <button 
                    key={weight.label}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                      selectedWeight.label === weight.label
                        ? 'border-vento-forest bg-vento-forest text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-vento-forest hover:bg-gray-50'
                    }`}
                  >
                    {weight.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-vento-forest hover:bg-vento-forest-light text-white font-bold py-4 rounded-full transition-colors shadow-lg"
              >
                Add to cart
              </button>
              <button 
                onClick={handleWishlist}
                className="w-14 h-14 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={24} className={isInWishlist(product.id) ? "text-vento-gold" : "text-gray-400"} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10 p-6 bg-green-50/50 rounded-2xl border border-green-100">
              <div className="flex items-start gap-3">
                <Flame size={20} className="text-vento-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-bold text-vento-forest">{product.features?.[0]?.title || "Premium Quality"}</p>
                  <p className="text-xs text-gray-500">{product.features?.[0]?.desc || "100% natural ingredients"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-vento-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-bold text-vento-forest">{product.features?.[1]?.title || "Safe & Certified"}</p>
                  <p className="text-xs text-gray-500">{product.features?.[1]?.desc || "No harmful chemicals"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck size={20} className="text-vento-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-bold text-vento-forest">Free Shipping</p>
                  <p className="text-xs text-gray-500">Free shipping across India</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-serif font-bold text-vento-forest mb-4">Specifications</h3>
              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white text-sm">
                {product.specifications?.map((spec, idx) => (
                  <div key={idx} className={`grid grid-cols-3 px-4 py-3 ${idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'} border-b border-gray-100 last:border-0`}>
                    <div className="text-gray-500 font-medium">{spec.label}</div>
                    <div className="col-span-2 text-gray-900">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <h2 className="text-3xl font-serif text-vento-forest mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relProduct => (
              <TeaProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
