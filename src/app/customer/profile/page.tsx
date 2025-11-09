
"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/hooks/use-app';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, PlusCircle, Trash2 } from 'lucide-react';
import { mockCustomerAddresses } from '@/lib/data';

const MapPicker = dynamic(() => import('@/components/map-picker'), { ssr: false });

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email."}),
  mobile: z.string().length(10, { message: "Mobile number must be 10 digits." }),
});

export default function CustomerProfilePage() {
  const { toast } = useToast();
  const { t } = useApp();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [addresses, setAddresses] = useState(mockCustomerAddresses);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Customer Name",
      mobile: "9876543210",
      email: "customer@example.com",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Profile Updated!",
      description: "Your changes have been saved successfully.",
    });
  }

  const handleLocationSelect = (address: string) => {
    const newAddress = { id: `addr${addresses.length + 1}`, address };
    setAddresses(prev => [...prev, newAddress]);
    setIsMapOpen(false);
    toast({
      title: "Address Added!",
      description: "New work address has been saved.",
    });
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline mb-2">{t('profile')}</h1>
          <p className="text-muted-foreground">Manage your profile details.</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your name, email, and mobile number.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://picsum.photos/seed/c-avatar/100/100" alt="Customer" />
                        <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" type="button">Change Photo</Button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                          <FormLabel>{t('signup_form_name')}</FormLabel>
                          <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )}/>
                  <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )}/>
                  <FormField control={form.control} name="mobile" render={({ field }) => (
                      <FormItem>
                          <FormLabel>{t('signup_form_mobile')}</FormLabel>
                          <FormControl><Input type="tel" placeholder="9876543210" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )}/>
                </div>
                <Button type="submit">Save Personal Info</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Saved Addresses</CardTitle>
                    <CardDescription>Manage your addresses for job postings.</CardDescription>
                  </div>
                   <Button variant="outline" type="button" onClick={() => setIsMapOpen(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
                  </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                  {addresses.length > 0 ? (
                      addresses.map((addr) => (
                        <div key={addr.id} className="flex items-center justify-between rounded-md border p-4">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground"/>
                                <span>{addr.address}</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                                <span className="sr-only">Delete address</span>
                            </Button>
                        </div>
                      ))
                  ) : (
                      <p className="text-muted-foreground text-sm py-4 text-center">You have no saved addresses.</p>
                  )}
              </CardContent>
            </Card>

          </form>
        </Form>
      </div>
      
      {isMapOpen && (
        <MapPicker
            open={isMapOpen}
            onOpenChange={setIsMapOpen}
            onLocationSelect={handleLocationSelect}
        />
      )}
    </>
  );
}
