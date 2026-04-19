
"use client";

import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, PlusCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { WorkerProfile } from '@/lib/types';
import { mockCustomerAddresses } from '@/lib/data';

const MapPicker = dynamic(() => import('@/components/map-picker'), { ssr: false });

interface HireWorkerDialogProps {
  worker: WorkerProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (worker: WorkerProfile, address: string, dates: { from: Date, to?: Date }) => void;
}

export default function HireWorkerDialog({ worker, open, onOpenChange, onConfirm }: HireWorkerDialogProps) {
  const [addresses, setAddresses] = useState(mockCustomerAddresses);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.address || '');
  const [date, setDate] = useState<DateRange | undefined>({ from: new Date() });
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleConfirm = () => {
    if (selectedAddress && date?.from) {
      onConfirm(worker, selectedAddress, { from: date.from, to: date.to });
    }
  };
  
  const handleLocationSelect = (newAddress: string) => {
    const newAddr = { id: `addr${addresses.length + 1}`, address: newAddress, addressDetails: { houseNumber: '1', area: newAddress, city: 'City', pincode: '000000', state: 'State' } };
    setAddresses(prev => [...prev, newAddr]);
    setSelectedAddress(newAddress);
    setIsMapOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hire {worker.name}</DialogTitle>
            <DialogDescription>Confirm the job details to hire this worker.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label>Work Address</Label>
                <Button variant="outline" size="sm" onClick={() => setIsMapOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New
                </Button>
              </div>
              <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {addresses.map(addr => (
                    <Label key={addr.id} htmlFor={addr.id} className="flex items-start gap-3 rounded-md border p-3 hover:bg-accent has-[:checked]:border-primary">
                        <RadioGroupItem value={addr.address} id={addr.id} />
                        <span>{addr.address}</span>
                    </Label>
                ))}
                </div>
              </RadioGroup>
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
            <Button onClick={handleConfirm} disabled={!selectedAddress || !date?.from}>Confirm Hire</Button>
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
