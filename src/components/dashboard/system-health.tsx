import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, CircuitBoard, Activity } from "lucide-react";

export function SystemHealth() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <Cpu className="h-3 w-3 text-muted-foreground" />
                            <span>CPU Usage</span>
                        </div>
                        <span className="font-mono font-bold text-green-500">12%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[12%]" />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <CircuitBoard className="h-3 w-3 text-muted-foreground" />
                            <span>Memory</span>
                        </div>
                        <span className="font-mono font-bold text-yellow-500">48%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 w-[48%]" />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <Activity className="h-3 w-3 text-muted-foreground" />
                            <span>Latency</span>
                        </div>
                        <span className="font-mono font-bold">24ms</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
