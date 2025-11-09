
"use client";

import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { WorkerProfile } from '@/lib/types';

const MapPicker = dynamic(() => import('@/components/map-picker'), { ssr: false });

interface HireWorkerDialogProps {
  worker: WorkerProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (worker: WorkerProfile, address: string, dates: { from: Date, to?: Date }) => void;
}

export default function HireWorkerDialog({ worker, open, onOpenChange, onConfirm }: HireWorkerDialogProps) {
  const [address, setAddress] = useState('123 Business Rd, New Delhi');
  const [date, setDate] = useState<DateRange | undefined>({ from: new Date() });
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleConfirm = () => {
    if (address && date?.from) {
      onConfirm(worker, address, { from: date.from, to: date.to });
    }
  };
  
  const handleLocationSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setIsMapOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Hire {worker.name}</DialogTitle>
            <DialogDescription>Confirm the job details to hire this worker.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="address">Work Address</Label>
              <div className="flex gap-2">
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                 <Button variant="outline" size="icon" type="button" onClick={() => setIsMapOpen(true)}>
                    <MapPin className="h-5 w-5" />
                    <span className="sr-only">Pin on map</span>
                  </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Job Date(s)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={1}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm Hire</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {isMapOpen && (
        <MapPicker
            open={isMapOpen}
            onOpenChange={setIsMapOpen}
            onLocationSelect={handleLocationSelect}
        />
      )}
    </>
  );
}
