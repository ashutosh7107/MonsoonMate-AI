import { useState } from 'react';
import {
  ClipboardList, CloudRain, RotateCcw, Package,
  CheckSquare, Square, ChevronDown, ChevronUp,
  AlertCircle, AlertTriangle, Info
} from 'lucide-react';
import { ChecklistItem } from '../../types';

interface ChecklistCardProps {
  title: string;
  subtitle: string;
  items: ChecklistItem[];
  color: 'blue' | 'amber' | 'green' | 'rose';
  icon: 'prep' | 'rain' | 'recovery' | 'kit';
  interactive?: boolean;
}

const colorConfig = {
  blue: {
    bg: 'from-blue-900/20 to-blue-900/10',
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    badge: 'bg-blue-500/15 text-blue-300',
    highPriority: 'bg-red-500/10 border-l-2 border-red-400',
    medPriority: 'bg-amber-500/10 border-l-2 border-amber-400',
    lowPriority: 'bg-white/5',
  },
  amber: {
    bg: 'from-amber-900/20 to-orange-900/10',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    badge: 'bg-amber-500/15 text-amber-300',
    highPriority: 'bg-red-500/10 border-l-2 border-red-400',
    medPriority: 'bg-amber-500/10 border-l-2 border-amber-400',
    lowPriority: 'bg-white/5',
  },
  green: {
    bg: 'from-green-900/20 to-emerald-900/10',
    border: 'border-green-500/20',
    iconBg: 'bg-green-500/15',
    iconColor: 'text-green-400',
    badge: 'bg-green-500/15 text-green-300',
    highPriority: 'bg-red-500/10 border-l-2 border-red-400',
    medPriority: 'bg-amber-500/10 border-l-2 border-amber-400',
    lowPriority: 'bg-white/5',
  },
  rose: {
    bg: 'from-rose-900/20 to-pink-900/10',
    border: 'border-rose-500/20',
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-400',
    badge: 'bg-rose-500/15 text-rose-300',
    highPriority: 'bg-red-500/10 border-l-2 border-red-400',
    medPriority: 'bg-amber-500/10 border-l-2 border-amber-400',
    lowPriority: 'bg-white/5',
  },
};

const iconMap = {
  prep: ClipboardList,
  rain: CloudRain,
  recovery: RotateCcw,
  kit: Package,
};

const priorityIcon = {
  high: AlertCircle,
  medium: AlertTriangle,
  low: Info,
};

const priorityLabel = {
  high: 'text-red-400',
  medium: 'text-amber-400',
  low: 'text-slate-500',
};

export function ChecklistCard({ title, subtitle, items, color, icon, interactive = false }: ChecklistCardProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(true);
  const config = colorConfig[color];
  const Icon = iconMap[icon];

  const PREVIEW_COUNT = 5;
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, PREVIEW_COUNT);

  const toggleCheck = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const completionPct = interactive && items.length > 0
    ? Math.round((checked.size / items.length) * 100)
    : null;

  return (
    <div className={`glass-card bg-gradient-to-br ${config.bg} border ${config.border} animate-slide-up`}>
      {/* Header */}
      <div
        className="flex items-center justify-between p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 ${config.iconBg} rounded-xl flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-xs text-slate-400">{subtitle} • {items.length} items</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {completionPct !== null && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.badge}`}>
              {completionPct}%
            </span>
          )}
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </div>

      {/* Progress bar for interactive */}
      {interactive && completionPct !== null && (
        <div className="px-5 pb-3">
          <div className="w-full bg-white/5 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-400 transition-all duration-500"
              style={{ width: `${completionPct}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">{checked.size} of {items.length} items ready</p>
        </div>
      )}

      {/* Items */}
      {expanded && (
        <div className="px-5 pb-5 space-y-2">
          {displayedItems.map((item) => {
            const isChecked = checked.has(item.id);
            const PriorityIcon = priorityIcon[item.priority] || Info;
            const itemBg = item.priority === 'high' ? config.highPriority
              : item.priority === 'medium' ? config.medPriority
              : config.lowPriority;

            return (
              <div
                key={item.id}
                className={`${itemBg} rounded-lg p-3 transition-all duration-200 ${interactive ? 'cursor-pointer' : ''} ${isChecked ? 'opacity-50' : ''}`}
                onClick={() => interactive && toggleCheck(item.id)}
              >
                <div className="flex items-start gap-3">
                  {interactive ? (
                    isChecked ? (
                      <CheckSquare className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    )
                  ) : (
                    <PriorityIcon className={`w-3.5 h-3.5 ${priorityLabel[item.priority]} flex-shrink-0 mt-0.5`} />
                  )}
                  <div>
                    <p className={`text-sm ${isChecked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {item.task}
                    </p>
                    {item.category && (
                      <span className="text-xs text-slate-600 mt-0.5 block">{item.category}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {items.length > PREVIEW_COUNT && (
            <button
              className="w-full text-xs text-slate-400 hover:text-white py-2 transition-colors flex items-center justify-center gap-1"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <><ChevronUp className="w-3.5 h-3.5" /> Show Less</>
              ) : (
                <><ChevronDown className="w-3.5 h-3.5" /> Show {items.length - PREVIEW_COUNT} More Items</>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
