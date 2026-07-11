import axios from 'axios';
import { WeatherData } from '../types';

/**
 * Fetches live weather data for a given city using Open-Meteo (free, no API key required).
 * Uses the Open-Meteo Geocoding API to resolve city names to coordinates.
 */
export async function fetchWeatherData(city: string): Promise<WeatherData> {
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
