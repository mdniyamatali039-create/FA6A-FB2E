
"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/hooks/use-app';
import { mockJobs, primarySkills, indianStates } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import type { Job } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  houseNumber: z.string().min(1, "Please enter a house/flat number."),
  area: z.string().min(3, "Please enter an area/street."),
  landmark: z.string().optional(),
  pincode: z.string().length(6, "Pincode must be 6 digits."),
  city: z.string().min(2, "Please enter a city."),
  state: z.string().min(2, "Please select a state."),
  wage: z.coerce.number().min(100, { message: "Wage must be at least 100." }),
  skills: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one required skill.",
  }),
});

export default function PostJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useApp();
  
  const pastJobs = mockJobs.filter(job => job.status === 'completed' || job.status === 'cancelled');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      houseNumber: "",
      area: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
      wage: 500,
      skills: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Job Posted!",
      description: "Your job has been successfully posted. You will be notified when workers apply.",
    });
    // Simulate API call and redirect
    setTimeout(() => {
      router.push('/customer/dashboard');
    }, 1500);
  }

  const getStatusBadgeVariant = (status: Job['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-2">{t('post_job_title')}</h1>
        <p className="text-muted-foreground mb-6">{t('post_job_desc')}</p>
        
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField control={form.control} name="skills" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Job Type (Worker Needed)</FormLabel>
                        <Select onValueChange={(val) => field.onChange([val])} defaultValue={field.value[0]}>
                            <FormControl>
                                <SelectTrigger className="h-12 text-lg">
                                    <SelectValue placeholder="Select worker type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {primarySkills.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Workers Needed</FormLabel>
                    <FormControl><Input type="number" placeholder="1" className="h-12 text-lg" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>

                <FormField control={form.control} name="wage" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Wage per Worker (₹)</FormLabel>
                      <FormControl><Input type="number" className="h-12 text-lg" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date & Time</FormLabel>
                    <FormControl><Input type="datetime-local" className="h-12 text-lg" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>

                <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                    <div className="flex items-start gap-3">
                        <Badge className="bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center p-0 shrink-0">!</Badge>
                        <div className="text-sm">
                            <p className="font-semibold text-foreground">Location auto-filled</p>
                            <p className="text-muted-foreground mt-1">123, Business Rd, Connaught Place, New Delhi - 110001</p>
                        </div>
                    </div>
                </div>

                <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">{t('post_job_cta')}</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Past Job Postings</h2>
        <Card>
          <CardContent className="pt-6">
            {pastJobs.length > 0 ? (
              <div className="space-y-4">
                {pastJobs.map(job => (
                  <div key={job.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.location}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(job.status)} className="capitalize">{job.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm text-center">You have no past job postings.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
