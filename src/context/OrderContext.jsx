import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();
const STORAGE_KEY = 'vento_orders';

// Demo credentials: demo@vento.com / VentoDemo@2026
// Admin: admin@vento.com / VentoAdmin@2026
// Status flow: pending → confirmed → packed → shipped → delivered → review
export const ORDER_STATUSES = ['pending','confirmed','packed','shipped','delivered','cancelled'];

function loadOrders(){ try{ const v=localStorage.getItem(STORAGE_KEY); return v? JSON.parse(v): []; }catch{ return []; } }
function saveOrders(o){ localStorage.setItem(STORAGE_KEY, JSON.stringify(o)); }

export function OrderProvider({ children }){
  const [orders, setOrders] = useState(()=> loadOrders());
  const [lastOrderId, setLastOrderId] = useState(null);

  useEffect(()=> saveOrders(orders), [orders]);

  const createOrder = ({ user, items, subtotal, coupon, shippingAddress, paymentMode })=>{
    const id = `ORD-${Date.now()}-${Math.floor(Math.random()*900+100)}`;
    const awb = `AWB${Math.floor(Math.random()*900000000+100000000)}`;
    const courier = ['Delhivery','Shiprocket','BlueDart','DTDC'][Math.floor(Math.random()*4)];
    const order = {
      id, awb, courier,
      customer: { name: user?.name || 'Demo Customer', email: user?.email || 'demo@vento.com', phone: user?.phone || '9999999999' },
      items: items.map(i=>({ productId:i.productId, name:i.product.name, image:i.product.images[0], weight:i.weight, quantity:i.quantity, unitPrice:i.weight.priceInr })),
      subtotal, coupon, shippingAddress, paymentMode,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      createdAt: new Date().toISOString(),
      review: null,
      tracking: [{ status:'Order Placed', date:new Date().toISOString(), location:'Vento Warehouse, Assam' }],
    };
    setOrders(prev=>[order, ...prev]);
    setLastOrderId(id);
    return order;
  };

  const updatePayment = (orderId, status='success')=>{
    setOrders(prev=> prev.map(o=> o.id===orderId ? {...o, paymentStatus: status, orderStatus: status==='success' ? 'confirmed' : o.orderStatus, tracking: [...o.tracking, { status: status==='success'?'Payment Confirmed':'Payment Failed', date:new Date().toISOString(), location:'Razorpay'}]}:o));
  };
  const updateOrderStatus = (orderId, newStatus)=>{
    setOrders(prev=> prev.map(o=> o.id===orderId ? {...o, orderStatus:newStatus, tracking:[...o.tracking, {status:newStatus, date:new Date().toISOString(), location: newStatus==='shipped' ? `${o.courier} Hub` : newStatus==='delivered'?'Customer Address':'Vento Warehouse'}]}:o));
  };
  const addReview = (orderId, productId, review)=>{
    setOrders(prev=> prev.map(o=> o.id===orderId ? {...o, review:{productId, ...review, date:new Date().toISOString()}}:o));
  };
  const getOrder = (id)=> orders.find(o=>o.id===id);

  return <OrderContext.Provider value={{ orders, createOrder, updatePayment, updateOrderStatus, addReview, getOrder, lastOrderId, setLastOrderId }}>{children}</OrderContext.Provider>;
}
export const useOrder = ()=> useContext(OrderContext);
