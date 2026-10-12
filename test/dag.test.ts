import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SwarmDAGOrchestrator, DAGTaskNode } from '../src/lib/dag-orchestrator.js';

describe('SwarmDAGOrchestrator', () => {
  it('correctly schedules dependent tasks in topological sequence', () => {
    const orchestrator = new SwarmDAGOrchestrator();

    const taskA: DAGTaskNode = {
      id: 'task-a',
      name: 'Decompose User Prompt',
      assignedAgent: 'Coordinator',
      dependencies: [],
      bountyAmountWei: 1000n,
      status: 'pending',
    };

    const taskB: DAGTaskNode = {
      id: 'task-b',
      name: 'Smart Contract Audit',
      assignedAgent: 'Auditor',
      dependencies: ['task-a'],
      bountyAmountWei: 5000n,
      status: 'pending',
    };

    orchestrator.addTask(taskA);
    orchestrator.addTask(taskB);

    // Initial state: Only taskA has dependencies satisfied
    const initialExecutable = orchestrator.getExecutableTasks();
    assert.strictEqual(initialExecutable.length, 1);
    assert.strictEqual(initialExecutable[0].id, 'task-a');

    // Complete taskA
    orchestrator.markCompleted('task-a', '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');

    // Subsequent state: taskB is now executable
    const nextExecutable = orchestrator.getExecutableTasks();
    assert.strictEqual(nextExecutable.length, 1);
    assert.strictEqual(nextExecutable[0].id, 'task-b');
  });

  it('aggregates total bounty allocated across graph', () => {
    const orchestrator = new SwarmDAGOrchestrator();
    orchestrator.addTask({
      id: '1',
      name: 'T1',
      assignedAgent: 'A1',
      dependencies: [],
      bountyAmountWei: 2000n,
      status: 'pending',
    });
    orchestrator.addTask({
      id: '2',
      name: 'T2',
      assignedAgent: 'A2',
      dependencies: [],
      bountyAmountWei: 3000n,
      status: 'pending',
    });

    assert.strictEqual(orchestrator.totalBountyAllocated(), 5000n);
  });
});
