import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  THEME: 'theme',
  USER_DATA: 'userData',
  LANGUAGE: 'language',
  CART_ITEMS: 'cartItems',
  FAVORITES: 'favorites',
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  AUTH_TOKEN: 'authToken',
} as const;

export const storage = {
  // Generic storage methods
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },

  // Specific storage methods
  async setTheme(theme: 'light' | 'dark'): Promise<void> {
    return this.setItem(STORAGE_KEYS.THEME, theme);
  },

  async getTheme(): Promise<'light' | 'dark' | null> {
    return this.getItem<'light' | 'dark'>(STORAGE_KEYS.THEME);
  },

  async setLanguage(language: string): Promise<void> {
    return this.setItem(STORAGE_KEYS.LANGUAGE, language);
  },

  async getLanguage(): Promise<string | null> {
    return this.getItem<string>(STORAGE_KEYS.LANGUAGE);
  },

  async setOnboardingCompleted(completed: boolean): Promise<void> {
    return this.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed);
  },

  async getOnboardingCompleted(): Promise<boolean> {
    const completed = await this.getItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED);
    return completed ?? false;
  },

  async setAuthToken(token: string): Promise<void> {
    return this.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  async getAuthToken(): Promise<string | null> {
    return this.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
  },

  async clearAuthData(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    await this.removeItem(STORAGE_KEYS.USER_DATA);
  },
};
