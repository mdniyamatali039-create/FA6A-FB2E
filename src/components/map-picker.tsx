"use client";

import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import type { LatLngExpression, LatLng } from 'leaflet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface LocationPickerProps {
  onLocationSelect: (address: string) => void;
}

function LocationMarker({ onPositionChange }: { onPositionChange: (pos: LatLng) => void }) {
  const [position, setPosition] = useState<LatLng | null>(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onPositionChange(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

interface MapPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLocationSelect: (address: string) => void;
}

export default function MapPicker({ open, onOpenChange, onLocationSelect }: MapPickerProps) {
  const [selectedPosition, setSelectedPosition] = useState<LatLng | null>(null);
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const defaultPosition: LatLngExpression = [28.6139, 77.2090]; // Delhi

  const handlePositionChange = async (pos: LatLng) => {
    setSelectedPosition(pos);
    setIsLoading(true);
    setAddress('Fetching address...');
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.lat}&lon=${pos.lng}`);
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('Address not found.');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Could not fetch address.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    if (address && address !== 'Fetching address...' && address !== 'Address not found.' && address !== 'Could not fetch address.') {
      onLocationSelect(address);
    }
    onOpenChange(false);
  };

  const MapComponent = useMemo(() => {
    return (
      <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={true} style={{ height: '400px', width: '100%', zIndex: 0 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onPositionChange={handlePositionChange} />
      </MapContainer>
    );
  }, [defaultPosition]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Pin Location on Map</DialogTitle>
          <DialogDescription>Click on the map to select the work address. The address will be auto-filled.</DialogDescription>
        </DialogHeader>
        <div className="relative rounded-lg overflow-hidden">
         {MapComponent}
        </div>
        <div className="mt-4 p-2 bg-muted rounded-md min-h-[40px] text-sm">
            {address || 'Click on the map to select a location.'}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={!selectedPosition || isLoading}>Confirm Location</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
