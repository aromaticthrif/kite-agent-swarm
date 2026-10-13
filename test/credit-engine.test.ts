import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SwarmAgentCreditEngine } from '../src/lib/credit-engine.js';
import { Hex } from 'viem';

describe('SwarmAgentCreditEngine', () => {
  const agent1: Hex = '0x1111111111111111111111111111111111111111';

  it('starts new agents at baseline credit score 100', () => {
    const engine = new SwarmAgentCreditEngine();
    assert.strictEqual(engine.getScore(agent1), 100);
  });

  it('increments credit on successful task execution', () => {
    const engine = new SwarmAgentCreditEngine();
    const rec = engine.recordSuccess(agent1);

    assert.strictEqual(rec.score, 120);
    assert.strictEqual(rec.tasksCompleted, 1);
    assert.strictEqual(engine.getScore(agent1), 120);
  });

  it('penalizes score on task failure and enforces floor threshold', () => {
    const engine = new SwarmAgentCreditEngine();
    engine.recordFailure(agent1); // 100 - 50 = 50
    assert.strictEqual(engine.getScore(agent1), 50);

    engine.recordFailure(agent1); // 50 - 50 = 10 (floor)
    assert.strictEqual(engine.getScore(agent1), 10);
  });

  it('evaluates eligibility for high-value bounties', () => {
    const engine = new SwarmAgentCreditEngine();
    assert.strictEqual(engine.isEligibleForHighValueBounty(agent1, 150), false);

    engine.recordSuccess(agent1); // 120
    engine.recordSuccess(agent1); // 140
    engine.recordSuccess(agent1); // 160
    assert.strictEqual(engine.isEligibleForHighValueBounty(agent1, 150), true);
  });
});
