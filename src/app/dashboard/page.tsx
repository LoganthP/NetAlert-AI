import { getMockData } from '@/lib/mock-data';
import { StatCard } from '@/components/dashboard/stat-card';
import { BarChart, ShieldAlert, Users, Network, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AnomalyTrendChart from '@/components/dashboard/anomaly-trend-chart';
import RecentAlerts from '@/components/dashboard/recent-alerts';
import DashboardClient from '@/components/dashboard/dashboard-client';

export default async function DashboardPage() {
  const { flows, alerts } = await getMockData();

  const totalAnomalies = flows.filter(f => f.is_anomaly).length;
  const anomalyRate = flows.length > 0 ? (totalAnomalies / flows.length) * 100 : 0;
  const averageScore = flows.reduce((acc, f) => acc + (f.anomaly_score ?? 0), 0) / (flows.length || 1);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Flows" value={flows.length.toLocaleString()} icon={<Network className="h-4 w-4 text-muted-foreground" />} description="Last 24 hours" />
        <StatCard title="Anomalies Detected" value={totalAnomalies} icon={<ShieldAlert className="h-4 w-4 text-muted-foreground" />} description={`${anomalyRate.toFixed(1)}% of total traffic`} />
        <StatCard title="Active Alerts" value={alerts.length} icon={<Users className="h-4 w-4 text-muted-foreground" />} description="Across all severities" />
        <StatCard title="Avg. Anomaly Score" value={averageScore.toFixed(3)} icon={<Activity className="h-4 w-4 text-muted-foreground" />} description="Lower is better" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Anomaly Trends</CardTitle>
            <CardDescription>Anomaly scores over the last 50 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <AnomalyTrendChart data={flows} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Highest priority alerts from the last 24 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentAlerts alerts={alerts.slice(0, 5)} />
          </CardContent>
        </Card>
      </div>

      <DashboardClient initialFlows={flows} />
      
    </div>
  );
}