import { getMockData } from '@/lib/mock-data';
import RecentAlerts from '@/components/dashboard/recent-alerts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AlertsPage() {
  const { alerts } = await getMockData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentAlerts alerts={alerts} />
        </CardContent>
      </Card>
    </div>
  );
}
