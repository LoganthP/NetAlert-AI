import { StatCard } from '@/components/dashboard/stat-card';
import { ShieldAlert, Network } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import RecentAlerts from '@/components/dashboard/recent-alerts';
import NetworkFlowsTable from '@/components/dashboard/network-flows-table';
import { FullFlowData, Alert } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';


import { RiskScoreGauge } from '@/components/dashboard/risk-score-gauge';
import { SystemHealth } from '@/components/dashboard/system-health';

import { IncidentTimeline } from '@/components/dashboard/incident-timeline';
import { ModelPerformance } from '@/components/dashboard/model-performance';
import { GeoDistributionWidget } from '@/components/dashboard/geo-distribution-widget';
import { LiveAttackMap } from '@/components/dashboard/live-attack-map';

interface OverviewPageProps {
    flows: FullFlowData[];
    alerts: Alert[];
}

export default function OverviewPage({ flows, alerts }: OverviewPageProps) {
    const totalAnomalies = flows.filter(f => f.is_anomaly).length;

    return (
        <div className="space-y-6">
            {/* System Status Header - Premium Visual */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/50">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        Network Overview
                        <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                    </h1>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mt-1">
                        Security Operations Center • Live Intelligence
                    </p>
                </div>
                <div className="flex items-center gap-6 text-[10px] uppercase tracking-tighter font-semibold text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full border border-border/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="text-cyan-500 dark:text-cyan-400">Operational</span>
                    </div>
                    <div className="w-px h-3 bg-border" />
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Last Sync:</span>
                        <span className="text-foreground">Just Now</span>
                    </div>
                </div>
            </div>

            {/* Top Row: KPIs and Gauges */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Flows"
                    value={flows.length.toLocaleString()}
                    icon={<Network className="h-4 w-4 text-muted-foreground" />}
                    description="Last 24 hours"
                />
                <RiskScoreGauge flows={flows} />
                <SystemHealth />
                <StatCard
                    title="Anomalies Detected"
                    value={totalAnomalies}
                    icon={<ShieldAlert className="h-4 w-4 text-muted-foreground" />}
                    description="Requires attention"
                />
            </div>
            {/* Schematic World Map - Full Width (Repositioned below main blocks) */}
            <div className="w-full">
                <LiveAttackMap flows={flows} />
            </div>

            {/* Main Content Area: 3 Column Compact Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">

                {/* Column 1: Incident Timeline (4/12) */}
                <div className="md:col-span-4 space-y-4">
                    <IncidentTimeline />
                </div>

                {/* Column 2: Recent Alerts (4/12) */}
                <div className="md:col-span-4 space-y-4">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-sm font-semibold text-card-foreground italic">Recent Alerts</CardTitle>
                                <CardDescription className="text-xs text-muted-foreground">
                                    Priority incidents
                                </CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" asChild>
                                <Link to="/dashboard/alerts">
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <RecentAlerts alerts={alerts.slice(0, 5)} />
                        </CardContent>
                    </Card>
                </div>

                {/* Column 3: Analytics Summary (4/12) */}
                <div className="md:col-span-4 space-y-4">
                    <ModelPerformance />
                    <GeoDistributionWidget flows={flows} />
                </div>
            </div>


            {/* Bottom: Recent Traffic Table */}
            <Card className="glass-card border-border/50 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="flex flex-row items-center justify-between py-4 relative z-10">
                    <div className="space-y-1">
                        <CardTitle className="text-sm font-semibold text-card-foreground flex items-center gap-2 uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                            Live Traffic Feed
                        </CardTitle>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-primary hover:bg-primary/10" asChild>
                        <Link to="/dashboard/flows">
                            Full Analysis <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className="p-0 pb-4 relative z-10">
                    <NetworkFlowsTable flows={flows.slice(0, 5)} />
                </CardContent>
            </Card>
        </div>
    );
}
