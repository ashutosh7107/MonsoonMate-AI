import { useState } from 'react';
import { UserInput, ApiResponse } from '../types';
import { generatePlan } from '../api/client';

interface UsePlanState {
  data: ApiResponse | null;
  loading: boolean;
  error: string | null;
}

export function usePlan() {
  const [state, setState] = useState<UsePlanState>({
    data: null,
    loading: false,
    error: null,
  });

  const generate = async (input: UserInput) => {
    setState({ data: null, loading: true, error: null });
    try {
      const result = await generatePlan(input);
      setState({ data: result, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setState({ data: null, loading: false, error: message });
    }
  };

  const reset = () => {
    setState({ data: null, loading: false, error: null });
  };

  return { ...state, generate, reset };
}
