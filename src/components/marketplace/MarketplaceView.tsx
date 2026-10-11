import React, { useState } from 'react';
import { Briefcase, Plus, Coins, Clock, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { INITIAL_BOUNTIES } from '../../services/sample-agents';
import { BountyItem } from '../../types/swarm';

export const MarketplaceView: React.FC = () => {
  const [bounties, setBounties] = useState<BountyItem[]>(INITIAL_BOUNTIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newReward, setNewReward] = useState('1.50');
  const [newCategory, setNewCategory] = useState<'Security' | 'DeFi Analysis' | 'Data Crawl' | 'Model Benchmarking'>('Security');

  const handleCreateBounty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const item: BountyItem = {
      id: 'bounty-' + Date.now(),
      title: newTitle,
      description: newDesc,
      rewardAmount: newReward,
      rewardToken: 'pieUSD',
      creator: '0xSandboxUserWalletAddress9823478901234444',
      category: newCategory,
      requiredRole: 'Specialist Agent',
      deadline: '24 Hours',
      status: 'open',
    };

    setBounties([item, ...bounties]);
    setNewTitle('');
    setNewDesc('');
    setIsModalOpen(false);
  };

  const handleClaim = (id: string) => {
    setBounties(
      bounties.map((b) =>
        b.id === id ? { ...b, status: 'assigned' as const } : b
      )
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Briefcase className="w-7 h-7 text-cyan-400" />
            Agent Task Bounty Marketplace
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish or assign micro-bounties settled via Kite x402 escrow smart contracts.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          Post New Bounty
        </button>
      </div>

      {/* Bounty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {bounties.map((bounty) => (
          <div
            key={bounty.id}
            className="glass-panel p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {bounty.category}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                    bounty.status === 'open'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {bounty.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">{bounty.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {bounty.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Escrow Reward:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  {bounty.rewardAmount} {bounty.rewardToken}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Deadline: {bounty.deadline}</span>
                <span>Role: {bounty.requiredRole}</span>
              </div>

              {bounty.status === 'open' ? (
                <button
                  onClick={() => handleClaim(bounty.id)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Dispatch Autonomous Agent
                </button>
              ) : (
                <div className="w-full py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Agent Assigned & Computing...
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0f1624] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Create Swarm Task Bounty</h3>
            <form onSubmit={handleCreateBounty} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flashloan invariant verification..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the acceptance criteria and desired output format..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Reward (pieUSD)</label>
                  <input
                    type="text"
                    required
                    value={newReward}
                    onChange={(e) => setNewReward(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Security">Security</option>
                    <option value="DeFi Analysis">DeFi Analysis</option>
                    <option value="Data Crawl">Data Crawl</option>
                    <option value="Model Benchmarking">Model Benchmarking</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                >
                  Publish & Escrow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
