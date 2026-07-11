import { Languages, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface TranslationCardProps {
  summary?: string;
}

export function TranslationCard({ summary }: TranslationCardProps) {
  const [expanded, setExpanded] = useState(true);

  if (!summary) return null;

  return (
    <div className="glass-card border border-amber-500/20 bg-gradient-to-br from-amber-900/15 to-yellow-900/10 animate-slide-up">
      {/* Header */}
      <div
        className="flex items-center justify-between p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-500/15 rounded-xl flex items-center justify-center">
            <Languages className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Preparedness Plan Summary</h3>
            <p className="text-xs text-slate-400">AI-translated summary of your complete plan</p>
          </div>
        </div>
        {expanded
          ? <ChevronUp className="w-4 h-4 text-slate-400" />
          : <ChevronDown className="w-4 h-4 text-slate-400" />
        }
      </div>

      {/* Content */}
      {expanded && (
        <div className="px-5 pb-5">
          <div className="bg-white/5 rounded-xl p-5">
            <p className="text-slate-200 text-sm leading-loose whitespace-pre-wrap font-light">
              {summary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
