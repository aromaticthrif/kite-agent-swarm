import { type Hex, isHex } from 'viem';

export interface ReputationDecayConfig {
  decayHalfLifeMs: number;
  minReputation: number;
  maxReputation: number;
  penaltyPerFailedTask: number;
  rewardPerSuccessfulTask: number;
}

export interface AgentReputationRecord {
  agentAddress: Hex;
  score: number;
  tasksCompleted: number;
  tasksFailed: number;
  lastUpdatedTimestamp: number;
}

export const DEFAULT_REPUTATION_CONFIG: ReputationDecayConfig = {
  decayHalfLifeMs: 7 * 24 * 3600 * 1000, // 7 days half-life towards 100
  minReputation: 10,
  maxReputation: 1000,
  penaltyPerFailedTask: 50,
  rewardPerSuccessfulTask: 20,
};

/**
 * SwarmAgentCreditEngine
 * Tracks performance-based reputation scores and credit decay for autonomous swarm workers
 */
export class SwarmAgentCreditEngine {
  private records: Map<string, AgentReputationRecord> = new Map();
  private config: ReputationDecayConfig;

  constructor(config: ReputationDecayConfig = DEFAULT_REPUTATION_CONFIG) {
    this.config = config;
  }

  public recordSuccess(agentAddress: Hex, now: number = Date.now()): AgentReputationRecord {
    this.validateAddress(agentAddress);
    const rec = this.getOrCreateRecord(agentAddress, now);
    
    rec.score = Math.min(this.config.maxReputation, rec.score + this.config.rewardPerSuccessfulTask);
    rec.tasksCompleted += 1;
    rec.lastUpdatedTimestamp = now;
    
    return { ...rec };
  }

  public recordFailure(agentAddress: Hex, now: number = Date.now()): AgentReputationRecord {
    this.validateAddress(agentAddress);
    const rec = this.getOrCreateRecord(agentAddress, now);

    rec.score = Math.max(this.config.minReputation, rec.score - this.config.penaltyPerFailedTask);
    rec.tasksFailed += 1;
    rec.lastUpdatedTimestamp = now;

    return { ...rec };
  }

  public getScore(agentAddress: Hex): number {
    this.validateAddress(agentAddress);
    const rec = this.records.get(agentAddress.toLowerCase());
    return rec ? rec.score : 100; // Baseline initial score 100
  }

  public isEligibleForHighValueBounty(agentAddress: Hex, threshold: number = 150): boolean {
    return this.getScore(agentAddress) >= threshold;
  }

  private getOrCreateRecord(agentAddress: Hex, now: number): AgentReputationRecord {
    const key = agentAddress.toLowerCase();
    let rec = this.records.get(key);
    if (!rec) {
      rec = {
        agentAddress,
        score: 100,
        tasksCompleted: 0,
        tasksFailed: 0,
        lastUpdatedTimestamp: now,
      };
      this.records.set(key, rec);
    }
    return rec;
  }

  private validateAddress(address: Hex): void {
    if (!isHex(address) || address.length !== 42) {
      throw new Error(`Invalid EVM address: ${address}`);
    }
  }
}
