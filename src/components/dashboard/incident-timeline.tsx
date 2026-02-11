import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CircleDot, ArrowDown } from 'lucide-react';

import { cn } from "@/lib/utils";

interface IncidentTimelineProps {
    className?: string;
}

export function IncidentTimeline({ className }: IncidentTimelineProps) {
    const events = [
        { time: "10:45:22", event: "Suspicious flow initiated", detail: "Source 45.2.1.2 -> Dest 10.0.0.5", type: "info" },
        { time: "10:45:25", event: "Port scan detected", detail: "Sequence of 50 ports accessed < 1s", type: "warning" },
        { time: "10:45:28", event: "Payload anomaly", detail: "Entropy score 0.89 (High random)", type: "warning" },
        { time: "10:45:30", event: "Anomaly threshold breached", detail: "Score 0.92 > Threshold 0.85", type: "alert" },
        { time: "10:45:32", event: "Automated Block Triggered", detail: "Firewall rule created for 45.2.1.2", type: "success" },
    ];

    return (
        <Card className={cn("h-full", className)}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    Incident Timeline
                </CardTitle>
                <CardDescription>Event reconstruction for latest high-severity alert.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative border-l border-muted ml-3 space-y-8 py-2">
                    {events.map((item, index) => (
                        <div key={index} className="relative pl-8">
                            <span className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 bg-background flex items-center justify-center
                        ${item.type === 'alert' ? 'border-red-500' :
                                    item.type === 'success' ? 'border-green-500' :
                                        item.type === 'warning' ? 'border-yellow-500' : 'border-blue-500'}
                     `}>
                                <div className={`h-1.5 w-1.5 rounded-full ${item.type === 'alert' ? 'bg-red-500' :
                                    item.type === 'success' ? 'bg-green-500' :
                                        item.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                    }`} />
                            </span>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-muted-foreground font-mono">{item.time}</span>
                                <span className="text-sm font-medium">{item.event}</span>
                                <span className="text-xs text-muted-foreground">{item.detail}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
