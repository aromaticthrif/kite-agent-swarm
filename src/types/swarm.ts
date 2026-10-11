import { AgentMetadata } from './agent';

export interface SwarmWorkflowNode {
  id: string;
  agentId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'settling_x402' | 'completed' | 'failed';
  result?: string;
  latencyMs?: number;
  paymentProofTx?: string;
}

export interface SwarmPipeline {
  id: string;
  title: string;
  prompt: string;
  nodes: SwarmWorkflowNode[];
  status: 'idle' | 'running' | 'completed' | 'failed';
  totalCost: string;
  startedAt?: string;
  completedAt?: string;
}

export interface BountyItem {
  id: string;
  title: string;
  description: string;
  rewardAmount: string;
  rewardToken: 'pieUSD' | 'USDC.e';
  creator: `0x${string}`;
  category: 'Security' | 'DeFi Analysis' | 'Data Crawl' | 'Model Benchmarking';
  requiredRole: string;
  deadline: string;
  status: 'open' | 'assigned' | 'completed';
  assignedAgent?: AgentMetadata;
}
