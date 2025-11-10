
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { mockJobs, mockWorkers } from '@/lib/data';
import type { Job } from '@/lib/types';
import { MapPin, Wallet, Briefcase, UserCheck } from 'lucide-react';
import ReadAloudButton from '@/components/read-aloud-button';

export default function MyJobsPage() {
    const { toast } = useToast();

    // Mock data for jobs this worker has applied to or is working on
    const myJobIds = new Set(['j3', 'j5']);
    const jobs = mockJobs.filter(job => myJobIds.has(job.id) || job.workerId === 'w1');

    const appliedJobs = jobs.filter(j => j.status === 'open' && !j.workerId);
    const activeJobs = jobs.filter(j => j.status === 'active' && j.workerId === 'w1');
    const completedJobs = jobs.filter(j => j.status === 'completed' && j.workerId === 'w1');

    const handleAccept = (jobTitle: string, workerName: string) => {
        toast({
            title: "Offer Accepted!",
            description: `You have accepted the offer for "${jobTitle}".`
        });
        // Here you would typically update the job status in the backend
    };
    
    const handleNavigate = (location: string) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
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
                                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
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
                    {job.status === 'active' && (
                        <div className="flex gap-2">
                             <Button className="w-full" onClick={() => handleNavigate(job.location)}>Navigate to Job</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-8 pb-24">
            <div>
                <h1 className="text-3xl font-bold font-headline">My Jobs</h1>
                <p className="text-muted-foreground">Track all your jobs.</p>
            </div>
            
            <Tabs defaultValue="applied" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="applied">Applied</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="applied" className="space-y-4 pt-4">
                    {appliedJobs.length > 0 ? appliedJobs.map(renderJobCard) : <p className="text-muted-foreground text-center pt-8">You haven't applied to any jobs yet.</p>}
                </TabsContent>
                <TabsContent value="active" className="space-y-4 pt-4">
                     {activeJobs.length > 0 ? activeJobs.map(renderJobCard) : <p className="text-muted-foreground text-center pt-8">You have no active jobs.</p>}
                </TabsContent>
                <TabsContent value="completed" className="space-y-4 pt-4">
                    {completedJobs.length > 0 ? completedJobs.map(renderJobCard) : <p className="text-muted-foreground text-center pt-8">You have no completed jobs.</p>}
                </TabsContent>
            </Tabs>
        </div>
    );
}
