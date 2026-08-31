import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin(){
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handle = (e)=>{
    e.preventDefault();
    const role = login(email, password);
    if(role==='admin'){ navigate('/admin'); }
    else setError('Invalid admin credentials');
  };
  return (
    <div className="min-h-screen bg-vento-mint flex items-center justify-center p-4">
      <form onSubmit={handle} className="bg-white rounded-lg p-8 w-full max-w-sm shadow-xl border border-vento-cream-dark">
        <h1 className="text-2xl font-serif text-vento-forest text-center">Vento Admin</h1>
        <div className="h-6"></div>
        <input value={email} onChange={e=> setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-lg px-3 py-3 text-sm mb-3 outline-none focus:border-vento-forest" />
        <input type="password" value={password} onChange={e=> setPassword(e.target.value)} placeholder="Password" className="w-full border rounded-lg px-3 py-3 text-sm mb-4 outline-none focus:border-vento-forest" />
        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
        <button type="submit" className="mx-auto block bg-vento-forest text-white px-8 py-2 rounded-full font-bold text-sm hover:bg-vento-gold hover:text-vento-forest transition-colors">Login</button>
      </form>
    </div>
  );
}
