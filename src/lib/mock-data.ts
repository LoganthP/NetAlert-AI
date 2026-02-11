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

const countries = [
  { code: 'US', name: 'United States', lat: 37.0902, lon: -95.7129 },
  { code: 'CN', name: 'China', lat: 35.8617, lon: 104.1954 },
  { code: 'RU', name: 'Russia', lat: 61.5240, lon: 105.3188 },
  { code: 'DE', name: 'Germany', lat: 51.1657, lon: 10.4515 },
  { code: 'BR', name: 'Brazil', lat: -14.2350, lon: -51.9253 },
  { code: 'IN', name: 'India', lat: 20.5937, lon: 78.9629 },
];

const asns = ['AS15169 Google LLC', 'AS16509 Amazon.com', 'AS8075 Microsoft', 'AS4134 Chinanet', 'AS24940 Hetzner Online'];

const generateFlow = (i: number, timeOffsetMinutes: number): FullFlowData => {
  const isAnomaly = randomBool(0.15);
  const bytes = randomInt(100, 1000000);
  const packets = randomInt(1, 1000);
  const duration = Math.random() * 60;
  const protocol = randomElement(protocols);

  const srcCountry = randomElement(countries);
  const dstCountry = randomElement(countries);
  const jitter = () => (Math.random() - 0.5) * 10;

  const timestamp = sub(now, { minutes: timeOffsetMinutes }).toISOString();

  return {
    id: `flow_${Date.now()}_${i}`,
    src_ip: randomIp(),
    src_port: randomPort(),
    src_country: srcCountry.name,
    src_country_code: srcCountry.code,
    src_lat: srcCountry.lat + jitter(),
    src_lon: srcCountry.lon + jitter(),
    src_asn: randomElement(asns),
    src_isp: srcCountry.name + " Telecom",

    dst_ip: randomIp(),
    dst_port: randomPort(),
    dst_country: dstCountry.name,
    dst_country_code: dstCountry.code,
    dst_lat: dstCountry.lat + jitter(),
    dst_lon: dstCountry.lon + jitter(),
    dst_asn: randomElement(asns),
    dst_isp: dstCountry.name + " Cloud Services",

    protocol,
    duration: parseFloat(duration.toFixed(4)),
    bytes,
    packets,
    timestamp: timestamp,
    bytes_per_packet: parseFloat((bytes / packets).toFixed(2)),
    packets_per_second: parseFloat((packets / (duration + 0.001)).toFixed(2)),
    port_category: randomElement(['well-known', 'registered', 'dynamic']),
    protocol_tcp: protocol === 'TCP' ? 1 : 0,
    protocol_udp: protocol === 'UDP' ? 1 : 0,
    protocol_other: (protocol !== 'TCP' && protocol !== 'UDP') ? 1 : 0,
    anomaly_score: isAnomaly ? parseFloat((0.6 + Math.random() * 0.4).toFixed(4)) : parseFloat((Math.random() * 0.4).toFixed(4)),
    is_anomaly: isAnomaly,
    scored_at: timestamp, // score time same as flow time for simplicity
  };
};

export const mockFlows: FullFlowData[] = [];

// Generate 20 flows in the last hour
for (let i = 0; i < 20; i++) {
  mockFlows.push(generateFlow(i, randomInt(0, 60)));
}

// Generate 30 flows in the last 24 hours (excluding last hour)
for (let i = 20; i < 50; i++) {
  mockFlows.push(generateFlow(i, randomInt(61, 1440)));
}

// Generate 50 flows in the last 7 days (excluding last 24 hours)
for (let i = 50; i < 100; i++) {
  mockFlows.push(generateFlow(i, randomInt(1441, 10080)));
}

mockFlows.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export const mockAlerts: Alert[] = mockFlows
  .filter(flow => flow.is_anomaly)
  .map((flow, i) => ({
    id: `alert_${i + 1}`,
    flow_id: flow.id,
    message: `High anomaly score (${flow.anomaly_score?.toFixed(3)}) detected`,
    severity: randomElement(severities.slice(1)),
    timestamp: flow.scored_at!,
    src_ip: flow.src_ip,
    dst_ip: flow.dst_ip,
  }))
  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export const getMockData = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return {
    flows: mockFlows,
    alerts: mockAlerts,
  };
};