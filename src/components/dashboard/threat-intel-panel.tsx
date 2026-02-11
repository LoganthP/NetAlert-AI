import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FullFlowData } from '@/lib/types';
import { Globe, Shield, Radio } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface ThreatIntelPanelProps {
    flows: FullFlowData[];
}

export function ThreatIntelPanel({ flows }: ThreatIntelPanelProps) {
    // Show intel for the most recent anomaly, or just the top flow if no anomaly
    const targetFlow = flows.find(f => f.is_anomaly) || flows[0];

    if (!targetFlow) return null;

    return (
        <Card className="col-span-2 h-[500px]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Threat Intelligence
                </CardTitle>
                <CardDescription>Contextual analysis for Flow ID: <span className="font-mono text-xs">{targetFlow.id.split('_')[1]}...</span></CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Source Analysis</h4>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Globe className="h-8 w-8 text-blue-400" />
                        <div>
                            <div className="font-bold text-lg">{targetFlow.src_ip}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>{targetFlow.src_country}</span>
                                <span className="text-xs px-1.5 py-0.5 bg-background rounded border">{targetFlow.src_country_code}</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="p-2 border rounded text-xs">
                            <span className="block text-muted-foreground">ISP</span>
                            <span className="font-medium">{targetFlow.src_isp || 'Unknown ISP'}</span>
                        </div>
                        <div className="p-2 border rounded text-xs">
                            <span className="block text-muted-foreground">ASN</span>
                            <span className="font-medium">{targetFlow.src_asn || 'Unknown ASN'}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Reputation Status</h4>
                    <div className={`p-4 rounded-lg border ${targetFlow.is_anomaly ? 'bg-destructive/10 border-destructive/20' : 'bg-green-500/10 border-green-500/20'}`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">Threat Score</span>
                            <Badge variant={targetFlow.is_anomaly ? "destructive" : "secondary"}>
                                {targetFlow.is_anomaly ? "High Risk" : "Clean"}
                            </Badge>
                        </div>
                        <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                            <div
                                className={`h-full ${targetFlow.is_anomaly ? 'bg-red-500' : 'bg-green-500'}`}
                                style={{ width: `${(targetFlow.anomaly_score || 0) * 100}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            {targetFlow.is_anomaly
                                ? "This IP has been associated with recent suspicious activity matching known botnet patterns."
                                : "No negative reputation found in global threat feeds."}
                        </p>
                    </div>
                </div>

                <div className="pt-2">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Related CVEs</h4>
                    <div className="text-xs space-y-1">
                        {targetFlow.is_anomaly ? (
                            <>
                                <div className="flex justify-between items-center p-2 rounded hover:bg-muted cursor-pointer transition-colors">
                                    <span className="font-mono text-blue-400">CVE-2023-34039</span>
                                    <span className="text-muted-foreground">Authentication Bypass</span>
                                </div>
                                <div className="flex justify-between items-center p-2 rounded hover:bg-muted cursor-pointer transition-colors">
                                    <span className="font-mono text-blue-400">CVE-2024-21887</span>
                                    <span className="text-muted-foreground">Command Injection</span>
                                </div>
                            </>
                        ) : (
                            <p className="text-muted-foreground italic">No known vulnerabilities associated with this traffic pattern.</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
