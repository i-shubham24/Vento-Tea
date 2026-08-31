import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Leaf, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function WholesalePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);
  const [bizName, setBizName] = useState('');
  const [phone, setPhone] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Wholesale application submitted for " + bizName + "! Our team will review and contact you shortly.");
    setIsLoginView(true);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    const role = login(email, password);
    if (role === 'admin') navigate('/admin');
    else if (role) navigate('/shop');
    else alert('Invalid credentials. For wholesale access, use registered email.');
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const alertFeature = () => {
    alert("This feature is currently in development.");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <div className="min-h-screen bg-vento-cream pt-24 font-sans text-gray-800">
      <SEO title="Wholesale Partners" description="Become a Vento Wholesale Tea Partner to complement your menu with our award-winning Indian teas." />

      {/* Hero Section (Decreased Height) */}
      <section className="relative w-full pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-vento-cream border-b border-vento-gold/20 z-10">
        
        {/* Parallax Background */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 hidden md:block"
        >
           <img src="/brand/hero-chai.jpg" alt="Wholesale Tea" className="w-full h-full object-cover object-left" />
           <div className="absolute inset-0 bg-gradient-to-r from-vento-cream/20 via-vento-cream/90 to-vento-cream"></div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-[20%] text-vento-forest/10 hidden lg:block"
        >
          <Leaf size={120} strokeWidth={1} />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-end">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-lg w-full"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-vento-forest mb-8 leading-tight"
            >
              Complement your menu with our award-winning tea
            </motion.h1>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection('wholesale-apply')}
                className="w-fit bg-vento-forest text-vento-cream border-2 border-vento-forest py-4 px-10 text-xs font-bold tracking-widest uppercase hover:bg-vento-forest-light transition-all duration-300 shadow-xl shadow-vento-forest/20 group flex items-center justify-between rounded-full"
              >
                <span>Become a Wholesaler</span>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content & Login Section (Pulled Upwards overlapping the hero) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32 relative z-20 -mt-8 md:-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Info */}
          <motion.div 
            id="wholesale-apply"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="pt-8 md:pt-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-vento-forest mb-8 leading-tight">
              Become A Wholesale Tea Partner
            </h2>
            
            <div className="text-gray-600 space-y-6 text-sm md:text-base leading-relaxed mb-10 font-medium">
              <p>
                Vento Tea is an innovative, hand-crafted premium tea importer and blender for those who are looking for a delicious, restorative, and ritual experience for their customers. We hand blend and custom craft a wide selection of award-winning and organic loose leaf and bagged teas direct from the estates of India.
              </p>
              <p>
                We work closely with all of our wholesale partners to create tea programs that complement their menus, educate their staff, and delight their customers. We believe that we are here to impact as many lives as we can through tea.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Login Form */}
          <motion.div 
            id="wholesale-login"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-12 lg:p-14 shadow-2xl rounded-[2.5rem] border border-gray-100 relative group"
          >
            {isLoginView ? (
              <>
                <h3 className="text-sm font-bold uppercase tracking-widest text-vento-forest mb-4">Login to your account</h3>
                <p className="text-sm text-gray-500 mb-8">
                  If you have an account with us, please log in.
                </p>

                <form onSubmit={handleLogin} className="mb-10">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address" 
                    className="w-full mb-4 p-4 border border-gray-300 focus:border-vento-gold focus:ring-2 focus:ring-vento-gold/20 outline-none bg-white text-gray-900 placeholder-gray-500 font-medium transition-all rounded-full"
                    required
                  />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" 
                    className="w-full mb-4 p-4 border border-gray-300 focus:border-vento-gold focus:ring-2 focus:ring-vento-gold/20 outline-none bg-white text-gray-900 placeholder-gray-500 font-medium transition-all rounded-full"
                    required
                  />
                  
                  <Link to="/contact" className="text-vento-gold text-sm font-medium hover:text-vento-forest transition-colors mb-8 block ml-2">
                    Forgot your password?
                  </Link>
                  
                  <button 
                    type="submit"
                    className="w-1/2 min-w-[200px] mx-auto block bg-vento-forest text-vento-cream py-4 px-6 text-xs font-bold tracking-widest uppercase hover:bg-vento-forest-light hover:scale-105 active:scale-95 transition-all duration-300 rounded-full shadow-md"
                  >
                    Log In
                  </button>
                </form>

                <div className="border-t border-gray-100 pt-8">
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed font-medium">
                    New to Vento Wholesale? Apply for an account below.
                  </p>
                  
                  <div className="flex justify-center">
                    <button 
                      onClick={() => setIsLoginView(false)}
                      className="w-1/2 min-w-[200px] border-2 border-vento-gold text-vento-forest py-4 px-6 text-xs font-bold tracking-widest uppercase hover:bg-vento-forest hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 rounded-full"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-sm font-bold uppercase tracking-widest text-vento-forest mb-4">Wholesale Application</h3>
                <p className="text-sm text-gray-500 mb-8">
                  Tell us about your business and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleRegister} className="mb-8">
                  <input 
                    type="text" 
                    value={bizName}
                    onChange={(e) => setBizName(e.target.value)}
                    placeholder="Business Name" 
                    className="w-full mb-4 p-4 border border-gray-300 focus:border-vento-gold focus:ring-2 focus:ring-vento-gold/20 outline-none bg-white text-gray-900 placeholder-gray-500 font-medium transition-all rounded-full"
                    required
                  />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Business Email" 
                    className="w-full mb-4 p-4 border border-gray-300 focus:border-vento-gold focus:ring-2 focus:ring-vento-gold/20 outline-none bg-white text-gray-900 placeholder-gray-500 font-medium transition-all rounded-full"
                    required
                  />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number" 
                    className="w-full mb-6 p-4 border border-gray-300 focus:border-vento-gold focus:ring-2 focus:ring-vento-gold/20 outline-none bg-white text-gray-900 placeholder-gray-500 font-medium transition-all rounded-full"
                    required
                  />
                  
                  <button 
                    type="submit"
                    className="w-1/2 min-w-[200px] mx-auto block bg-vento-forest text-vento-cream py-4 px-6 text-xs font-bold tracking-widest uppercase hover:bg-vento-gold hover:text-vento-forest hover:scale-105 active:scale-95 transition-all duration-300 rounded-full shadow-md"
                  >
                    Submit Application
                  </button>
                </form>

                <div className="text-center">
                  <button 
                    onClick={() => setIsLoginView(true)}
                    className="text-gray-500 text-sm font-medium hover:text-vento-forest transition-colors"
                  >
                    ← Back to Login
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
