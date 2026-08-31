import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig, AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import GamifiedCart from './components/GamifiedCart';
import AuthModal from './components/AuthModal';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Account from './pages/Account';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import Reviews from './pages/Reviews';
import TrackOrder from './pages/TrackOrder';
import OrderSuccess from './pages/OrderSuccess';
import OrderDetails from './pages/OrderDetails';
import AdminPortal from './pages/AdminPortal';
import AdminLogin from './pages/AdminLogin';
import Policies from './pages/Policies';
import WholesalePage from './pages/WholesalePage';

import IntroCurtain from './components/IntroCurtain';
import FloatingLeaves from './components/FloatingLeaves';
import TeaMatchmaker from './components/TeaMatchmaker';
import ClickLeaves from './components/ClickLeaves';
import WishlistSidebar from './components/WishlistSidebar';
import PromoPopup from './components/PromoPopup';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';

function AnimatedRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  if (isAdmin) {
    return (
      <Routes location={location}>
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
    );
  }
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wholesale" element={<WholesalePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderSuccess />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/return-policy" element={<Policies type="return" />} />
          <Route path="/refund-policy" element={<Policies type="refund" />} />
          <Route path="/terms-of-use" element={<Policies type="terms" />} />
          <Route path="/privacy-policy" element={<Policies type="privacy" />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

function SiteShell({ children }){
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  if (isAdmin) return <>{children}</>;
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <IntroCurtain />
      <FloatingLeaves />
      <TeaMatchmaker />
      <div className="min-h-screen flex flex-col font-sans relative">
        <ClickLeaves />
        <PromoPopup />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <GamifiedCart />
        <WishlistSidebar />
        <AuthModal />
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
            <Router>
              <MotionConfig reducedMotion="user">
                <SiteShell>
                  <AnimatedRoutes />
                </SiteShell>
              </MotionConfig>
            </Router>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
