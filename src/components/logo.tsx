import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HardHat } from 'lucide-react';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-lg font-bold font-headline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1',
        className
      )}
    >
      <div className="p-1.5 bg-primary rounded-md">
        <HardHat className="h-5 w-5 text-primary-foreground" />
      </div>
      <span>LabourChok</span>
    </Link>
  );
}
