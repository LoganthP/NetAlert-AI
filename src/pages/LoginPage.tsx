import { AuthTabs } from '@/components/auth/auth-tabs';
import { Logo } from '@/components/logo';

export default function LoginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(14,165,233,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_-20%,rgba(14,165,233,0.15),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(126,34,206,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(126,34,206,0.15),transparent_50%)]"></div>
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid-pattern.svg')] invert dark:invert-0"></div>
            </div>

            <div className="w-full max-w-md relative z-10 flex flex-col items-center gap-8">
                <div className="flex flex-col items-center text-center animation-fade-in">
                    <Logo className="text-3xl mb-2 scale-110" />
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Advanced Network Anomaly Detection & <br /> Threat Intelligence Platform
                    </p>
                </div>

                <AuthTabs />

                <div className="text-xs text-muted-foreground text-center opacity-60">
                    &copy; 2024 NetAlert AI. Secure. Intelligent. Real-time.
                </div>
            </div>
        </main>
    );
}
