import { Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface Risk {
  level: 'Low' | 'Moderate' | 'High';
  score: number;
  explanation: string;
}

interface RiskCardProps {
  risk: Risk;
}

const riskConfig = {
  Low: {
    gradient: 'from-green-900/30 to-emerald-900/20',
    border: 'border-green-500/25',
    icon: CheckCircle,
    iconColor: 'text-green-400',
    badgeBg: 'bg-green-500/20',
    badgeText: 'text-green-300',
    barColor: 'bg-gradient-to-r from-green-500 to-emerald-400',
    label: 'Low Risk',
    desc: 'Conditions are manageable with standard precautions.',
  },
  Moderate: {
    gradient: 'from-amber-900/30 to-orange-900/20',
    border: 'border-amber-500/25',
    icon: AlertTriangle,
    iconColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-300',
    barColor: 'bg-gradient-to-r from-amber-500 to-orange-400',
    label: 'Moderate Risk',
    desc: 'Extra caution and preparation are advised.',
  },
  High: {
    gradient: 'from-red-900/30 to-rose-900/20',
    border: 'border-red-500/25',
    icon: TrendingUp,
    iconColor: 'text-red-400',
    badgeBg: 'bg-red-500/20',
    badgeText: 'text-red-300',
    barColor: 'bg-gradient-to-r from-red-500 to-rose-400',
    label: 'High Risk',
    desc: 'Immediate action and heightened preparedness required.',
  },
};

export function RiskCard({ risk }: RiskCardProps) {
  const config = riskConfig[risk.level] || riskConfig.Moderate;
  const Icon = config.icon;
  const percentage = Math.round((risk.score / 10) * 100);

  return (
    <div className={`glass-card p-6 bg-gradient-to-br ${config.gradient} border ${config.border} animate-slide-up`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Risk Assessment</span>
          </div>
          <h3 className="text-white font-semibold text-lg">Overall Monsoon Risk</h3>
        </div>
        <div className={`p-2.5 rounded-xl ${config.badgeBg}`}>
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>
      </div>

      {/* Risk level badge */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.badgeBg} mb-5`}>
        <span className={`text-xl font-black ${config.badgeText}`}>{config.label}</span>
      </div>

      {/* Score bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Risk Level</span>
          <span className="font-semibold text-white">{risk.score}/10</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${config.barColor} shadow-lg transition-all duration-1000`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-600 mt-1">
          <span>Safe</span>
          <span>Dangerous</span>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-white/5 rounded-xl p-4">
        <p className="text-slate-300 text-sm leading-relaxed">{risk.explanation}</p>
      </div>
    </div>
  );
}
