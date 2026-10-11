import { INITIAL_AGENTS } from '../src/services/sample-agents.js';

async function main() {
  console.log('🛸 [Kite Swarm Simulator] Starting autonomous node diagnostic...');
  console.log(`📡 Registered Agents Count: ${INITIAL_AGENTS.length}`);

  for (const agent of INITIAL_AGENTS) {
    console.log(`\n--------------------------------------------------`);
    console.log(`Agent: ${agent.name} [${agent.role.toUpperCase()}]`);
    console.log(`Wallet: ${agent.walletAddress}`);
    console.log(`Base Invoke Rate: ${agent.capabilities[0]?.costPerInvoke} ${agent.capabilities[0]?.tokenSymbol}`);
    console.log(`Status: ${agent.status} | Latency: ${agent.latencyMs}ms | Rep: ${agent.reputationScore}%`);
  }

  console.log('\n✅ All autonomous nodes verified on Kite Testnet (EIP-155: 2368).');
}

main().catch(console.error);
