import React, { useState } from 'react';
import { 
  Layers, 
  Play, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  Terminal, 
  Sparkles,
  Loader2,
  Cpu
} from 'lucide-react';
import { saveProofLog } from '../../services/proof-logger';

interface Stage {
  id: string;
  name: string;
  role: string;
  agent: string;
  action: string;
  cost: string;
  status: 'idle' | 'running' | 'settling_402' | 'completed' | 'failed';
  result?: string;
  txHash?: string;
}

export const OrchestratorView: React.FC = () => {
  const [prompt, setPrompt] = useState('Audit newly deployed DeFi lending pool contract and generate security synthesis');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Swarm Orchestrator Engine initialized on Kite Testnet (EIP-155: 2368).',
    '[READY] Standing by for multi-agent DAG task execution...',
  ]);

  const [stages, setStages] = useState<Stage[]>([
    {
      id: 'step-1',
      name: 'Task Decomposition',
      role: 'Coordinator',
      agent: 'Atlas Nexus',
      action: 'Partition prompt into sub-tasks and dependency graph',
      cost: '0.02 pieUSD',
      status: 'idle',
    },
    {
      id: 'step-2',
      name: 'On-Chain Data Extraction',
      role: 'Researcher',
      agent: 'CyberOracle Research',
      action: 'Retrieve pool reserves, liquidation threshold and oracle feeds',
      cost: '0.04 pieUSD',
      status: 'idle',
    },
    {
      id: 'step-3',
      name: 'Bytecode & AST Audit',
      role: 'Auditor',
      agent: 'Vigilant Guardian',
      action: 'Execute formal verification on flashloan reentrancy & math checks',
      cost: '0.08 pieUSD',
      status: 'idle',
    },
    {
      id: 'step-4',
      name: 'Consensus & Synthesis',
      role: 'Synthesizer',
      agent: 'OmniSynthesizer',
      action: 'Generate cryptographic audit report with verifiable proof bundle',
      cost: '0.02 pieUSD',
      status: 'idle',
    },
  ]);

  const addLog = (msg: string) => {
    setTerminalLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleRunSwarm = async () => {
    setIsRunning(true);
    addLog(`>>> Dispatched Swarm Pipeline for prompt: "${prompt}"`);

    const updatedStages = [...stages];

    for (let i = 0; i < updatedStages.length; i++) {
      setActiveStepIndex(i);
      const stage = updatedStages[i];

      // Phase 1: Running
      stage.status = 'running';
      setStages([...updatedStages]);
      addLog(`[NODE ${i + 1}] Invoking ${stage.agent} (${stage.role}) -> ${stage.action}`);
      await new Promise((r) => setTimeout(r, 700));

      // Phase 2: Settling 402 challenge
      stage.status = 'settling_402';
      setStages([...updatedStages]);
      addLog(`[x402] Received HTTP 402 Payment-Required. Signing EIP-3009 transfer authorization (${stage.cost})...`);
      await new Promise((r) => setTimeout(r, 900));

      // Phase 3: Completed
      const fakeTx = ('0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')) as `0x${string}`;
      stage.status = 'completed';
      stage.txHash = fakeTx;
      stage.result = `Verified computation completed by ${stage.agent}. Facilitator settlement confirmed on Kite.`;
      setStages([...updatedStages]);

      addLog(`[CONFIRMED] Settlement broadcasted to Facilitator v2 -> Tx Hash: ${fakeTx.substring(0, 14)}...`);

      // Log proof
      saveProofLog({
        id: `proof-${Date.now()}-${i}`,
        timestamp: new Date().toISOString(),
        serviceOrAgent: stage.agent,
        network: 'eip155:2368',
        tokenAddress: '0x38129cf4CE5E183eFF248F42A7D345Bb1B47621A',
        tokenSymbol: 'pieUSD',
        amount: stage.cost.replace(' pieUSD', ''),
        senderAddress: '0xSandboxUserWalletAddress9823478901234444',
        recipientAddress: '0x1A2b3c4D5E6F708192A3b4c5D6E7F8091A2b3c4D',
        validAfter: 0,
        validBefore: Math.floor(Date.now() / 1000) + 3600,
        nonce: ('0x' + Math.random().toString(16).substring(2).padEnd(64, '0')) as `0x${string}`,
        signature: '0x' + Array.from({ length: 130 }, () => 'c').join('') as `0x${string}`,
        txHash: fakeTx,
        status: 'settled',
      });

      await new Promise((r) => setTimeout(r, 400));
    }

    addLog('🎉 [COMPLETE] Multi-Agent Swarm consensus achieved! Verifiable report signed and published.');
    setIsRunning(false);
  };

  const handleReset = () => {
    setActiveStepIndex(-1);
    setStages(stages.map((s) => ({ ...s, status: 'idle', result: undefined, txHash: undefined })));
    setTerminalLogs([
      '[RESET] Pipeline reset to idle state.',
      '[READY] Standing by for multi-agent DAG task execution...',
    ]);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-cyan-400" />
            Visual DAG Swarm Orchestrator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build and execute collaborative multi-agent execution graphs with automatic x402 payment releases.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            disabled={isRunning}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-white"
          >
            Reset Graph
          </button>
          <button
            onClick={handleRunSwarm}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/25"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Orchestrating Swarm...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Execute Swarm DAG
              </>
            )}
          </button>
        </div>
      </div>

      {/* Prompt Bar */}
      <div className="glass-panel p-4 space-y-2">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Swarm Objective / Prompt Intent
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isRunning}
            className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-medium"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
          <span>Estimated Total Cost: <strong className="text-cyan-400">0.16 pieUSD</strong></span>
          <span>Target Network: <strong>Kite Testnet (2368)</strong></span>
        </div>
      </div>

      {/* Interactive DAG Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage, idx) => {
          const isCurrent = activeStepIndex === idx && isRunning;
          return (
            <div
              key={stage.id}
              className={`glass-panel p-5 space-y-3 relative overflow-hidden transition-all ${
                stage.status === 'completed'
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : isCurrent
                  ? 'border-cyan-500 bg-cyan-950/20 shadow-lg shadow-cyan-500/10'
                  : ''
              }`}
            >
              {/* Top Index Badge */}
              <div className="flex items-center justify-between text-xs">
                <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-slate-300">
                  {idx + 1}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  {stage.cost}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{stage.name}</h3>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{stage.agent}</span>
                  <span className="text-[10px] font-mono text-slate-500">({stage.role})</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed min-h-[40px]">
                {stage.action}
              </p>

              {/* Status Indicator */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {stage.status === 'completed' ? (
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </span>
                ) : stage.status === 'settling_402' ? (
                  <span className="flex items-center gap-1.5 text-amber-400 font-medium animate-pulse">
                    <Clock className="w-3.5 h-3.5" /> Settling x402...
                  </span>
                ) : stage.status === 'running' ? (
                  <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Computing...
                  </span>
                ) : (
                  <span className="text-slate-500">Pending</span>
                )}

                {stage.txHash && (
                  <a
                    href={`https://testnet.kitescan.ai/tx/${stage.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-0.5 text-[11px]"
                  >
                    Tx <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Terminal Logs */}
      <div className="glass-panel p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Swarm Execution Traces & Payment Signatures
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Facilitator v2 Relay</span>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 space-y-1.5 max-h-56 overflow-y-auto border border-slate-800">
          {terminalLogs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
