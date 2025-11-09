"use client";

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
import { MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email."}),
  mobile: z.string().length(10, { message: "Mobile number must be 10 digits." }),
  workAddress: z.string().optional(),
});

export default function CustomerProfilePage() {
  const { toast } = useToast();
  const { t } = useApp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Customer Name",
      mobile: "9876543210",
      email: "customer@example.com",
      workAddress: "123 Business Rd, New Delhi",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Profile Updated!",
      description: "Your changes have been saved successfully.",
    });
  }

  return (
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
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle>Address</CardTitle>
                <CardDescription>Manage your work address for job postings.</CardDescription>
            </CardHeader>
            <CardContent>
                <FormField
                  control={form.control}
                  name="workAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Address</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="123 Main St, Anytown" {...field} />
                        </FormControl>
                        <Button variant="outline" size="icon" type="button" onClick={() => toast({ title: 'Map functionality not implemented.'})}>
                          <MapPin className="h-5 w-5" />
                          <span className="sr-only">Pin on map</span>
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
          </Card>

          <Button type="submit" size="lg">{t('save_changes')}</Button>
        </form>
      </Form>
    </div>
  );
}
