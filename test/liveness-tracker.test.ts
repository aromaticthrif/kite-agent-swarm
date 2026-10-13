import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SentinelLivenessTracker } from '../src/lib/liveness-tracker.js';
import { Hex } from 'viem';

describe('SentinelLivenessTracker', () => {
  const agent1: Hex = '0x1111111111111111111111111111111111111111';
  const agent2: Hex = '0x2222222222222222222222222222222222222222';

  it('tracks healthy agent with active recent heartbeat', () => {
    const tracker = new SentinelLivenessTracker(10_000);
    const now = Date.now();

    tracker.recordHeartbeat({
      agentAddress: agent1,
      role: 'Sentinel',
      loadPercentage: 45,
      lastActiveTimestamp: now - 2000,
    });

    const status = tracker.getAgentHealth(agent1, now);
    assert.ok(status !== null);
    assert.strictEqual(status.healthy, true);
    assert.strictEqual(status.loadPercentage, 45);
  });

  it('flags agent unhealthy if heartbeat is stale or overloaded', () => {
    const tracker = new SentinelLivenessTracker(5_000);
    const now = Date.now();

    // Stale heartbeat
    tracker.recordHeartbeat({
      agentAddress: agent1,
      role: 'Auditor',
      loadPercentage: 10,
      lastActiveTimestamp: now - 8_000,
    });

    // Overloaded agent (>= 95%)
    tracker.recordHeartbeat({
      agentAddress: agent2,
      role: 'Synthesizer',
      loadPercentage: 98,
      lastActiveTimestamp: now - 1_000,
    });

    const status1 = tracker.getAgentHealth(agent1, now);
    const status2 = tracker.getAgentHealth(agent2, now);

    assert.strictEqual(status1?.healthy, false);
    assert.strictEqual(status2?.healthy, false);

    const swarmStats = tracker.getSwarmAvailability(now);
    assert.strictEqual(swarmStats.totalRegistered, 2);
    assert.strictEqual(swarmStats.activeHealthy, 0);
    assert.strictEqual(swarmStats.healthRatio, 0);
  });
});
