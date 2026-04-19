"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/hooks/use-app';
import Logo from '@/components/logo';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  mobile: z.string().length(10, { message: "Mobile number must be 10 digits." }),
});

export default function CustomerSignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useApp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Account Created!",
      description: `Welcome, ${values.name}! Redirecting to your dashboard...`,
    });
    // Simulate API call and redirect
    setTimeout(() => {
      router.push('/customer/dashboard');
    }, 1500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">{t('signup_title')} - {t('role_customer')}</CardTitle>
          <CardDescription>Enter your details to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <div className="pt-4 space-y-4">
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 text-center">
                      <p className="text-sm font-medium mb-2">Ready to find workers?</p>
                      <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                        Post Job Now
                      </Button>
                  </div>
              </div>
            </form>
          </Form>
        </CardContent>
         <div className="text-center p-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              {t('login')}
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
