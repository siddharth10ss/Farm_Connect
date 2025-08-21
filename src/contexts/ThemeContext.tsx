import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorScheme, colors } from '../theme';

interface ThemeContextType {
  colorScheme: ColorScheme;
  colors: typeof colors.light;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('farmconnect-theme');
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setColorScheme(savedTheme as ColorScheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newTheme);
    try {
      await AsyncStorage.setItem('farmconnect-theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const value: ThemeContextType = {
    colorScheme,
    colors: colors[colorScheme],
    toggleTheme,
    isDark: colorScheme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
