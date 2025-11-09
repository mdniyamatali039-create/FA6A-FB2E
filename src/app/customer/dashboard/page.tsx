
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, ArrowRight, Bell, Star } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { mockJobs, mockWorkers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import type { WorkerProfile } from '@/lib/types';
import HireWorkerDialog from '@/components/hire-worker-dialog';

export default function CustomerDashboardPage() {
    const { t } = useApp();
    const { toast } = useToast();
    const myJobs = mockJobs.filter(job => job.customerId === 'c1' || job.customerId === 'c2' || job.customerId === 'c3');
    const activeJobs = myJobs.filter(job => job.status === 'active');
    const pendingJobs = myJobs.filter(job => job.status === 'open');
    const completedJobs = myJobs.filter(job => job.status === 'completed');
    const recommendedWorkers = mockWorkers.slice(0, 3); // Mock AI recommendations
    
    const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);

    const handleHireConfirm = (worker: WorkerProfile, address: string, dates: { from: Date, to?: Date }) => {
        console.log("Hiring", worker, "at", address, "for", dates);
        toast({
          title: "Worker Hired!",
          description: `You have hired ${worker.name}.`
        });
        setSelectedWorker(null);
    }

    return (
        <>
            <div className="space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">{t('dashboard')}</h1>
                        <p className="text-muted-foreground">{t('customer_dashboard_welcome')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="flex flex-col justify-center bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PlusCircle className="h-8 w-8" />
                                <span>{t('customer_dashboard_post_job')}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button variant="secondary" asChild className="w-full">
                                <Link href="/customer/post-job">Create Job <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col justify-center">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="h-8 w-8 text-primary" />
                                <span>{t('customer_dashboard_find_workers')}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link href="/customer/find-workers">{t('customer_dashboard_find_workers')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>My Jobs</CardTitle>
                            <CardDescription>Your job statuses</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Active</span>
                                <Badge variant="secondary">{activeJobs.length}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Pending</span>
                                <Badge variant="secondary">{pendingJobs.length}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Completed</span>
                                <Badge variant="secondary">{completedJobs.length}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <h2 className="text-2xl font-bold font-headline mb-4">Recommended Workers</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {recommendedWorkers.map(worker => (
                            <Card key={worker.id}>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Image src={worker.avatarUrl} alt={worker.name} width={48} height={48} className="rounded-full" />
                                    <div>
                                        <CardTitle className="text-lg">{worker.name}</CardTitle>
                                        <div className="flex items-center gap-1 text-sm text-amber-500 font-bold">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span>{worker.rating}</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {worker.primarySkills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{worker.experience} &bull; {worker.location}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" onClick={() => setSelectedWorker(worker)}>Hire Now</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            {selectedWorker && (
                <HireWorkerDialog 
                    worker={selectedWorker}
                    open={!!selectedWorker}
                    onOpenChange={(isOpen) => !isOpen && setSelectedWorker(null)}
                    onConfirm={handleHireConfirm}
                />
            )}
        </>
    );
}
