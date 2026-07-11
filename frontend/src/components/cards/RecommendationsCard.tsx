import {
  Home, Heart, Leaf, Lightbulb,
  ChevronRight
} from 'lucide-react';

interface RecommendationsCardProps {
  title: string;
  icon: 'home' | 'medical' | 'food' | 'tips';
  items: string[];
  color: 'indigo' | 'rose' | 'emerald' | 'purple';
  wide?: boolean;
}

const colorConfig = {
  indigo: {
    bg: 'from-indigo-900/20 to-blue-900/10',
    border: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-400',
    bullet: 'text-indigo-400',
    bulletBg: 'bg-indigo-500/10',
  },
  rose: {
    bg: 'from-rose-900/20 to-pink-900/10',
    border: 'border-rose-500/20',
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-400',
    bullet: 'text-rose-400',
    bulletBg: 'bg-rose-500/10',
  },
  emerald: {
    bg: 'from-emerald-900/20 to-green-900/10',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    bullet: 'text-emerald-400',
    bulletBg: 'bg-emerald-500/10',
  },
  purple: {
    bg: 'from-purple-900/20 to-violet-900/10',
    border: 'border-purple-500/20',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    bullet: 'text-purple-400',
    bulletBg: 'bg-purple-500/10',
  },
};

const iconMap = {
  home: Home,
  medical: Heart,
  food: Leaf,
  tips: Lightbulb,
};

export function RecommendationsCard({ title, icon, items, color, wide = false }: RecommendationsCardProps) {
  const config = colorConfig[color];
  const Icon = iconMap[icon];

  return (
    <div className={`glass-card bg-gradient-to-br ${config.bg} border ${config.border} p-5 animate-slide-up`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 ${config.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="text-xs text-slate-500">{items.length} recommendations</p>
        </div>
      </div>

      {/* Items */}
      <div className={wide ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2' : 'space-y-2'}>
        {items.map((item, i) => (
          <div key={i} className={`flex items-start gap-2.5 ${config.bulletBg} rounded-lg p-2.5`}>
            <ChevronRight className={`w-3.5 h-3.5 ${config.bullet} flex-shrink-0 mt-0.5`} />
            <span className="text-xs text-slate-300 leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
