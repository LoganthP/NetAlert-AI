import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2 text-xl font-bold text-primary', className)}>
      <ShieldCheck className="h-6 w-6" />
      <span className="text-foreground">NetAlert AI</span>
    </div>
  );
};
