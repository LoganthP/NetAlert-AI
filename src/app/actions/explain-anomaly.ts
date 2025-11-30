'use server';

import { explainAnomaly, ExplainAnomalyInput } from '@/ai/flows/explain-anomalies';
import type { FullFlowData } from '@/lib/types';

export async function getAnomalyExplanation(flow: FullFlowData) {
  if (!flow.is_anomaly) {
    return { explanation: 'This flow is not considered an anomaly.' };
  }
  
  const input: ExplainAnomalyInput = {
    flow_id: flow.id,
    src_ip: flow.src_ip,
    dst_ip: flow.dst_ip,
    src_port: flow.src_port,
    dst_port: flow.dst_port,
    protocol: flow.protocol,
    duration: flow.duration,
    bytes: flow.bytes,
    packets: flow.packets,
    timestamp: flow.timestamp,
    bytes_per_packet: flow.bytes_per_packet ?? 0,
    packets_per_second: flow.packets_per_second ?? 0,
    port_category: flow.port_category ?? 'unknown',
    protocol_tcp: flow.protocol_tcp ?? 0,
    protocol_udp: flow.protocol_udp ?? 0,
    protocol_other: flow.protocol_other ?? 0,
    anomaly_score: flow.anomaly_score ?? 0,
    is_anomaly: flow.is_anomaly ?? false,
  };

  try {
    const result = await explainAnomaly(input);
    return result;
  } catch (error) {
    console.error('Error getting anomaly explanation:', error);
    return { explanation: 'An error occurred while generating the explanation.' };
  }
}
