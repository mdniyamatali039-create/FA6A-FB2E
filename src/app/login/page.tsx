"use client";

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/logo';
import { useApp } from '@/hooks/use-app';
import LanguageSwitcher from '@/components/language-switcher';
import { CheckCircle2, Zap, ShieldCheck } from 'lucide-react';

function LoginContent() {
  const { t, setRole } = useApp();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') || 'worker';
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(defaultRole as 'worker' | 'customer');
    if (defaultRole === 'worker') {
        router.push('/signup/worker');
    } else {
        router.push('/signup/customer');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4 relative">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md shadow-xl rounded-2xl overflow-hidden border-0">
        <CardHeader className="text-center bg-primary/5 pb-8 pt-10">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold font-headline">
            Welcome to LabourChok
          </CardTitle>
          <p className="text-muted-foreground mt-2">Enter your phone number to continue</p>
        </CardHeader>
        <CardContent className="pt-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-6">
             <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-semibold">Mobile Number</Label>
                <div className="flex relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">+91</span>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter 10 digit number"
                        className="pl-12 h-14 text-lg rounded-xl"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        maxLength={10}
                        required
                    />
                </div>
            </div>
            <Button type="submit" className="w-full h-14 text-lg rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all">
                Send OTP
            </Button>
          </form>

          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                <CheckCircle2 className="h-4 w-4" /> Secure
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-amber-600">
                <Zap className="h-4 w-4" /> Fast
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
                <ShieldCheck className="h-4 w-4" /> Free
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-4 flex justify-center text-sm text-muted-foreground">
            By continuing, you agree to our Terms & Conditions
        </CardFooter>
      </Card>
    </div>
  );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    )
}
