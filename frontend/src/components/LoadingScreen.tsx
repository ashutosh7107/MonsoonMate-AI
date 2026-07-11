import { CloudRain } from 'lucide-react';

const messages = [
  'Fetching live weather data...',
  'Analyzing monsoon patterns...',
  'Consulting Google Gemini AI...',
  'Generating your personalized plan...',
  'Preparing safety recommendations...',
  'Almost ready...',
];

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Animated cloud */}
      <div className="relative mb-10">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/40 animate-pulse-slow">
          <CloudRain className="w-12 h-12 text-white" />
        </div>
        {/* Orbiting rings */}
        <div className="absolute inset-0 rounded-3xl border-2 border-blue-400/30 animate-ping" />
        <div className="absolute -inset-3 rounded-[28px] border border-blue-400/15 animate-pulse" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-3">Generating Your Plan</h2>
      <p className="text-slate-400 text-center mb-8 max-w-xs">
        MonsoonMate AI is fetching live weather and creating your personalized monsoon preparedness plan
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-blue-400"
            style={{
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Rotating messages */}
      <div className="glass-card px-6 py-3 text-sm text-slate-400 text-center">
        <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
        Powered by Google Gemini 2.0 Flash
      </div>

      {/* Step list */}
      <div className="mt-8 space-y-2 max-w-xs w-full">
        {messages.map((msg, i) => (
          <div
            key={msg}
            className="flex items-center gap-3 text-sm"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
            </div>
            <span className="text-slate-500">{msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
