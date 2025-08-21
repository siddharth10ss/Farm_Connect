import { useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  farmer: string;
  addedAt: Date;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveFavorites();
    }
  }, [favorites, loading]);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await storage.getItem<FavoriteItem[]>(STORAGE_KEYS.FAVORITES);
      if (savedFavorites) {
        setFavorites(savedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async () => {
    try {
      await storage.setItem(STORAGE_KEYS.FAVORITES, favorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addFavorite = (item: Omit<FavoriteItem, 'addedAt'>) => {
    const favoriteItem: FavoriteItem = {
      ...item,
      addedAt: new Date(),
    };
    
    setFavorites(prev => {
      if (prev.some(fav => fav.id === item.id)) {
        return prev; // Already in favorites
      }
      return [favoriteItem, ...prev];
    });
  };

  const removeFavorite = (itemId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== itemId));
  };

  const toggleFavorite = (item: Omit<FavoriteItem, 'addedAt'>) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  const isFavorite = (itemId: string) => {
    return favorites.some(item => item.id === itemId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
};
