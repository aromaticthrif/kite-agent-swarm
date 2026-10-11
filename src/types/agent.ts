export type AgentRole = 'coordinator' | 'researcher' | 'auditor' | 'synthesizer' | 'sentinel';
export type AgentStatus = 'idle' | 'busy' | 'offline' | 'validating';

export interface AgentCapability {
  id: string;
  name: string;
  description: string;
  costPerInvoke: string; // e.g. "0.05"
  tokenSymbol: string; // "pieUSD" | "USDC.e"
}

export interface AgentMetadata {
  id: string;
  name: string;
  role: AgentRole;
  status: AgentStatus;
  avatarUrl: string;
  walletAddress: `0x${string}`;
  reputationScore: number; // 0 - 100
  totalTasksCompleted: number;
  totalEarnings: string;
  latencyMs: number;
  network: 'eip155:2368' | 'eip155:2366';
  endpoint: string;
  capabilities: AgentCapability[];
  bio: string;
}
