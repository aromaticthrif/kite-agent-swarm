import { describe, it } from 'node:test';
import assert from 'node:assert';
import { EscrowBountySplitter } from '../src/lib/bounty-splitter.js';
import { Hex } from 'viem';

describe('EscrowBountySplitter', () => {
  const agent1: Hex = '0x1111111111111111111111111111111111111111';
  const agent2: Hex = '0x2222222222222222222222222222222222222222';
  const agent3: Hex = '0x3333333333333333333333333333333333333333';

  it('splits bounty proportionally among swarm agents', () => {
    const totalBounty = 10_000n;
    const result = EscrowBountySplitter.calculateSplit(totalBounty, [
      { agentAddress: agent1, role: 'Coordinator', weightBps: 5000 },
      { agentAddress: agent2, role: 'Auditor', weightBps: 3000 },
      { agentAddress: agent3, role: 'Sentinel', weightBps: 2000 },
    ]);

    assert.strictEqual(result.totalDisbursedWei, 10_000n);
    assert.strictEqual(result.dustRemainingWei, 0n);
    assert.strictEqual(result.allocations[0].allocatedAmountWei, 5000n);
    assert.strictEqual(result.allocations[1].allocatedAmountWei, 3000n);
    assert.strictEqual(result.allocations[2].allocatedAmountWei, 2000n);
  });

  it('correctly tracks rounding dust when split cannot be divided evenly', () => {
    const totalBounty = 100n;
    const result = EscrowBountySplitter.calculateSplit(totalBounty, [
      { agentAddress: agent1, role: 'Agent1', weightBps: 3333 },
      { agentAddress: agent2, role: 'Agent2', weightBps: 3333 },
      { agentAddress: agent3, role: 'Agent3', weightBps: 3334 },
    ]);

    assert.strictEqual(result.totalDisbursedWei + result.dustRemainingWei, 100n);
    assert.strictEqual(result.dustRemainingWei, 1n);
  });

  it('throws when total basis points do not equal 10000', () => {
    assert.throws(
      () =>
        EscrowBountySplitter.calculateSplit(1000n, [
          { agentAddress: agent1, role: 'Agent1', weightBps: 5000 },
          { agentAddress: agent2, role: 'Agent2', weightBps: 4000 },
        ]),
      /Total weight basis points must equal 10000/
    );
  });
});
