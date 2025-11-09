
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function WalletPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Wallet</h1>
                <p className="text-muted-foreground">Manage your balance and transactions.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Wallet Balance</CardDescription>
                        <CardTitle className="text-4xl">₹1,250</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">Available to spend</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Add Money</CardTitle>
                        <CardDescription>Enter an amount to add to your wallet.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount (INR)</Label>
                            <Input id="amount" type="number" placeholder="e.g., 500" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Add Money</Button>
                    </CardFooter>
                </Card>
            </div>
             <div>
                <h2 className="text-2xl font-bold font-headline mb-4">Transaction History</h2>
                 <Card>
                    <CardContent className="pt-6">
                        <p className="text-muted-foreground">No transactions yet.</p>
                    </CardContent>
                 </Card>
            </div>
        </div>
    );
}
