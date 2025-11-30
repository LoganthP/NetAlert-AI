export interface NetworkFlow {
  id: string;
  src_ip: string;
  dst_ip: string;
  src_port: number;
  dst_port: number;
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'OTHER';
  duration: number;
  bytes: number;
  packets: number;
  timestamp: string;
}

export interface EngineeredFeature {
  flow_id: string;
  bytes_per_packet: number;
  packets_per_second: number;
  port_category: string;
  protocol_tcp: number;
  protocol_udp: number;
  protocol_other: number;
}

export interface AnomalyScore {
  flow_id: string;
  anomaly_score: number;
  is_anomaly: boolean;
  scored_at: string;
}

export interface Alert {
  id: string;
  flow_id: string;
  message: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  timestamp: string;
  src_ip: string;
  dst_ip: string;
}

export type FullFlowData = NetworkFlow & Partial<EngineeredFeature> & Partial<AnomalyScore>;
