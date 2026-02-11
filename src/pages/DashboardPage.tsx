import { Routes, Route } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import OverviewPage from './dashboard/OverviewPage';
import FlowsPage from './dashboard/FlowsPage';
import AlertsPage from './dashboard/AlertsPage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import AnalyticsPage from './dashboard/AnalyticsPage';
import ThreatIntelPage from './dashboard/ThreatIntelPage';
import ReportsPage from './dashboard/ReportsPage';
import ProfilePage from './dashboard/ProfilePage';
import SettingsPage from './dashboard/SettingsPage';

export default function DashboardPage() {
    const { flows, alerts, loading, error, addFlow } = useDashboardData();

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <Routes>
            <Route index element={<OverviewPage flows={flows} alerts={alerts} />} />
            <Route path="flows" element={<FlowsPage flows={flows} onFlowAdded={addFlow} />} />
            <Route path="alerts" element={<AlertsPage alerts={alerts} />} />

            <Route path="analytics" element={<AnalyticsPage flows={flows} />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
        </Routes>
    );
}
