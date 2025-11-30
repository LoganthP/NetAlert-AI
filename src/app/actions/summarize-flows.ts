'use server';

import { summarizeNetworkFlows } from '@/ai/flows/summarize-network-flows';
import type { FullFlowData } from '@/lib/types';

export async function getFlowsSummary(flows: FullFlowData[]) {
  const simplifiedFlows = flows.map(flow => ({
    protocol: flow.protocol,
    src_ip: flow.src_ip,
    dst_ip: flow.dst_ip,
    is_anomaly: flow.is_anomaly,
    anomaly_score: flow.anomaly_score,
  }));
  
  const input = {
    networkFlowsData: JSON.stringify(simplifiedFlows, null, 2),
  };

  try {
    const result = await summarizeNetworkFlows(input);
    return result;
  } catch (error) {
    console.error('Error getting network flow summary:', error);
    return { summary: 'An error occurred while generating the summary.' };
  }
}
