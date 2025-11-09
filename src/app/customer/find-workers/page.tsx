"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/hooks/use-app';
import { mockWorkers, primarySkills } from '@/lib/data';
import type { WorkerProfile } from '@/lib/types';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function FindWorkersPage() {
  const { toast } = useToast();
  const { t } = useApp();
  const [workers, setWorkers] = useState<WorkerProfile[]>([...mockWorkers].sort((a,b) => b.rating! - a.rating!));
  const [skill, setSkill] = useState<string>('all');
  const [sort, setSort] = useState<string>('rating');

  const handleHire = (name: string) => {
    toast({
      title: "Worker Hired!",
      description: `You have hired ${name}.`
    });
  }

  const handleFilterSort = (value: string, type: 'skill' | 'sort') => {
    let newWorkers = [...mockWorkers];
    let currentSkill = skill;
    let currentSort = sort;

    if (type === 'skill') {
        currentSkill = value;
        setSkill(value);
    }
    if (type === 'sort') {
        currentSort = value;
        setSort(value);
    }

    if (currentSkill !== 'all') {
        newWorkers = newWorkers.filter(w => w.primarySkills.includes(currentSkill));
    }

    if (currentSort === 'rating') {
        newWorkers.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (currentSort === 'exp_asc') {
        const expToNum = (exp: string) => parseInt(exp.split('+')[0].split('-')[0].replace('<','')) || 0;
        newWorkers.sort((a,b) => expToNum(a.experience) - expToNum(b.experience));
    } else if (currentSort === 'exp_desc') {
        const expToNum = (exp: string) => parseInt(exp.split('+')[0].split('-')[0].replace('<','')) || 0;
        newWorkers.sort((a,b) => expToNum(b.experience) - expToNum(a.experience));
    }
    
    setWorkers(newWorkers);
  };

  return (
    <div className="bg-background rounded-lg p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-2">Direct Hire</h1>
        <p className="text-muted-foreground">Browse available workers and hire them directly.</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={skill} onValueChange={(value) => handleFilterSort(value, 'skill')}>
            <SelectTrigger className="w-full sm:w-[200px] bg-card">
                <SelectValue placeholder="All Skills" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                {primarySkills.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(value) => handleFilterSort(value, 'sort')}>
            <SelectTrigger className="w-full sm:w-[200px] bg-card">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="rating">Sort by Rating</SelectItem>
                <SelectItem value="exp_desc">Sort by Experience (High to Low)</SelectItem>
                <SelectItem value="exp_asc">Sort by Experience (Low to High)</SelectItem>
            </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-6">
        {workers.map(worker => (
            <Card key={worker.id} className="bg-card shadow-sm">
                <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                    <Image src={worker.avatarUrl} alt={worker.name} width={80} height={80} className="rounded-full object-cover" />
                    <div className="flex-grow text-center sm:text-left">
                        <h2 className="text-xl font-bold">{worker.name}</h2>
                        <p className="text-muted-foreground">{worker.primarySkills[0]} &bull; {worker.experience}</p>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-lg text-amber-500">
                        <Star className="w-6 h-6 fill-amber-500" />
                        <span>{worker.rating}</span>
                    </div>
                    <Button className="w-full sm:w-auto" onClick={() => handleHire(worker.name)}>Hire Now</Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
