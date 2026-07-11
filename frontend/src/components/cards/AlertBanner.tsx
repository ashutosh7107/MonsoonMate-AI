import { AlertTriangle, Info, Zap } from 'lucide-react';

interface Alert {
  status: string;
  recommendation: string;
  severity: 'info' | 'warning' | 'critical';
}

interface AlertBannerProps {
  alert: Alert;
}

const severityConfig = {
  info: {
    bg: 'bg-blue-500/15 border-blue-500/30',
    icon: Info,
    iconColor: 'text-blue-400',
    labelBg: 'bg-blue-500/20',
    labelText: 'text-blue-300',
    label: 'LIVE STATUS',
    dot: 'bg-blue-400',
  },
  warning: {
    bg: 'bg-amber-500/15 border-amber-500/30',
    icon: AlertTriangle,
    iconColor: 'text-amber-400',
    labelBg: 'bg-amber-500/20',
    labelText: 'text-amber-300',
    label: 'WEATHER ALERT',
    dot: 'bg-amber-400',
  },
  critical: {
    bg: 'bg-red-500/15 border-red-500/30',
    icon: Zap,
    iconColor: 'text-red-400',
    labelBg: 'bg-red-500/20',
    labelText: 'text-red-300',
    label: 'CRITICAL ALERT',
    dot: 'bg-red-400',
  },
};

export function AlertBanner({ alert }: AlertBannerProps) {
  const config = severityConfig[alert.severity] || severityConfig.info;
  const Icon = config.icon;

  return (
    <div className={`glass-card border ${config.bg} p-4 animate-fade-in`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${config.labelBg} ${config.labelText}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
              {config.label}
            </span>
          </div>
          <p className="text-white font-semibold text-lg leading-tight mb-1">{alert.status}</p>
          <p className="text-slate-300 text-sm">
            <span className="font-medium text-slate-200">AI Recommendation:</span>{' '}
            {alert.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
