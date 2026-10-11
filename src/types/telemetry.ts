export interface NetworkTelemetrySnapshot {
  timestamp: string;
  rpcBlockHeight: number;
  facilitatorLatencyMs: number;
  zeroDeductionInvariantStatus: 'valid' | 'degraded' | 'breached';
  activeRelayConnections: number;
  totalSettlementVolumePieUSD: string;
}

export interface SwarmPeerHeartbeat {
  agentId: string;
  uptimeSeconds: number;
  cpuLoadPercentage: number;
  memoryUsageMb: number;
  lastHeartbeatEpoch: number;
}
