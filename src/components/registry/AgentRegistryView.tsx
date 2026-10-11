import React, { useState } from 'react';
import { Bot, Search, Filter, ShieldCheck, Sparkles } from 'lucide-react';
import { AgentMetadata, AgentRole } from '../../types/agent';
import { StatusBadge } from '../common/StatusBadge';
import { AgentDetailModal } from './AgentDetailModal';

interface AgentRegistryViewProps {
  agents: AgentMetadata[];
  selectedAgent: AgentMetadata | null;
  onSelectAgent: (agent: AgentMetadata | null) => void;
}

export const AgentRegistryView: React.FC<AgentRegistryViewProps> = ({
  agents,
  selectedAgent,
  onSelectAgent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || agent.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const roles: { id: string; label: string }[] = [
    { id: 'all', label: 'All Roles' },
    { id: 'coordinator', label: 'Coordinator' },
    { id: 'researcher', label: 'Researcher' },
    { id: 'auditor', label: 'Auditor' },
    { id: 'synthesizer', label: 'Synthesizer' },
    { id: 'sentinel', label: 'Sentinel' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Bot className="w-7 h-7 text-cyan-400" />
            Autonomous Agent Registry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse verified autonomous specialist nodes on the Kite Agent Network.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by agent name, capability..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-56 sm:w-64"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`px-2.5 py-1 rounded-lg transition-colors capitalize ${
                  selectedRole === r.id
                    ? 'bg-cyan-500/20 text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => onSelectAgent(agent)}
            className="glass-panel p-6 cursor-pointer hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={agent.avatarUrl}
                    alt={agent.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {agent.name}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400 uppercase">
                      {agent.role}
                    </span>
                  </div>
                </div>
                <StatusBadge status={agent.status} />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {agent.bio}
              </p>

              {/* Capabilities Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {agent.capabilities.map((c) => (
                  <span
                    key={c.id}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Specs */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-slate-300">
                Rate: <strong className="text-cyan-400">{agent.capabilities[0]?.costPerInvoke || '0.02'} pieUSD</strong>
              </span>
              <span className="text-emerald-400 font-semibold">{agent.reputationScore}% Rep</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedAgent && (
        <AgentDetailModal agent={selectedAgent} onClose={() => onSelectAgent(null)} />
      )}
    </div>
  );
};
