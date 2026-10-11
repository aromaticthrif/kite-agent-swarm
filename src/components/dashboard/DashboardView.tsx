import React from 'react';
import { 
  Bot, 
  Zap, 
  Coins, 
  ShieldCheck, 
  ArrowUpRight, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { AgentMetadata } from '../../types/agent';
import { StatusBadge } from '../common/StatusBadge';

interface DashboardViewProps {
  agents: AgentMetadata[];
  onNavigateTab: (tab: 'registry' | 'orchestrator' | 'marketplace') => void;
  onSelectAgent: (agent: AgentMetadata) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  agents,
  onNavigateTab,
  onSelectAgent,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-indigo-950/30 p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Autonomous Agent Economy Live on Kite
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Kite Agent Swarm Orchestrator
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Multi-agent task dispatching, DAG consensus arbitration, and zero-deduction x402 micropayments powered by EIP-3009 transfer authorizations on the Kite Blockchain.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('orchestrator')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Layers className="w-4 h-4" />
              Launch Swarm Pipeline
            </button>
            <button
              onClick={() => onNavigateTab('registry')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-medium text-sm border border-slate-700 transition-all"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              Explore Agent Registry
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Swarm Nodes</span>
            <Bot className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">5 / 5</div>
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Operational quorum
          </p>
        </div>

        <div className="glass-panel p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Micropayments Settled</span>
            <Coins className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">429.80 pieUSD</div>
          <p className="text-xs text-slate-400">Zero gas deduction via Facilitator</p>
        </div>

        <div className="glass-panel p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Response Latency</span>
            <Clock className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">241 ms</div>
          <p className="text-xs text-emerald-400">Optimized HTTP 402 loop</p>
        </div>

        <div className="glass-panel p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Safety Guarantee</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">100.0%</div>
          <p className="text-xs text-slate-400">Zero-deduction invariant active</p>
        </div>
      </div>

      {/* Swarm Agents Quick Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              Specialist Agent Network
            </h2>
            <p className="text-xs text-slate-400">Live autonomous nodes available for collaborative execution</p>
          </div>
          <button
            onClick={() => onNavigateTab('registry')}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
          >
            View all agents <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => onSelectAgent(agent)}
              className="glass-panel p-5 cursor-pointer hover:border-cyan-500/40 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={agent.avatarUrl}
                    alt={agent.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {agent.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 uppercase">
                      {agent.role}
                    </span>
                  </div>
                </div>
                <StatusBadge status={agent.status} />
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {agent.bio}
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Fee: {agent.capabilities[0]?.costPerInvoke || '0.02'} pieUSD</span>
                <span className="text-emerald-400">{agent.reputationScore}% Rep</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Protocol Terminal Stream */}
      <div className="glass-panel p-6 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Kite Network Telemetry & Facilitator Heartbeat
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            LIVE PEER STREAM
          </span>
        </div>
        <div className="bg-slate-950/80 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-1.5 border border-slate-800/80">
          <div className="text-slate-500">[2026-10-11T23:25:01Z] RPC Block confirmed: #1,842,910 (Kite Testnet 2368)</div>
          <div className="text-cyan-400">[2026-10-11T23:25:04Z] Facilitator v2 endpoint reachable: https://facilitator.pieverse.io/v2 (Latency: 64ms)</div>
          <div className="text-slate-300">[2026-10-11T23:25:09Z] EIP-712 Domain Separator verified for asset 0x38129cf4... (pieUSD)</div>
          <div className="text-amber-400">[2026-10-11T23:25:12Z] Agent 'Atlas Nexus' completed DAG plan for DeFi audit bounty (#bounty-1)</div>
          <div className="text-emerald-400">[2026-10-11T23:25:15Z] Zero-Deduction Invariant Check: PASSED. No unauthorized asset debits observed.</div>
        </div>
      </div>
    </div>
  );
};
