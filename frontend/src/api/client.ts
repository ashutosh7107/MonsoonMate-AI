import { UserInput, ApiResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function generatePlan(input: UserInput): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE}/generate-plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(60000), // 60 second timeout
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error. Please try again.' }));
    throw new Error(errorData.error || `Server error: ${response.status}`);
  }

  const data = await response.json();
  return data as ApiResponse;
}
