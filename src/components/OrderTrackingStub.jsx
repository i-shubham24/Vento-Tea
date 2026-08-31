import { CheckCircle2, Clock, Package, Truck } from 'lucide-react';

export default function OrderTrackingStub() {
  const steps = [
    { icon: <CheckCircle2 size={24} />, title: "Order Placed", date: "Today, 10:30 AM", active: true, done: true },
    { icon: <Package size={24} />, title: "Packed Fresh", date: "Today, 01:15 PM", active: true, done: true },
    { icon: <Truck size={24} />, title: "Shipped", date: "Pending", active: true, done: false },
    { icon: <Clock size={24} />, title: "Out for Delivery", date: "Est. Tomorrow", active: false, done: false }
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-lg mx-auto">
      <h3 className="text-2xl font-serif text-vento-forest mb-2">Order #VT-84729</h3>
      <p className="text-gray-500 mb-8 text-sm">Arriving in 2-4 days</p>

      <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-8">
            <div className={`absolute -left-[13px] top-0.5 p-1 rounded-full ${
              step.done ? 'bg-vento-forest text-vento-cream' : 
              step.active ? 'bg-vento-gold text-vento-forest' : 'bg-gray-100 text-gray-400'
            }`}>
              {step.icon}
            </div>
            <div>
              <h4 className={`font-semibold ${step.active ? 'text-vento-forest' : 'text-gray-400'}`}>{step.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{step.date}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 pt-6 border-t border-gray-100">
        <button className="w-full bg-vento-cream-dark hover:bg-gray-200 text-vento-forest font-semibold py-3 rounded-xl transition-colors">
          View Invoice
        </button>
      </div>
    </div>
  );
}
