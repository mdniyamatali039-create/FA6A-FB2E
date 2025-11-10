
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
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('post_job_field_title')}</FormLabel>
                    <FormControl><Input placeholder="e.g., Apartment Painting" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('post_job_field_desc')}</FormLabel>
                    <FormControl><Textarea placeholder="Describe the job in detail..." className="min-h-[120px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>

                <FormLabel>Job Location</FormLabel>
                <FormField control={form.control} name="houseNumber" render={({ field }) => (
                    <FormItem><FormLabel>Flat, House no., Building</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="area" render={({ field }) => (
                    <FormItem><FormLabel>Area, Street, Sector, Village</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="landmark" render={({ field }) => (
                    <FormItem><FormLabel>Landmark (optional)</FormLabel><FormControl><Input placeholder="E.g. near Apollo Hospital" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>

                <div className="grid md:grid-cols-2 gap-8">
                   <FormField control={form.control} name="pincode" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl><Input placeholder="6-digit Pincode" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                  )}/>
                  <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Town/City</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                  )}/>
                </div>
                 <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger></FormControl>
                            <SelectContent>
                                {indianStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}/>
                
                <FormField control={form.control} name="wage" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('post_job_field_wage')}</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="skills" render={() => (
                  <FormItem>
                    <FormLabel>{t('post_job_field_skills')}</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {primarySkills.map((item) => (
                      <FormField key={item} control={form.control} name="skills" render={({ field }) => (
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

                <Button type="submit" size="lg">{t('post_job_cta')}</Button>
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
