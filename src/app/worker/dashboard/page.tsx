
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, MapPin } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { mockJobs, mockWorkers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import ReadAloudButton from '@/components/read-aloud-button';

export default function WorkerDashboardPage() {
    const { t } = useApp();
    const activeJobs = mockJobs.filter(job => job.status === 'active' && job.workerId === mockWorkers[0].id);

    const handleNavigate = (location: string) => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
    };

  return (
    <div className="space-y-6 pb-24">
      {/* Header moved to layout */}

      {/* Online/Offline Toggle */}
      <Card>
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="online-status" defaultChecked />
            <Label htmlFor="online-status" className="text-lg font-medium">You are Online</Label>
            <ReadAloudButton text="You are Online" />
          </div>
          <Badge>Verified</Badge>
        </CardContent>
      </Card>
      
      {/* Main Widgets */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Today's Jobs</CardTitle>
            </CardHeader>
            <CardContent>
                {activeJobs.length > 0 ? (
                    activeJobs.map(job => {
                        // Mock finding customer details
                        const customer = { name: "Sanjay Patel", avatar: "https://picsum.photos/seed/sanjay/100/100"};
                        return (
                            <div key={job.id} className="space-y-4">
                                <div>
                                    <p className="font-semibold text-lg">{job.title}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <Image src={customer.avatar} alt={customer.name} width={40} height={40} className="rounded-full" />
                                        <div>
                                            <p className="text-sm font-medium">{customer.name}</p>
                                            <p className="text-xs text-muted-foreground">{job.location}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full" onClick={() => handleNavigate(job.location)}>
                                    <MapPin className="mr-2 h-4 w-4" /> Navigate to Job
                                </Button>
                            </div>
                        )
                    })
                ) : (
                    <>
                        <p className="text-3xl font-bold">0 Active</p>
                        <p className="text-muted-foreground">No jobs assigned for today.</p>
                        <ReadAloudButton text="No active jobs today." />
                    </>
                )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Earnings Today</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">₹850</p>
                <p className="text-muted-foreground">From 1 completed job</p>
                <ReadAloudButton text="Earnings today are 850 rupees from one completed job." />
            </CardContent>
        </Card>
      </div>

      {/* AI Job Suggestion Card */}
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
  );
}
