import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  const verifyOtp = (phone, otp, name) => {
    // Mock OTP verification (accepts any 6 digits in UI)
    if (otp.length === 6) {
      setUser({ phone, name: name || 'Valued Customer', verified: true });
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
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
