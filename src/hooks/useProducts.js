import { useState, useEffect } from 'react';
import { mockProducts } from '../data/mockData';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const v = localStorage.getItem('vento_admin_products');
      return v ? JSON.parse(v) : mockProducts;
    } catch {
      return mockProducts;
    }
  });

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'vento_admin_products' && e.newValue) {
        setProducts(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return products;
}
