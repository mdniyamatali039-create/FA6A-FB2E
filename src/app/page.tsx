"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Logo from '@/components/logo';
import { useApp } from '@/hooks/use-app';
import { Loader2, HardHat, UserRound } from 'lucide-react';
import LanguageSwitcher from '@/components/language-switcher';

export default function LandingPage() {
  const { t } = useApp();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary/5">
        <Logo />
        <p className="mt-4 text-2xl font-bold font-headline text-primary">Rozgaar, Ab Phone Par</p>
        <Loader2 className="mt-8 h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary p-4 relative">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center max-w-md mx-auto w-full space-y-8">
        <div className="text-center space-y-2 flex flex-col items-center">
          <Logo />
          <p className="text-muted-foreground font-medium text-lg mt-2">Rozgaar, Ab Phone Par</p>
        </div>

        <div className="w-full space-y-6 pt-8">
          <h2 className="text-2xl font-bold font-headline text-center mb-6">Choose Your Role</h2>

          <Link href="/login?role=worker" className="block w-full">
            <Card className="hover:border-primary transition-colors border-2 border-transparent hover:bg-primary/5 cursor-pointer shadow-md rounded-2xl">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="p-4 bg-primary/10 rounded-full shrink-0">
                  <HardHat className="h-12 w-12 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground">I am a Worker</span>
                  <span className="text-muted-foreground text-sm mt-1">Find jobs nearby instantly</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/login?role=customer" className="block w-full">
            <Card className="hover:border-primary transition-colors border-2 border-transparent hover:bg-primary/5 cursor-pointer shadow-md rounded-2xl">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="p-4 bg-primary/10 rounded-full shrink-0">
                  <UserRound className="h-12 w-12 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground">I want to Hire</span>
                  <span className="text-muted-foreground text-sm mt-1">Hire verified workers</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
