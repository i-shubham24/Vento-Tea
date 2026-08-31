import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Package, MapPin, Edit3, Plus, Trash2, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Account() {
  const { user, logout } = useAuth();
  const { orders } = useOrder();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [addresses, setAddresses] = useState(()=>{
    try{ const v=localStorage.getItem('vento_addresses'); return v ? JSON.parse(v) : []; }catch{ return []; }
  });
  const [editForm, setEditForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
  useEffect(()=>{ if(user){ setEditForm({ name: user.name || '', email: user.email || '', phone: user.phone || '' }); } }, [user]);
  const [newAddr, setNewAddr] = useState({ line1:'', city:'', pin:'' });

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const userOrders = orders.filter(o => o.customer.email === user.email || o.customer.phone === user.phone);
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-[#F8FFFB] pt-24 pb-20">
      <SEO title="My Account" description="Manage your Vento Tea orders and account details." keywords="my account" noindex />
      {/* Header like Aurex beautiful frontend */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <p className="text-xs tracking-[0.2em] font-bold text-vento-forest/60 uppercase mb-2">Customer Profile</p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-vento-forest">My Account</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user.name || 'Valued Customer'}.</p>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 border border-vento-forest text-vento-forest px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-vento-forest hover:text-white transition-colors">
            <LogOut size={16}/> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Profile + Nav */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-vento-mint border border-vento-cream-dark flex items-center justify-center text-vento-forest"><User size={20}/></div>
              <div>
                <p className="font-bold text-vento-forest">{user.name || 'Valued Customer'}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Customer</p>
              </div>
            </div>
            <div className="space-y-4 text-sm border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="font-medium text-vento-forest break-all">{user.email || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="font-medium text-vento-forest">{user.phone ? `+91 ${user.phone}` : '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Default Address</p>
                <p className="font-medium text-vento-forest text-sm">{addresses[0] ? `${addresses[0].line1}, ${addresses[0].city} - ${addresses[0].pin}` : 'No address saved yet.'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-vento-forest text-white font-semibold text-sm"><Package size={16}/> My Orders</button>
            <button onClick={()=> setShowAddresses(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-vento-forest hover:bg-vento-mint font-medium text-sm text-left"><MapPin size={16}/> Saved Addresses</button>
            <button onClick={()=> setShowEdit(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-vento-gold hover:bg-vento-cream font-medium text-sm border border-vento-gold/20"><Edit3 size={16}/> Enter Details</button>
          </div>
        </div>

        {/* Right: Order History */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Package size={18} className="text-vento-forest"/>
            <h2 className="text-xl font-serif text-vento-forest font-bold">Order History</h2>
            <span className="text-xs bg-vento-mint text-vento-forest px-2 py-1 rounded-full">{userOrders.length} orders</span>
          </div>

          {userOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4"><Package size={24} className="text-gray-400"/></div>
              <h3 className="font-bold text-vento-forest">No orders yet</h3>
              <p className="text-sm text-gray-500 mt-1">Explore our premium collection and place your first order.</p>
              <Link to="/shop" className="inline-block mt-6 bg-vento-forest text-white px-8 py-3 rounded-full font-bold hover:bg-vento-gold hover:text-vento-forest">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map(order=>(
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
                    <div>
                      <p className="font-mono text-sm font-bold text-vento-forest">{order.id}</p>
                      <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()} • {order.courier}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.paymentStatus==='success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.paymentStatus.toUpperCase()}</span>
                      <span className="bg-vento-mint text-vento-forest px-2 py-1 rounded-full text-xs font-bold">{order.orderStatus.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((it,i)=>(
                      <div key={i} className="flex gap-3 items-center">
                        <img src={it.image} alt={it.name} className="w-12 h-12 rounded object-cover" />
                        <div className="flex-1"><p className="text-sm font-semibold text-vento-forest">{it.name} • {it.weight.label}</p><p className="text-xs text-gray-500">Qty {it.quantity}</p></div>
                        <p className="font-bold text-sm">₹{it.unitPrice * it.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <p className="font-bold text-vento-forest">Total ₹{order.subtotal}</p>
                    <div className="flex gap-2">
                      <button onClick={()=> window.print()} className="border border-vento-forest text-vento-forest px-4 py-2 rounded-full text-xs font-bold hover:bg-vento-cream">View Invoice</button>
                      <Link to={`/order-details/${order.id}`} className="bg-vento-forest text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-vento-gold hover:text-vento-forest">Track</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showEdit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/40" onClick={()=> setShowEdit(false)}></div>
              <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-vento-forest">Enter Details</h3><button onClick={()=> setShowEdit(false)}><X size={18}/></button></div>
                <div className="space-y-3">
                  <input value={editForm.name} onChange={e=> setEditForm({...editForm, name:e.target.value})} placeholder="Name" className="w-full border rounded-lg px-3 py-2 text-sm" />
                  <input value={editForm.email} onChange={e=> setEditForm({...editForm, email:e.target.value})} placeholder="Email" className="w-full border rounded-lg px-3 py-2 text-sm" />
                  <input value={editForm.phone} onChange={e=> setEditForm({...editForm, phone:e.target.value})} placeholder="Phone" className="w-full border rounded-lg px-3 py-2 text-sm" />
                  <button onClick={()=> setShowEdit(false)} className="w-full bg-vento-forest text-white py-2.5 rounded-full font-bold">Save Details</button>
                </div>
              </div>
            </div>
          )}
          {showAddresses && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/40" onClick={()=> setShowAddresses(false)}></div>
              <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[80vh] overflow-auto">
                <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-vento-forest">Saved Addresses</h3><button onClick={()=> setShowAddresses(false)}><X size={18}/></button></div>
                <div className="space-y-3">
                  {addresses.length===0 && <p className="text-sm text-gray-500">No addresses saved.</p>}
                  {addresses.map((a,i)=>(
                    <div key={i} className="border rounded-lg p-3 flex justify-between items-center">
                      <p className="text-sm">{a.line1}, {a.city} - {a.pin}</p>
                      <button onClick={()=>{const na=addresses.filter((_,idx)=> idx!==i); setAddresses(na); localStorage.setItem('vento_addresses', JSON.stringify(na));}} className="text-red-500"><Trash2 size={16}/></button>
                    </div>
                  ))}
                  <div className="border-t pt-3 space-y-2">
                    <input value={newAddr.line1} onChange={e=> setNewAddr({...newAddr, line1:e.target.value})} placeholder="Address line" className="w-full border rounded-lg px-3 py-2 text-sm" />
                    <div className="flex gap-2"><input value={newAddr.city} onChange={e=> setNewAddr({...newAddr, city:e.target.value})} placeholder="City" className="flex-1 border rounded-lg px-3 py-2 text-sm" /><input value={newAddr.pin} onChange={e=> setNewAddr({...newAddr, pin:e.target.value})} placeholder="PIN" className="flex-1 border rounded-lg px-3 py-2 text-sm" /></div>
                    <button onClick={()=>{
                      if(!newAddr.line1 || !newAddr.city || !newAddr.pin) return;
                      const na=[...addresses, newAddr]; setAddresses(na); localStorage.setItem('vento_addresses', JSON.stringify(na)); setNewAddr({line1:'', city:'', pin:''});
                    }} className="w-full bg-vento-forest text-white py-2 rounded-full font-bold text-sm flex items-center justify-center gap-1"><Plus size={14}/> Add Address</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
