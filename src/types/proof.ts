export interface X402PaymentProof {
  id: string;
  timestamp: string;
  serviceOrAgent: string;
  network: 'eip155:2368' | 'eip155:2366';
  tokenAddress: `0x${string}`;
  tokenSymbol: string;
  amount: string;
  senderAddress: `0x${string}`;
  recipientAddress: `0x${string}`;
  validAfter: number;
  validBefore: number;
  nonce: `0x${string}`;
  signature: `0x${string}`;
  txHash: `0x${string}`;
  status: 'settled' | 'pending' | 'failed';
}
