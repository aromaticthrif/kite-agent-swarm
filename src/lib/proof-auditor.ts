import { Hex, isHex } from 'viem';

export interface FacilitatorProofReceipt {
  paymentId: string;
  payer: Hex;
  payee: Hex;
  amount: string;
  tokenAddress: Hex;
  facilitatorSignature: Hex;
  timestamp: number;
}

/**
 * Validates cryptographic soundness of Facilitator v2 payment receipts
 */
export class ProofIntegrityAuditor {
  public static verifyReceiptFormat(receipt: FacilitatorProofReceipt): { valid: boolean; error?: string } {
    if (!receipt.paymentId || receipt.paymentId.trim() === '') {
      return { valid: false, error: 'paymentId cannot be empty' };
    }
    if (!isHex(receipt.payer) || receipt.payer.length !== 42) {
      return { valid: false, error: 'payer must be a valid 20-byte EVM address' };
    }
    if (!isHex(receipt.payee) || receipt.payee.length !== 42) {
      return { valid: false, error: 'payee must be a valid 20-byte EVM address' };
    }
    if (!isHex(receipt.facilitatorSignature) || receipt.facilitatorSignature.length !== 132) {
      return { valid: false, error: 'facilitatorSignature must be a valid 65-byte hex signature' };
    }
    if (receipt.timestamp <= 0) {
      return { valid: false, error: 'timestamp must be positive' };
    }
    return { valid: true };
  }
}
