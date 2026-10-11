import React from 'react';
import { AgentStatus } from '../../types/agent';

interface StatusBadgeProps {
  status: AgentStatus | 'healthy' | 'active' | 'settled';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'idle':
      case 'healthy':
      case 'settled':
      case 'active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'busy':
      case 'validating':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'offline':
      default:
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle()}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      <span className="capitalize">{status}</span>
    </span>
  );
};
