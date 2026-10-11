# Kite Agent Swarm: Technical Architecture & Protocol Specification

## 1. System Architecture Overview

Kite Agent Swarm is a decentralized multi-agent coordination protocol designed to operate autonomously on the **Kite Blockchain** (EIP-155: 2368 / 2366). It bridges agent task intent decomposition, multi-agent peer validation, and HTTP 402 micro-settlement.

```text
+---------------------------------------------------------------------------------+
|                                 USER / CLIENT                                   |
|               (Initiates High-Level Intent or Posts Task Bounty)                |
+----------------------------------------+----------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                       SWARM ORCHESTRATOR & DAG PLANNER                          |
|         (Decomposes intent into dependency tree: Steps 1, 2, 3 ... N)           |
+-------------------+--------------------+-------------------+--------------------+
                    |                    |                   |
                    v                    v                   v
            +---------------+    +---------------+   +---------------+
            |  Coordinator  |    |   Researcher  |   |    Auditor    |
            |     Agent     |    |     Agent     |   |     Agent     |
            +-------+-------+    +-------+-------+   +-------+-------+
                    |                    |                   |
                    +--------------------+-------------------+
                                         |
                                  HTTP 402 Challenge
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                    x402 INTERCEPTOR & EIP-3009 SIGNING SUITE                    |
|             (Generates TransferWithAuthorization typed signatures)               |
+----------------------------------------+----------------------------------------+
                                         |
                              PAYMENT-SIGNATURE Header
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                    KITE FACILITATOR & ON-CHAIN SETTLEMENT                       |
|       (Settles pieUSD/USDC.e transfer without charging end-user gas)            |
|       (Enforces Zero-Deduction and ValidBefore deadline invariants)             |
+----------------------------------------+----------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                        SYNTHESIS & ATTESTATION ENGINE                           |
|          (Produces verifiable audit proof & standardized JSON receipt)          |
+---------------------------------------------------------------------------------+
```

---

## 2. EIP-3009 TransferWithAuthorization Protocol

Payments within the swarm are executed without subscription lock-ins or upfront token allowances. Every task execution invokes standard EIP-712 structured data signing:

```typescript
const EIP712_DOMAIN = {
  name: 'pieUSD',
  version: '1',
  chainId: 2368, // Kite Testnet
  verifyingContract: '0x38129cf4CE5E183eFF248F42A7D345Bb1B47621A',
};

const EIP712_TYPES = {
  TransferWithAuthorization: [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'validAfter', type: 'uint256' },
    { name: 'validBefore', type: 'uint256' },
    { name: 'nonce', type: 'bytes32' },
  ],
};
```

---

## 3. Safety Invariants & Zero-Deduction Guarantees

1. **Idempotency via Random Nonce**: Every payment challenge generates an unrepeatable 32-byte cryptographic nonce preventing replay exploits.
2. **5xx Upstream Protection**: If an invoked specialist agent throws an unhandled exception or upstream 502/504 timeout, the Facilitator relay immediately cancels settlement, guaranteeing zero asset deductions.
3. **Receipt Exportability**: Every successful interaction outputs an immutable receipt record (`x402-receipt-v1.json`) containing the exact block height, settlement tx hash, and signer address.
