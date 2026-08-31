import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Plus, Leaf, Droplet, UserCheck, MapPin, AlertCircle, ShoppingBag, X } from 'lucide-react';
import TeaProductCard from '../components/TeaProductCard';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';

function BrewStep({ num, text }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-vento-gold/20 last:border-0 py-5">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left hover:text-vento-gold-dark transition-colors group"
      >
        <span className="font-serif text-xl text-vento-forest group-hover:text-vento-gold-dark transition-colors">
          Step {num} : {text.split('.')[0]}.
        </span>
        <Plus className={`text-vento-gold transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} size={24} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-600 text-base leading-relaxed pb-2">
              {text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDetails() {
  const mockProducts = useProducts();
  const { slug } = useParams();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const product = mockProducts.find(p => p.slug === slug) || mockProducts[0];
  
  
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  
  const addToCartRef = useRef(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when ATC is out of viewport above
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setShowStickyBar(true);
        } else {
          setShowStickyBar(false);
        }
      },
      { threshold: 0 }
    );
    if (addToCartRef.current) {
      observer.observe(addToCartRef.current);
    }
    return () => observer.disconnect();
  }, []);

  
  // Deterministic stock so card badge and PDP match
  const stockLeft = (product.id.charCodeAt(4) % 8) + 3;
  
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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images.map((img) => `https://ventotea.com${img}`),
    "description": product.description,
    "sku": product.id,
    "brand": { "@type": "Brand", "name": "Vento Tea" },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "url": `https://ventotea.com/product/${product.slug}`,
      "priceCurrency": "INR",
      "price": selectedWeight.priceInr,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
    },
  };

  return (
    <div className="pt-32 pb-20 bg-vento-cream min-h-screen">
      <SEO
        title={product.name}
        description={product.description.substring(0, 160)}
        keywords={`${product.name}, premium tea, buy ${product.category} tea online`}
        type="product"
        image={`https://ventotea.com${product.images[0]}`}
        schema={productSchema}
      />

      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Product Section (Image + Details) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
          
          {/* Left: Images */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-[4/3] md:aspect-square max-h-[500px] w-full rounded-xl overflow-hidden bg-[#fdfbf6] shadow-sm border border-vento-gold/10 group flex items-center justify-center">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 justify-center">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border transition-all duration-300 shadow-sm ${activeImage === img ? 'border-vento-forest ring-2 ring-vento-forest/20' : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-vento-gold'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col pt-4">
            <h1 className="text-4xl lg:text-5xl font-serif text-vento-forest mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-vento-gold">
                {'★★★★★'.split('').map((star, i) => <span key={i} className={i < 4 ? '' : 'opacity-50'}>{star}</span>)}
              </div>
              <span className="text-sm text-gray-500 font-medium">4.8 (128 reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-4">
              <div className="text-4xl font-serif font-bold text-vento-forest">
                ₹{selectedWeight.priceInr}
              </div>
              {product.discount && (
                <div className="flex flex-col justify-end pb-1.5">
                  <span className="text-lg text-gray-400 line-through">
                    ₹{Math.round(selectedWeight.priceInr / (1 - product.discount / 100))}
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-8 font-medium">Tax included. Shipping calculated at checkout.</p>

            {/* Dynamic Stock Alert Bar */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                  <AlertCircle size={16} />
                  Hurry! Only {stockLeft} left in stock
                </div>
                <span className="text-xs font-bold text-red-400">{Math.round((stockLeft / 20) * 100)}%</span>
              </div>
              <div className="w-full bg-red-100 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(stockLeft / 20) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-red-500 h-full rounded-full"
                ></motion.div>
              </div>
            </div>

            <p className="text-gray-600 mb-10 leading-relaxed">{product.description}</p>

            <div className="mb-10">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.weights.map(weight => (
                  <button 
                    key={weight.label}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-6 py-3 rounded-md text-sm font-semibold border transition-all duration-300 ${
                      selectedWeight.label === weight.label
                        ? 'border-vento-forest bg-vento-forest text-white shadow-md'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-vento-forest'
                    }`}
                  >
                    {weight.label}
                  </button>
                ))}
              </div>
            </div>

            <div ref={addToCartRef} className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-vento-forest border border-vento-forest text-white hover:bg-vento-gold hover:text-vento-forest font-bold py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
              >
                <ShoppingBag size={18} />
                Add to cart
              </button>
              <button 
                onClick={handleWishlist}
                className="w-14 h-14 flex items-center justify-center border-2 border-gray-200 bg-white hover:border-vento-forest rounded-full transition-all duration-300 shrink-0"
                aria-label="Wishlist"
              >
                <Heart size={20} className={isInWishlist(product.id) ? "text-vento-gold" : "text-gray-400"} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </div>

          </div>
        </div>
        
        {/* Icon Pillars */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="text-2xl font-serif text-vento-forest text-center mb-8">Invigorating, Relaxing, Uplifting</h3>
          <div className="flex flex-wrap justify-center md:justify-between items-start gap-8">
            <div className="flex flex-col items-center gap-3 text-center w-20">
              <div className="w-16 h-16 rounded-full bg-[#fdf8ee] border border-vento-gold/40 flex items-center justify-center text-vento-gold-dark shadow-sm">
                <Leaf size={28} strokeWidth={1.5} />
              </div>
              <span className="text-xs font-serif font-bold text-vento-forest">Vegan</span>
            </div>
            <div className="flex flex-col items-center gap-3 text-center w-24">
              <div className="w-16 h-16 rounded-full bg-[#fdf8ee] border border-vento-gold/40 flex items-center justify-center text-vento-gold-dark shadow-sm">
                <Droplet size={28} strokeWidth={1.5} />
              </div>
              <span className="text-xs font-serif font-bold text-vento-forest">100% Natural</span>
            </div>
            <div className="flex flex-col items-center gap-3 text-center w-20">
              <div className="w-16 h-16 rounded-full bg-[#fdf8ee] border border-vento-gold/40 flex items-center justify-center text-vento-gold-dark shadow-sm">
                <UserCheck size={28} strokeWidth={1.5} />
              </div>
              <span className="text-xs font-serif font-bold text-vento-forest">Expert Led</span>
            </div>
            <div className="flex flex-col items-center gap-3 text-center w-20">
              <div className="w-16 h-16 rounded-full bg-[#fdf8ee] border border-vento-gold/40 flex items-center justify-center text-vento-gold-dark shadow-sm">
                <MapPin size={28} strokeWidth={1.5} />
              </div>
              <span className="text-xs font-serif font-bold text-vento-forest">Direct Farm</span>
            </div>
          </div>
        </div>

        {/* Full-Width How To Make Perfect Cup of Tea */}
        <div className="max-w-4xl mx-auto mb-24 bg-[#faf7f2] rounded-xl p-8 md:p-12 border border-vento-gold/20 shadow-sm">
          <h3 className="text-3xl md:text-4xl font-serif text-vento-forest mb-10 text-center">How To Make Perfect Cup of Tea</h3>
          <div className="flex flex-col">
            <BrewStep num={1} text='"Water is the mother of tea." Always use fresh cold tap water.' />
            <BrewStep num={2} text='Put the tea at the bottom of the cup, teapot or infuser basket. Ensure the infuser has enough room for leaves to expand.' />
            <BrewStep num={3} text='Pour hot water over the tea. The optimal temperature is usually 90°C for black tea and 80°C for green tea.' />
            <BrewStep num={4} text='Steep the tea for the required amount of time (typically 3-5 minutes depending on the blend).' />
            <BrewStep num={5} text='Separate the tea leaves and the water; by pouring the tea into a cup from the teapot or by removing the brewing basket.' />
          </div>
        </div>

        {/* Full-Width Reviews Section */}
        <div className="max-w-5xl mx-auto mb-24 text-center">
          <h3 className="text-3xl md:text-4xl font-serif text-vento-forest mb-8">Real Reviews from Real Enthusiasts</h3>
          <div className="flex justify-center text-vento-gold mb-8 text-xl">
            {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
          </div>
          <p className="text-xl md:text-2xl text-gray-700 italic font-serif max-w-3xl mx-auto leading-relaxed px-4">
            "It is a good product. I had been buying it from the Middle East and doubted the Indian quality, but I found it very tasty and aromatic. The packaging was absolutely premium."
          </p>
          <p className="text-sm font-bold text-gray-400 mt-6 uppercase tracking-widest">— Joe Thomas</p>
        </div>
      </div>

      {/* Running Marquee Full Width (Outside max-w-7xl) */}
      <div className="w-full flex overflow-hidden bg-vento-forest text-vento-cream py-4 mb-24 relative">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex whitespace-nowrap items-center min-w-full"
        >
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="flex items-center shrink-0">
              <span className="uppercase tracking-widest text-sm font-semibold mx-4">Teas From Around The World</span>
              <span className="text-vento-gold mx-4">•</span>
              <span className="uppercase tracking-widest text-sm font-semibold mx-4">55+ Tea Varieties To Choose From</span>
              <span className="text-vento-gold mx-4">•</span>
              <span className="uppercase tracking-widest text-sm font-semibold mx-4">Direct From Estates</span>
              <span className="text-vento-gold mx-4">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-7xl mx-auto px-4 border-t border-gray-200 pt-16">
        <h2 className="text-4xl font-serif text-vento-forest text-center mb-12">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map(relProduct => (
            <TeaProductCard key={relProduct.id} product={relProduct} />
          ))}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 150, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 150, opacity: 0, x: '-50%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-1/2 w-fit max-w-[95%] md:max-w-[60%] bg-white/75 backdrop-blur-md rounded-full shadow-2xl border border-vento-gold/20 z-50 flex items-center justify-between p-2 pr-2.5"
          >
            <div className="flex items-center gap-4 pl-2 mr-4 md:mr-10">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-vento-cream shadow-inner shrink-0 hidden xs:block">
                <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-serif font-bold text-vento-forest leading-tight whitespace-nowrap">{product.name}</span>
                <span className="text-xs text-gray-700 font-bold">₹{selectedWeight.priceInr}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="sm:hidden flex flex-col items-end mr-1">
                <span className="font-bold text-vento-forest leading-tight text-sm">₹{selectedWeight.priceInr}</span>
              </div>
              
              {/* Variant Selector Buttons */}
              <div className="flex items-center gap-1 shrink-0 bg-vento-cream/50 p-1 rounded-full border border-vento-gold/20 mr-1 sm:mr-2">
                {product.weights.map(weight => (
                  <button
                    key={weight.label}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${
                      selectedWeight.label === weight.label
                        ? 'bg-vento-forest text-vento-cream shadow-sm'
                        : 'bg-transparent text-gray-500 hover:text-vento-forest'
                    }`}
                  >
                    {weight.label}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleAddToCart}
                className="bg-vento-forest text-vento-cream hover:bg-vento-gold hover:text-vento-forest hover:text-vento-forest hover:border-vento-gold font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest text-xs shrink-0"
              >
                <ShoppingBag size={14} />
                <span className="hidden xs:inline">Add to cart</span>
                <span className="inline xs:hidden">Add</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
