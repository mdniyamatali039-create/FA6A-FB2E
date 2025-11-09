
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, User, ArrowRight, MapPin, Edit, Star, Cog } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { mockJobs, mockWorkers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function WorkerDashboardPage() {
    const { t } = useApp();
    const activeJobs = mockJobs.filter(job => job.status === 'active');
    const worker = mockWorkers[0]; // Use a mock worker for display

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t('dashboard')}</h1>
        <p className="text-muted-foreground">{t('worker_dashboard_welcome')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>{t('worker_dashboard_find_jobs')}</CardTitle>
                    <CardDescription>Browse and apply for jobs near you.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
                <Button asChild>
                    <Link href="/worker/find-jobs">{t('worker_dashboard_find_jobs')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>{t('worker_dashboard_my_profile')}</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/worker/profile"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Link>
                    </Button>
                </div>
                 <div className="flex items-center gap-4 pt-4">
                    <Image src={worker.avatarUrl} alt={worker.name} width={64} height={64} className="rounded-full" />
                    <div>
                        <h3 className="font-bold text-lg">{worker.name}</h3>
                        <p className="text-sm text-muted-foreground">{worker.location}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
               <div className="flex flex-wrap gap-2">
                    {worker.primarySkills.map(skill => (
                        <Badge key={skill}>{skill}</Badge>
                    ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{worker.experience}</span>
                    <div className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{worker.rating}</span>
                    </div>
                </div>
            </CardContent>
        </Card>

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
