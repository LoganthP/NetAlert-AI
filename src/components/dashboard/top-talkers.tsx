import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FullFlowData } from '@/lib/types';
import { Activity } from 'lucide-react';

interface TopTalkersProps {
    flows: FullFlowData[];
}

export function TopTalkers({ flows }: TopTalkersProps) {
    // Group by Source IP and sum packets
    const talkers = flows.reduce((acc, flow) => {
        acc[flow.src_ip] = (acc[flow.src_ip] || 0) + flow.packets;
        return acc;
    }, {} as Record<string, number>);

    const data = Object.keys(talkers)
        .map(ip => ({ ip, packets: talkers[ip] }))
        .sort((a, b) => b.packets - a.packets)
        .slice(0, 5); // Top 5

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Top Talkers</CardTitle>
                        <CardDescription>Most active source IPs by packet volume</CardDescription>
                    </div>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className="stroke-muted/30" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="ip" type="category" width={100} tick={{ fontSize: 12 }} />
                            <RechartsTooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                            />
                            <Bar dataKey="packets" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fillOpacity={0.8} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
