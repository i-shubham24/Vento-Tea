import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { ShoppingBag, User, Heart, Search, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { mockProducts } from '../../data/mockData';
import MobileMenu from '../MobileMenu';

export default function Header() {
  const { cartCount, setIsOpen } = useCart();
  const { user, openAuth } = useAuth();
  const { wishlist, setIsWishlistOpen } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      // If on the home page, wait until past the 300vh cinematic hero scroll. 
      // Otherwise, reduce opacity almost immediately (50px) on other pages.
      const threshold = location.pathname === '/' ? window.innerHeight * 2.8 : 50;
      setIsScrolled(window.scrollY > threshold);
    };
    
    // Check initially in case of page reload halfway down
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const searchResults = searchQuery.length > 1 
    ? mockProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearch(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center fixed top-4 z-50 transition-all duration-300">
        <header className={`w-[95%] max-w-7xl backdrop-blur-md rounded-full transition-all duration-300 border ${
          isScrolled 
            ? 'bg-vento-forest/80 border-vento-gold/20 shadow-md hover:bg-vento-forest/95'
            : 'bg-vento-forest border-vento-gold/30 shadow-xl' 
        }`}>
          <div className="flex items-center justify-between px-6 py-3">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 relative z-50">
            <img src="https://teawebsite-b65ea.web.app/images/web/logo.png" alt="Vento Logo" className="h-10 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/shop' },
              { name: 'Our Story', path: '/about' },
              { name: 'Blogs', path: '/blogs' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => (
              <Link key={link.name} to={link.path} className="group relative text-vento-cream hover:text-vento-gold font-medium pb-1 transition-colors duration-300">
                {link.name}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-vento-gold scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative mr-2">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearch(true);
                  }}
                  onFocus={() => setShowSearch(true)}
                  placeholder="Search teas..." 
                  className="bg-white/15 border border-vento-gold/30 text-vento-cream text-sm rounded-full pl-4 pr-10 py-2 outline-none focus:border-vento-gold transition-colors w-40 lg:w-60 placeholder:text-vento-cream/50"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-vento-cream hover:text-vento-gold transition-colors">
                  <Search size={18} />
                </button>
              </form>

              {/* Search Suggestions Dropdown */}
              {showSearch && searchQuery.length > 1 && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSearch(false)}></div>
                  <div className="absolute top-full mt-2 w-full bg-[#1a2d23] rounded-2xl shadow-xl border border-vento-gold/30 overflow-hidden z-50 flex flex-col max-h-80">
                    {searchResults.length > 0 ? (
                      searchResults.map(product => (
                        <Link 
                          key={product.id} 
                          to={`/product/${product.slug}`}
                          onClick={() => {
                            setShowSearch(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-3 hover:bg-[#233d2f] transition-colors border-b border-white/10 last:border-0"
                        >
                          <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
                          <div>
                            <p className="text-sm font-semibold text-vento-gold">{product.name}</p>
                            <p className="text-xs text-vento-cream/70">{product.category}</p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-vento-cream/70">
                        No results found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {user ? (
              <Link to="/account" className="p-2 text-vento-cream hover:text-vento-gold transition-colors">
                <User size={24} />
              </Link>
            ) : (
              <button onClick={openAuth} className="hidden lg:block text-sm font-semibold text-vento-cream hover:text-vento-gold transition-colors mx-2 cursor-pointer">
                Login
              </button>
            )}
            
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-green-500 hover:text-green-400 transition-colors flex items-center"
            >
              <Heart size={24} fill="currentColor" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-vento-gold text-vento-forest text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1 shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-vento-cream hover:text-vento-gold transition-colors flex items-center"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-vento-gold text-vento-forest text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden p-2 text-vento-cream hover:text-vento-gold transition-colors"
            >
              <span className="flex flex-col items-end gap-[5px] w-6">
                <span className="block h-[2px] w-6 bg-current rounded-full"></span>
                <span className="block h-[2px] w-4 bg-current rounded-full"></span>
                <span className="block h-[2px] w-6 bg-current rounded-full"></span>
              </span>
            </button>
          </div>
        </div>
      </header>
    </div>

    <AnimatePresence>
      {isMenuOpen && <MobileMenu onClose={closeMenu} />}
    </AnimatePresence>
  </>
);
}
