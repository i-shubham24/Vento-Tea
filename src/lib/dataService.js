// Backend-ready adapter stub — switch VITE_DATA_SOURCE=mock|node
// For now mock uses localStorage; Node adapter would call /api/*
// Usage: import { dataService } from '@/lib/dataService'; dataService.getOrders()
export const dataService = {
  // Orders: localStorage vento_orders, later POST /api/orders
  getOrders: () => JSON.parse(localStorage.getItem('vento_orders') || '[]'),
  createOrder: (order) => {
    const orders = JSON.parse(localStorage.getItem('vento_orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('vento_orders', JSON.stringify(orders));
    // TODO Node: await fetch(`${import.meta.env.VITE_API_URL}/orders`, {method:'POST', body:JSON.stringify(order)})
    return order;
  },
  // Products: vento_admin_products
  getProducts: () => JSON.parse(localStorage.getItem('vento_admin_products') || 'null') || null,
  // Add more adapters: getCustomers, getReviews, etc. — extend here and swap via env
};
