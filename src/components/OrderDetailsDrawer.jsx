import { X, Truck, Package, Printer, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function OrderDetailsDrawer({ order, onClose, onUpdateStatus }) {
  if (!order) return null;

  const steps = ['pending', 'confirmed', 'packed', 'shipped', 'delivered'];
  const currentIdx = steps.indexOf(order.orderStatus);

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-3xl bg-gray-50 h-full overflow-y-auto animate-slide-in-right shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b flex justify-between items-center sticky top-0 z-10 print:hidden">
          <div>
            <h2 className="text-xl font-bold text-vento-forest">Order #{order.id}</h2>
            <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={printInvoice} className="flex items-center gap-2 px-4 py-2 border border-vento-forest text-vento-forest rounded-full text-sm font-semibold hover:bg-vento-forest hover:text-white transition-colors">
              <Printer size={16} /> Print Invoice
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-500 transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content (Printable area) */}
        <div className="p-6 space-y-6 flex-1 invoice-print-area">
          {/* Status Timeline */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm print:hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-vento-forest">Fulfillment Timeline</h3>
              <select 
                value={order.orderStatus}
                onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                className="bg-vento-mint border-vento-forest/20 border rounded-full px-4 py-1.5 text-xs font-bold text-vento-forest outline-none cursor-pointer"
              >
                {steps.map(s => (
                  <option key={s} value={s}>{s.toUpperCase()}</option>
                ))}
                <option value="cancelled">CANCELLED</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between relative px-2">
              <div className="absolute left-8 right-8 top-4 h-1 bg-gray-100 -z-10 rounded-full"></div>
              <div className="absolute left-8 right-8 top-4 h-1 bg-vento-forest -z-10 rounded-full transition-all duration-500" style={{ width: Math.max(0, (currentIdx / 4) * 100) + '%' }}></div>
              
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentIdx;
                const isActive = idx === currentIdx;
                return (
                  <div key={step} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs transition-colors shadow-sm \${isCompleted ? 'bg-vento-forest' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                      {isCompleted ? <CheckCircle size={16} /> : idx + 1}
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-wider \${isActive ? 'text-vento-forest' : 'text-gray-400'}`}>{step}</span>
                  </div>
                );
              })}
            </div>

            {/* Courier Section (Mocked) */}
            {currentIdx >= 2 && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-blue-600 font-black italic border">
                    Deli
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Courier Partner</p>
                    <p className="font-bold text-vento-forest">Delhivery Surface</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">AWB Number</p>
                  <p className="font-mono font-bold">{order.awb || 'DEL123456789'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Customer & Payment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-vento-forest mb-4 flex items-center gap-2"><MapPin size={16} /> Customer Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="font-semibold">{order.customer.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email & Phone</p>
                  <p className="font-semibold">{order.customer.email}</p>
                  <p className="font-semibold">{order.customer.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Shipping Address</p>
                  <p className="font-medium text-gray-700">
                    {order.shippingAddress?.address}<br/>
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-vento-forest mb-4 flex items-center gap-2"><Clock size={16} /> Payment Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-3 border-b">
                  <p className="text-gray-500">Status</p>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{order.paymentStatus}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <p>Subtotal</p>
                  <p>₹{order.subtotal}</p>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <p>Shipping</p>
                  <p>₹0</p>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between items-center text-red-500">
                    <p>Discount</p>
                    <p>-₹{order.discount}</p>
                  </div>
                )}
                <div className="flex justify-between items-center font-bold text-lg text-vento-forest pt-3 border-t">
                  <p>Total</p>
                  <p>₹{order.total}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-bold text-vento-forest flex items-center gap-2"><Package size={16} /> Order Items</h3>
            </div>
            <div className="divide-y">
              {order.items.map((item, i) => (
                <div key={i} className="p-4 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border shadow-sm" />
                  <div className="flex-1">
                    <p className="font-bold text-vento-forest">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.weight?.label || 'Standard'} • Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{item.unitPrice}</p>
                    <p className="text-xs text-gray-500">Total: ₹{item.unitPrice * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
