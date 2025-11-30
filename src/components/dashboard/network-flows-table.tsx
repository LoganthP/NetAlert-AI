'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FullFlowData } from '@/lib/types';
import { FlowDetailSheet } from '@/components/dashboard/flow-detail-sheet';
import { format } from 'date-fns';

interface NetworkFlowsTableProps {
  flows: FullFlowData[];
}

export default function NetworkFlowsTable({ flows }: NetworkFlowsTableProps) {
  const [selectedFlow, setSelectedFlow] = useState<FullFlowData | null>(null);

  const handleRowClick = (flow: FullFlowData) => {
    setSelectedFlow(flow);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source IP</TableHead>
              <TableHead>Destination IP</TableHead>
              <TableHead>Protocol</TableHead>
              <TableHead className="text-right">Anomaly Score</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flows.map(flow => (
              <TableRow key={flow.id} onClick={() => handleRowClick(flow)} className="cursor-pointer">
                <TableCell className="font-medium">{flow.src_ip}</TableCell>
                <TableCell>{flow.dst_ip}</TableCell>
                <TableCell>{flow.protocol}</TableCell>
                <TableCell className="text-right">
                  {flow.is_anomaly ? (
                    <Badge variant="destructive">{flow.anomaly_score?.toFixed(3)}</Badge>
                  ) : (
                    <Badge variant="secondary">{flow.anomaly_score?.toFixed(3)}</Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(flow.timestamp), 'PPpp')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <FlowDetailSheet
        flow={selectedFlow}
        isOpen={!!selectedFlow}
        onClose={() => setSelectedFlow(null)}
      />
    </>
  );
}
