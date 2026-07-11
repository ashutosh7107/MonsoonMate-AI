import { Thermometer, Droplets, Wind, CloudRain } from 'lucide-react';
import { WeatherData } from '../../types';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const getWeatherEmoji = (condition: string): string => {
    const c = condition.toLowerCase();
    if (c.includes('thunder')) return '⛈️';
    if (c.includes('heavy rain') || c.includes('rain')) return '🌧️';
    if (c.includes('drizzle')) return '🌦️';
    if (c.includes('cloud')) return '☁️';
    if (c.includes('mist') || c.includes('fog')) return '🌫️';
    if (c.includes('clear') || c.includes('sun')) return '☀️';
    if (c.includes('snow')) return '❄️';
    return '🌤️';
  };

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border-blue-500/20 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium uppercase tracking-wider">Live Weather</span>
          </div>
          <h3 className="text-white font-semibold text-lg leading-tight">{weather.city}</h3>
          <p className="text-slate-400 text-sm capitalize">{weather.description}</p>
        </div>
        <div className="text-5xl">{getWeatherEmoji(weather.condition)}</div>
      </div>

      {/* Main temp */}
      <div className="mb-5">
        <span className="text-6xl font-black text-white">{weather.temperature}°</span>
        <span className="text-slate-400 text-lg ml-1">C</span>
        <div className="text-slate-400 text-sm mt-1">Feels like {weather.feelsLike}°C</div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-xl p-3 flex items-center gap-2.5">
          <Droplets className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <div>
            <div className="text-xs text-slate-500">Humidity</div>
            <div className="text-sm font-semibold text-white">{weather.humidity}%</div>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 flex items-center gap-2.5">
          <Wind className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <div>
            <div className="text-xs text-slate-500">Wind</div>
            <div className="text-sm font-semibold text-white">{weather.windSpeed} km/h</div>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 flex items-center gap-2.5">
          <CloudRain className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <div>
            <div className="text-xs text-slate-500">Rainfall</div>
            <div className="text-sm font-semibold text-white">{weather.rainfall} mm/h</div>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 flex items-center gap-2.5">
          <Thermometer className="w-4 h-4 text-orange-400 flex-shrink-0" />
          <div>
            <div className="text-xs text-slate-500">Condition</div>
            <div className="text-sm font-semibold text-white truncate">{weather.condition}</div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {weather.alerts && weather.alerts.length > 0 && (
        <div className="mt-4 bg-red-500/10 border border-red-500/25 rounded-xl p-3">
          <p className="text-xs font-semibold text-red-300 uppercase tracking-wider mb-2">⚠️ Active Alerts</p>
          {weather.alerts.map((alert, i) => (
            <p key={i} className="text-xs text-red-200 line-clamp-2">{alert}</p>
          ))}
        </div>
      )}
    </div>
  );
}
