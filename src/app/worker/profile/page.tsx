
"use client";

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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import ReadAloudButton from '@/components/read-aloud-button';
import { useState } from 'react';
import { Navigation, Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  mobile: z.string().length(10, { message: "Mobile number must be 10 digits." }),
  experience: z.string().min(1, { message: "Please select your experience level." }),
  currentCityExperience: z.string().min(1, { message: "Please select your experience level in the current city." }),
  location: z.string().min(3, { message: "Please enter your location." }),
  primarySkills: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one primary skill.",
  }),
  secondarySkills: z.string().optional(),
  desiredDailyWage: z.coerce.number().min(100, { message: "Wage must be at least 100." }),
});

export default function WorkerProfilePage() {
  const { toast } = useToast();
  const { t } = useApp();
  const workerData = mockWorkers[0]; // Using first worker as mock data
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workerData.name,
      mobile: workerData.mobileNumber.replace('+91', ''),
      experience: workerData.experience,
      currentCityExperience: workerData.currentCityExperience || '',
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

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({ variant: 'destructive', title: 'Geolocation is not supported by your browser.' });
      return;
    }

    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          if (data && data.display_name) {
            form.setValue('location', data.display_name);
            toast({ title: 'Location Updated!', description: 'Your current location has been set.' });
          } else {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not find address for your location.' });
          }
        } catch (error) {
          toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch address.' });
        } finally {
          setIsFetchingLocation(false);
        }
      },
      () => {
        toast({ variant: 'destructive', title: 'Permission Denied', description: 'Unable to retrieve your location.' });
        setIsFetchingLocation(false);
      }
    );
  };

  return (
    <div className="space-y-8">
        <div>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">{t('worker_profile_desc')}</p>
              <ReadAloudButton text={t('worker_profile_desc')} />
            </div>
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
                    <FormField control={form.control} name="currentCityExperience" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current City Experience</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="<1 year">&lt; 1 year</SelectItem>
                                    <SelectItem value="1-3 years">1-3 years</SelectItem>
                                    <SelectItem value="3-5 years">3-5 years</SelectItem>
                                    <SelectItem value="5+ years">5+ years</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>{t('signup_form_location')}</FormLabel>
                        <div className="relative">
                          <FormControl><Input {...field} className="pr-10" /></FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                            onClick={handleGetCurrentLocation}
                            disabled={isFetchingLocation}
                          >
                            {isFetchingLocation ? <Loader2 className="animate-spin" /> : <Navigation className="h-4 w-4" />}
                            <span className="sr-only">Use current location</span>
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
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
                                                  const currentSkills = field.value;
                                                  if (checked && currentSkills.length >= 2) {
                                                      toast({
                                                          variant: "destructive",
                                                          title: "Limit Reached",
                                                          description: "You can select a maximum of 2 primary skills.",
                                                      });
                                                      return;
                                                  }
                                                  const newValue = checked
                                                      ? [...currentSkills, item]
                                                      : currentSkills.filter((value) => value !== item);
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
