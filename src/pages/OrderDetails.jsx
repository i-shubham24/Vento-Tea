import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { Truck, Package, Star, MapPin } from 'lucide-react';
import { useState } from 'react';
import SEO from '../components/SEO';

export default function OrderDetails(){
  const { id } = useParams();
  const { getOrder, updateOrderStatus, addReview } = useOrder();
  const order = getOrder(id);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewDone, setReviewDone] = useState(!!order?.review);
  if(!order) return <div className="p-10 text-center">Order not found. <Link to="/track-order" className="underline text-vento-forest">Track</Link></div>;
  const canReview = order.orderStatus==='delivered' && !order.review;
  const handleReview = (e)=>{
    e.preventDefault();
    addReview(order.id, order.items[0].productId, { rating, comment });
    setReviewDone(true);
  };
  const advance = ()=>{
    const map = { pending:'confirmed', confirmed:'packed', packed:'shipped', shipped:'delivered' };
    const next = map[order.orderStatus];
    if(next) updateOrderStatus(order.id, next);
  };
  return (
    <div className="min-h-screen bg-vento-cream pt-28 pb-20 px-4">
      <SEO title={`Order ${order.id}`} noindex />
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-lg p-6 border border-vento-cream-dark shadow-sm">
          <h1 className="text-xl font-serif text-vento-forest">Order Details</h1>
          <p className="text-xs text-gray-500">{order.id} • {new Date(order.createdAt).toLocaleDateString()} • {order.orderStatus.toUpperCase()} • {order.courier} • {order.awb}</p>
          <div className="mt-4 space-y-2">
            {order.items.map((it,i)=>(
              <div key={i} className="flex gap-3 border rounded-lg p-3">
                <img src={it.image} alt={it.name} className="w-16 h-16 rounded object-cover" />
                <div className="flex-1"><p className="font-semibold text-sm">{it.name}</p><p className="text-xs text-gray-500">{it.weight.label} • Qty {it.quantity}</p></div>
                <p className="font-bold text-sm">₹{it.unitPrice*it.quantity}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            {order.orderStatus!=='delivered' && order.orderStatus!=='cancelled' && <button onClick={advance} className="bg-vento-forest text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-vento-gold hover:text-vento-forest">Simulate Next Status → {order.orderStatus}</button>}
            <Link to={`/track-order?order=${order.id}`} className="bg-white border border-vento-forest text-vento-forest px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1"><Truck size={14}/> Track</Link>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-vento-cream-dark shadow-sm">
          <h2 className="font-serif text-vento-forest mb-3 flex items-center gap-2"><MapPin size={16}/> Tracking Timeline</h2>
          <div className="relative pl-6 border-l-2 border-vento-forest/20 space-y-6">
            {order.tracking.map((t,i)=>(
              <div key={i} className="relative">
                <span className="absolute -left-[25px] top-0 w-3 h-3 bg-vento-forest rounded-full"></span>
                <p className="text-sm font-semibold text-vento-forest">{t.status}</p>
                <p className="text-xs text-gray-500">{new Date(t.date).toLocaleString()} • {t.location}</p>
                {i===order.tracking.length-1 && t.status==='delivered' && <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mt-1"><Package size={12}/> Delivered by {order.courier}</span>}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4 flex-wrap text-xs">
            <span className="bg-white border rounded px-2 py-1 flex items-center gap-1"><Truck size={12}/> Delhivery</span>
            <span className="bg-white border rounded px-2 py-1">Shiprocket</span>
            <span className="bg-white border rounded px-2 py-1">BlueDart</span>
          </div>
        </div>

        {canReview && !reviewDone && (
          <div className="bg-white rounded-lg p-6 border border-vento-cream-dark shadow-sm">
            <h3 className="font-serif text-vento-forest mb-2 flex items-center gap-2"><Star size={16}/> Review this order (on delivered)</h3>
            <form onSubmit={handleReview} className="space-y-3">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(n=>(
                  <button key={n} type="button" onClick={()=> setRating(n)} className={`text-xl ${n<=rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</button>
                ))}
              </div>
              <textarea value={comment} onChange={e=> setComment(e.target.value)} placeholder="How was the tea?" rows={3} className="w-full border rounded-lg p-3 text-sm" required />
              <button type="submit" className="bg-vento-forest text-white px-6 py-2 rounded-full font-bold hover:bg-vento-gold hover:text-vento-forest text-sm">Submit Review</button>
            </form>
          </div>
        )}
        {order.review && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-green-800">★ {order.review.rating} — {order.review.comment}</p>
            <p className="text-xs text-green-600">Reviewed on {new Date(order.review.date).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
