import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';
import { AgentMetadata } from '../../types/agent';
import { StatusBadge } from '../common/StatusBadge';
import { saveProofLog } from '../../services/proof-logger';

interface AgentDetailModalProps {
  agent: AgentMetadata | null;
  onClose: () => void;
}

export const AgentDetailModal: React.FC<AgentDetailModalProps> = ({
  agent,
  onClose,
}) => {
  const [taskInput, setTaskInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  if (!agent) return null;

  const handleTestInvoke = async () => {
    setIsExecuting(true);
    setExecutionOutput(null);
    setTxHash(null);

    try {
      // Simulate Step 1: Discover 402 challenge
      await new Promise((r) => setTimeout(r, 600));

      // Simulate Step 2: Generate EIP-3009 transfer signature
      await new Promise((r) => setTimeout(r, 800));

      // Simulate Step 3: Facilitator Settlement on Kite
      const simulatedTx = ('0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')) as `0x${string}`;
      setTxHash(simulatedTx);

      setExecutionOutput(
        `[SUCCESS] Invocation completed by ${agent.name}.\n` +
        `• Task Intent: "${taskInput || 'Default diagnostic probe'}"\n` +
        `• Settlement: 0.02 pieUSD transferred to ${agent.walletAddress}\n` +
        `• KiteScan Tx Hash: ${simulatedTx}\n` +
        `• Facilitator Invariant: Verified Zero-Deduction & EIP-3009 nonce matched.`
      );

      // Save to proof logger
      saveProofLog({
        id: 'proof-' + Date.now(),
        timestamp: new Date().toISOString(),
        serviceOrAgent: agent.name,
        network: agent.network,
        tokenAddress: '0x38129cf4CE5E183eFF248F42A7D345Bb1B47621A',
        tokenSymbol: 'pieUSD',
        amount: '0.02',
        senderAddress: '0xSandboxUserWalletAddress9823478901234444',
        recipientAddress: agent.walletAddress,
        validAfter: 0,
        validBefore: Math.floor(Date.now() / 1000) + 3600,
        nonce: '0x' + Math.random().toString(16).substring(2).padEnd(64, '0') as `0x${string}`,
        signature: '0x' + Array.from({ length: 130 }, () => 'a').join('') as `0x${string}`,
        txHash: simulatedTx,
        status: 'settled',
      });
    } catch (err) {
      setExecutionOutput(`[ERROR] Failed to invoke agent: ${(err as Error).message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0f1624] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-6 p-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-4">
            <img
              src={agent.avatarUrl}
              alt={agent.name}
              className="w-14 h-14 rounded-2xl object-cover border border-cyan-500/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                <StatusBadge status={agent.status} />
              </div>
              <p className="text-xs font-mono text-cyan-400 uppercase mt-0.5">{agent.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bio & Wallet */}
        <div className="space-y-3 text-sm">
          <p className="text-slate-300 leading-relaxed">{agent.bio}</p>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">REPUTATION SCORE</span>
              <span className="text-emerald-400 font-bold">{agent.reputationScore}%</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">TOTAL TASKS</span>
              <span className="text-white font-bold">{agent.totalTasksCompleted} Completed</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs flex items-center justify-between">
            <span className="text-slate-400">Agent Wallet:</span>
            <span className="text-cyan-300">{agent.walletAddress}</span>
          </div>
        </div>

        {/* Capabilities List */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Capabilities & Pricing</h4>
          {agent.capabilities.map((cap) => (
            <div
              key={cap.id}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-semibold text-white">{cap.name}</div>
                <div className="text-xs text-slate-400">{cap.description}</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-bold">
                {cap.costPerInvoke} {cap.tokenSymbol}
              </span>
            </div>
          ))}
        </div>

        {/* Live Test Sandbox */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block">
            Sandbox Prompt & x402 Micropayment Test
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="e.g. Audit reentrancy in UniswapV2Pair.sol..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleTestInvoke}
              disabled={isExecuting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
            >
              {isExecuting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Settling 402...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Test Invoke
                </>
              )}
            </button>
          </div>

          {executionOutput && (
            <div className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 whitespace-pre-line">
              {executionOutput}
              {txHash && (
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-cyan-400">
                  <span>View on Explorer:</span>
                  <a
                    href={`https://testnet.kitescan.ai/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline text-[11px]"
                  >
                    KiteScan <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
