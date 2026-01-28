import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type ThemeCategory = 'general' | 'engineering' | 'medicine' | 'business';

interface ThemeContextType {
  currentTheme: ThemeCategory;
  setTheme: (theme: ThemeCategory) => void;
  getThemeClass: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themeConfigs: Record<ThemeCategory, { 
  name: string; 
  className: string;
  pattern: string;
  colors: { primary: string; secondary: string; accent: string };
}> = {
  general: {
    name: 'Aurora',
    className: '',
    pattern: '',
    colors: { primary: '#A855F7', secondary: '#EC4899', accent: '#14B8A6' },
  },
  engineering: {
    name: 'Circuit',
    className: 'theme-engineering',
    pattern: 'circuit-pattern',
    colors: { primary: '#00D9FF', secondary: '#475569', accent: '#06B6D4' },
  },
  medicine: {
    name: 'Pulse',
    className: 'theme-medicine',
    pattern: 'dna-pattern',
    colors: { primary: '#14B8A6', secondary: '#EF4444', accent: '#2DD4BF' },
  },
  business: {
    name: 'Ascend',
    className: 'theme-business',
    pattern: 'chart-pattern',
    colors: { primary: '#F59E0B', secondary: '#1E3A5A', accent: '#FBBF24' },
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeCategory>('general');

  const setTheme = useCallback((theme: ThemeCategory) => {
    setCurrentTheme(theme);
    // Update document class for global theme
    document.documentElement.className = themeConfigs[theme].className;
  }, []);

  const getThemeClass = useCallback(() => {
    return themeConfigs[currentTheme].className;
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, getThemeClass }}>
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
