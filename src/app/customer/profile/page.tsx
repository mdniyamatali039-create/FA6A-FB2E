"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/hooks/use-app';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  mobile: z.string().length(10, { message: "Mobile number must be 10 digits." }),
  email: z.string().email({ message: "Please enter a valid email."}),
});

export default function CustomerProfilePage() {
  const { toast } = useToast();
  const { t } = useApp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Customer Name",
      mobile: "9876543210",
      email: "customer@example.com"
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
      
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://picsum.photos/seed/c-avatar/100/100" alt="Customer" />
                        <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" type="button">Change Photo</Button>
                </div>
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('signup_form_name')}</FormLabel>
                        <FormControl>
                        <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('signup_form_mobile')}</FormLabel>
                        <FormControl>
                        <Input type="tel" placeholder="9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
              <Button type="submit" size="lg">{t('save_changes')}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
