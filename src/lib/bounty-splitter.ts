import { type Hex, isHex } from 'viem';

export interface AgentBountyAllocation {
  agentAddress: Hex;
  role: string;
  weightBps: number; // Basis points (10000 = 100%)
  allocatedAmountWei: bigint;
}

export interface SplitResult {
  totalDisbursedWei: bigint;
  dustRemainingWei: bigint;
  allocations: AgentBountyAllocation[];
}

/**
 * EscrowBountySplitter
 * Computes fair proportional disbursement of DAG bounties across collaborating swarm agents
 */
export class EscrowBountySplitter {
  /**
   * Distributes a total bounty among participating agents based on weight basis points
   */
  public static calculateSplit(
    totalBountyWei: bigint,
    agents: Array<{ agentAddress: Hex; role: string; weightBps: number }>
  ): SplitResult {
    if (totalBountyWei <= 0n) {
      throw new Error('Total bounty must be strictly positive');
    }
    if (agents.length === 0) {
      throw new Error('At least one recipient agent must be specified');
    }

    const totalWeight = agents.reduce((acc, a) => acc + a.weightBps, 0);
    if (totalWeight !== 10000) {
      throw new Error(`Total weight basis points must equal 10000 (got ${totalWeight})`);
    }

    let allocatedSum = 0n;
    const allocations: AgentBountyAllocation[] = [];

    for (const agent of agents) {
      if (!isHex(agent.agentAddress) || agent.agentAddress.length !== 42) {
        throw new Error(`Invalid agent EVM address: ${agent.agentAddress}`);
      }

      const shareWei = (totalBountyWei * BigInt(agent.weightBps)) / 10000n;
      allocatedSum += shareWei;

      allocations.push({
        agentAddress: agent.agentAddress,
        role: agent.role,
        weightBps: agent.weightBps,
        allocatedAmountWei: shareWei,
      });
    }

    const dustRemainingWei = totalBountyWei - allocatedSum;

    return {
      totalDisbursedWei: allocatedSum,
      dustRemainingWei,
      allocations,
    };
  }
}
