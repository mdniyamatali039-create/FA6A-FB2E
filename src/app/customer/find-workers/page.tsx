"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/hooks/use-app';
import { mockWorkers, primarySkills } from '@/lib/data';
import { intelligentJobMatching } from '@/ai/flows/intelligent-job-matching';
import type { WorkerProfile } from '@/lib/types';
import { Loader2, User, Star, Wallet, MapPin, Wrench } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  jobDescription: z.string().min(10, { message: "Description must be at least 10 characters." }),
  jobLocation: z.string().min(3, { message: "Please enter a location." }),
  maxWage: z.coerce.number().min(100, { message: "Wage must be at least 100." }),
  requiredSkills: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one required skill.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FindWorkersPage() {
  const { toast } = useToast();
  const { t } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [matchedWorkers, setMatchedWorkers] = useState<WorkerProfile[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
      jobLocation: "",
      maxWage: 800,
      requiredSkills: [],
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setMatchedWorkers([]);
    try {
        const result = await intelligentJobMatching({
            jobRequirements: values,
            workerProfiles: mockWorkers,
        });

        // The AI result is an array of objects. We need to find the full profile from our mock data.
        const matchedIds = result.map(w => w.mobileNumber); // Using mobile as a unique ID from schema
        const fullProfiles = mockWorkers.filter(w => matchedIds.includes(w.mobileNumber));
        
        setMatchedWorkers(fullProfiles);

        if (fullProfiles.length === 0) {
            toast({ title: t('find_workers_no_matches') });
        } else {
            toast({ title: "Found matches!", description: `We found ${fullProfiles.length} workers for your job.` });
        }
    } catch(error) {
        console.error("AI Matching Error:", error);
        toast({
            variant: "destructive",
            title: "An error occurred",
            description: "Failed to get matches from AI. Please try again."
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-2">{t('find_workers_title')}</h1>
        <p className="text-muted-foreground">{t('find_workers_desc')}</p>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Job Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <FormField control={form.control} name="jobDescription" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl><Input placeholder="e.g., Need help with house painting" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="jobLocation" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl><Input placeholder="e.g., Delhi, India" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="maxWage" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Daily Wage (INR)</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                )}/>
              </div>

              <FormField control={form.control} name="requiredSkills" render={() => (
                <FormItem>
                  <FormLabel>Required Skills</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {primarySkills.map((item) => (
                    <FormField key={item} control={form.control} name="requiredSkills" render={({ field }) => (
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

              <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('find_workers_match_cta')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      { (isLoading || matchedWorkers.length > 0) &&
        <div className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">{t('find_workers_results_title')}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {isLoading && Array.from({length: 3}).map((_, i) => (
                    <Card key={i} className="animate-pulse"><CardHeader><div className="h-6 bg-muted rounded w-3/4"></div><div className="h-4 bg-muted rounded w-1/2"></div></CardHeader><CardContent><div className="h-20 bg-muted rounded"></div></CardContent><CardFooter><div className="h-10 w-full bg-muted rounded"></div></CardFooter></Card>
                ))}
                {!isLoading && matchedWorkers.map(worker => (
                   <Card key={worker.id} className="flex flex-col">
                       <CardHeader className="flex-row items-center gap-4">
                           <Image src={worker.avatarUrl} alt={worker.name} width={64} height={64} className="rounded-full" />
                           <div>
                               <CardTitle className="text-lg">{worker.name}</CardTitle>
                               <CardDescription className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {worker.location}</CardDescription>
                           </div>
                       </CardHeader>
                       <CardContent className="space-y-2 flex-grow">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground"><Wrench className="h-4 w-4 text-primary" />{worker.experience}</div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground"><Wallet className="h-4 w-4 text-primary" />₹{worker.desiredDailyWage} / day</div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {worker.primarySkills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                            </div>
                       </CardContent>
                       <CardFooter>
                           <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{t('hire')} {worker.name.split(' ')[0]}</Button>
                       </CardFooter>
                   </Card>
                ))}
            </div>
        </div>
      }
    </div>
  );
}
