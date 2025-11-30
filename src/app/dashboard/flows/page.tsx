import { getMockData } from '@/lib/mock-data';
import NetworkFlowsTable from '@/components/dashboard/network-flows-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function FlowsPage() {
  const { flows } = await getMockData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Network Flows</CardTitle>
        </CardHeader>
        <CardContent>
          <NetworkFlowsTable flows={flows} />
        </CardContent>
      </Card>
    </div>
  );
}
