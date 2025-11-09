
"use client";

import type { ReactNode } from 'react';
import { createContext, useState, useMemo, useCallback, useEffect } from 'react';
import type { Language, UserRole } from '@/lib/types';
import en from '@/lib/i18n/en.json';
import hi from '@/lib/i18n/hi.json';
import bn from '@/lib/i18n/bn.json';

const translations = { en, hi, bn };

type Theme = 'light' | 'dark' | 'system';

type AppContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  t: (key: keyof (typeof en)) => string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [role, setRole] = useState<UserRole | null>(null);
  const [theme, setTheme] = useState<Theme>('system');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLang = localStorage.getItem('labourchok-lang') as Language;
    if (storedLang && ['en', 'hi', 'bn'].includes(storedLang)) {
      setLanguage(storedLang);
    }
    const storedTheme = localStorage.getItem('labourchok-theme') as Theme;
    if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
        document.documentElement.classList.remove('light', 'dark');
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.classList.add(systemTheme);
        } else {
            document.documentElement.classList.add(theme);
        }
    }
  }, [theme, isMounted]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('labourchok-lang', lang);
    }
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('labourchok-theme', newTheme);
    }
  };

  const t = useCallback((key: keyof typeof en) => {
    return translations[language][key] || key;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    role,
    setRole,
    t,
    theme,
    setTheme: handleSetTheme,
  }), [language, role, t, theme]);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
