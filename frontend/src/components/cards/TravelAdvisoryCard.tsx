import { Plane, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface TravelAdvisory {
  safe: boolean;
  advice: string;
  tips: string[];
}

interface TravelAdvisoryCardProps {
  advisory: TravelAdvisory;
}

export function TravelAdvisoryCard({ advisory }: TravelAdvisoryCardProps) {
  return (
    <div className={`glass-card border p-6 animate-slide-up ${
      advisory.safe
        ? 'border-green-500/20 bg-gradient-to-br from-green-900/20 to-emerald-900/10'
        : 'border-red-500/20 bg-gradient-to-br from-red-900/20 to-rose-900/10'
    }`}>
      <div className="flex items-start gap-4">
        {/* Left: Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          advisory.safe ? 'bg-green-500/15' : 'bg-red-500/15'
        }`}>
          <Plane className={`w-6 h-6 ${advisory.safe ? 'text-green-400' : 'text-red-400'}`} />
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-white text-lg">Travel Advisory</h3>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              advisory.safe
                ? 'bg-green-500/20 text-green-300'
                : 'bg-red-500/20 text-red-300'
            }`}>
              {advisory.safe
                ? <><CheckCircle className="w-3.5 h-3.5" /> Travel Possible</>
                : <><XCircle className="w-3.5 h-3.5" /> Avoid Travel</>
              }
            </div>
          </div>

          {/* Advice */}
          <p className="text-slate-300 text-sm mb-4 leading-relaxed">{advisory.advice}</p>

          {/* Tips */}
          {advisory.tips && advisory.tips.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {advisory.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 bg-white/5 rounded-lg p-2.5">
                  <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                    advisory.safe ? 'text-green-400' : 'text-red-400'
                  }`} />
                  <span className="text-xs text-slate-300">{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
