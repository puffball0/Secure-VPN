import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDark(saved === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      background: isDark ? '#17181C' : '#FFFFFF',
      surface: isDark ? '#202228' : '#F8F9FA',
      primary: '#96EAB6',
      text: isDark ? '#FFFFFF' : '#17181C',
      textSecondary: isDark ? '#7485AF' : '#666666',
      border: isDark ? '#202228' : '#E5E7EB'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};