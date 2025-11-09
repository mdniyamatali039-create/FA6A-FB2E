
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Wallet, ArrowRight } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { mockJobs } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function FindJobsPage() {
    const { t } = useApp();
    const { toast } = useToast();
    const openJobs = mockJobs.filter(job => job.status === 'open');
    
    const handleApply = (jobTitle: string) => {
        toast({
            title: "Application Sent!",
            description: `You have successfully applied for "${jobTitle}".`
        });
    };

    const handleNavigate = (location: string) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
    };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{t('find_jobs_title')}</h1>
        <p className="text-muted-foreground">{t('find_jobs_desc')}</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {openJobs.length > 0 ? (
            openJobs.map(job => (
                <Card key={job.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle>{job.title}</CardTitle>
                        <div className="flex items-center justify-between text-sm text-muted-foreground pt-1">
                            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
                            <span className="flex items-center gap-1 font-semibold text-primary"><Wallet className="h-4 w-4" />₹{job.wage}/day</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
                         <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
                        </div>
                    </CardContent>
                    <CardFooter className="grid grid-cols-2 gap-2">
                        <Button variant="outline" onClick={() => handleNavigate(job.location)}>
                           Navigate
                        </Button>
                        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => handleApply(job.title)}>
                           {t('apply')} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ))
        ) : (
            <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No open jobs available right now. Check back later!</p>
            </div>
        )}
      </div>
    </div>
  );
}
