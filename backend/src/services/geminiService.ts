import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserInput, WeatherData, PreparednessPlan } from '../types';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY is not set. Gemini features will be unavailable.');
}

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export async function generatePreparednessPlan(
  userInput: UserInput,
  weather: WeatherData
): Promise<PreparednessPlan> {
  if (!genAI) {
    throw new Error('Gemini API key is not configured on the server.');
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.3,
      topP: 0.8,
      responseMimeType: 'application/json',
    },
  });

  const prompt = buildPrompt(userInput, weather);

  const result = await model.generateContent(prompt);
  const responseText = result.response.text().trim();

  let plan: PreparednessPlan;
  try {
    plan = JSON.parse(responseText);
  } catch {
    // Attempt to extract JSON from response if there's any wrapping
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      plan = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Gemini returned an invalid JSON response. Please try again.');
    }
  }

  return plan;
}

function buildPrompt(user: UserInput, weather: WeatherData): string {
  const vehicleMap = { bike: 'motorcycle/scooter', car: 'car', none: 'no vehicle' };
  const houseMap = { apartment: 'apartment/flat', independent: 'independent house/villa' };

  return `
You are MonsoonMate AI, an expert disaster preparedness assistant specializing in monsoon season safety for India and South Asia.

## Live Weather Data
- City: ${weather.city}
- Temperature: ${weather.temperature}°C (feels like ${weather.feelsLike}°C)
- Humidity: ${weather.humidity}%
- Condition: ${weather.condition} - ${weather.description}
- Wind Speed: ${weather.windSpeed} km/h
- Current Rainfall: ${weather.rainfall} mm/hour
- Active Weather Alerts: ${weather.alerts.length > 0 ? weather.alerts.join('; ') : 'None reported'}

## User Profile
- Family Size: ${user.familySize} person(s)
- Children in Family: ${user.hasChildren ? 'Yes' : 'No'}
- Senior Citizens: ${user.hasSeniors ? 'Yes' : 'No'}
- Pets: ${user.hasPets ? 'Yes' : 'No'}
- Vehicle Type: ${vehicleMap[user.vehicleType]}
- Home Type: ${houseMap[user.houseType]}
- Medical Conditions: ${user.medicalConditions || 'None specified'}
- Travel Planned: ${user.travelPlanned ? 'Yes' : 'No'}
- Preferred Language: ${user.preferredLanguage}

## Instructions
Generate a comprehensive, personalized monsoon preparedness plan based on the LIVE weather data and user profile above.
Tailor every recommendation specifically to this user's situation (family composition, vehicle, home type, medical needs, travel plans).
Consider Indian monsoon patterns, local emergency services, and regional context.

IMPORTANT: You MUST return ONLY valid JSON with NO markdown, NO code blocks, NO extra text.

Return this exact JSON structure:

{
  "overallRiskScore": {
    "level": "Low|Moderate|High",
    "score": <number 1-10>,
    "explanation": "<2-3 sentence explanation based on weather data and user profile>"
  },
  "realTimeAlert": {
    "status": "<concise weather status like 'Heavy Rain Detected' or 'Thunderstorm Warning'>",
    "recommendation": "<1 actionable immediate recommendation>",
    "severity": "info|warning|critical"
  },
  "beforeMonsoonChecklist": [
    { "id": "bm1", "task": "<specific actionable task>", "priority": "high|medium|low", "category": "<category>" }
  ],
  "duringRainChecklist": [
    { "id": "dr1", "task": "<specific actionable task>", "priority": "high|medium|low", "category": "<category>" }
  ],
  "afterRainChecklist": [
    { "id": "ar1", "task": "<specific actionable task>", "priority": "high|medium|low", "category": "<category>" }
  ],
  "emergencyKitChecklist": [
    { "id": "ek1", "task": "<item to include in emergency kit>", "priority": "high|medium|low", "category": "<category>" }
  ],
  "travelAdvisory": {
    "safe": <true|false>,
    "advice": "<clear travel advice based on weather>",
    "tips": ["<tip 1>", "<tip 2>", "<tip 3>", "<tip 4>"]
  },
  "homeSafetyRecommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>", "<recommendation 4>", "<recommendation 5>"],
  "medicalRecommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>", "<recommendation 4>"],
  "foodAndWaterPreparation": ["<tip 1>", "<tip 2>", "<tip 3>", "<tip 4>", "<tip 5>"],
  "personalizedSafetyTips": ["<tip tailored to this specific user>", "<tip 2>", "<tip 3>", "<tip 4>", "<tip 5>"],
  "emergencyContacts": [
    { "name": "National Emergency", "number": "112", "description": "All-India Emergency Helpline" },
    { "name": "NDRF Helpline", "number": "0120-2309360", "description": "National Disaster Response Force" },
    { "name": "Flood Relief", "number": "1078", "description": "National Flood Relief Number" },
    { "name": "Ambulance", "number": "108", "description": "Emergency Medical Services" },
    { "name": "Police", "number": "100", "description": "Police Emergency" },
    { "name": "Fire Brigade", "number": "101", "description": "Fire Emergency" }
  ],
  "translatedSummary": "${user.preferredLanguage === 'hindi' ? '<Complete summary of the preparedness plan in Hindi (Devanagari script). Include key risks, top 5 before-monsoon actions, top 5 during-rain actions, and key emergency contacts.>' : '<English summary of the complete preparedness plan in 4-5 sentences highlighting the risk level, most important actions, and key safety message.>'}"
}

Requirements:
- Generate at least 8 items per checklist
- All items must be specific, actionable, and relevant to this user's profile
- Risk level MUST reflect actual weather conditions (Heavy rain = High, Light drizzle = Moderate, etc.)
- personalizedSafetyTips MUST be unique to this user (mention their specific vehicle, family members, home type)
- emergencyContacts MUST include local city/state contacts for ${weather.city} if known
- translatedSummary MUST be in ${user.preferredLanguage === 'hindi' ? 'Hindi (Devanagari script)' : 'English'}
`;
}
