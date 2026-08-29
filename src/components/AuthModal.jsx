import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';

export default function AuthModal() {
  const { isAuthOpen, closeAuth, verifyOtp } = useAuth();
  const [step, setStep] = useState(1); // 1: Details, 2: OTP
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  if (!isAuthOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!isLogin) {
      if (firstName.trim().length < 2) {
        setError("Please enter your first name");
        return;
      }
      if (!email.includes('@')) {
        setError("Please enter a valid email address");
        return;
      }
    }
    if (phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    setError('');
    setStep(2);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const fullName = isLogin ? 'Valued Customer' : `${firstName} ${lastName}`;
    const success = verifyOtp(phone, otp, fullName);
    if (!success) {
      setError("Invalid OTP. Enter any 6 digits to simulate success.");
    }
  };

  const handleClose = () => {
    setStep(1);
    setPhone('');
    setOtp('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setError('');
    setIsLogin(true);
    closeAuth();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-vento-forest/60 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="relative bg-vento-cream w-full max-w-md rounded-3xl shadow-2xl p-8 transform transition-all overflow-y-auto max-h-[90vh]">
        <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-vento-forest transition-colors">
          <X size={24} />
        </button>

        {!isLogin && (
          <div className="bg-vento-gold/20 text-vento-forest border border-vento-gold rounded-xl p-3 text-center mb-6 text-sm font-semibold mt-2">
            Sign up now and get a <span className="font-bold text-vento-gold-dark text-base">15% Welcome Discount!</span>
          </div>
        )}

        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-vento-forest mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-600">Enter your details to continue</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {!isLogin && (
              <>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-vento-forest mb-1">First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-vento-forest mb-1">Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-vento-forest mb-1">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full py-2.5 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors" />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-vento-forest mb-1">Phone Number</label>
              <div className="flex bg-white rounded-xl border border-gray-200 overflow-hidden focus-within:border-vento-gold transition-colors">
                <span className="flex items-center justify-center px-4 bg-gray-50 border-r border-gray-200 text-gray-500 font-medium">+91</span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="99999 99999" className="flex-1 py-2.5 px-4 outline-none w-full" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-vento-forest hover:bg-vento-forest-light text-vento-cream font-bold py-3.5 rounded-full transition-colors shadow-md">
              Send OTP
            </button>
            <div className="text-center text-sm text-gray-600 mt-4">
              {isLogin ? (
                <p>Don't have an account? <button type="button" onClick={() => setIsLogin(false)} className="text-vento-gold hover:underline font-semibold">Sign Up</button></p>
              ) : (
                <p>Already have an account? <button type="button" onClick={() => setIsLogin(true)} className="text-vento-gold hover:underline font-semibold">Login</button></p>
              )}
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-vento-forest mb-2">Enter OTP</label>
              <p className="text-xs text-gray-500 mb-3">Sent to +91 {phone} <button type="button" onClick={() => setStep(1)} className="text-vento-gold underline ml-1">Edit</button></p>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="• • • • • •"
                className="w-full text-center tracking-[1em] text-2xl py-3 px-4 bg-white rounded-xl border border-gray-200 outline-none focus:border-vento-gold transition-colors"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-vento-gold hover:bg-vento-gold-dark text-vento-forest font-bold py-3.5 rounded-full transition-colors shadow-md">
              Verify & {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
