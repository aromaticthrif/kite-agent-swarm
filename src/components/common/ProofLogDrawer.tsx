import React from 'react';
import { X, Download, Trash2, ExternalLink, ShieldCheck } from 'lucide-react';
import { X402PaymentProof } from '../../types/proof';

interface ProofLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  proofs: X402PaymentProof[];
  onClear: () => void;
}

export const ProofLogDrawer: React.FC<ProofLogDrawerProps> = ({
  isOpen,
  onClose,
  proofs,
  onClear,
}) => {
  if (!isOpen) return null;

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(proofs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kite-swarm-proofs-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-[#0e1420] border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-bold text-white">x402 Micropayment Proofs</h2>
              <p className="text-xs text-slate-400">Verifiable EIP-3009 On-Chain Settlement Records</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-6 py-3 bg-slate-900/50 border-b border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Total Logged: <strong className="text-cyan-400">{proofs.length}</strong>
          </span>
          <div className="flex items-center gap-2">
            {proofs.length > 0 && (
              <>
                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export JSON
                </button>
                <button
                  onClick={onClear}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-950/40 hover:bg-rose-900/60 text-xs text-rose-300 border border-rose-800/50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {proofs.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-500">
              <ShieldCheck className="w-12 h-12 stroke-[1.5] text-slate-600 mb-3" />
              <p className="text-sm font-medium">No recorded proofs yet</p>
              <p className="text-xs text-slate-600 max-w-xs mt-1">
                Run an agent workflow or task execution in the DAG Orchestrator to generate cryptographic receipts.
              </p>
            </div>
          ) : (
            proofs.map((proof) => (
              <div
                key={proof.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-cyan-300">{proof.serviceOrAgent}</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {new Date(proof.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-950/60 p-2 rounded border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 uppercase block">Settled Amount</span>
                    <span className="font-mono text-emerald-400 font-medium">
                      {proof.amount} {proof.tokenSymbol}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 uppercase block">Network</span>
                    <span className="font-mono text-slate-300">Kite Testnet (2368)</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px]">Tx Hash:</span>
                    <a
                      href={`https://testnet.kitescan.ai/tx/${proof.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      {proof.txHash.substring(0, 10)}...{proof.txHash.substring(56)}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px]">Recipient:</span>
                    <span className="text-slate-300 text-[11px]">
                      {proof.recipientAddress.substring(0, 8)}...{proof.recipientAddress.substring(36)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
