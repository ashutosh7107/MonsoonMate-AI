import axios from 'axios';
import { WeatherData } from '../types';

const OPENWEATHER_API_KEY = process.env.WEATHER_API_KEY;
const OPENWEATHER_BASE = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches live weather data for a given city using OpenWeatherMap API.
 * Falls back to Open-Meteo (free, no key required) if OpenWeatherMap fails.
 */
export async function fetchWeatherData(city: string): Promise<WeatherData> {
  if (OPENWEATHER_API_KEY) {
    try {
      return await fetchFromOpenWeatherMap(city);
    } catch (err) {
      console.warn('OpenWeatherMap failed, falling back to Open-Meteo:', err);
    }
  }
  return await fetchFromOpenMeteo(city);
}

async function fetchFromOpenWeatherMap(city: string): Promise<WeatherData> {
  const weatherRes = await axios.get(`${OPENWEATHER_BASE}/weather`, {
    params: {
      q: city,
      appid: OPENWEATHER_API_KEY,
      units: 'metric',
    },
    timeout: 8000,
  });

  const data = weatherRes.data;

  // Try to get weather alerts from OneCall API (requires geocoordinates)
  let alerts: string[] = [];
  try {
    const alertRes = await axios.get(`${OPENWEATHER_BASE}/onecall`, {
      params: {
        lat: data.coord.lat,
        lon: data.coord.lon,
        appid: OPENWEATHER_API_KEY,
        exclude: 'minutely,hourly,daily',
        units: 'metric',
      },
      timeout: 8000,
    });
    if (alertRes.data.alerts) {
      alerts = alertRes.data.alerts.map((a: { description: string }) => a.description);
    }
  } catch {
    // Alerts are optional; continue without them
  }

  const rain1h = data.rain?.['1h'] ?? 0;

  return {
    city: `${data.name}, ${data.sys.country}`,
    temperature: Math.round(data.main.temp),
    humidity: data.main.humidity,
    condition: data.weather[0].main,
    description: data.weather[0].description,
    windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
    rainfall: rain1h,
    feelsLike: Math.round(data.main.feels_like),
    alerts,
    icon: data.weather[0].icon,
  };
}

async function fetchFromOpenMeteo(city: string): Promise<WeatherData> {
  // Step 1: Geocode city name to coordinates
  const geoRes = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
    params: { name: city, count: 1, language: 'en', format: 'json' },
    timeout: 8000,
  });

  const results = geoRes.data.results;
  if (!results || results.length === 0) {
    throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
  }

  const { latitude, longitude, name, country_code } = results[0];

  // Step 2: Fetch current weather
  const weatherRes = await axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude,
      longitude,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'rain',
        'wind_speed_10m',
        'weather_code',
      ].join(','),
      hourly: 'precipitation',
      forecast_days: 1,
      timezone: 'auto',
    },
    timeout: 8000,
  });

  const current = weatherRes.data.current;
  const weatherCode: number = current.weather_code;
  const { condition, description } = wmoCodeToCondition(weatherCode);
  const icon = wmoCodeToIcon(weatherCode);

  return {
    city: `${name}, ${country_code?.toUpperCase() || ''}`,
    temperature: Math.round(current.temperature_2m),
    humidity: current.relative_humidity_2m,
    condition,
    description,
    windSpeed: Math.round(current.wind_speed_10m),
    rainfall: current.rain ?? 0,
    feelsLike: Math.round(current.apparent_temperature),
    alerts: [],
    icon,
  };
}

function wmoCodeToCondition(code: number): { condition: string; description: string } {
  if (code === 0) return { condition: 'Clear', description: 'Clear sky' };
  if (code <= 3) return { condition: 'Clouds', description: 'Partly cloudy' };
  if (code <= 9) return { condition: 'Mist', description: 'Foggy conditions' };
  if (code <= 19) return { condition: 'Drizzle', description: 'Light drizzle' };
  if (code <= 29) return { condition: 'Rain', description: 'Precipitation' };
  if (code <= 39) return { condition: 'Snow', description: 'Snowfall' };
  if (code <= 49) return { condition: 'Mist', description: 'Fog' };
  if (code <= 59) return { condition: 'Drizzle', description: 'Drizzle' };
  if (code <= 69) return { condition: 'Rain', description: 'Rain' };
  if (code <= 79) return { condition: 'Snow', description: 'Snow showers' };
  if (code <= 84) return { condition: 'Rain', description: 'Rain showers' };
  if (code <= 94) return { condition: 'Thunderstorm', description: 'Thunderstorm' };
  return { condition: 'Thunderstorm', description: 'Heavy thunderstorm with hail' };
}

function wmoCodeToIcon(code: number): string {
  if (code === 0) return '01d';
  if (code <= 3) return '02d';
  if (code <= 49) return '50d';
  if (code <= 69) return '09d';
  if (code <= 84) return '10d';
  return '11d';
}
