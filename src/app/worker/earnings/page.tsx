
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
        <h1 className="text-3xl font-bold font-headline">Wallet</h1>
        <p className="text-muted-foreground">Manage your balance and view transaction history.</p>
      </div>
      <div className="grid gap-4">
        <Card className="bg-primary text-primary-foreground shadow-md">
          <CardHeader className="pb-2 text-center">
            <CardDescription className="text-primary-foreground/80">Total Earnings</CardDescription>
            <CardTitle className="text-5xl font-bold">₹{walletBalance + 1800}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center bg-primary-foreground/10 mx-4 mb-4 rounded-lg p-3">
             <div className="flex flex-col">
                 <span className="text-sm text-primary-foreground/80">Today's Earnings</span>
                 <span className="font-bold text-xl">₹850</span>
             </div>
             <Button variant="secondary" className="font-bold h-10 px-6 rounded-full shadow-sm text-primary hover:bg-white">
                 Withdraw (UPI)
             </Button>
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
