"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/hooks/use-app';
import { IndianRupee } from 'lucide-react';

// Mock data
const mockTransactions = [
  { id: 'txn1', date: '2024-07-20', description: 'Payment for "Apartment Painting"', amount: 850 },
  { id: 'txn2', date: '2024-07-18', description: 'Payment for "Office Furniture Assembly"', amount: 950 },
  { id: 'txn3', date: '2024-07-15', description: 'Withdrawal to Bank Account', amount: -1500 },
];
const walletBalance = 300;

export default function EarningsPage() {
  const { t } = useApp();

  return (
    <div className="space-y-8 pb-24">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Earnings</h1>
        <p className="text-muted-foreground">Manage your balance and view transaction history.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Available Balance</CardDescription>
            <CardTitle className="text-4xl">₹{walletBalance}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Withdraw to Bank</Button>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Transaction History</h2>
        <Card>
          <CardContent className="pt-6">
            {mockTransactions.length > 0 ? (
                <div className="space-y-4">
                    {mockTransactions.map(tx => (
                        <div key={tx.id} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{tx.description}</p>
                                <p className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                            </div>
                            <div className={`flex items-center font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-destructive'}`}>
                                <IndianRupee className="h-4 w-4" /> {tx.amount > 0 ? tx.amount : -tx.amount}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground text-center">No transactions yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
