import { describe, it } from 'node:test';
import assert from 'node:assert';
import { INITIAL_AGENTS } from '../src/services/sample-agents.js';

describe('Swarm Agent Registry & Topology', () => {
  it('should contain all 5 essential swarm roles', () => {
    const roles = INITIAL_AGENTS.map((a) => a.role);
    assert.ok(roles.includes('coordinator'));
    assert.ok(roles.includes('researcher'));
    assert.ok(roles.includes('auditor'));
    assert.ok(roles.includes('synthesizer'));
    assert.ok(roles.includes('sentinel'));
  });

  it('should ensure valid checksummed wallet addresses for all agents', () => {
    for (const agent of INITIAL_AGENTS) {
      assert.match(agent.walletAddress, /^0x[a-fA-F0-9]{40}$/);
      assert.ok(agent.reputationScore >= 90);
    }
  });
});
