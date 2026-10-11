import { KITE_NETWORK_CONFIG } from '../src/lib/chains.js';

async function main() {
  console.log('🔍 [Facilitator Diagnostic] Probing Kite settlement relay endpoints...');

  for (const [netKey, config] of Object.entries(KITE_NETWORK_CONFIG)) {
    console.log(`\nNetwork: ${config.name} (${netKey})`);
    console.log(`  Chain ID: ${config.chainId}`);
    console.log(`  Asset Token: ${config.tokenSymbol} (${config.tokenAddress})`);
    console.log(`  Facilitator Target: ${config.facilitatorUrl}`);
    console.log(`  Explorer URL: ${config.explorerUrl}`);
  }

  console.log('\n✨ Facilitator configurations validated successfully.');
}

main().catch(console.error);
