import { defineChain } from 'viem';

export const kiteTestnet = defineChain({
  id: 2368,
  name: 'Kite Testnet',
  nativeCurrency: {
    name: 'Kite',
    symbol: 'KITE',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.gokite.ai'],
    },
    public: {
      http: ['https://rpc-testnet.gokite.ai'],
    },
  },
  blockExplorers: {
    default: {
      name: 'KiteScan Testnet',
      url: 'https://testnet.kitescan.ai',
    },
  },
});

export const kiteMainnet = defineChain({
  id: 2366,
  name: 'Kite Mainnet',
  nativeCurrency: {
    name: 'Kite',
    symbol: 'KITE',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.gokite.ai'],
    },
    public: {
      http: ['https://rpc.gokite.ai'],
    },
  },
  blockExplorers: {
    default: {
      name: 'KiteScan',
      url: 'https://kitescan.ai',
    },
  },
});

export const KITE_NETWORK_CONFIG = {
  'eip155:2368': {
    chain: kiteTestnet,
    chainId: 2368,
    name: 'Kite Testnet',
    tokenSymbol: 'pieUSD',
    tokenAddress: '0x38129cf4CE5E183eFF248F42A7D345Bb1B47621A' as `0x${string}`,
    decimals: 18,
    facilitatorUrl: 'https://facilitator.pieverse.io/v2',
    explorerUrl: 'https://testnet.kitescan.ai',
  },
  'eip155:2366': {
    chain: kiteMainnet,
    chainId: 2366,
    name: 'Kite Mainnet',
    tokenSymbol: 'USDC.e',
    tokenAddress: '0x7aB6f3ed87C42eF0aDb67Ed95090f8bF5240149e' as `0x${string}`,
    decimals: 6,
    facilitatorUrl: 'https://facilitator.pieverse.io/v2',
    explorerUrl: 'https://kitescan.ai',
  },
};
