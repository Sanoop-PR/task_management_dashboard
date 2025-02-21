import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the types for the context
type ThemeContextType = {
  currentTheme: string;
  changeCurrentTheme: (newTheme: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'light', // default value
  changeCurrentTheme: () => {}, // default empty function
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // Retrieve persisted theme from localStorage (default to 'light' if not found)
  const persistedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState<string>(persistedTheme || 'light');

  // Function to change the theme
  const changeCurrentTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Effect to apply theme changes to the document
  useEffect(() => {
    document.documentElement.classList.add('[&_*]:!transition-none');

    // Handle Tailwind dark mode and DaisyUI theme
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    }

    // Remove the no-transition class after theme change
    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none');
    }, 1);

    // Cleanup the timeout
    return () => clearTimeout(transitionTimeout);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to access theme context
export const useThemeProvider = () => useContext(ThemeContext);
