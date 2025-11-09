"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Briefcase, ArrowRight } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { mockJobs } from '@/lib/data';

export default function CustomerDashboardPage() {
    const { t } = useApp();
    const myJobs = mockJobs.filter(job => job.customerId === 'c1');
    const activeJobs = myJobs.filter(job => job.status === 'active');
    const openJobs = myJobs.filter(job => job.status === 'open');

    const actions = [
        {
            title: t('customer_dashboard_post_job'),
            description: "Create a new listing for your job.",
            icon: <PlusCircle className="h-8 w-8 text-primary" />,
            href: "/customer/post-job"
        },
        {
            title: t('customer_dashboard_find_workers'),
            description: "Browse and hire skilled workers directly.",
            icon: <Search className="h-8 w-8 text-primary" />,
            href: "/customer/find-workers"
        }
    ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t('dashboard')}</h1>
        <p className="text-muted-foreground">{t('customer_dashboard_welcome')}</p>
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
        <h2 className="text-2xl font-bold font-headline mb-4">{t('customer_dashboard_my_jobs')}</h2>
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Active Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                    {activeJobs.length > 0 ? (
                        <ul className="space-y-2">
                        {activeJobs.map(job => (
                            <li key={job.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                                <span>{job.title}</span>
                                <Button variant="outline" size="sm">Manage</Button>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground">No active jobs.</p>
                    )}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Open Job Postings</CardTitle>
                </CardHeader>
                <CardContent>
                    {openJobs.length > 0 ? (
                        <ul className="space-y-2">
                        {openJobs.map(job => (
                            <li key={job.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                                <span>{job.title}</span>
                                <Button variant="outline" size="sm">View Applicants</Button>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground">No open job postings.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
