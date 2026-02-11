import { LiveAttackMap } from '@/components/dashboard/live-attack-map';
import { ThreatIntelPanel } from '@/components/dashboard/threat-intel-panel';
import { FullFlowData } from '@/lib/types';

interface ThreatIntelPageProps {
    flows: FullFlowData[];
}

export default function ThreatIntelPage({ flows }: ThreatIntelPageProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Threat Intelligence</h2>
            <div className="grid grid-cols-1 gap-6">
                {/* Full width map for immersion */}
                <div className="h-[600px] w-full">
                    <LiveAttackMap flows={flows} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ThreatIntelPanel flows={flows} />
                    {/* Placeholder for future blacklist feed */}
                    <div className="border rounded-lg p-6 bg-card flex items-center justify-center text-muted-foreground h-[400px]">
                        Global Blacklist Feed & CVR Lookup (Coming Soon)
                    </div>
                </div>
            </div>
        </div>
    );
}
