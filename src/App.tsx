import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/common/Navbar';
import { DashboardView } from './components/dashboard/DashboardView';
import { AgentRegistryView } from './components/registry/AgentRegistryView';
import { OrchestratorView } from './components/orchestrator/OrchestratorView';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { DocsView } from './components/docs/DocsView';
import { ProofLogDrawer } from './components/common/ProofLogDrawer';
import { INITIAL_AGENTS } from './services/sample-agents';
import { AgentMetadata } from './types/agent';
import { getStoredProofs, clearProofLogs } from './services/proof-logger';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [agents] = useState<AgentMetadata[]>(INITIAL_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState<AgentMetadata | null>(null);

  // Proof logs state
  const [proofs, setProofs] = useState(getStoredProofs);
  const [isProofDrawerOpen, setIsProofDrawerOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setProofs(getStoredProofs());
    };
    window.addEventListener('proof_logs_updated', handleUpdate);
    return () => window.removeEventListener('proof_logs_updated', handleUpdate);
  }, []);

  const handleClearProofs = () => {
    clearProofLogs();
    setProofs([]);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col bg-grid-pattern selection:bg-cyan-500 selection:text-black">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        proofCount={proofs.length}
        onOpenProofDrawer={() => setIsProofDrawerOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            agents={agents}
            onNavigateTab={setActiveTab}
            onSelectAgent={setSelectedAgent}
          />
        )}

        {activeTab === 'registry' && (
          <AgentRegistryView
            agents={agents}
            selectedAgent={selectedAgent}
            onSelectAgent={setSelectedAgent}
          />
        )}

        {activeTab === 'orchestrator' && <OrchestratorView />}

        {activeTab === 'marketplace' && <MarketplaceView />}

        {activeTab === 'docs' && <DocsView />}
      </main>

      {/* Proof Log Drawer */}
      <ProofLogDrawer
        isOpen={isProofDrawerOpen}
        onClose={() => setIsProofDrawerOpen(false)}
        proofs={proofs}
        onClear={handleClearProofs}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#080c13] py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Kite Agent Swarm Orchestrator v1.0.0</span>
          </div>
          <p className="text-slate-400">
            Powered by Kite Blockchain (EIP-155: 2368 / 2366) · Built for the Autonomous AI Economy
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://testnet.kitescan.ai" target="_blank" rel="noreferrer" className="hover:text-cyan-400">
              KiteScan
            </a>
            <a href="https://gokite.ai" target="_blank" rel="noreferrer" className="hover:text-cyan-400">
              GoKite.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
