import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import GamifiedCart from './components/GamifiedCart';
import AuthModal from './components/AuthModal';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Account from './pages/Account';
import About from './pages/About';
import Contact from './pages/Contact';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ClickLeaves from './components/ClickLeaves';
import WishlistSidebar from './components/WishlistSidebar';
import PromoPopup from './components/PromoPopup';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen flex flex-col font-sans relative">
              <ClickLeaves />
              <PromoPopup />
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Routes>
              </main>
              <Footer />
              
              <GamifiedCart />
              <WishlistSidebar />
              <AuthModal />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
