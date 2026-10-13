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
    this.nodes.set(node.id, { ...node });
  }

  public getTask(id: string): DAGTaskNode | undefined {
    return this.nodes.get(id);
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

  public markFailed(id: string): void {
    const node = this.nodes.get(id);
    if (node) {
      node.status = 'failed';
    }
  }

  public totalBountyAllocated(): bigint {
    let sum = 0n;
    for (const node of this.nodes.values()) {
      sum += node.bountyAmountWei;
    }
    return sum;
  }

  /**
   * Detects cycles in the task dependency graph using depth-first search
   */
  public hasCycle(): boolean {
    const visited = new Set<string>();
    const recStack = new Set<string>();

    const dfs = (nodeId: string): boolean => {
      visited.add(nodeId);
      recStack.add(nodeId);

      const node = this.nodes.get(nodeId);
      if (node) {
        for (const dep of node.dependencies) {
          if (!visited.has(dep)) {
            if (dfs(dep)) return true;
          } else if (recStack.has(dep)) {
            return true;
          }
        }
      }

      recStack.delete(nodeId);
      return false;
    };

    for (const nodeId of this.nodes.keys()) {
      if (!visited.has(nodeId)) {
        if (dfs(nodeId)) return true;
      }
    }

    return false;
  }

  /**
   * Returns nodes in strict topological resolution order
   */
  public getTopologicalOrder(): DAGTaskNode[] {
    if (this.hasCycle()) {
      throw new Error('Cannot compute topological order: Cycle detected in task graph');
    }

    const order: DAGTaskNode[] = [];
    const visited = new Set<string>();

    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      const node = this.nodes.get(nodeId);
      if (node) {
        for (const dep of node.dependencies) {
          visit(dep);
        }
        order.push(node);
      }
    };

    for (const nodeId of this.nodes.keys()) {
      visit(nodeId);
    }

    return order;
  }
}
