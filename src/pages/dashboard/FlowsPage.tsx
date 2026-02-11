import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import NetworkFlowsTable from '@/components/dashboard/network-flows-table';
import { FullFlowData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { AddFlowDialog } from '@/components/dashboard/add-flow-dialog';
import { Plus } from 'lucide-react';

interface FlowsPageProps {
    flows: FullFlowData[];
    onFlowAdded: (newFlow: FullFlowData) => void;
}

export default function FlowsPage({ flows, onFlowAdded }: FlowsPageProps) {
    const [isAddFlowOpen, setIsAddFlowOpen] = useState(false);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Network Flows</CardTitle>
                        <CardDescription>Complete history of network traffic logs.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => setIsAddFlowOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Flow
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <NetworkFlowsTable flows={flows} />
                </CardContent>
            </Card>

            <AddFlowDialog
                isOpen={isAddFlowOpen}
                onClose={() => setIsAddFlowOpen(false)}
                onFlowAdded={onFlowAdded}
            />
        </div>
    );
}
