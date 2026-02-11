import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge } from "lucide-react";

interface RiskScoreGaugeProps {
    flows: any[];
}

export function RiskScoreGauge({ flows }: RiskScoreGaugeProps) {
    // Calculate a weighted risk score
    // Simple logic: Average anomaly score * (1 + ratio of anomalies)
    const anomalyCount = flows.filter(f => f.is_anomaly).length;
    const avgScore = flows.reduce((acc, f) => acc + (f.anomaly_score || 0), 0) / (flows.length || 1);

    // Normalize to 0-100
    let riskScore = (avgScore * 100) + (anomalyCount * 2);
    riskScore = Math.min(100, Math.max(0, riskScore));

    let riskLevel = "Low";
    let colorClass = "text-green-500";

    if (riskScore > 70) {
        riskLevel = "Critical";
        colorClass = "text-red-500";
    } else if (riskScore > 40) {
        riskLevel = "Moderate";
        colorClass = "text-yellow-500";
    }

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Threat Level</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="relative flex items-center justify-center">
                        {/* Simple massive number for impact */}
                        <span className={`text-4xl font-bold ${colorClass}`}>
                            {Math.round(riskScore)}
                        </span>
                    </div>
                    <div className={`text-xs font-semibold uppercase tracking-wider ${colorClass} rounded-full bg-secondary px-2 py-0.5`}>
                        {riskLevel} Risk
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        Based on recent anomalies
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
