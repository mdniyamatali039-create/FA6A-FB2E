"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Platform Settings</h1>
                <p className="text-muted-foreground">Configure global settings for the application.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center">Platform settings will be available here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
