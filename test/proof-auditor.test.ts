import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ProofIntegrityAuditor, FacilitatorProofReceipt } from '../src/lib/proof-auditor.js';

describe('ProofIntegrityAuditor', () => {
  const validReceipt: FacilitatorProofReceipt = {
    paymentId: 'pay_123',
    payer: '0x1111111111111111111111111111111111111111',
    payee: '0x2222222222222222222222222222222222222222',
    amount: '1.5',
    tokenAddress: '0x3333333333333333333333333333333333333333',
    facilitatorSignature: ('0x' + 'aa'.repeat(65)) as any,
    timestamp: 1718000000,
  };

  it('approves properly formatted receipt with 65-byte signature', () => {
    const res = ProofIntegrityAuditor.verifyReceiptFormat(validReceipt);
    assert.strictEqual(res.valid, true);
  });

  it('rejects receipt with invalid address formats', () => {
    const invalidReceipt = { ...validReceipt, payer: '0xinvalid' as any };
    const res = ProofIntegrityAuditor.verifyReceiptFormat(invalidReceipt);
    assert.strictEqual(res.valid, false);
    assert.ok(res.error?.includes('payer must be a valid'));
  });
});
