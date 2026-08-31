import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { CheckCircle2, Truck, MapPin, CreditCard } from 'lucide-react';
import SEO from '../components/SEO';

export default function OrderSuccess(){
  const { id } = useParams();
  const { getOrder } = useOrder();
  const order = getOrder(id);
  if(!order) return <div className="min-h-[60vh] flex flex-col items-center justify-center p-8"><p className="text-gray-500">Order not found.</p><Link to="/track-order" className="mt-4 text-vento-forest underline">Track Order</Link></div>;
  return (
    <div className="min-h-screen bg-vento-cream pt-28 pb-20 px-4">
      <SEO title="Order Confirmation" noindex />
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-sm border border-vento-cream-dark text-center">
        <CheckCircle2 size={56} className="mx-auto text-green-600 mb-4" />
        <h1 className="text-3xl font-serif text-vento-forest">Order Confirmed!</h1>
        <p className="text-sm text-gray-500 mt-2">Your tea is being packed with care.</p>
        <div className="bg-vento-mint/40 rounded-lg p-4 mt-6 text-left">
          <p className="text-sm"><span className="font-semibold">Order ID:</span> {order.id}</p>
          <p className="text-sm"><span className="font-semibold">AWB:</span> {order.awb} ({order.courier}) <span className="inline-flex items-center gap-1 ml-2"><Truck size={14}/> Shiprocket/Delhivery</span></p>
          <p className="text-sm flex items-center gap-1"><CreditCard size={14}/> {order.paymentMode} • {order.paymentStatus}</p>
          <p className="text-sm flex items-center gap-1"><MapPin size={14}/> {order.shippingAddress?.city || 'New Delhi'} • Free Delivery</p>
        </div>
        <div className="mt-6 space-y-3 text-left">
          {order.items.map((it,i)=>(
            <div key={i} className="flex gap-3 items-center border rounded-lg p-3">
              <img src={it.image} alt={it.name} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1"><p className="font-semibold text-sm">{it.name} • {it.weight.label}</p><p className="text-xs text-gray-500">Qty {it.quantity}</p></div>
              <p className="font-bold">₹{it.unitPrice * it.quantity}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-8 justify-center">
          <Link to={`/track-order?order=${order.id}`} className="bg-vento-forest text-white px-8 py-3 rounded-full font-bold hover:bg-vento-gold hover:text-vento-forest">Track Order</Link>
          <Link to="/shop" className="bg-white border border-vento-forest text-vento-forest px-8 py-3 rounded-full font-bold hover:bg-vento-cream">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
