import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  description?: string;
}

// ... (imports)

export function StatCard({ title, value, icon, description }: StatCardProps) {
  const isAnomaly = title.toLowerCase().includes('anomaly');

  return (
    <Card className="glass-card overflow-hidden relative group hover:scale-[1.02] transition-all duration-300">
      {/* Decorative accent glow */}
      <div className={cn(
        "absolute -right-4 -top-4 h-24 w-24 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity",
        isAnomaly ? "bg-red-500" : "bg-cyan-500"
      )} />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{title}</CardTitle>
        <div className={cn(
          "p-2 rounded-lg bg-secondary/50 border border-border/50",
          isAnomaly ? "text-red-500 dark:text-red-400" : "text-cyan-600 dark:text-cyan-400"
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold tracking-tight text-foreground mb-1">{value}</div>
        {description && (
          <p className="text-[10px] font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-tight">
            <span className={cn("w-1 h-1 rounded-full", isAnomaly ? "bg-red-500 animate-pulse" : "bg-cyan-500")}></span>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}