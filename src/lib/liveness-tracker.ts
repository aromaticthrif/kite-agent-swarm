import { Hex, isHex } from 'viem';

export interface HeartbeatPayload {
  agentAddress: Hex;
  role: string;
  loadPercentage: number;
  lastActiveTimestamp: number;
}

export interface AgentHealthStatus {
  agentAddress: Hex;
  role: string;
  healthy: boolean;
  loadPercentage: number;
  lastHeartbeatAgeMs: number;
}

/**
 * SentinelLivenessTracker
 * Monitors real-time heartbeat pings from distributed swarm agents and flags degraded/offline nodes
 */
export class SentinelLivenessTracker {
  private heartbeats: Map<string, HeartbeatPayload> = new Map();
  private maxAllowedSilentMs: number;

  constructor(maxAllowedSilentMs: number = 30_000) {
    this.maxAllowedSilentMs = maxAllowedSilentMs;
  }

  public recordHeartbeat(payload: HeartbeatPayload): void {
    if (!isHex(payload.agentAddress) || payload.agentAddress.length !== 42) {
      throw new Error(`Invalid agent EVM address: ${payload.agentAddress}`);
    }
    if (payload.loadPercentage < 0 || payload.loadPercentage > 100) {
      throw new Error(`Load percentage must be between 0 and 100 (got ${payload.loadPercentage})`);
    }

    this.heartbeats.set(payload.agentAddress.toLowerCase(), payload);
  }

  public getAgentHealth(agentAddress: Hex, now: number = Date.now()): AgentHealthStatus | null {
    const record = this.heartbeats.get(agentAddress.toLowerCase());
    if (!record) return null;

    const age = now - record.lastActiveTimestamp;
    const healthy = age <= this.maxAllowedSilentMs && record.loadPercentage < 95;

    return {
      agentAddress: record.agentAddress,
      role: record.role,
      healthy,
      loadPercentage: record.loadPercentage,
      lastHeartbeatAgeMs: Math.max(0, age),
    };
  }

  public getSwarmAvailability(now: number = Date.now()): { totalRegistered: number; activeHealthy: number; healthRatio: number } {
    const total = this.heartbeats.size;
    if (total === 0) return { totalRegistered: 0, activeHealthy: 0, healthRatio: 1.0 };

    let healthyCount = 0;
    for (const record of this.heartbeats.values()) {
      const age = now - record.lastActiveTimestamp;
      if (age <= this.maxAllowedSilentMs && record.loadPercentage < 95) {
        healthyCount++;
      }
    }

    return {
      totalRegistered: total,
      activeHealthy: healthyCount,
      healthRatio: Number((healthyCount / total).toFixed(2)),
    };
  }
}
