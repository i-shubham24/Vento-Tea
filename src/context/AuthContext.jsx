import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  const login = (email, password) => {
    const isDemo = email==='demo@vento.com' && password==='VentoDemo@2026';
    const isAdmin = email==='admin@vento.com' && password==='VentoAdmin@2026';
    if (isDemo) { setUser({ email, name:'Demo Customer', role:'customer', verified:true }); setIsAuthOpen(false); return 'customer'; }
    if (isAdmin) { setUser({ email, name:'Super Admin', role:'admin', verified:true }); setIsAuthOpen(false); return 'admin'; }
    if (password && email.includes('@')) { setUser({ email, name: email.split('@')[0], role:'customer', verified:true }); setIsAuthOpen(false); return 'customer'; }
    return null;
  };
  const verifyOtp = (phone, otp, name) => {
    if (otp.length === 6) {
      setUser({ phone, email:`${phone}@vento.demo`, name: name || 'Valued Customer', role:'customer', verified: true });
      setIsAuthOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthOpen,
      openAuth,
      closeAuth,
      verifyOtp,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
