
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

declare global {
    interface Window {
      Razorpay: any;
    }
}

export default function WalletPage() {
    const [balance, setBalance] = useState(1250);
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleAddMoney = async () => {
        const numericAmount = parseInt(amount);
        if (!numericAmount || numericAmount <= 0) {
            toast({
                variant: "destructive",
                title: "Invalid Amount",
                description: "Please enter a valid amount to add.",
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/razorpay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: numericAmount * 100 }), // Amount in paise
            });

            if (!response.ok) {
                throw new Error('Failed to create Razorpay order');
            }

            const { order } = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "LabourChok Wallet",
                description: "Add Money to Wallet",
                order_id: order.id,
                handler: function (response: any) {
                    // alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
                    setBalance(prev => prev + numericAmount);
                    setAmount('');
                    toast({
                        title: "Payment Successful",
                        description: `₹${numericAmount} has been added to your wallet.`,
                    });
                },
                prefill: {
                    name: "Customer Name", // Replace with actual user data
                    email: "customer@example.com",
                    contact: "9876543210",
                },
                notes: {
                    address: "Customer Address",
                },
                theme: {
                    color: "#225072", // Corresponds to --primary HSL
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                toast({
                    variant: "destructive",
                    title: "Payment Failed",
                    description: response.error.description,
                });
            });
            rzp.open();

        } catch (error) {
            console.error("Razorpay error:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Could not initiate payment. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };


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
                        <CardTitle className="text-4xl">₹{balance.toLocaleString()}</CardTitle>
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
                            <Input 
                                id="amount" 
                                type="number" 
                                placeholder="e.g., 500" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={handleAddMoney} disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Add Money
                        </Button>
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
