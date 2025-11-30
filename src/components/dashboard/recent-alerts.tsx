import { Alert as AlertType } from '@/lib/types';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const severityConfig = {
  Critical: {
    icon: ShieldAlert,
    className: 'text-destructive',
    badgeVariant: 'destructive' as const,
  },
  High: {
    icon: ShieldAlert,
    className: 'text-orange-400',
    badgeVariant: 'destructive' as const,
  },
  Medium: {
    icon: ShieldAlert,
    className: 'text-yellow-400',
    badgeVariant: 'secondary' as const,
  },
  Low: {
    icon: ShieldCheck,
    className: 'text-blue-400',
    badgeVariant: 'outline' as const,
  },
};

export default function RecentAlerts({ alerts }: { alerts: AlertType[] }) {
  if (alerts.length === 0) {
    return (
        <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/50 p-8 text-center">
            <ShieldCheck className="h-10 w-10 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">All Clear!</h3>
            <p className="mt-1 text-sm text-muted-foreground">No recent alerts to display.</p>
        </div>
    )
  }

  return (
    <div className="space-y-4">
      {alerts.map(alert => {
        const config = severityConfig[alert.severity];
        const Icon = config.icon;
        return (
          <div key={alert.id} className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50">
            <div className="mt-1">
              <Icon className={`h-5 w-5 ${config.className}`} />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">
                  {alert.message}
                </p>
                <Badge variant={config.badgeVariant} className="hidden sm:inline-flex">{alert.severity}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {alert.src_ip} &rarr; {alert.dst_ip}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  );
}