"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AdminJobsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Job Management</h1>
                <p className="text-muted-foreground">View and manage all job postings.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center">Job list will be displayed here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
