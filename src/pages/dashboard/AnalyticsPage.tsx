import { TrafficCharts } from '@/components/dashboard/traffic-charts';
import { TopTalkers } from '@/components/dashboard/top-talkers';
import { BehavioralInsights } from '@/components/dashboard/behavioral-insights';
import { ModelPerformance } from '@/components/dashboard/model-performance';
import { FullFlowData } from '@/lib/types';

interface AnalyticsPageProps {
    flows: FullFlowData[];
}

export default function AnalyticsPage({ flows }: AnalyticsPageProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Network Analytics</h2>
            <div className="grid grid-cols-1 gap-6">
                <TrafficCharts flows={flows} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TopTalkers flows={flows} />
                    <BehavioralInsights />
                    <ModelPerformance />
                </div>
            </div>
        </div>
    );
}
