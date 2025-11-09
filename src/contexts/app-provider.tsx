"use client";

import type { ReactNode } from 'react';
import { createContext, useState, useMemo, useCallback, useEffect } from 'react';
import type { Language, UserRole } from '@/lib/types';
import en from '@/lib/i18n/en.json';
import hi from '@/lib/i18n/hi.json';
import bn from '@/lib/i18n/bn.json';

const translations = { en, hi, bn };

type AppContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  t: (key: keyof (typeof en)) => string;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [role, setRole] = useState<UserRole | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLang = localStorage.getItem('labourchok-lang') as Language;
    if (storedLang && ['en', 'hi', 'bn'].includes(storedLang)) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('labourchok-lang', lang);
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
  }), [language, role, t]);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
