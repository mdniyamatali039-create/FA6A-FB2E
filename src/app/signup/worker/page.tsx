
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/hooks/use-app';
import Logo from '@/components/logo';
import { primarySkills } from '@/lib/data';
import type { Language } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  mobile: z.string().length(10, { message: "Mobile number must be 10 digits." }),
  experience: z.string().min(1, { message: "Please select your experience level." }),
  location: z.string().min(3, { message: "Please enter your location." }),
  primarySkills: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one primary skill.",
  }),
  secondarySkills: z.string().optional(),
  desiredDailyWage: z.coerce.number().min(100, { message: "Wage must be at least 100." }),
  language: z.enum(['en', 'hi', 'bn'], { required_error: "Please select a language." }),
});

export default function WorkerSignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t, language, setLanguage } = useApp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      experience: "",
      location: "",
      primarySkills: [],
      secondarySkills: "",
      desiredDailyWage: 500,
      language: language,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLanguage(values.language);
    toast({
      title: "Account Created!",
      description: `Welcome, ${values.name}! Redirecting to your dashboard...`,
    });
    setTimeout(() => {
      router.push('/worker/dashboard');
    }, 1500);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-2xl my-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">{t('signup_title')} - {t('role_worker')}</CardTitle>
          <CardDescription>Fill out your profile to start finding jobs.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>{t('signup_form_name')}</FormLabel><FormControl><Input placeholder="Ramesh Kumar" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="mobile" render={({ field }) => (
                  <FormItem><FormLabel>{t('signup_form_mobile')}</FormLabel><FormControl><Input type="tel" placeholder="9876543210" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="experience" render={({ field }) => (
                  <FormItem><FormLabel>{t('signup_form_experience')}</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger></FormControl><SelectContent><SelectItem value="<1 year">&lt; 1 year</SelectItem><SelectItem value="1-3 years">1-3 years</SelectItem><SelectItem value="3-5 years">3-5 years</SelectItem><SelectItem value="5+ years">5+ years</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem><FormLabel>{t('signup_form_location')}</FormLabel><FormControl><Input placeholder="e.g., Delhi, India" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </div>

              <FormField control={form.control} name="primarySkills" render={({ field }) => (
                <FormItem>
                    <FormLabel>{t('signup_form_primary_skills')}</FormLabel>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal h-auto">
                                <div className="flex gap-2 flex-wrap items-center">
                                    {field.value.length === 0 && <span className="text-muted-foreground">Select your primary skills</span>}
                                    {field.value.map(skill => <Badge key={skill}>{skill}</Badge>)}
                                </div>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Select Primary Skills</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                                {primarySkills.map((item) => (
                                    <div key={item} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`skill-${item}`}
                                            checked={field.value.includes(item)}
                                            onCheckedChange={(checked) => {
                                                const newValue = checked
                                                    ? [...field.value, item]
                                                    : field.value.filter((value) => value !== item);
                                                field.onChange(newValue);
                                            }}
                                        />
                                        <label htmlFor={`skill-${item}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button">Done</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <FormMessage />
                </FormItem>
              )}/>
              
              <FormField control={form.control} name="secondarySkills" render={({ field }) => (
                <FormItem><FormLabel>{t('signup_form_secondary_skills')}</FormLabel><FormControl><Textarea placeholder="e.g., Tiling, Furniture polishing" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              
              <div className="grid md:grid-cols-2 gap-6">
                 <FormField control={form.control} name="desiredDailyWage" render={({ field }) => (
                    <FormItem><FormLabel>{t('signup_form_wage')}</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="language" render={({ field }) => (
                    <FormItem><FormLabel>{t('signup_form_language')}</FormLabel>
                    <FormControl>
                        <RadioGroup onValueChange={(val) => field.onChange(val as Language)} defaultValue={field.value} className="flex items-center space-x-4 pt-2">
                           <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="en" id="en" /></FormControl><FormLabel htmlFor="en" className="font-normal">English</FormLabel></FormItem>
                           <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="hi" id="hi" /></FormControl><FormLabel htmlFor="hi" className="font-normal">हिंदी</FormLabel></FormItem>
                           <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="bn" id="bn" /></FormControl><FormLabel htmlFor="bn" className="font-normal">বাংলা</FormLabel></FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}/>
              </div>

              <Button type="submit" className="w-full !mt-8">{t('signup_form_create_account')}</Button>
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
