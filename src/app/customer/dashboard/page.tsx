
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
import MyJobs from '@/components/my-jobs';

export default function CustomerDashboardPage() {
    const { t } = useApp();
    const { toast } = useToast();
    
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

    const handleNotificationClick = () => {
        toast({
            title: "Notifications",
            description: "You have no new notifications at this time."
        });
    };

    return (
        <>
            <div className="space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">{t('dashboard')}</h1>
                        <p className="text-muted-foreground">{t('customer_dashboard_welcome')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild>
                           <Link href="/customer/post-job"><PlusCircle className="mr-2 h-4 w-4" /> {t('customer_dashboard_post_job')}</Link>
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleNotificationClick}>
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
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
                            <CardTitle>Hired Workers</CardTitle>
                            <CardDescription>Your active jobs with hired workers.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <MyJobs />
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <h2 className="text-2xl font-bold font-headline mb-4">Nearby Workers</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {recommendedWorkers.map((worker, index) => (
                            <Card key={worker.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-0">
                                    <div className="flex items-center p-4 gap-4">
                                        <Image src={worker.avatarUrl} alt={worker.name} width={64} height={64} className="rounded-full border-2 border-primary/20" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-lg leading-tight">{worker.name}</h3>
                                                <div className="flex items-center gap-1 text-sm text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                    <span>{worker.rating}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-primary font-medium mt-1">{worker.primarySkills[0]}</p>
                                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                                <span className="font-semibold text-foreground">{0.5 + index * 0.3} km away</span> • {worker.experience}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-secondary/50 p-4 border-t">
                                        <Button className="w-full font-bold h-12 text-md bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setSelectedWorker(worker)}>
                                            Hire {worker.name.split(' ')[0]}
                                        </Button>
                                    </div>
                                </CardContent>
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
