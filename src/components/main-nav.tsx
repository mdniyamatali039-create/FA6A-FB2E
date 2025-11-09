"use client";

import Link from 'next/link';
import Logo from '@/components/logo';
import LanguageSwitcher from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { useApp } from '@/hooks/use-app';
import { Separator } from './ui/separator';

export default function MainNav() {
  const { t } = useApp();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <LanguageSwitcher />
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" asChild>
              <Link href="/login">{t('login')}</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">{t('signup')}</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
