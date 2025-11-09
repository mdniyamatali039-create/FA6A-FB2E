"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/hooks/use-app';
import { mockWorkers, primarySkills } from '@/lib/data';

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
});

export default function WorkerProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useApp();
  const workerData = mockWorkers[0]; // Using first worker as mock data

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workerData.name,
      mobile: workerData.mobileNumber.replace('+91', ''),
      experience: workerData.experience,
      location: workerData.location,
      primarySkills: workerData.primarySkills,
      secondarySkills: workerData.secondarySkills,
      desiredDailyWage: workerData.desiredDailyWage,
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
            <h1 className="text-3xl font-bold font-headline mb-2">{t('worker_profile_title')}</h1>
            <p className="text-muted-foreground">{t('worker_profile_desc')}</p>
        </div>
      
        <Card>
            <CardContent className="pt-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>{t('signup_form_name')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="mobile" render={({ field }) => (
                    <FormItem><FormLabel>{t('signup_form_mobile')}</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="experience" render={({ field }) => (
                    <FormItem><FormLabel>{t('signup_form_experience')}</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger></FormControl><SelectContent><SelectItem value="<1 year">&lt; 1 year</SelectItem><SelectItem value="1-3 years">1-3 years</SelectItem><SelectItem value="3-5 years">3-5 years</SelectItem><SelectItem value="5+ years">5+ years</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem><FormLabel>{t('signup_form_location')}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>

                <FormField control={form.control} name="primarySkills" render={() => (
                    <FormItem><FormLabel>{t('signup_form_primary_skills')}</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {primarySkills.map((item) => (
                    <FormField key={item} control={form.control} name="primarySkills" render={({ field }) => (
                        <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {
                            return checked ? field.onChange([...field.value, item]) : field.onChange(field.value?.filter((value) => value !== item));
                        }}/></FormControl>
                        <FormLabel className="font-normal">{item}</FormLabel>
                        </FormItem>
                    )}/>
                    ))}
                    </div>
                    <FormMessage />
                    </FormItem>
                )}/>
                
                <FormField control={form.control} name="secondarySkills" render={({ field }) => (
                    <FormItem><FormLabel>{t('signup_form_secondary_skills')}</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                
                <FormField control={form.control} name="desiredDailyWage" render={({ field }) => (
                    <FormItem className="max-w-xs"><FormLabel>{t('signup_form_wage')}</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>

                <Button type="submit" size="lg">{t('save_changes')}</Button>
                </form>
            </Form>
            </CardContent>
      </Card>
    </div>
  );
}
