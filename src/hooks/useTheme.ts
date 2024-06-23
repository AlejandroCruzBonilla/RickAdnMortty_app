import { useContext, useEffect } from 'react';
import { UIAppContext } from '@/context/ui';

export const useTheme = () => {
  const { appTheme, setAppTheme } = useContext(UIAppContext);
  useEffect(() => {
    const setDarkTheme = () => {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    };

    const setLightTheme = () => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    };

    const setDefaultTheme = () => {
      const prefersDarkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (prefersDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    };

    switch (appTheme) {
      case 'dark':
        setDarkTheme();
        break;
      case 'light':
        setLightTheme();
        break;
      default:
        setDefaultTheme();
        break;
    }
  }, [appTheme]);

  return { appTheme, setAppTheme };
};
