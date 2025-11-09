
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { UserRole } from '@/lib/types';
import Logo from '@/components/logo';
import { useApp } from '@/hooks/use-app';
import LanguageSwitcher from '@/components/language-switcher';
import ReadAloudButton from '@/components/read-aloud-button';

export default function LoginPage() {
  const [role, setRole] = useState<UserRole>('worker');
  const { t } = useApp();

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <div className="flex items-center justify-center gap-2">
            <CardTitle className="text-2xl font-headline">{t('login_title')}</CardTitle>
            <ReadAloudButton text={t('login_title')} />
          </div>
          <div className="flex items-center justify-center gap-2">
            <CardDescription>{t('login_subtitle')}</CardDescription>
            <ReadAloudButton text={t('login_subtitle')} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue={role} onValueChange={(value: UserRole) => setRole(value)} className="grid grid-cols-2 gap-4">
            <div>
              <RadioGroupItem value="worker" id="worker" className="peer sr-only" />
              <Label
                htmlFor="worker"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="flex items-center gap-2">
                    {t('role_worker')}
                    <ReadAloudButton text={t('role_worker')} />
                </div>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="customer" id="customer" className="peer sr-only" />
              <Label
                htmlFor="customer"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="flex items-center gap-2">
                    {t('role_customer')}
                    <ReadAloudButton text={t('role_customer')} />
                </div>
              </Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground pt-4 text-center">
            This is a simulated login. Select your role and proceed to the dashboard.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" asChild>
            <Link href={`/${role}/dashboard`}>{t('login_cta')}</Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              {t('signup')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
