"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AdminPaymentsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Payment Management</h1>
                <p className="text-muted-foreground">View and manage all transactions.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center">Transaction list will be displayed here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
