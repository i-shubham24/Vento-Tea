import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { mockProducts } from '../data/mockData';
import AdminLogin from './AdminLogin';
import OrderDetailsDrawer from '../components/OrderDetailsDrawer';
import CategoryForm from '../components/CategoryForm';
import { LayoutDashboard, Package, Tag, ShoppingCart, Users, Star, BookOpen, Images, Megaphone, Ticket, Sparkles, ClipboardList, LogOut, Bell, Menu, X } from 'lucide-react';

const MENU = [
  { id:'dashboard', label:'Dashboard', icon: LayoutDashboard },
  { id:'products', label:'Products', icon: Package },
  { id:'categories', label:'Categories', icon: Tag },
  { id:'orders', label:'Orders', icon: ShoppingCart },
  { id:'customers', label:'Customers', icon: Users },
  { id:'reviews', label:'Reviews', icon: Star },
  { id:'blogs', label:'Blogs / Journal', icon: BookOpen },
  { id:'carousel', label:'Carousel', icon: Images },
  { id:'campaigns', label:'Campaigns', icon: Megaphone },
  { id:'coupons', label:'Coupons', icon: Ticket },
  { id:'welcome', label:'Welcome Popup', icon: Sparkles },
  { id:'audit', label:'Audit Logs', icon: ClipboardList },
];

export default function AdminPortal(){
  const { user, logout } = useAuth();
  const { orders, updateOrderStatus } = useOrder();
  const [active, setActive] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState(()=>{
    try{ const v=localStorage.getItem('vento_admin_products'); return v ? JSON.parse(v) : mockProducts; }catch{ return mockProducts; }
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [productSearch, setProductSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [categories, setCategories] = useState(()=>{
    try{ const v=localStorage.getItem('vento_categories'); return v ? JSON.parse(v) : [
      { id:'1', name:'Everyday Chai', slug:'everyday-chai', products:2, featured:false, status:'Active' },
      { id:'2', name:'Whole Leaf', slug:'whole-leaf', products:1, featured:true, status:'Active' },
      { id:'3', name:'Masala Chai', slug:'masala-chai', products:1, featured:false, status:'Active' },
      { id:'4', name:'Gift Boxes', slug:'gift-boxes', products:1, featured:false, status:'Active' },
    ]; }catch{ return []; }
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [coupons, setCoupons] = useState(()=>{
    try{ const v=localStorage.getItem('vento_coupons'); return v ? JSON.parse(v) : [
      { code:'NEWUSER15', discount:'15% off', minOrder:'None', active:true },
      { code:'VENTO10', discount:'₹50 off', minOrder:'₹499', active:true },
      { code:'FESTIVE15', discount:'15% off', minOrder:'₹2500', active:true },
    ]; }catch{ return [
      { code:'NEWUSER15', discount:'15% off', minOrder:'None', active:true },
      { code:'VENTO10', discount:'₹50 off', minOrder:'₹499', active:true },
    ]; }
  });
  const [blogs, setBlogs] = useState(()=>{
    try{ const v=localStorage.getItem('vento_blogs'); return v ? JSON.parse(v) : [
      { id:'1', title:'Everyday care that makes cookware last', category:'CARE GUIDE', readTime:'3 min', status:'Published' },
      { id:'2', title:'The secret to crisp, even dosas every time', category:'RECIPES', readTime:'6 min', status:'Published' },
    ]; }catch{ return []; }
  });
  const [carousel, setCarousel] = useState(()=>{
    try{ const v=localStorage.getItem('vento_carousel'); return v ? JSON.parse(v) : [
      { id:'1', headline:'Cookware built to last', subtitle:'5 decades of craftsmanship', link:'/shop' },
      { id:'2', headline:'Triply steel, engineered', subtitle:'Three bonded layers', link:'/shop/triply' },
    ]; }catch{ return []; }
  });
  const [campaigns, setCampaigns] = useState(()=>{
    try{ const v=localStorage.getItem('vento_campaigns'); return v ? JSON.parse(v) : [
      { id:'1', name:'Rakhi Special 10% Off', banner:'Rakhi Special: Get 10% auto-discount at checkout!', active:true },
    ]; }catch{ return []; }
  });
  const [welcomeActive, setWelcomeActive] = useState(()=> localStorage.getItem('vento_welcome_active') !== 'false');
  const [auditLogs] = useState(()=>{
    try{ const v=localStorage.getItem('vento_audit_logs'); return v ? JSON.parse(v) : [
      { time: new Date().toISOString(), customer:'Guest Visitor', action:'Product Viewed', details:'Viewed Masala Tea', device:'Desktop' },
      { time: new Date().toISOString(), customer:'Guest Visitor', action:'Added to Cart', details:'Added Kadak Chai', device:'Desktop' },
    ]; }catch{ return []; }
  });
  useEffect(()=>{ localStorage.setItem('vento_admin_products', JSON.stringify(products)); }, [products]);
  if(!user || user.role!=='admin'){
    return <AdminLogin />;
  }
  const stats = {
    sales: orders.reduce((s,o)=> s + (o.orderStatus!=='cancelled' ? o.subtotal : 0),0),
    active: orders.filter(o=> !['delivered','cancelled'].includes(o.orderStatus)).length,
    products: products.length,
    customers: 15,
  };

  return (
    <div className="min-h-screen bg-[#F8FFFB] flex">
      {/* Content left */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar — content left (inverted vs Aurex top-right) */}
        <header className="h-16 bg-white border-b border-vento-cream-dark flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={()=> setMobileOpen(true)} className="md:hidden p-2 rounded border"><Menu size={18}/></button>
            <span className="text-xs tracking-widest font-bold text-vento-forest">ADMIN PORTAL</span>
            <span className="hidden sm:inline text-sm text-gray-400">• Vento Tea</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-vento-forest hover:text-vento-gold transition-colors"><Bell size={18}/></button>
            <div className="text-right">
              <p className="text-sm font-bold text-vento-forest">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-vento-forest text-white flex items-center justify-center text-xs font-bold">SA</div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          {active==='dashboard' && (
            <div className="space-y-6">
              <div className="border-l-4 border-vento-gold pl-4">
                <h1 className="text-2xl font-bold text-vento-forest">Dashboard Overview</h1>
                <p className="text-sm text-gray-600">Welcome back, here&apos;s what&apos;s happening with your store today.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat label="Total Sales" value={`₹${stats.sales.toFixed(1)}`} accent="gold" />
                <Stat label="Active Orders" value={stats.active} accent="mint" />
                <Stat label="Total Products" value={stats.products} accent="forest" />
                <Stat label="Total Customers" value={stats.customers} accent="cream" />
              </div>
              <div className="bg-white rounded-lg p-4 border border-vento-cream-dark shadow-sm">
                <div className="flex justify-between items-center mb-3"><h3 className="font-bold text-vento-forest">Recent Orders</h3><button onClick={()=> setActive('orders')} className="text-xs text-vento-forest underline hover:text-vento-gold">View All Orders →</button></div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-xs text-gray-400"><tr><th className="text-left py-2">ORDER ID</th><th>CUSTOMER</th><th>DATE</th><th>STATUS</th></tr></thead>
                    <tbody>
                      {orders.slice(0,5).map(o=>(
                        <tr key={o.id} className="border-t"><td className="py-3 font-mono text-xs">{o.id}</td><td>{o.customer.name}</td><td>{new Date(o.createdAt).toLocaleDateString()}</td><td><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{o.orderStatus.toUpperCase()}</span></td></tr>
                      ))}
                      {orders.length===0 && <tr><td colSpan={4} className="py-6 text-center text-gray-400 text-sm">No orders yet. Place an order as demo@vento.com.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {active==='products' && (
            <div>
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-bold text-vento-forest">Products</h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input value={productSearch} onChange={e=> setProductSearch(e.target.value)} placeholder="Search products..." className="flex-1 sm:w-64 border rounded-full px-4 py-2 text-sm outline-none focus:border-vento-forest" />
                  <button onClick={()=> {setEditingProduct(null); setShowProductModal(true);}} className="bg-vento-forest text-white px-4 py-2 rounded-full text-sm whitespace-nowrap">+ Add Product</button>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-vento-cream-dark overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead className="text-xs text-gray-400 bg-gray-50"><tr><th className="text-left p-3">Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
                  <tbody>{products.filter(p=> p.name.toLowerCase().includes(productSearch.toLowerCase())).map(p=>(
                    <tr key={p.id} className="border-t"><td className="p-3 flex items-center gap-2"><img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded object-cover"/>{p.name}</td><td>{p.category}</td><td>₹{p.priceInr}</td><td>{(p.id.charCodeAt(4)%8)+3} Left</td>
                    <td className="p-3 flex gap-2"><button onClick={()=> {setEditingProduct(p); setShowProductModal(true);}} className="text-vento-forest border border-vento-forest/20 px-2 py-1 rounded text-xs hover:bg-vento-forest hover:text-white transition-colors">Edit</button><button onClick={()=> setProducts(prev=> prev.filter(x=> x.id!==p.id))} className="text-red-600 border border-red-200 px-2 py-1 rounded text-xs hover:bg-red-50 hover:border-red-300 transition-colors">Delete</button></td></tr>
                  ))}</tbody>
                </table>
              </div>
              
        
            </div>
          )}
          {active==='categories' && (
            <div>
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-vento-forest">Categories</h2>
                  <p className="text-sm text-gray-500">Organize your products into categories ({categories.length} total).</p>
                </div>
                <button onClick={() => { setEditingCategory(null); setShowCategoryModal(true); }} className="bg-vento-forest text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-vento-gold hover:text-vento-forest transition-colors">+ Add Category</button>
              </div>
              <div className="mb-4">
                <input placeholder="Search categories by name, slug..." className="w-full sm:w-80 border rounded-full px-4 py-2 text-sm outline-none focus:border-vento-forest" />
              </div>
              <div className="bg-white rounded-lg border border-vento-cream-dark overflow-hidden overflow-x-auto shadow-sm">
                <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-vento-mint/50 text-xs font-bold tracking-widest uppercase text-vento-forest">
                  <div className="col-span-5">Category Name</div>
                  <div className="col-span-2 text-center">Products</div>
                  <div className="col-span-2 text-center">Featured</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-1"></div>
                </div>
                <div className="divide-y">
                  {categories.map(cat=>(
                    <div key={cat.id} className="grid grid-cols-12 gap-4 items-center px-4 py-4 hover:bg-vento-mint/20 transition-colors">
                      <div className="col-span-12 sm:col-span-5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-vento-mint border flex items-center justify-center text-vento-forest">🍃</div>
                        <div>
                          <p className="font-bold text-vento-forest text-sm">{cat.name}</p>
                          <p className="text-xs text-gray-400">/{cat.slug}</p>
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-2 text-center text-sm font-semibold">{cat.products} items</div>
                      <div className="col-span-4 sm:col-span-2 text-center text-sm text-gray-500">{cat.featured ? '★' : '-'}</div>
                      <div className="col-span-2 sm:col-span-2 text-center"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span></div>
                      <div className="col-span-2 sm:col-span-1 text-right">
                        <button onClick={() => { setEditingCategory(cat); setShowCategoryModal(true); }} className="text-vento-forest border border-vento-forest/20 px-2 py-1 rounded text-xs hover:bg-vento-forest hover:text-white transition-colors">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {active==='orders' && (
            <div>
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-bold text-vento-forest">Orders ({orders.length})</h2>
                <input value={orderSearch} onChange={e=> setOrderSearch(e.target.value)} placeholder="Search orders by ID, customer..." className="border rounded-full px-4 py-2 text-sm w-full sm:w-80 outline-none focus:border-vento-forest" />
              <div className="flex gap-2 overflow-x-auto pb-2 mb-2 hide-scrollbar">
                  {['all', 'pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'].map(status => (
                    <button 
                      key={status} 
                      onClick={() => setOrderStatusFilter(status)}
                      className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${orderStatusFilter === status ? 'bg-vento-forest text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                      {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)} 
                      ({status === 'all' ? orders.length : orders.filter(o => o.orderStatus === status).length})
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg border border-vento-cream-dark overflow-hidden overflow-x-auto"><table className="w-full text-sm min-w-[700px]">
                  <thead className="text-xs text-gray-400 bg-gray-50"><tr><th className="text-left p-3">Order Number</th><th>Customer</th><th>Date</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead>
                  <tbody>{orders.filter(o=> (orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter) && (o.id.toLowerCase().includes(orderSearch.toLowerCase()) || o.customer.name.toLowerCase().includes(orderSearch.toLowerCase()))).map(o=>(
                    <tr key={o.id} className="border-t hover:bg-vento-mint/30 cursor-pointer" onClick={()=> setSelectedOrder(o)}><td className="p-3 font-mono text-xs">{o.id}</td><td>{o.customer.name}<br/><span className="text-xs text-gray-400">{o.customer.email}</span></td><td>{new Date(o.createdAt).toLocaleDateString()}</td><td>₹{o.subtotal}</td><td><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{o.paymentStatus.toUpperCase()}</span></td>
                    <td><select value={o.orderStatus} onClick={e=> e.stopPropagation()} onChange={e=> updateOrderStatus(o.id, e.target.value)} className="bg-vento-mint border rounded-full px-2 py-1 text-xs font-bold text-vento-forest outline-none">
                      <option value="pending">PENDING</option><option value="confirmed">CONFIRMED</option><option value="packed">PACKED</option><option value="shipped">SHIPPED</option><option value="delivered">DELIVERED</option><option value="cancelled">CANCELLED</option>
                    </select></td></tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}
          {active==='customers' && (
            <div>
              <h2 className="text-xl font-bold text-vento-forest mb-4">Customers ({orders.length})</h2>
              <div className="bg-white rounded-lg border overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead className="text-xs text-gray-400 bg-gray-50"><tr><th className="text-left p-3">Customer</th><th>Contact</th><th>Orders</th><th>Total Spent</th></tr></thead>
                  <tbody>{[...new Map(orders.map(o=>[o.customer.email, o])).values()].map((o,i)=>(
                    <tr key={i} className="border-t"><td className="p-3 font-semibold">{o.customer.name}<br/><span className="text-xs text-gray-400">{o.customer.email}</span></td><td className="p-3 text-xs">{o.customer.phone} • {o.shippingAddress?.city || '—'}</td><td className="p-3">{orders.filter(x=> x.customer.email===o.customer.email).length}</td><td className="p-3">₹{orders.filter(x=> x.customer.email===o.customer.email).reduce((s,x)=> s+x.subtotal,0)}</td></tr>
                  ))}{orders.length===0 && <tr><td colSpan={4} className="p-6 text-center text-gray-400">No customers yet.</td></tr>}</tbody>
                </table>
              </div>
            </div>
          )}
          {active==='reviews' && (
            <div>
              <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-vento-forest">Reviews</h2><span className="text-xs bg-vento-mint px-2 py-1 rounded-full">{orders.filter(o=>o.review).length} total</span></div>
              <div className="bg-white rounded-lg border overflow-hidden overflow-x-auto">
                {orders.filter(o=>o.review).length ? orders.filter(o=>o.review).map(o=>(
                  <div key={o.id} className="p-4 border-b flex justify-between items-start gap-4">
                    <div><p className="font-semibold text-sm">{o.customer.name} — {o.review.rating}★ on {o.items[0]?.name}</p><p className="text-sm text-gray-600">{o.review.comment}</p><p className="text-xs text-gray-400">{new Date(o.review.date).toLocaleString()}</p></div>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Approved</span>
                  </div>
                )) : <p className="p-6 text-sm text-gray-500">No reviews yet. Reviews appear after delivered + review popup.</p>}
              </div>
            </div>
          )}
          {active==='blogs' && (
            <div>
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-bold text-vento-forest">Blogs / Journal</h2>
                <button onClick={()=>{
                  const title=prompt('Article title?');
                  if(title){ const b={id:Date.now().toString(), title, category:'CARE GUIDE', readTime:'3 min', status:'Published'}; const nb=[...blogs,b]; setBlogs(nb); localStorage.setItem('vento_blogs', JSON.stringify(nb)); }
                }} className="bg-vento-forest text-white px-4 py-2 rounded-full text-sm">+ New Article</button>
              </div>
              <div className="bg-white rounded-lg border overflow-hidden overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-gray-400 bg-gray-50"><tr><th className="text-left p-3">ARTICLE</th><th>CATEGORY</th><th>STATUS</th><th></th></tr></thead>
                  <tbody>{blogs.map(b=>(
                    <tr key={b.id} className="border-t"><td className="p-3 font-semibold">{b.title}</td><td className="p-3 text-xs"><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{b.category}</span></td><td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{b.status}</span></td><td className="p-3"><button onClick={()=>{const nb=blogs.filter(x=> x.id!==b.id); setBlogs(nb); localStorage.setItem('vento_blogs', JSON.stringify(nb));}} className="text-red-600 border border-red-200 px-2 py-1 rounded text-xs hover:bg-red-50 hover:border-red-300 transition-colors">Delete</button></td></tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}
          {active==='carousel' && (
            <div>
              <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-vento-forest">Carousel</h2><button onClick={()=>{
                const h=prompt('Slide headline?'); if(h){ const s={id:Date.now().toString(), headline:h, subtitle:'New slide', link:'/shop'}; const nc=[...carousel,s]; setCarousel(nc); localStorage.setItem('vento_carousel', JSON.stringify(nc)); }
              }} className="bg-vento-forest text-white px-4 py-2 rounded-full text-sm">+ Add Slide</button></div>
              <div className="bg-white rounded-lg border overflow-hidden overflow-x-auto">
                <table className="w-full text-sm"><thead className="text-xs text-gray-400 bg-gray-50"><tr><th className="text-left p-3">Headline</th><th>Subtitle</th><th>Link</th><th></th></tr></thead>
                <tbody>{carousel.map(s=>(
                  <tr key={s.id} className="border-t"><td className="p-3 font-semibold">{s.headline}</td><td className="p-3 text-xs">{s.subtitle}</td><td className="p-3 font-mono text-xs">{s.link}</td><td className="p-3"><button onClick={()=>{const nc=carousel.filter(x=> x.id!==s.id); setCarousel(nc); localStorage.setItem('vento_carousel', JSON.stringify(nc));}} className="text-red-600 border border-red-200 px-2 py-1 rounded text-xs hover:bg-red-50 hover:border-red-300 transition-colors">Delete</button></td></tr>
                ))}</tbody></table>
              </div>
            </div>
          )}
          {active==='campaigns' && (
            <div>
              <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-vento-forest">Storewide Campaigns</h2><button onClick={()=>{
                const n=prompt('Campaign name?'); if(n){ const c={id:Date.now().toString(), name:n, banner:`${n}: Get 10% auto-discount!`, active:true}; const nc=[...campaigns,c]; setCampaigns(nc); localStorage.setItem('vento_campaigns', JSON.stringify(nc)); }
              }} className="bg-vento-forest text-white px-4 py-2 rounded-full text-sm">+ Create Campaign</button></div>
              <div className="space-y-3">{campaigns.map(c=>(
                <div key={c.id} className="bg-white rounded-lg p-4 border flex justify-between items-center">
                  <div><p className="font-semibold">{c.name}</p><p className="text-xs text-gray-500">{c.banner}</p></div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>{const nc=campaigns.map(x=> x.id===c.id ? {...x, active:!x.active}:x); setCampaigns(nc); localStorage.setItem('vento_campaigns', JSON.stringify(nc));}} className={`w-10 h-6 rounded-full relative ${c.active ? 'bg-vento-forest' : 'bg-gray-300'}`}><span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${c.active ? 'right-1' : 'left-1'}`}></span></button>
                    <button onClick={()=>{const nc=campaigns.filter(x=> x.id!==c.id); setCampaigns(nc); localStorage.setItem('vento_campaigns', JSON.stringify(nc));}} className="text-red-600 border border-red-200 px-2 py-1 rounded text-xs hover:bg-red-50 hover:border-red-300 transition-colors">Delete</button>
                  </div>
                </div>
              ))}</div>
            </div>
          )}
          {active==='coupons' && (
            <div>
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-bold text-vento-forest">Coupon Codes</h2>
                <button onClick={()=>{
                  const code=prompt('Coupon code?'); if(code){ const co={code:code.toUpperCase(), discount:'10% off', minOrder:'₹500', active:true}; const nc=[...coupons,co]; setCoupons(nc); localStorage.setItem('vento_coupons', JSON.stringify(nc)); }
                }} className="bg-vento-forest text-white px-4 py-2 rounded-full text-sm">+ Create Coupon</button>
              </div>
              <div className="bg-white rounded-lg border overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[500px]"><thead className="text-xs text-gray-400 bg-gray-50"><tr><th className="text-left p-3">Code</th><th>Discount</th><th>Min Order</th><th>Active</th><th></th></tr></thead>
                <tbody>{coupons.map((co,i)=>(
                  <tr key={i} className="border-t"><td className="p-3 font-mono">{co.code}</td><td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{co.discount}</span></td><td className="p-3">{co.minOrder}</td>
                  <td><button onClick={()=>{const nc=coupons.map((x,idx)=> idx===i ? {...x, active:!x.active}:x); setCoupons(nc); localStorage.setItem('vento_coupons', JSON.stringify(nc));}} className={`w-10 h-6 rounded-full relative ${co.active ? 'bg-vento-forest' : 'bg-gray-300'}`}><span className={`absolute top-1 w-4 h-4 bg-white rounded-full ${co.active ? 'right-1' : 'left-1'}`}></span></button></td>
                  <td><button onClick={()=>{const nc=coupons.filter((_,idx)=> idx!==i); setCoupons(nc); localStorage.setItem('vento_coupons', JSON.stringify(nc));}} className="text-red-600 border border-red-200 px-2 py-1 rounded text-xs hover:bg-red-50 hover:border-red-300 transition-colors">Delete</button></td></tr>
                ))}</tbody></table>
              </div>
            </div>
          )}
          {active==='welcome' && (
            <div>
              <h2 className="text-xl font-bold text-vento-forest mb-4">Welcome Popup & Offers</h2>
              <div className="bg-white rounded-lg p-6 border space-y-4">
                <label className="flex items-center justify-between cursor-pointer" onClick={()=>{const nv=!welcomeActive; setWelcomeActive(nv); localStorage.setItem('vento_welcome_active', nv.toString());}}>
                  <span className="text-sm font-semibold">Arrival Modal Active</span>
                  <span className={`w-10 h-6 rounded-full relative inline-block transition-colors ${welcomeActive ? 'bg-vento-forest' : 'bg-gray-300'}`}><span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${welcomeActive ? 'right-1' : 'left-1'}`}></span></span>
                </label>
                <p className="text-xs text-gray-500">Controls PromoPopup 20-30s logic — stored in localStorage vento_welcome_active. When off, popup never shows.</p>
              </div>
            </div>
          )}
          {active==='audit' && (
            <div>
              <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-vento-forest">Audit Logs</h2><span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Live</span></div>
              <div className="bg-white rounded-lg border overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead className="text-xs text-gray-400 bg-gray-50"><tr><th className="text-left p-3">TIME</th><th>CUSTOMER</th><th>ACTION</th><th>DETAILS</th><th>DEVICE</th></tr></thead>
                  <tbody>{auditLogs.map((log,i)=>(
                    <tr key={i} className="border-t"><td className="p-3 text-xs">{new Date(log.time).toLocaleString()}</td><td className="p-3 text-sm">{log.customer}</td><td><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">{log.action}</span></td><td className="p-3 text-xs">{log.details}</td><td className="p-3 text-xs">{log.device}</td></tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Right rail — inverted vs Aurex left */}
      <aside className={`fixed md:static inset-y-0 right-0 w-64 bg-vento-forest text-white flex flex-col z-30 transform ${mobileOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'} transition-transform`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <span className="font-black tracking-widest">VENTO</span>
          <button onClick={()=> setMobileOpen(false)} className="md:hidden"><X size={18}/></button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {MENU.map(m=>{
            const Icon=m.icon;
            const isActive = active===m.id;
            return <button key={m.id} onClick={()=> {setActive(m.id); setMobileOpen(false);}} className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-white text-vento-forest' : 'text-white/80 hover:bg-white/10 hover:text-vento-pale-yellow'}`}><Icon size={18}/> {m.label}<span className={`absolute left-3 right-3 -bottom-0.5 h-[2px] bg-vento-gold transition-transform origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span></button>;
          })}
        </nav>
        <button onClick={logout} className="m-3 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-sm"><LogOut size={16}/> Logout</button>
      </aside>
      {mobileOpen && <div className="fixed inset-0 bg-black/30 md:hidden z-20" onClick={()=> setMobileOpen(false)}></div>}
      
      {showCategoryModal && (
          <CategoryForm 
            category={editingCategory} 
            onSave={(cat) => {
              let nc;
              if (editingCategory) {
                nc = categories.map(c => c.id === cat.id ? cat : c);
              } else {
                nc = [...categories, cat];
              }
              setCategories(nc);
              localStorage.setItem('vento_categories', JSON.stringify(nc));
              setShowCategoryModal(false);
            }}
            onCancel={() => setShowCategoryModal(false)}
          />
        )}
      {showProductModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto">
                  <div className="absolute inset-0 bg-black/40" onClick={()=> setShowProductModal(false)}></div>
                  <div className="relative bg-[#F8FFFB] rounded-xl w-full max-w-5xl shadow-xl max-h-[90vh] overflow-auto">
                    <DetailedProductForm product={editingProduct} onSave={(data)=>{
                      if(editingProduct){ setProducts(prev=> prev.map(x=> x.id===editingProduct.id ? {...x, ...data} : x)); }
                      else { const id='sku-'+Date.now(); setProducts(prev=> [...prev, { id, slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g,'-'), images:[data.image || '/brand/client/products/gold-tea/5.png'], badges:data.badges || ['New'], weights:[{grams:Number(data.stock) || 250,label:`${data.stock||250}g`,priceInr: Number(data.price)}], ...data, priceInr: Number(data.price) }]); }
                      setShowProductModal(false);
                    }} onCancel={()=> setShowProductModal(false)} />
                  </div>
                </div>
              )}
      <OrderDetailsDrawer 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
        onUpdateStatus={(id, status) => {
          updateOrderStatus(id, status);
          setSelectedOrder({...selectedOrder, orderStatus: status});
        }} 
      />
    </div>
  );
}

function Stat({ label, value, accent }){
  const bg = accent==='gold' ? 'bg-vento-gold/15 border-vento-gold/30' : accent==='mint' ? 'bg-vento-mint border-vento-forest/10' : accent==='forest' ? 'bg-vento-forest text-white border-vento-forest' : 'bg-white border-vento-cream-dark';
  const text = accent==='forest' ? 'text-white' : 'text-vento-forest';
  const sub = accent==='forest' ? 'text-white/70' : 'text-gray-500';
  return <div className={`rounded-lg p-5 border shadow-sm ${bg}`}><p className={`text-xs tracking-widest uppercase font-bold ${sub}`}>{label}</p><p className={`text-2xl font-black mt-1 ${text}`}>{value}</p></div>;
}
function DetailedProductForm({ product, onSave, onCancel }){
  const [form, setForm] = useState({
    name: product?.name || '',
    category: product?.category || 'Everyday Chai',
    price: product?.priceInr || '',
    description: product?.description || '',
    image: product?.images?.[0] || '',
    stock: product?.stock || 20,
    featured: product?.featured || false,
    newArrival: product?.badges?.includes('New') || false,
    bestSeller: product?.badges?.includes('Best Seller') || false,
  });
  const badges = [];
  if(form.newArrival) badges.push('New');
  if(form.bestSeller) badges.push('Best Seller');
  if(form.featured) badges.push('Featured');
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-vento-forest">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <p className="text-xs text-gray-500">{product ? 'Update product details' : 'Create a new product listing in the catalogue.'}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-full border text-sm">Cancel</button>
          <button onClick={()=> onSave({...form, badges, stock: Number(form.stock)})} className="px-6 py-2 rounded-full bg-vento-forest text-white text-sm font-bold">Save Product</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border p-5">
            <h3 className="font-bold text-vento-forest mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Product Name *</label>
                <input value={form.name} onChange={e=> setForm({...form, name:e.target.value})} placeholder="e.g., Premium Ceramic Dinner Set" className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Category *</label>
                <select value={form.category} onChange={e=> setForm({...form, category:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm">
                  <option>Everyday Chai</option><option>Whole Leaf</option><option>Masala Chai</option><option>Gift Boxes</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Full Description</label>
                <div className="border rounded-lg">
                  <div className="flex gap-2 p-2 border-b bg-gray-50 text-xs"><span className="font-bold">B</span><span className="italic">I</span><span className="underline">U</span><span>• List</span></div>
                  <textarea value={form.description} onChange={e=> setForm({...form, description:e.target.value})} rows={4} placeholder="Describe the tea, origin, tasting notes..." className="w-full p-3 text-sm outline-none rounded-b-lg" />
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Features <span className="text-xs font-normal text-gray-400">(one per line → pill)</span></h4>
                <textarea rows={2} placeholder="e.g. 100% Natural&#10;Whole Leaf Aroma" className="w-full border rounded-lg p-2 text-sm" />
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Specifications <span className="text-xs font-normal text-gray-400">(label: value)</span></h4>
                <textarea rows={2} placeholder="e.g. Origin: Assam&#10;Weight: 250g" className="w-full border rounded-lg p-2 text-sm" />
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-1">Product Images</h4>
                <p className="text-xs text-gray-500 mb-3">Upload product images. The first image will be the primary display.</p>
                <input value={form.image} onChange={e=> setForm({...form, image:e.target.value})} placeholder="Image URL" className="w-full border rounded-lg px-3 py-2 text-sm" />
                <div className="mt-3 border-2 border-dashed rounded-lg h-32 flex items-center justify-center text-gray-400 text-sm">Click to upload or drag and drop</div>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Visibility, Pricing, Inventory */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-5">
            <h3 className="font-bold text-vento-forest mb-4">Visibility Status</h3>
            <div className="space-y-4">
              <label className="flex justify-between items-center"><span className="text-sm"><p className="font-semibold">Featured Product</p><p className="text-xs text-gray-500">Show on homepage carousel</p></span><input type="checkbox" checked={form.featured} onChange={e=> setForm({...form, featured:e.target.checked})} className="accent-vento-forest" /></label>
              <label className="flex justify-between items-center"><span className="text-sm"><p className="font-semibold">New Arrival</p><p className="text-xs text-gray-500">Add a 'New' badge</p></span><input type="checkbox" checked={form.newArrival} onChange={e=> setForm({...form, newArrival:e.target.checked})} className="accent-vento-forest" /></label>
              <label className="flex justify-between items-center"><span className="text-sm"><p className="font-semibold">Best Seller</p><p className="text-xs text-gray-500">Add a 'Best Seller' badge</p></span><input type="checkbox" checked={form.bestSeller} onChange={e=> setForm({...form, bestSeller:e.target.checked})} className="accent-vento-forest" /></label>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-5">
            <h3 className="font-bold text-vento-forest mb-3">Pricing</h3>
            <label className="block text-xs font-semibold mb-1">Price (₹) *</label>
            <input type="number" value={form.price} onChange={e=> setForm({...form, price:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="bg-white rounded-lg border p-5">
            <h3 className="font-bold text-vento-forest mb-3">Inventory</h3>
            <label className="flex justify-between items-center mb-3"><span className="text-sm font-semibold">Track Inventory</span><input type="checkbox" defaultChecked className="accent-vento-forest" /></label>
            <label className="block text-xs font-semibold mb-1">Stock Quantity *</label>
            <input type="number" value={form.stock} onChange={e=> setForm({...form, stock:e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm mb-3" />
            <label className="block text-xs font-semibold mb-1">Low Stock Threshold</label>
            <input type="number" defaultValue={5} className="w-full border rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
function ProductForm(props){ return <DetailedProductForm {...props} />; }
