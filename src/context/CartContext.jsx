import { createContext, useContext, useState, useMemo } from 'react';
import { CART_REWARD_THRESHOLD } from '../data/mockData';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product, weightOption, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(
        item => item.productId === product.id && item.weight.grams === weightOption.grams
      );
      if (existing) {
        return prev.map(item =>
          item.productId === product.id && item.weight.grams === weightOption.grams
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { 
        productId: product.id, 
        product, 
        weight: weightOption, 
        quantity 
      }];
    });
    setIsOpen(true);
  };

  const updateQty = (productId, grams, delta) => {
    setItems(prev => prev.map(item => {
      if (item.productId === productId && item.weight.grams === grams) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (productId, grams) => {
    setItems(prev => prev.filter(
      item => !(item.productId === productId && item.weight.grams === grams)
    ));
  };

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.weight.priceInr * item.quantity), 0);
  }, [items]);

  const rewardRemaining = Math.max(0, CART_REWARD_THRESHOLD - subtotal);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      setIsOpen,
      addItem,
      updateQty,
      removeItem,
      subtotal,
      rewardRemaining,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
