'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NetworkFlowsTable from '@/components/dashboard/network-flows-table';
import { FullFlowData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { AddFlowDialog } from '@/components/dashboard/add-flow-dialog';
import { AnalyseFlowsDialog } from '@/components/dashboard/analyse-flows-dialog';
import { Plus, Sparkles } from 'lucide-react';

interface DashboardClientProps {
    initialFlows: FullFlowData[];
}

export default function DashboardClient({ initialFlows }: DashboardClientProps) {
  const [flows, setFlows] = useState<FullFlowData[]>(initialFlows);
  const [isAddFlowOpen, setIsAddFlowOpen] = useState(false);
  const [isAnalyseFlowOpen, setIsAnalyseFlowOpen] = useState(false);

  const recentFlows = flows.slice(0, 10);

  const handleAddFlow = (newFlow: FullFlowData) => {
    setFlows(prevFlows => [newFlow, ...prevFlows]);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Network Flows</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAnalyseFlowOpen(true)}>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyse with AI
            </Button>
            <Button size="sm" onClick={() => setIsAddFlowOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Network Flow
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <NetworkFlowsTable flows={recentFlows} />
        </CardContent>
      </Card>
      
      <AddFlowDialog
        isOpen={isAddFlowOpen}
        onClose={() => setIsAddFlowOpen(false)}
        onFlowAdded={handleAddFlow}
      />
      <AnalyseFlowsDialog
        isOpen={isAnalyseFlowOpen}
        onClose={() => setIsAnalyseFlowOpen(false)}
        flows={recentFlows}
      />
    </>
  );
}