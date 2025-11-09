
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { differenceInCalendarDays, format } from 'date-fns';
import { mockJobs, mockWorkers } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
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
import type { Job } from '@/lib/types';

export default function MyJobs() {
  const { toast } = useToast();
  // Filter for jobs that have a worker assigned, regardless of status for initial data
  const allHiredJobs = mockJobs.filter(j => j.workerId);
  const [jobs, setJobs] = useState(allHiredJobs);
  const [jobToCancel, setJobToCancel] = useState<Job | null>(null);

  const handleCancelConfirm = () => {
    if (!jobToCancel) return;
    
    // Instead of removing, we could also change the status
    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobToCancel.id));
    toast({
      title: "Job Cancelled",
      description: `The job "${jobToCancel.title}" has been cancelled.`
    });
    setJobToCancel(null);
  };
  
  const canCancel = (job: Job) => {
    if (!job.startDate) return false;
    // Allow cancellation if there is more than 1 day difference (i.e., at least 2 days away)
    return differenceInCalendarDays(new Date(job.startDate), new Date()) > 1;
  };

  const activeJobs = jobs.filter(j => j.status === 'active');

  if (activeJobs.length === 0) {
    return <p className="text-sm text-muted-foreground text-center">You have no active jobs with hired workers.</p>;
  }

  return (
    <>
      <div className="space-y-4">
        {activeJobs.map(job => {
          const worker = mockWorkers.find(w => w.id === job.workerId);
          if (!worker) return null;

          return (
            <div key={job.id} className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-muted">
              <div className="flex items-center gap-3">
                <Image src={worker.avatarUrl} alt={worker.name} width={40} height={40} className="rounded-full" />
                <div>
                  <p className="font-semibold text-sm">{worker.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {job.title} on {job.startDate ? format(new Date(job.startDate), 'MMM dd, yyyy') : 'N/A'}
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setJobToCancel(job)}
                disabled={!canCancel(job)}
                title={canCancel(job) ? "Cancel Job" : "Cancellation only allowed more than 1 day before start date"}
              >
                Cancel
              </Button>
            </div>
          );
        })}
      </div>

      <AlertDialog open={!!jobToCancel} onOpenChange={(open) => !open && setJobToCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel the job "{jobToCancel?.title}". This action cannot be undone.
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
