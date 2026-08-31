import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft, Check, Eye, EyeOff } from 'lucide-react';

export default function AuthModal() {
  const { isAuthOpen, closeAuth, login, verifyOtp } = useAuth();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' or 'email'
  const [step, setStep] = useState(1); // 1: details, 2: otp entry
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  if (!isAuthOpen) return null;

  // Password strength calculator
  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length > 7) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 to 4
  };
  
  const strengthScore = getPasswordStrength(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-green-600'];

  const handleClose = () => {
    setPhone('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setOtp('');
    setError('');
    setIsLogin(true);
    setLoginMethod('otp');
    setStep(1);
    closeAuth();
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError('');
    
    if (!isLogin) {
      // Signup validations
      if (firstName.trim().length < 2) return setError("Please enter your first name.");
      if (lastName.trim().length < 2) return setError("Please enter your last name.");
      if (!email.includes('@')) return setError("Please enter a valid email address.");
      if (password.length < 8) return setError("Password must be at least 8 characters.");
    }
    
    if (phone.length < 10) return setError("Please enter a valid 10-digit phone number.");
    
    // Send OTP
    setStep(2);
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) return setError("Please enter a valid email address.");
    if (password.length < 1) return setError("Please enter your password.");
    
    const role = login(email, password);
    if (!role) {
      setError("Invalid email/password.");
      return;
    }
    if (role === 'admin') {
      closeAuth();
      navigate('/admin');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const fullName = isLogin ? 'Valued Customer' : `${firstName} ${lastName}`;
    const success = verifyOtp(phone, otp, fullName, isLogin ? null : email);
    if (!success) {
      setError("Invalid OTP. Enter any 6 digits to simulate success.");
    }
  };

  const InputField = ({ label, type, value, onChange, placeholder, prefix, maxLength, suffix }) => (
    <div className="mb-3">
      <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1.5">{label}</label>
      <div className="flex bg-white rounded-xl border border-gray-200 focus-within:border-vento-forest focus-within:ring-1 focus-within:ring-vento-forest transition-all overflow-hidden h-11 shadow-sm hover:border-gray-300">
        {prefix && <span className="flex items-center justify-center px-3 bg-gray-50 border-r border-gray-200 text-gray-600 font-semibold text-sm">{prefix}</span>}
        <input 
          type={type} 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder} 
          maxLength={maxLength}
          required 
          className="flex-1 px-3 text-sm outline-none text-gray-900 placeholder-gray-400 font-medium bg-transparent" 
        />
        {suffix && <div className="flex items-center pr-3">{suffix}</div>}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-vento-forest/80 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[95vh]">
        <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-vento-forest transition-colors z-20 bg-white/50 rounded-full md:bg-transparent">
          <X className="hover:rotate-90 transition-transform duration-300" size={20} />
        </button>

        {/* Left Side: Image & Marketing */}
        <div className="hidden md:block w-5/12 relative bg-vento-forest">
          <img src="https://teawebsite-b65ea.web.app/images/web/craft-pickers.webp" alt="Vento Tea" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-vento-forest via-vento-forest/60 to-transparent"></div>
          <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
            <span className="inline-block bg-vento-gold text-vento-forest text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 w-fit">Vento Tea</span>
            <h3 className="text-3xl font-serif leading-tight mb-4">Savour the True Essence of India.</h3>
            <p className="text-white/80 text-sm leading-relaxed">Sign in or create an account to enjoy exclusive offers on our premium loose-leaf and Kadak Chai collections.</p>
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-xs font-semibold uppercase tracking-widest opacity-70">Member Benefits</p>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li className="flex items-center gap-2"><Check size={14} className="text-vento-gold"/> 15% Off First Order</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-vento-gold"/> Free Shipping Across India</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="w-full md:w-7/12 p-6 md:p-10 lg:p-12 overflow-y-auto max-h-[95vh]">
          
          {step === 1 ? (
            <div className="h-full flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-serif text-vento-forest mb-2">
                  {isLogin ? 'Welcome back' : 'Create account'}
                </h2>
                <p className="text-gray-500 text-sm">
                  {isLogin 
                    ? (loginMethod === 'otp' ? 'Sign in instantly via mobile OTP.' : 'Sign in using your email and password.')
                    : 'Fill in your details to get started.'}
                </p>
              </div>

              {/* FORMS */}
              {!isLogin ? (
                // SIGNUP FORM
                <form onSubmit={handleSendOtp} className="flex-1 flex flex-col">
                  <div className="flex gap-4">
                    <div className="flex-1"><InputField label="First Name" type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="John" /></div>
                    <div className="flex-1"><InputField label="Last Name" type="text" value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Doe" /></div>
                  </div>
                  <InputField label="Email Address" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
                  <InputField label="Mobile Number" type="tel" value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="99999 99999" prefix="IN +91" />
                  
                  <div className="mb-3">
                    <InputField 
                      label="Password" 
                      type={showPassword ? "text" : "password"} 
                      value={password} 
                      onChange={e=>setPassword(e.target.value)} 
                      placeholder="Min. 8 characters"
                      suffix={
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-vento-forest outline-none">
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      }
                    />
                    {/* Password Strength Indicator */}
                    {password.length > 0 && (
                      <div className="mt-2">
                        <div className="flex gap-1 h-1.5 mb-1.5">
                          {[1,2,3,4].map((level) => (
                            <div key={level} className={`flex-1 rounded-full ${strengthScore >= level ? strengthColors[strengthScore] : 'bg-gray-200'} transition-colors duration-300`} />
                          ))}
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium text-right">{strengthLabels[strengthScore]}</p>
                      </div>
                    )}
                  </div>

                  {error && <p className="text-red-500 text-xs mb-4 p-3 bg-red-50 rounded-lg">{error}</p>}
                  
                  <button type="submit" className="w-full bg-vento-forest text-white font-bold py-3.5 rounded-full text-sm transition-all hover:bg-vento-forest-light hover:shadow-lg active:scale-[0.98] mt-auto">
                    Send OTP to Verify Mobile
                  </button>
                </form>
              ) : (
                // LOGIN FORM
                <form onSubmit={loginMethod === 'otp' ? handleSendOtp : handleEmailLogin} className="flex-1 flex flex-col">
                  {loginMethod === 'otp' ? (
                    <div className="mb-6">
                      <InputField label="Mobile Number" type="tel" value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="99999 99999" prefix="IN +91" />
                      <p className="text-xs text-gray-400 mt-2">An instant 6-digit OTP will be sent via SMS.</p>
                    </div>
                  ) : (
                    <div className="mb-6 space-y-2">
                      <InputField label="Email Address" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
                      <InputField 
                        label="Password" 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={e=>setPassword(e.target.value)} 
                        placeholder="••••••••"
                        suffix={
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-vento-forest outline-none">
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        }
                      />
                    </div>
                  )}

                  {error && <p className="text-red-500 text-xs mb-4 p-3 bg-red-50 rounded-lg">{error}</p>}
                  
                  <button type="submit" className="w-full bg-vento-forest text-white font-bold py-3.5 rounded-full text-sm transition-all hover:bg-vento-forest-light hover:shadow-lg active:scale-[0.98]">
                    {loginMethod === 'otp' ? 'Send OTP Verification Code' : 'Sign In'}
                  </button>

                  <div className="mt-6 text-center">
                    <button type="button" onClick={() => setLoginMethod(prev => prev === 'otp' ? 'email' : 'otp')} className="text-sm font-semibold text-vento-forest hover:text-vento-gold transition-colors outline-none">
                      {loginMethod === 'otp' ? 'Log in with Email instead' : 'Log in with Mobile OTP instead'}
                    </button>
                  </div>
                </form>
              )}

              {/* Toggle Login/Signup */}
              <div className="mt-8 text-center text-sm text-gray-500 pt-6 border-t border-gray-100">
                {isLogin ? (
                  <p>New to Vento? <button type="button" onClick={() => setIsLogin(false)} className="text-vento-forest font-bold hover:text-vento-gold transition-colors ml-1 outline-none">Create an account (Get 15% OFF)</button></p>
                ) : (
                  <p>Already have an account? <button type="button" onClick={() => setIsLogin(true)} className="text-vento-forest font-bold hover:text-vento-gold transition-colors ml-1 outline-none">Log in here</button></p>
                )}
              </div>
            </div>
          ) : (
            // OTP ENTRY STEP
            <div className="h-full flex flex-col justify-center">
              <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-vento-forest mb-8 w-fit transition-colors outline-none">
                <ArrowLeft size={16} /> Back
              </button>
              
              <h2 className="text-2xl md:text-3xl font-serif text-vento-forest mb-2">Verify Mobile</h2>
              <p className="text-gray-500 text-sm mb-8">
                We've sent a 6-digit code to <span className="font-bold text-gray-700">+91 {phone}</span>
              </p>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">6-Digit OTP</label>
                  <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="• • • • • •"
                    className="w-full text-center tracking-[1.5em] pl-[1.5em] text-2xl py-4 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-vento-forest focus:ring-1 focus:ring-vento-forest transition-colors font-bold text-gray-900"
                    required
                  />
                </div>
                
                {error && <p className="text-red-500 text-xs p-3 bg-red-50 rounded-lg">{error}</p>}
                
                <button type="submit" className="w-full bg-vento-forest text-white font-bold py-3.5 rounded-full text-sm transition-all hover:bg-vento-forest-light hover:shadow-lg active:scale-[0.98]">
                  Verify & Continue
                </button>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500">Didn't receive code? <button type="button" className="text-vento-forest font-bold hover:text-vento-gold ml-1 outline-none">Resend OTP</button></p>
                </div>
              </form>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
