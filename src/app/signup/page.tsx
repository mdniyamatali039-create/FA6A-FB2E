
"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, UserPlus } from 'lucide-react';
import Logo from '@/components/logo';
import { useApp } from '@/hooks/use-app';
import LanguageSwitcher from '@/components/language-switcher';
import ReadAloudButton from '@/components/read-aloud-button';

export default function SignupPage() {
    const { t } = useApp();
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Logo />
            </div>
          <div className="flex items-center justify-center gap-2">
            <CardTitle className="text-2xl font-headline">{t('signup_title')}</CardTitle>
            <ReadAloudButton text={t('signup_title')} />
          </div>
          <div className="flex items-center justify-center gap-2">
            <CardDescription>{t('signup_subtitle')}</CardDescription>
            <ReadAloudButton text={t('signup_subtitle')} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Link href="/signup/worker">
            <Card className="h-full flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors hover:shadow-lg">
              <Briefcase className="h-12 w-12 mb-4 text-primary" />
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold mb-2">{t('role_worker')}</h3>
                <ReadAloudButton text={t('role_worker')} />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground mb-4">{t('signup_worker_cta')}</p>
                <ReadAloudButton text={t('signup_worker_cta')} />
              </div>
              <Button variant="outline">
                {t('signup')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </Link>
          <Link href="/signup/customer">
             <Card className="h-full flex flex-col items-center justify-center p-6 text-center hover:bg-accent hover:text-accent-foreground transition-colors hover:shadow-lg">
              <UserPlus className="h-12 w-12 mb-4 text-primary" />
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold mb-2">{t('role_customer')}</h3>
                <ReadAloudButton text={t('role_customer')} />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground mb-4">{t('signup_customer_cta')}</p>
                <ReadAloudButton text={t('signup_customer_cta')} />
              </div>
              <Button variant="outline">
                {t('signup')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </Link>
        </CardContent>
         <div className="text-center p-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              {t('login')}
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
