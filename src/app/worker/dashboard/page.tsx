
"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, User, ArrowRight, MapPin, Edit, Star, Cog, BarChart, MessageSquare, Wallet, Zap } from 'lucide-react';
import { useApp } from '@/hooks/use-app';
import { mockJobs, mockWorkers } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function WorkerDashboardPage() {
    const { t } = useApp();
    const activeJobs = mockJobs.filter(job => job.status === 'active' && job.workerId === mockWorkers[0].id).length;
    const pendingJobs = mockJobs.filter(job => job.status === 'open' && job.workerId === mockWorkers[0].id).length; // Assuming some jobs can be pending for a worker
    const worker = mockWorkers[0]; // Use a mock worker for display

    const quickButtons = [
        { href: "/worker/find-jobs", label: "Find Job", icon: <Briefcase /> },
        { href: "/worker/my-jobs", label: "My Jobs", icon: <MapPin /> },
        { href: "/worker/earnings", label: "My Earnings", icon: <BarChart /> },
        { href: "/worker/chat", label: "Messages", icon: <MessageSquare /> },
    ];

  return (
    <div className="space-y-6 pb-24">
      {/* Header moved to layout */}

      {/* Online/Offline Toggle */}
      <Card>
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="online-status" defaultChecked />
            <Label htmlFor="online-status" className="text-lg font-medium">You are Online</Label>
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
                <p className="text-3xl font-bold">{activeJobs} Active</p>
                <p className="text-muted-foreground">{pendingJobs} Pending</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Earnings Today</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">₹850</p>
                <p className="text-muted-foreground">From 1 completed job</p>
            </CardContent>
        </Card>
      </div>

      {/* AI Job Suggestion Card */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Zap className="h-6 w-6" />AI Job Suggestion</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-lg">You have 3 new nearby jobs that match your skills.</p>
        </CardContent>
        <CardFooter>
            <Button variant="secondary" asChild>
                <Link href="/worker/find-jobs?tab=suggestions">View Suggestions <ArrowRight className="ml-2" /></Link>
            </Button>
        </CardFooter>
      </Card>

      {/* Quick Buttons */}
       <div>
        <h2 className="text-xl font-bold font-headline mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickButtons.map(btn => (
                 <Button key={btn.href} variant="outline" className="h-24 flex-col gap-2 text-base" asChild>
                    <Link href={btn.href}>
                        {btn.icon}
                        <span>{btn.label}</span>
                    </Link>
                </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
