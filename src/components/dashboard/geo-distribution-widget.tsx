import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FullFlowData } from "@/lib/types";
import { Globe } from "lucide-react";

interface GeoDistributionWidgetProps {
    flows: FullFlowData[];
}

export function GeoDistributionWidget({ flows }: GeoDistributionWidgetProps) {
    // Aggregate flows by country
    const countryCounts: Record<string, number> = {};
    let totalFlows = 0;

    flows.forEach((flow) => {
        const country = flow.src_country || "Unknown";
        countryCounts[country] = (countryCounts[country] || 0) + 1;
        totalFlows++;
    });

    // Convert to array and sort
    const sortedCountries = Object.entries(countryCounts)
        .map(([country, count]) => ({
            country,
            count,
            percentage: totalFlows > 0 ? (count / totalFlows) * 100 : 0,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // Top 5

    // ... (imports)

    return (
        <Card className="flex flex-col border-border/50 bg-card/50 backdrop-blur-sm text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="space-y-1">
                    <CardTitle className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                        <Globe className="h-4 w-4 text-cyan-500" />
                        Traffic Origin
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                        Top source countries by volume
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
                {sortedCountries.map((item, index) => (
                    <div key={item.country} className="space-y-1.5 group">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-foreground group-hover:text-cyan-500 transition-colors cursor-default">
                                {item.country}
                            </span>
                            <span className="text-muted-foreground font-mono">
                                {item.count.toLocaleString()}
                            </span>
                        </div>
                        <div className="relative h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                                className="absolute h-full left-0 rounded-full bg-linear-to-r transition-all duration-500"
                                style={{
                                    width: `${item.percentage}%`,
                                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                                    '--tw-gradient-from': index === 0 ? '#06b6d4' : index === 1 ? '#0ea5e9' : '#64748b',
                                    '--tw-gradient-to': index === 0 ? '#0891b2' : index === 1 ? '#0284c7' : '#475569',
                                    '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)'
                                } as any}
                            />
                        </div>
                    </div>
                ))}
                {sortedCountries.length === 0 && (
                    <div className="text-xs text-muted-foreground py-6 text-center italic">
                        No telemetry data available for this range.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
