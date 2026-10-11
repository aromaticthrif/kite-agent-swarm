import { describe, it } from 'node:test';
import assert from 'node:assert';
import { buildEIP712Domain, generateRandomBytes32, EIP712_TRANSFER_WITH_AUTHORIZATION_TYPES } from '../src/lib/eip3009.js';

describe('EIP-3009 Cryptographic Type Generator', () => {
  it('should construct valid EIP-712 domain for Kite Testnet (2368)', () => {
    const domain = buildEIP712Domain(
      'pieUSD',
      '1',
      2368,
      '0x38129cf4CE5E183eFF248F42A7D345Bb1B47621A'
    );

    assert.strictEqual(domain.name, 'pieUSD');
    assert.strictEqual(domain.chainId, 2368n);
    assert.strictEqual(domain.verifyingContract, '0x38129cf4CE5E183eFF248F42A7D345Bb1B47621A');
  });

  it('should generate unrepeatable 32-byte nonces', () => {
    const nonce1 = generateRandomBytes32();
    const nonce2 = generateRandomBytes32();

    assert.strictEqual(nonce1.length, 66);
    assert.notStrictEqual(nonce1, nonce2);
  });

  it('should maintain TransferWithAuthorization type signatures', () => {
    const fields = EIP712_TRANSFER_WITH_AUTHORIZATION_TYPES.TransferWithAuthorization;
    assert.strictEqual(fields.length, 6);
    assert.strictEqual(fields[0].name, 'from');
    assert.strictEqual(fields[5].name, 'nonce');
  });
});
