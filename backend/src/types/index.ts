export interface UserInput {
  city: string;
  familySize: number;
  hasChildren: boolean;
  hasSeniors: boolean;
  hasPets: boolean;
  vehicleType: 'bike' | 'car' | 'none';
  houseType: 'apartment' | 'independent';
  medicalConditions: string;
  travelPlanned: boolean;
  preferredLanguage: 'english' | 'hindi';
}

export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  condition: string;
  windSpeed: number;
  rainfall: number;
  feelsLike: number;
  alerts: string[];
  icon: string;
  description: string;
}

export interface PreparednessPlan {
  overallRiskScore: {
    level: 'Low' | 'Moderate' | 'High';
    score: number;
    explanation: string;
  };
  realTimeAlert: {
    status: string;
    recommendation: string;
    severity: 'info' | 'warning' | 'critical';
  };
  beforeMonsoonChecklist: ChecklistItem[];
  duringRainChecklist: ChecklistItem[];
  afterRainChecklist: ChecklistItem[];
  emergencyKitChecklist: ChecklistItem[];
  travelAdvisory: {
    safe: boolean;
    advice: string;
    tips: string[];
  };
  homeSafetyRecommendations: string[];
  medicalRecommendations: string[];
  foodAndWaterPreparation: string[];
  personalizedSafetyTips: string[];
  emergencyContacts: EmergencyContact[];
  translatedSummary?: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  priority: 'high' | 'medium' | 'low';
  category?: string;
}

export interface EmergencyContact {
  name: string;
  number: string;
  description: string;
}
