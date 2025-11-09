"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, User, ArrowRight, MapPin } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { mockJobs } from '@/lib/data';

export default function WorkerDashboardPage() {
    const { t } = useApp();
    const activeJobs = mockJobs.filter(job => job.status === 'active');

    const actions = [
        {
            title: t('worker_dashboard_find_jobs'),
            description: "Browse and apply for jobs near you.",
            icon: <Briefcase className="h-8 w-8 text-primary" />,
            href: "/worker/find-jobs"
        },
        {
            title: t('worker_dashboard_my_profile'),
            description: "Keep your profile updated for better matches.",
            icon: <User className="h-8 w-8 text-primary" />,
            href: "/worker/profile"
        }
    ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t('dashboard')}</h1>
        <p className="text-muted-foreground">{t('worker_dashboard_welcome')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {actions.map(action => (
             <Card key={action.href} className="flex flex-col justify-between hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                    {action.icon}
                    <div>
                        <CardTitle>{action.title}</CardTitle>
                        <CardDescription>{action.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href={action.href}>{action.title} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </CardContent>
             </Card>
        ))}
      </div>

       <div>
        <h2 className="text-2xl font-bold font-headline mb-4">{t('worker_dashboard_active_jobs')}</h2>
        <div className="grid gap-6">
            {activeJobs.length > 0 ? (
                activeJobs.map(job => (
                    <Card key={job.id}>
                        <CardHeader>
                            <CardTitle>{job.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-end">
                            <Button onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.location)}`, '_blank')}>
                                {t('navigate')}
                            </Button>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-muted-foreground">You have no active jobs.</p>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
