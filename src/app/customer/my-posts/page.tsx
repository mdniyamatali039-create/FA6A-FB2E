
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApp } from '@/hooks/use-app';
import { mockJobs, mockWorkers } from '@/lib/data';
import type { Job } from '@/lib/types';
import { MapPin, Wallet, Briefcase, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MyPostsPage() {
    const { t } = useApp();
    const { toast } = useToast();

    const jobs = mockJobs.filter(job => job.customerId === 'c1'); // Assuming customer c1 for mock

    const openJobs = jobs.filter(j => j.status === 'open');
    const activeJobs = jobs.filter(j => j.status === 'active');
    const completedJobs = jobs.filter(j => j.status === 'completed');
    const cancelledJobs = jobs.filter(j => j.status === 'cancelled');

    const handleAccept = (jobTitle: string, workerName: string) => {
        toast({
            title: "Worker Hired!",
            description: `You have hired ${workerName} for "${jobTitle}".`
        });
        // Here you would typically update the job status in the backend
    };

    const getStatusBadgeVariant = (status: Job['status']) => {
        switch (status) {
            case 'completed': return 'default';
            case 'active': return 'secondary';
            case 'cancelled': return 'destructive';
            default: return 'outline';
        }
    };

    const renderJobCard = (job: Job) => {
        const worker = job.workerId ? mockWorkers.find(w => w.id === job.workerId) : null;
        return (
            <Card key={job.id}>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{job.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 pt-1">
                                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.address.city}, {job.address.state}</span>
                                <span className="flex items-center gap-1 font-semibold text-primary"><Wallet className="h-4 w-4" />₹{job.wage}/day</span>
                            </CardDescription>
                        </div>
                        <Badge variant={getStatusBadgeVariant(job.status)} className="capitalize">{job.status}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                    </div>

                    {job.status === 'open' && (
                        <div>
                            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><UserCheck className="h-4 w-4" />Applied By:</h4>
                            {/* Mocking one applicant */}
                            <div className="flex items-center justify-between p-2 rounded-md border">
                                <div className="flex items-center gap-3">
                                    <Image src={mockWorkers[1].avatarUrl} alt={mockWorkers[1].name} width={40} height={40} className="rounded-full" />
                                    <div>
                                        <p className="font-semibold">{mockWorkers[1].name}</p>
                                        <p className="text-xs text-muted-foreground">{mockWorkers[1].primarySkills.join(', ')}</p>
                                    </div>
                                </div>
                                <Button size="sm" onClick={() => handleAccept(job.title, mockWorkers[1].name)}>Accept</Button>
                            </div>
                        </div>
                    )}

                    {(job.status === 'active' || job.status === 'completed') && worker && (
                        <div>
                            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Briefcase className="h-4 w-4" />Hired Worker:</h4>
                            <div className="flex items-center gap-3 p-2 rounded-md border">
                                <Image src={worker.avatarUrl} alt={worker.name} width={40} height={40} className="rounded-full" />
                                <div>
                                    <p className="font-semibold">{worker.name}</p>
                                    <p className="text-xs text-muted-foreground">{worker.primarySkills.join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">My Job Posts</h1>
                <p className="text-muted-foreground">Track and manage all your job postings.</p>
            </div>
            
            <Tabs defaultValue="open" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="open">Open</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
                <TabsContent value="open" className="space-y-4 pt-4">
                    {openJobs.length > 0 ? openJobs.map(renderJobCard) : <p className="text-muted-foreground text-center pt-8">No open jobs.</p>}
                </TabsContent>
                <TabsContent value="active" className="space-y-4 pt-4">
                     {activeJobs.length > 0 ? activeJobs.map(renderJobCard) : <p className="text-muted-foreground text-center pt-8">No active jobs.</p>}
                </TabsContent>
                <TabsContent value="completed" className="space-y-4 pt-4">
                    {completedJobs.length > 0 ? completedJobs.map(renderJobCard) : <p className="text-muted-foreground text-center pt-8">No completed jobs.</p>}
                </TabsContent>
                <TabsContent value="cancelled" className="space-y-4 pt-4">
                    {cancelledJobs.length > 0 ? cancelledJobs.map(renderJobCard) : <p className="text-muted-foreground text-center pt-8">No cancelled jobs.</p>}
                </TabsContent>
            </Tabs>
        </div>
    );
}
