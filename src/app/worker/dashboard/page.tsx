
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, MapPin, Calendar, User, X } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { mockJobs, mockWorkers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import ReadAloudButton from '@/components/read-aloud-button';
import { format, differenceInCalendarDays } from 'date-fns';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Job } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function WorkerDashboardPage() {
    const { t } = useApp();
    const { toast } = useToast();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [isOnline, setIsOnline] = useState(true);

    const activeJobs = mockJobs.filter(job => 
        job.status === 'active' && 
        job.workerId === mockWorkers[0].id &&
        job.startDate && new Date(job.startDate).toDateString() === new Date().toDateString()
    );

    const [upcomingJobs, setUpcomingJobs] = useState(mockJobs.filter(job =>
        job.status === 'active' &&
        job.workerId === mockWorkers[0].id &&
        job.startDate && new Date(job.startDate) > new Date()
    ).sort((a, b) => new Date(a.startDate!).getTime() - new Date(b.startDate!).getTime()));

    const [jobToCancel, setJobToCancel] = useState<Job | null>(null);

    const handleNavigate = (location: string) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
    };
    
    const canCancel = (job: Job) => {
        if (!job.startDate) return false;
        return differenceInCalendarDays(new Date(job.startDate), new Date()) > 1;
    };

    const handleCancelConfirm = () => {
        if (!jobToCancel) return;
        
        setUpcomingJobs(prevJobs => prevJobs.filter(job => job.id !== jobToCancel.id));
        toast({
            title: "Job Cancelled",
            description: `The job "${jobToCancel.title}" has been cancelled.`
        });
        setJobToCancel(null);
    };

    const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());

    const handleApply = (jobId: string) => {
        setAppliedJobs(prev => {
            const newSet = new Set(prev);
            newSet.add(jobId);
            return newSet;
        });
        toast({
            title: "Application Submitted",
            description: "The employer will contact you if selected."
        });
    };

  return (
    <>
      <div className="space-y-8 pb-24">
        {/* Header moved to layout */}

        {/* Online/Offline Toggle */}
        <Card>
          <CardContent className="pt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="online-status" checked={isOnline} onCheckedChange={setIsOnline} />
              <Label htmlFor="online-status" className="text-lg font-medium">
                {isOnline ? 'You are Online' : 'You are Offline'}
              </Label>
              <ReadAloudButton text={isOnline ? 'You are Online' : 'You are Offline'} />
            </div>
            <Badge>Verified</Badge>
          </CardContent>
        </Card>
        
        {/* Job Feed */}
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-headline">New Jobs Near You</h2>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Live</Badge>
            </div>
            <div className="space-y-4">
                {mockJobs.filter(j => j.status === 'open').slice(0, 3).map(job => (
                    <Card key={job.id} className="border-l-4 border-l-emerald-500 shadow-md">
                        <CardContent className="p-4 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{job.title}</h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                        <MapPin className="h-4 w-4 text-primary" /> {job.address.area} <span className="font-semibold text-foreground">(1.2 km away)</span>
                                    </p>
                                </div>
                                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-0">Today</Badge>
                            </div>

                            <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg">
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Daily Wage</span>
                                    <span className="font-bold text-lg text-primary">₹{job.wage}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-xs text-muted-foreground">Requirement</span>
                                    <span className="font-medium text-sm">{job.skills[0]}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full h-12 text-lg font-bold"
                                variant={appliedJobs.has(job.id) ? "secondary" : "default"}
                                onClick={() => handleApply(job.id)}
                                disabled={appliedJobs.has(job.id)}
                            >
                                {appliedJobs.has(job.id) ? "Applied" : "Apply Now"}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        {/* AI Job Suggestion Card (Kept for context) */}
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><Zap className="h-6 w-6" />AI Job Suggestion</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="flex items-center gap-2">
                <p className="text-lg">You have 3 new nearby jobs that match your skills.</p>
                <ReadAloudButton text="You have 3 new nearby jobs that match your skills." variant="secondary" />
              </div>
          </CardContent>
          <CardFooter>
              <Button variant="secondary" asChild>
                  <Link href="/worker/find-jobs">View Suggestions <ArrowRight className="ml-2" /></Link>
              </Button>
          </CardFooter>
        </Card>

      </div>
       <AlertDialog open={!!jobToCancel} onOpenChange={(open) => !open && setJobToCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel the job "{jobToCancel?.title}". This action cannot be undone and may affect your rating.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Back</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelConfirm}>Confirm Cancellation</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
