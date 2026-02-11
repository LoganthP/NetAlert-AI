'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { FullFlowData } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

interface FlowDetailSheetProps {
  flow: FullFlowData | null;
  isOpen: boolean;
  onClose: () => void;
}

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between">
    <dt className="text-muted-foreground">{label}</dt>
    <dd className="text-right font-mono">{value}</dd>
  </div>
);

export function FlowDetailSheet({ flow, isOpen, onClose }: FlowDetailSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        {flow && (
          <>
            <SheetHeader className="mb-6">
              <SheetTitle>Flow Details: {flow.id}</SheetTitle>
              <SheetDescription>
                {flow.src_ip}:{flow.src_port} &rarr; {flow.dst_ip}:{flow.dst_port}
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4">
              <dl className="space-y-2">
                <DetailItem label="Status" value={flow.is_anomaly ? <Badge variant="destructive">Anomaly</Badge> : <Badge variant="secondary">Normal</Badge>} />
                <DetailItem label="Anomaly Score" value={flow.anomaly_score?.toFixed(4)} />
                <Separator />
                <DetailItem label="Protocol" value={flow.protocol} />
                <DetailItem label="Duration (s)" value={flow.duration.toFixed(2)} />
                <DetailItem label="Bytes" value={flow.bytes.toLocaleString()} />
                <DetailItem label="Packets" value={flow.packets.toLocaleString()} />
                <Separator />
                <DetailItem label="Bytes/Packet" value={flow.bytes_per_packet?.toFixed(2)} />
                <DetailItem label="Packets/Second" value={flow.packets_per_second?.toFixed(2)} />
                <DetailItem label="Port Category" value={flow.port_category} />
              </dl>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
