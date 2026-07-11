import { useState } from 'react';
import { CloudRain, ArrowLeft, Users, Car, Heart, MapPin, Languages, ChevronDown, Send } from 'lucide-react';
import { UserInput } from '../types';

interface InputFormProps {
  onSubmit: (input: UserInput) => Promise<void>;
  onBack: () => void;
  error: string | null;
  loading: boolean;
}

const defaultInput: UserInput = {
  city: '',
  familySize: 1,
  hasChildren: false,
  hasSeniors: false,
  hasPets: false,
  vehicleType: 'none',
  houseType: 'apartment',
  medicalConditions: '',
  travelPlanned: false,
  preferredLanguage: 'english',
};

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function FormSection({ icon, title, children }: SectionProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 bg-blue-500/15 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}

function Toggle({ label, value, onChange, description }: ToggleProps) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div>
        <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{label}</div>
        {description && <div className="text-xs text-slate-500 mt-0.5">{description}</div>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
          value ? 'bg-blue-600' : 'bg-slate-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  );
}

interface RadioGroupProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}

function RadioGroup({ label, options, value, onChange }: RadioGroupProps) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              value === opt.value
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white/5 text-slate-300 border border-white/10 hover:border-white/25 hover:text-white'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function InputForm({ onSubmit, onBack, error, loading }: InputFormProps) {
  const [input, setInput] = useState<UserInput>(defaultInput);
  const [formError, setFormError] = useState<string>('');

  const update = <K extends keyof UserInput>(key: K, value: UserInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.city.trim()) {
      setFormError('Please enter a city name.');
      return;
    }
    if (input.familySize < 1) {
      setFormError('Family size must be at least 1.');
      return;
    }
    await onSubmit(input);
  };

  const displayError = formError || error;

  return (
    <div className="min-h-screen px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <CloudRain className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">MonsoonMate AI</h1>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Your Profile</h2>
        <p className="text-slate-400">Tell us about yourself so we can personalize your monsoon preparedness plan.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        {/* Location */}
        <FormSection icon={<MapPin className="w-4 h-4 text-blue-400" />} title="Location">
          <div>
            <label className="label">City *</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Mumbai, Delhi, Bangalore, Chennai"
              value={input.city}
              onChange={(e) => update('city', e.target.value)}
              required
            />
            <p className="text-xs text-slate-500 mt-1.5">Enter the city for which you want the monsoon plan</p>
          </div>
        </FormSection>

        {/* Family */}
        <FormSection icon={<Users className="w-4 h-4 text-purple-400" />} title="Family Information">
          <div>
            <label className="label">Family Size *</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => update('familySize', Math.max(1, input.familySize - 1))}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:border-white/25 transition-colors text-lg font-bold flex items-center justify-center"
              >
                −
              </button>
              <span className="text-2xl font-bold text-white w-12 text-center">{input.familySize}</span>
              <button
                type="button"
                onClick={() => update('familySize', Math.min(50, input.familySize + 1))}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:border-white/25 transition-colors text-lg font-bold flex items-center justify-center"
              >
                +
              </button>
              <span className="text-slate-400 text-sm">{input.familySize === 1 ? 'person' : 'people'}</span>
            </div>
          </div>

          <Toggle
            label="Children in Family"
            description="Kids under 12 years old"
            value={input.hasChildren}
            onChange={(v) => update('hasChildren', v)}
          />
          <Toggle
            label="Senior Citizens"
            description="Family members above 60 years"
            value={input.hasSeniors}
            onChange={(v) => update('hasSeniors', v)}
          />
          <Toggle
            label="Pets"
            description="Dogs, cats, or other animals"
            value={input.hasPets}
            onChange={(v) => update('hasPets', v)}
          />
        </FormSection>

        {/* Transport & Home */}
        <FormSection icon={<Car className="w-4 h-4 text-amber-400" />} title="Transport & Home">
          <RadioGroup
            label="Vehicle Type"
            options={[
              { value: 'bike', label: '🏍️ Bike' },
              { value: 'car', label: '🚗 Car' },
              { value: 'none', label: '🚶 None' },
            ]}
            value={input.vehicleType}
            onChange={(v) => update('vehicleType', v as UserInput['vehicleType'])}
          />
          <RadioGroup
            label="House Type"
            options={[
              { value: 'apartment', label: '🏢 Apartment' },
              { value: 'independent', label: '🏠 Independent House' },
            ]}
            value={input.houseType}
            onChange={(v) => update('houseType', v as UserInput['houseType'])}
          />
        </FormSection>

        {/* Health & Travel */}
        <FormSection icon={<Heart className="w-4 h-4 text-rose-400" />} title="Health & Travel">
          <div>
            <label className="label">Medical Conditions (Optional)</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. diabetes, asthma, hypertension..."
              value={input.medicalConditions}
              onChange={(e) => update('medicalConditions', e.target.value)}
              maxLength={200}
            />
          </div>
          <Toggle
            label="Travel Planned During Monsoon?"
            description="Planning to travel in the next 7 days"
            value={input.travelPlanned}
            onChange={(v) => update('travelPlanned', v)}
          />
        </FormSection>

        {/* Language */}
        <FormSection icon={<Languages className="w-4 h-4 text-teal-400" />} title="Preferred Language">
          <div>
            <label className="label">Plan Language</label>
            <div className="relative">
              <select
                className="input-field appearance-none pr-10"
                value={input.preferredLanguage}
                onChange={(e) => update('preferredLanguage', e.target.value as UserInput['preferredLanguage'])}
              >
                <option value="english">🇬🇧 English</option>
                <option value="hindi">🇮🇳 Hindi (हिंदी)</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <p className="text-xs text-slate-500 mt-1.5">Your plan will include a full translation in the selected language</p>
          </div>
        </FormSection>

        {/* Error */}
        {displayError && (
          <div className="glass-card border-red-500/30 p-4 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-red-400 text-xs font-bold">!</span>
            </div>
            <p className="text-red-300 text-sm">{displayError}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-base py-4 flex items-center justify-center gap-3"
        >
          <Send className="w-5 h-5" />
          Generate My Monsoon Plan
        </button>

        <p className="text-center text-xs text-slate-600 pb-8">
          Live weather will be fetched automatically. AI plan generation takes ~15–30 seconds.
        </p>
      </form>
    </div>
  );
}
