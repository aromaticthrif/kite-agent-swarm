import React from 'react';
import { FileText, Cpu, ShieldCheck, Terminal, Layers } from 'lucide-react';

export const DocsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn text-slate-300 text-sm leading-relaxed">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <FileText className="w-8 h-8 text-cyan-400" />
          Kite Swarm Architecture & Protocol Spec
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Technical specifications for Autonomous Multi-Agent Swarm Orchestration and EIP-3009 Micropayments on the Kite Blockchain.
        </p>
      </div>

      {/* Section 1: Overview */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          1. Multi-Agent Swarm Coordination Model
        </h2>
        <p>
          Kite Agent Swarm implements a decentralized Directed Acyclic Graph (DAG) task execution pipeline where specialized autonomous agents perform modular micro-tasks:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
          <li><strong className="text-white">Coordinator Agent:</strong> Decomposes complex user intent into modular sub-tasks.</li>
          <li><strong className="text-white">Research Agent:</strong> Real-time on-chain telemetry extraction & external intelligence.</li>
          <li><strong className="text-white">Auditor Agent:</strong> Formal verification, AST inspection, and invariant checking.</li>
          <li><strong className="text-white">Synthesizer Agent:</strong> Aggregates outputs, achieves consensus quorum, and bundles cryptographic receipts.</li>
        </ul>
      </section>

      {/* Section 2: x402 Protocol Sequence */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          2. x402 Protocol Micropayment Lifecycle
        </h2>
        <p>
          Each agent execution is gated by the HTTP 402 Payment Required specification with zero upfront subscription locks:
        </p>
        <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 text-slate-300 overflow-x-auto">
          <pre>{`1. Caller dispatches POST /api/agent/:role (Without Header)
   └── Agent responds: HTTP 402 Payment Required
       Header: PAYMENT-REQUIRED: base64({ recipient, amount, token, nonce, facilitator })

2. Caller signs EIP-712 TransferWithAuthorization
   └── Computes typed data over EIP-3009 parameters:
       (from, to, value, validAfter, validBefore, nonce)

3. Caller re-dispatches POST /api/agent/:role
   └── Header: PAYMENT-SIGNATURE: base64({ authorization, signature })

4. Facilitator executes gas-less on-chain settlement on Kite Blockchain
   └── Validates zero-deduction invariants
   └── Responds: HTTP 200 OK + Upstream Agent Computation Output`}</pre>
        </div>
      </section>

      {/* Section 3: EIP-3009 Typed Data */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          3. EIP-3009 Typed Data Schema
        </h2>
        <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 text-slate-300 overflow-x-auto">
          <pre>{`const EIP712_TYPES = {
  TransferWithAuthorization: [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'validAfter', type: 'uint256' },
    { name: 'validBefore', type: 'uint256' },
    { name: 'nonce', type: 'bytes32' }
  ]
};`}</pre>
        </div>
      </section>

      {/* Section 4: Network Specifications */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber-400" />
          4. Kite Blockchain Network References
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left border border-slate-800">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                <th className="p-2.5 border-b border-slate-800">Parameter</th>
                <th className="p-2.5 border-b border-slate-800">Kite Testnet</th>
                <th className="p-2.5 border-b border-slate-800">Kite Mainnet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="p-2.5 text-slate-400">Chain ID</td>
                <td className="p-2.5 text-white">2368 (eip155:2368)</td>
                <td className="p-2.5 text-white">2366 (eip155:2366)</td>
              </tr>
              <tr>
                <td className="p-2.5 text-slate-400">Asset Token</td>
                <td className="p-2.5 text-emerald-400">pieUSD (18 Decimals)</td>
                <td className="p-2.5 text-emerald-400">USDC.e (6 Decimals)</td>
              </tr>
              <tr>
                <td className="p-2.5 text-slate-400">Contract Address</td>
                <td className="p-2.5 text-slate-300">0x38129cf4CE5E183eFF248F42A7D345Bb1B47621A</td>
                <td className="p-2.5 text-slate-300">0x7aB6f3ed87C42eF0aDb67Ed95090f8bF5240149e</td>
              </tr>
              <tr>
                <td className="p-2.5 text-slate-400">Facilitator URL</td>
                <td className="p-2.5 text-cyan-400" colSpan={2}>https://facilitator.pieverse.io/v2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
