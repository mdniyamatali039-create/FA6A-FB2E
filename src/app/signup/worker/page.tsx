
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
import { primarySkills, indianStates } from '@/lib/data';
import type { Language } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Navigation, Loader2 } from 'lucide-react';
import { useState } from 'react';
import ReadAloudButton from '@/components/read-aloud-button';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  mobile: z.string().length(10, { message: "Mobile number must be 10 digits." }),
  experience: z.string().min(1, { message: "Please select your experience level." }),
  currentCityExperience: z.string().min(1, { message: "Please select your experience level in the current city." }),
  
  // New address fields
  houseNumber: z.string().min(1, "Please enter a house/flat number."),
  area: z.string().min(3, "Please enter an area/street."),
  landmark: z.string().optional(),
  pincode: z.string().length(6, "Pincode must be 6 digits."),
  city: z.string().min(2, "Please enter a city."),
  state: z.string().min(2, "Please select a state."),

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
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      experience: "",
      currentCityExperience: "",
      houseNumber: "",
      area: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
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
          if (data && data.address) {
            const { house_number, road, suburb, city, state, postcode } = data.address;
            form.setValue('houseNumber', house_number || '');
            form.setValue('area', `${road || ''}${suburb ? ', ' + suburb : ''}`);
            form.setValue('city', city || '');
            form.setValue('state', state || '');
            form.setValue('pincode', postcode || '');
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
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-2xl my-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <div className="flex items-center justify-center gap-2">
            <CardTitle className="text-2xl font-headline">{t('signup_title')} - {t('role_worker')}</CardTitle>
            <ReadAloudButton text={`${t('signup_title')} - ${t('role_worker')}`} />
          </div>
          <div className="flex items-center justify-center gap-2">
            <CardDescription>Fill out your profile to start finding jobs.</CardDescription>
            <ReadAloudButton text="Fill out your profile to start finding jobs." />
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                        <FormLabel>{t('signup_form_name')}</FormLabel>
                        <ReadAloudButton text={t('signup_form_name')} />
                    </div>
                    <FormControl><Input placeholder="Ramesh Kumar" {...field} /></FormControl><FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="mobile" render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                        <FormLabel>{t('signup_form_mobile')}</FormLabel>
                        <ReadAloudButton text={t('signup_form_mobile')} />
                    </div>
                    <FormControl><Input type="tel" placeholder="9876543210" {...field} /></FormControl><FormMessage />
                  </FormItem>
                )}/>
              </div>

              <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <FormLabel>Location</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={handleGetCurrentLocation} disabled={isFetchingLocation}>
                        {isFetchingLocation ? <Loader2 className="animate-spin mr-2" /> : <Navigation className="mr-2" />}
                        Use my location
                    </Button>
                </div>
              </div>
              
              <FormField control={form.control} name="houseNumber" render={({ field }) => (
                  <FormItem><FormLabel>Flat, House no., Building, Company, Apartment</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="area" render={({ field }) => (
                  <FormItem><FormLabel>Area, Street, Sector, Village</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
               <FormField control={form.control} name="landmark" render={({ field }) => (
                  <FormItem><FormLabel>Landmark (optional)</FormLabel><FormControl><Input placeholder="E.g. near apollo hospital" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>

              <div className="grid md:grid-cols-2 gap-6">
                 <FormField control={form.control} name="pincode" render={({ field }) => (
                    <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>Town/City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </div>

              <FormField control={form.control} name="state" render={({ field }) => (
                  <FormItem><FormLabel>State</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger></FormControl><SelectContent><SelectContent>
                    {indianStates.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                  </SelectContent></SelectContent></Select><FormMessage /></FormItem>
              )}/>

              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <FormField control={form.control} name="experience" render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                        <FormLabel>{t('signup_form_experience')}</FormLabel>
                        <ReadAloudButton text={t('signup_form_experience')} />
                    </div>
                    <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger></FormControl><SelectContent><SelectItem value="<1 year">&lt; 1 year</SelectItem><SelectItem value="1-3 years">1-3 years</SelectItem><SelectItem value="3-5 years">3-5 years</SelectItem><SelectItem value="5+ years">5+ years</SelectItem></SelectContent></Select><FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="currentCityExperience" render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center gap-2">
                            <FormLabel>Current City Experience</FormLabel>
                            <ReadAloudButton text="Current City Experience" />
                        </div>
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
              </div>

              <FormField control={form.control} name="primarySkills" render={({ field }) => (
                <FormItem>
                    <div className="flex items-center gap-2">
                        <FormLabel>{t('signup_form_primary_skills')}</FormLabel>
                        <ReadAloudButton text={t('signup_form_primary_skills')} />
                    </div>
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
                <FormItem>
                    <div className="flex items-center gap-2">
                        <FormLabel>{t('signup_form_secondary_skills')}</FormLabel>
                        <ReadAloudButton text={t('signup_form_secondary_skills')} />
                    </div>
                    <FormControl><Textarea placeholder="e.g., Tiling, Furniture polishing" {...field} /></FormControl><FormMessage />
                </FormItem>
              )}/>
              
              <div className="grid md:grid-cols-2 gap-6">
                 <FormField control={form.control} name="desiredDailyWage" render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center gap-2">
                            <FormLabel>{t('signup_form_wage')}</FormLabel>
                            <ReadAloudButton text={t('signup_form_wage')} />
                        </div>
                        <FormControl><Input type="number" {...field} /></FormControl><FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="language" render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center gap-2">
                            <FormLabel>{t('signup_form_language')}</FormLabel>
                            <ReadAloudButton text={t('signup_form_language')} />
                        </div>
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
