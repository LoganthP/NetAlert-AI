import { add, sub } from 'date-fns';
import { FullFlowData, Alert } from './types';

const protocols: ('TCP' | 'UDP' | 'ICMP' | 'OTHER')[] = ['TCP', 'UDP', 'ICMP', 'OTHER'];
const severities: ('Low' | 'Medium' | 'High' | 'Critical')[] = ['Low', 'Medium', 'High', 'Critical'];

const randomIp = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
const randomPort = () => Math.floor(Math.random() * 65535) + 1;
const randomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomBool = (p = 0.5) => Math.random() < p;
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const now = new Date();

export const mockFlows: FullFlowData[] = Array.from({ length: 50 }, (_, i) => {
  const isAnomaly = randomBool(0.15);
  const bytes = randomInt(100, 1000000);
  const packets = randomInt(1, 1000);
  const duration = Math.random() * 60;
  const protocol = randomElement(protocols);

  return {
    id: `flow_${Date.now()}_${i}`,
    src_ip: randomIp(),
    dst_ip: randomIp(),
    src_port: randomPort(),
    dst_port: randomPort(),
    protocol,
    duration: parseFloat(duration.toFixed(4)),
    bytes,
    packets,
    timestamp: sub(now, { days: i }).toISOString(),
    bytes_per_packet: parseFloat((bytes / packets).toFixed(2)),
    packets_per_second: parseFloat((packets / (duration + 0.001)).toFixed(2)),
    port_category: randomElement(['well-known', 'registered', 'dynamic']),
    protocol_tcp: protocol === 'TCP' ? 1 : 0,
    protocol_udp: protocol === 'UDP' ? 1 : 0,
    protocol_other: (protocol !== 'TCP' && protocol !== 'UDP') ? 1 : 0,
    anomaly_score: isAnomaly ? parseFloat((0.6 + Math.random() * 0.4).toFixed(4)) : parseFloat((Math.random() * 0.4).toFixed(4)),
    is_anomaly: isAnomaly,
    scored_at: add(sub(now, { minutes: i * 5 }), { seconds: 10 }).toISOString(),
  };
}).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export const mockAlerts: Alert[] = mockFlows
  .filter(flow => flow.is_anomaly)
  .map((flow, i) => ({
    id: `alert_${i + 1}`,
    flow_id: flow.id,
    message: `High anomaly score (${flow.anomaly_score?.toFixed(3)}) detected`,
    severity: randomElement(severities.slice(1)), // Avoid 'Low' for actual anomalies
    timestamp: flow.scored_at!,
    src_ip: flow.src_ip,
    dst_ip: flow.dst_ip,
  }))
  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export const getMockData = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return {
    flows: mockFlows,
    alerts: mockAlerts,
  };
};