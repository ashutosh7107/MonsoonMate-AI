import { Request, Response } from 'express';
import { fetchWeatherData } from '../services/weatherService';
import { generatePreparednessPlan } from '../services/geminiService';
import { UserInput } from '../types';

function validateUserInput(body: Record<string, unknown>): { valid: boolean; error?: string; input?: UserInput } {
  const { city, familySize, hasChildren, hasSeniors, hasPets, vehicleType, houseType, preferredLanguage, travelPlanned, medicalConditions } = body;

  if (!city || typeof city !== 'string' || city.trim().length < 2) {
    return { valid: false, error: 'Please provide a valid city name.' };
  }
  if (!familySize || typeof familySize !== 'number' || familySize < 1 || familySize > 50) {
    return { valid: false, error: 'Family size must be between 1 and 50.' };
  }
  if (!['bike', 'car', 'none'].includes(vehicleType as string)) {
    return { valid: false, error: 'Invalid vehicle type.' };
  }
  if (!['apartment', 'independent'].includes(houseType as string)) {
    return { valid: false, error: 'Invalid house type.' };
  }
  if (!['english', 'hindi'].includes(preferredLanguage as string)) {
    return { valid: false, error: 'Invalid language selection.' };
  }

  return {
    valid: true,
    input: {
      city: (city as string).trim(),
      familySize: familySize as number,
      hasChildren: Boolean(hasChildren),
      hasSeniors: Boolean(hasSeniors),
      hasPets: Boolean(hasPets),
      vehicleType: vehicleType as UserInput['vehicleType'],
      houseType: houseType as UserInput['houseType'],
      medicalConditions: typeof medicalConditions === 'string' ? medicalConditions.trim() : '',
      travelPlanned: Boolean(travelPlanned),
      preferredLanguage: preferredLanguage as UserInput['preferredLanguage'],
    },
  };
}

export async function generatePlan(req: Request, res: Response): Promise<void> {
  const validation = validateUserInput(req.body);
  if (!validation.valid || !validation.input) {
    res.status(400).json({ error: validation.error });
    return;
  }

  const userInput = validation.input;

  // Step 1: Fetch live weather
  let weather;
  try {
    weather = await fetchWeatherData(userInput.city);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unable to fetch weather data.';
    const isNotFound = message.toLowerCase().includes('not found');
    res.status(isNotFound ? 404 : 503).json({
      error: isNotFound
        ? `City "${userInput.city}" not found. Please check the spelling.`
        : 'Weather service is temporarily unavailable. Please try again in a moment.',
    });
    return;
  }

  // Step 2: Generate AI plan
  let plan;
  try {
    plan = await generatePreparednessPlan(userInput, weather);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Gemini error details:', message);
    const isKeyMissing = message.includes('not configured') || message.includes('API_KEY_INVALID') || message.includes('invalid api key') || message.includes('API key not valid');
    const isRateLimit = message.includes('429') || message.includes('quota') || message.includes('rate');
    res.status(503).json({
      error: isKeyMissing
        ? 'Gemini API key is missing or invalid. Get a free key at aistudio.google.com/app/apikey and set it in your .env file.'
        : isRateLimit
        ? 'Gemini rate limit reached. Please wait a moment and try again.'
        : `AI service error: ${message}`,
    });
    return;
  }

  res.json({ weather, plan });
}
