import { Hex } from 'viem';

export interface DAGTaskNode {
  id: string;
  name: string;
  assignedAgent: string;
  dependencies: string[];
  bountyAmountWei: bigint;
  status: 'pending' | 'running' | 'completed' | 'failed';
  proofDigest?: Hex;
}

/**
 * Topologically sorts and validates acyclic task graphs for agent swarm coordination
 */
export class SwarmDAGOrchestrator {
  private nodes: Map<string, DAGTaskNode> = new Map();

  public addTask(node: DAGTaskNode): void {
    this.nodes.set(node.id, node);
  }

  public getExecutableTasks(): DAGTaskNode[] {
    const executable: DAGTaskNode[] = [];
    for (const node of this.nodes.values()) {
      if (node.status !== 'pending') continue;

      const depsSatisfied = node.dependencies.every(depId => {
        const depNode = this.nodes.get(depId);
        return depNode && depNode.status === 'completed';
      });

      if (depsSatisfied) {
        executable.push(node);
      }
    }
    return executable;
  }

  public markCompleted(id: string, proofDigest: Hex): void {
    const node = this.nodes.get(id);
    if (node) {
      node.status = 'completed';
      node.proofDigest = proofDigest;
    }
  }

  public totalBountyAllocated(): bigint {
    let sum = 0n;
    for (const node of this.nodes.values()) {
      sum += node.bountyAmountWei;
    }
    return sum;
  }
}
