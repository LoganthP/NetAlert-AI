import {
    PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FullFlowData } from '@/lib/types';
import { format } from 'date-fns';

interface TrafficChartsProps {
    flows: FullFlowData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function TrafficCharts({ flows }: TrafficChartsProps) {
    // Protocol Distribution Data
    const protocolCounts = flows.reduce((acc, flow) => {
        acc[flow.protocol] = (acc[flow.protocol] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const protocolData = Object.keys(protocolCounts).map((key) => ({
        name: key,
        value: protocolCounts[key]
    }));

    // Traffic Volume Over Time Data
    // Group by day for the area chart
    const volumeByDay = flows.reduce((acc, flow) => {
        const date = format(new Date(flow.timestamp), 'MMM dd');
        if (!acc[date]) {
            acc[date] = { date, bytes: 0, packets: 0 };
        }
        acc[date].bytes += flow.bytes;
        acc[date].packets += flow.packets;
        return acc;
    }, {} as Record<string, any>);

    const trafficData = Object.values(volumeByDay).reverse(); // Oldest to newest

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Traffic Volume History</CardTitle>
                    <CardDescription>Daily network traffic volume (Bytes)</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="colorBytes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                                    formatter={(value: number) => [(value / 1024 / 1024).toFixed(2) + ' MB', 'Volume']}
                                />
                                <Area type="monotone" dataKey="bytes" stroke="#8884d8" fillOpacity={1} fill="url(#colorBytes)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Protocol Distribution</CardTitle>
                    <CardDescription>Breakdown of network protocols</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={protocolData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {protocolData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
