import { WeatherData, PreparednessPlan } from '../types';
import { CloudRain, RefreshCw } from 'lucide-react';
import {
  AlertBanner,
  WeatherCard,
  RiskCard,
  ChecklistCard,
  TravelAdvisoryCard,
  RecommendationsCard,
  EmergencyContactsCard,
  TranslationCard
} from './cards';

interface DashboardProps {
  weather: WeatherData;
  plan: PreparednessPlan;
  onReset: () => void;
}

export function Dashboard({ weather, plan, onReset }: DashboardProps) {
  return (
    <div className="min-h-screen px-4 py-6 lg:px-8 lg:py-8">
      {/* Top bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <CloudRain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">MonsoonMate AI</h1>
            <p className="text-xs text-slate-500">{weather.city} • Generated just now</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-white/25 text-slate-300 hover:text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">New Plan</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-4">
        {/* Real-Time Alert Banner - always at top */}
        <AlertBanner alert={plan.realTimeAlert} />

        {/* Weather + Risk side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <WeatherCard weather={weather} />
          <RiskCard risk={plan.overallRiskScore} />
        </div>

        {/* Checklists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChecklistCard
            title="Before Monsoon"
            subtitle="Prepare in advance"
            items={plan.beforeMonsoonChecklist}
            color="blue"
            icon="prep"
          />
          <ChecklistCard
            title="During Heavy Rain"
            subtitle="Stay safe right now"
            items={plan.duringRainChecklist}
            color="amber"
            icon="rain"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChecklistCard
            title="After Rain Recovery"
            subtitle="Post-rain restoration"
            items={plan.afterRainChecklist}
            color="green"
            icon="recovery"
          />
          <ChecklistCard
            title="Emergency Kit"
            subtitle="Interactive checklist"
            items={plan.emergencyKitChecklist}
            color="rose"
            icon="kit"
            interactive={true}
          />
        </div>

        {/* Travel advisory */}
        <TravelAdvisoryCard advisory={plan.travelAdvisory} />

        {/* Three-column recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RecommendationsCard
            title="Home Safety"
            icon="home"
            items={plan.homeSafetyRecommendations}
            color="indigo"
          />
          <RecommendationsCard
            title="Medical"
            icon="medical"
            items={plan.medicalRecommendations}
            color="rose"
          />
          <RecommendationsCard
            title="Food & Water"
            icon="food"
            items={plan.foodAndWaterPreparation}
            color="emerald"
          />
        </div>

        {/* Personalized tips */}
        <RecommendationsCard
          title="Personalized Safety Tips"
          icon="tips"
          items={plan.personalizedSafetyTips}
          color="purple"
          wide={true}
        />

        {/* Emergency contacts */}
        <EmergencyContactsCard contacts={plan.emergencyContacts} />

        {/* Translation */}
        <TranslationCard summary={plan.translatedSummary} />

        {/* Footer action */}
        <div className="glass-card p-6 text-center">
          <p className="text-slate-400 text-sm mb-4">Need a plan for a different city or updated conditions?</p>
          <button onClick={onReset} className="btn-primary">
            Generate New Plan
          </button>
        </div>
      </div>
    </div>
  );
}
