import React from 'react';
import { 
  Bot, 
  Activity, 
  Layers, 
  Cpu, 
  Briefcase, 
  FileText, 
  Receipt,
  ExternalLink 
} from 'lucide-react';

export type NavTab = 'dashboard' | 'registry' | 'orchestrator' | 'marketplace' | 'docs';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  proofCount: number;
  onOpenProofDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  proofCount,
  onOpenProofDrawer,
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Swarm Overview', icon: Activity },
    { id: 'registry', label: 'Agent Registry', icon: Bot },
    { id: 'orchestrator', label: 'DAG Orchestrator', icon: Layers },
    { id: 'marketplace', label: 'Bounty Board', icon: Briefcase },
    { id: 'docs', label: 'Architecture & Spec', icon: FileText },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Kite Swarm
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                x402 Protocol
              </span>
            </div>
            <p className="text-xs text-slate-400">Autonomous Multi-Agent Hub</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-3">
          {/* Network Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Kite Testnet (2368)</span>
          </div>

          {/* Proof Drawer Button */}
          <button
            onClick={onOpenProofDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            <Receipt className="w-4 h-4 text-cyan-400" />
            <span>Proof Receipts</span>
            {proofCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-cyan-500 text-black text-[10px] font-bold">
                {proofCount}
              </span>
            )}
          </button>

          {/* KiteScan Explorer External Link */}
          <a
            href="https://testnet.kitescan.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>KiteScan</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
};
