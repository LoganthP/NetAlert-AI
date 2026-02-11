import { AdminControls } from '@/components/dashboard/admin-controls';
import { LoginHistoryTable } from '@/components/dashboard/login-history-table';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-white">System Configuration</h2>
            <div className="grid gap-6 max-w-4xl">
                <AdminControls />
                <LoginHistoryTable />
            </div>
        </div>
    );
}
