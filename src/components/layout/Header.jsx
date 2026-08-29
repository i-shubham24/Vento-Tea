import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { ShoppingBag, User, Heart, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const { cartCount, setIsOpen } = useCart();
  const { user, openAuth } = useAuth();
  const { wishlist, setIsWishlistOpen } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="w-full flex justify-center fixed top-4 z-50 transition-all duration-300">
        <header className={`w-[95%] max-w-7xl backdrop-blur-md rounded-full transition-all duration-300 border ${
          isScrolled 
            ? 'bg-white/95 border-gray-200 shadow-xl' 
            : 'bg-white/60 border-white/50 shadow-md hover:bg-white/80'
        }`}>
          <div className="px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
             <img src="/brand/media_1787991645085.jpg" alt="Vento Logo" className="h-16 w-auto object-contain mix-blend-multiply" />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-vento-forest hover:text-vento-gold-dark font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-vento-forest hover:text-vento-gold-dark font-medium transition-colors">Shop</Link>
            <Link to="/about" className="text-vento-forest hover:text-vento-gold-dark font-medium transition-colors">Our Story</Link>
            <Link to="/blogs" className="text-vento-forest hover:text-vento-gold-dark font-medium transition-colors">Blogs</Link>
            <Link to="/contact" className="text-vento-forest hover:text-vento-gold-dark font-medium transition-colors">Contact</Link>
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative mr-2">
              <input 
                type="text" 
                placeholder="Search teas..." 
                className="bg-white border border-gray-200 text-vento-forest text-sm rounded-full pl-4 pr-10 py-2 outline-none focus:border-vento-gold transition-colors w-40 lg:w-60"
              />
              <button className="absolute right-3 text-gray-400 hover:text-vento-gold-dark transition-colors">
                <Search size={18} />
              </button>
            </div>

            {user ? (
              <Link to="/account" className="p-2 text-vento-forest hover:bg-vento-cream-dark rounded-full transition-colors">
                <User size={24} />
              </Link>
            ) : (
              <button onClick={openAuth} className="hidden lg:block text-sm font-semibold text-vento-forest hover:text-vento-gold-dark transition-colors mx-2">
                Login
              </button>
            )}
            
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-vento-forest hover:bg-vento-cream-dark rounded-full transition-colors flex items-center"
            >
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-vento-gold text-vento-forest text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1 shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-vento-forest hover:bg-vento-cream-dark rounded-full transition-colors flex items-center"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-vento-gold text-vento-forest text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </div>
  </>
);
}
