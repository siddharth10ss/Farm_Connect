import { useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  farmer: string;
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart items from storage on mount
  useEffect(() => {
    loadCartItems();
  }, []);

  // Save cart items to storage whenever items change
  useEffect(() => {
    if (!loading) {
      saveCartItems();
    }
  }, [items, loading]);

  const loadCartItems = async () => {
    try {
      const savedItems = await storage.getItem<CartItem[]>(STORAGE_KEYS.CART_ITEMS);
      if (savedItems) {
        setItems(savedItems);
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCartItems = async () => {
    try {
      await storage.setItem(STORAGE_KEYS.CART_ITEMS, items);
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  };

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const isItemInCart = (itemId: string) => {
    return items.some(item => item.id === itemId);
  };

  const getItemQuantity = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  return {
    items,
    loading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotalPrice,
    isItemInCart,
    getItemQuantity,
  };
};
