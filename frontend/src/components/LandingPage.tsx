import { CloudRain, Shield, Zap, Globe, ChevronRight, Droplets, Wind, AlertTriangle } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const features = [
  {
    icon: CloudRain,
    title: 'Live Weather Intelligence',
    description: 'Real-time weather data fetched directly from meteorological APIs for accurate, location-specific insights.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Zap,
    title: 'Google Gemini AI',
    description: 'Powered by Gemini 2.0 Flash to generate hyper-personalized preparedness plans tailored to your family.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Shield,
    title: 'Complete Safety Planning',
    description: 'Covers before, during, and after the monsoon with emergency kits, checklists, and local contacts.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Globe,
    title: 'Multilingual Support',
    description: 'Full preparedness plans available in English and Hindi to reach every corner of India.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
];

const stats = [
  { value: '12+', label: 'Safety Sections', icon: Shield },
  { value: '100%', label: 'Live Weather', icon: CloudRain },
  { value: '2', label: 'Languages', icon: Globe },
  { value: 'AI', label: 'Powered by Gemini', icon: Zap },
];

// Animated rain drops
function RainDrops() {
  const drops = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 1.5 + Math.random() * 1.5,
    opacity: 0.1 + Math.random() * 0.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-px bg-gradient-to-b from-transparent via-blue-300 to-transparent rain-drop"
          style={{
            left: `${drop.left}%`,
            height: '60px',
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
            opacity: drop.opacity,
          }}
        />
      ))}
    </div>
  );
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <RainDrops />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <CloudRain className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">MonsoonMate AI</span>
        </div>
        <button
          onClick={onGetStarted}
          className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Get Started <ChevronRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-24 lg:pt-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">Powered by Google Gemini 2.0 Flash</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
          <span className="gradient-text">MonsoonMate</span>
          <br />
          <span className="text-slate-200">AI</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl lg:text-2xl text-slate-400 font-light mb-4 max-w-2xl">
          Your AI-Powered Monsoon Preparedness Assistant
        </p>

        {/* Description */}
        <p className="text-base text-slate-500 max-w-xl mb-12 leading-relaxed">
          Generate personalized preparedness plans using live weather data and Google Gemini.
          Stay safe, stay prepared — for you and your entire family.
        </p>

        {/* CTA Button */}
        <button
          onClick={onGetStarted}
          className="btn-primary text-lg px-10 py-4 flex items-center gap-3 group"
        >
          <CloudRain className="w-5 h-5" />
          Get Started
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Live indicator */}
        <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Live weather data • AI-generated plans • No signup required</span>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 lg:px-12 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card p-6 text-center">
                <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 lg:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Everything You Need</h2>
            <p className="text-slate-400">Comprehensive monsoon safety powered by live data and AI</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className={`glass-card-hover p-6 border ${feature.border}`}>
                  <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What we cover */}
      <section className="relative z-10 px-6 lg:px-12 pb-20">
        <div className="max-w-5xl mx-auto glass-card p-8 lg:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Complete Coverage</h2>
            <p className="text-slate-400">Your personalized plan covers every phase of monsoon season</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: AlertTriangle, label: 'Real-Time Alerts', desc: 'Live weather status' },
              { icon: Shield, label: 'Risk Assessment', desc: 'Low / Moderate / High' },
              { icon: CloudRain, label: 'Before Monsoon', desc: '8+ action items' },
              { icon: Droplets, label: 'During Heavy Rain', desc: 'Safety protocols' },
              { icon: Wind, label: 'After Rain Recovery', desc: 'Restoration steps' },
              { icon: Zap, label: 'Emergency Kit', desc: 'Interactive checklist' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3 p-3">
                  <div className="w-8 h-8 bg-blue-500/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="relative z-10 px-6 lg:px-12 pb-20 text-center">
        <button
          onClick={onGetStarted}
          className="btn-primary text-lg px-12 py-4"
        >
          Generate My Monsoon Plan →
        </button>
        <p className="mt-4 text-sm text-slate-500">Free • No signup • Instant results</p>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-6 text-center">
        <p className="text-xs text-slate-600">
          MonsoonMate AI • Built for Google PromptWars • Powered by Google Gemini 2.0 Flash
        </p>
      </footer>
    </div>
  );
}
