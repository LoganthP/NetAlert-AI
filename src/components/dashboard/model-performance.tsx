import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";

interface ModelPerformanceProps {
    className?: string;
}

export function ModelPerformance({ className }: ModelPerformanceProps) {
    return (
        <Card className={cn("h-full", className)}>
            <CardHeader>
                <CardTitle className="text-sm font-medium">Model Performance</CardTitle>
                <CardDescription className="text-xs">Version 2.5.1 (Active)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span>Precision</span>
                        <span className="font-bold">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-1.5" />
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span>Recall</span>
                        <span className="font-bold">88.7%</span>
                    </div>
                    <Progress value={88.7} className="h-1.5" />
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span>F1 Score</span>
                        <span className="font-bold">91.3%</span>
                    </div>
                    <Progress value={91.3} className="h-1.5" />
                </div>
                <div className="pt-2 border-t mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Training Set</span>
                        <span>1.2M Flows</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>False Positive Rate</span>
                        <span className="text-green-500 font-medium">0.8%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
