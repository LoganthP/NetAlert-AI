import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain, Zap, AlertTriangle } from 'lucide-react';

export function BehavioralInsights() {
    const insights = [
        {
            id: 1,
            type: "pattern",
            message: "Unusual spike in outbound UDP traffic detected on port 53 (DNS).",
            confidence: 0.92,
            impact: "high"
        },
        {
            id: 2,
            type: "anomaly",
            message: "Port scanning behavior detected from IP 192.168.1.105 targeting internal subnet.",
            confidence: 0.88,
            impact: "medium"
        },
        {
            id: 3,
            type: "forecast",
            message: "Traffic patterns suggest a potential DDoS start within the next 15 minutes based on historical baselines.",
            confidence: 0.75,
            impact: "critical"
        }
    ];

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Behavioral Insights
                </CardTitle>
                <CardDescription>Real-time machine learning analysis of traffic patterns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {insights.map((insight) => (
                    <div key={insight.id} className="flex gap-4 p-4 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors">
                        <div className={`mt-1 p-2 rounded-full ${insight.impact === 'critical' ? 'bg-red-500/10 text-red-500' :
                                insight.impact === 'high' ? 'bg-orange-500/10 text-orange-500' :
                                    'bg-yellow-500/10 text-yellow-500'
                            }`}>
                            {insight.impact === 'critical' ? <Zap className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                        </div>
                        <div className="space-y-1">
                            <p className="font-medium text-sm leading-none">{insight.message}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>Confidence: {(insight.confidence * 100).toFixed(0)}%</span>
                                <span>•</span>
                                <span className="capitalize">{insight.type} match</span>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
