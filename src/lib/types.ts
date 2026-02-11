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

export interface FullFlowData {
  id: string;
  // Source
  src_ip: string;
  src_port: number;
  src_country?: string;
  src_country_code?: string;
  src_lat?: number;
  src_lon?: number;
  src_asn?: string;
  src_isp?: string;

  // Destination
  dst_ip: string;
  dst_port: number;
  dst_country?: string;
  dst_country_code?: string;
  dst_lat?: number;
  dst_lon?: number;
  dst_asn?: string;
  dst_isp?: string;

  protocol: 'TCP' | 'UDP' | 'ICMP' | 'OTHER';
  duration: number;
  bytes: number;
  packets: number;
  timestamp: string;

  // ML Features
  bytes_per_packet?: number;
  packets_per_second?: number;
  port_category?: string;
  protocol_tcp?: number;
  protocol_udp?: number;
  protocol_other?: number;

  // Analysis
  anomaly_score?: number;
  is_anomaly?: boolean;
  scored_at?: string;
}
