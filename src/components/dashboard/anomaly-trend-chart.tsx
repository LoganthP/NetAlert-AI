'use client';

import { Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { FullFlowData } from '@/lib/types';

interface AnomalyTrendChartProps {
  data: FullFlowData[];
}

const chartConfig = {
  score: {
    label: 'Anomaly Score',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;


export default function AnomalyTrendChart({ data }: AnomalyTrendChartProps) {
  const chartData = data
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .map(flow => ({
      date: flow.timestamp,
      score: flow.anomaly_score,
    }));

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart 
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => format(parseISO(value), 'MMM dd')}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--card))' }}
            content={<ChartTooltipContent 
              labelFormatter={(label) => format(parseISO(label), 'PPP')}
              indicator="dot"
             />}
          />
          <defs>
            <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-score)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-score)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area 
            dataKey="score" 
            type="natural"
            fill="url(#fillScore)"
            stroke="var(--color-score)"
            stackId="a"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}