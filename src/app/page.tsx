
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, UserCheck, Wallet, Bot, ShieldCheck, FileText, Users, CreditCard, Search, Zap, MapPin, BadgeCheck, MessageSquare, IndianRupee } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import MainNav from '@/components/main-nav';
import { useApp } from '@/hooks/use-app';

export default function LandingPage() {
  const { t } = useApp();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const customerImage = PlaceHolderImages.find(p => p.id === 'customer-landing');
  const workerImage = PlaceHolderImages.find(p => p.id === 'worker-landing');

  const features = [
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: t('landing_feature1_title'),
      description: t('landing_feature1_desc'),
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: t('landing_feature2_title'),
      description: t('landing_feature2_desc'),
    },
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: t('landing_feature3_title'),
      description: t('landing_feature3_desc'),
    },
    {
      icon: <BadgeCheck className="h-10 w-10 text-primary" />,
      title: t('landing_feature4_title'),
      description: t('landing_feature4_desc'),
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: t('landing_feature5_title'),
      description: t('landing_feature5_desc'),
    },
    {
      icon: <IndianRupee className="h-10 w-10 text-primary" />,
      title: t('landing_feature6_title'),
      description: t('landing_feature6_desc'),
    },
  ];

  const howItWorks = [
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: t('landing_how_it_works_step1_title'),
      description: t('landing_how_it_works_step1_desc'),
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: t('landing_how_it_works_step2_title'),
      description: t('landing_how_it_works_step2_desc'),
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: t('landing_how_it_works_step3_title'),
      description: t('landing_how_it_works_step3_desc'),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-grow">
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
             />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">
              {t('landing_hero_title')}
            </h1>
            <p className="text-lg md:text-xl mb-8">
              {t('landing_hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                <Link href="/signup/worker">{t('landing_hero_worker_cta')}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-bold">
                <Link href="/signup/customer">{t('landing_hero_customer_cta')}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
              {t('landing_why_choose_us_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
              {t('landing_how_it_works_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow bg-card">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                      {step.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
                  {t('landing_for_customers_title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('landing_for_customers_desc')}
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/signup/customer">
                    {t('landing_for_customers_cta')} <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                {customerImage && (
                  <Image
                    src={customerImage.imageUrl}
                    alt={customerImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={customerImage.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden md:order-2">
                {workerImage && (
                  <Image
                    src={workerImage.imageUrl}
                    alt={workerImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={workerImage.imageHint}
                  />
                )}
              </div>
              <div className="md:order-1">
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
                  {t('landing_for_workers_title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                 {t('landing_for_workers_desc')}
                </p>
                <Button asChild>
                  <Link href="/signup/worker">
                    {t('landing_for_workers_cta')} <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary/10 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 LabourChok. {t('footer_rights_reserved')}</p>
           <p className="text-xs mt-2">
            <Link href="/admin/login" className="hover:underline">Admin</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
