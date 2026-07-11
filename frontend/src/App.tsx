import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { InputForm } from './components/InputForm';
import { Dashboard } from './components/Dashboard';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorCard } from './components/ErrorCard';
import { usePlan } from './hooks/usePlan';
import { UserInput } from './types';

type AppView = 'landing' | 'form' | 'dashboard';

function App() {
  const [view, setView] = useState<AppView>('landing');
  const { data, loading, error, generate, reset } = usePlan();

  const handleGetStarted = () => setView('form');

  const handleSubmit = async (input: UserInput) => {
    await generate(input);
    if (!error) {
      setView('dashboard');
    }
  };

  const handleReset = () => {
    reset();
    setView('form');
  };

  const handleBack = () => {
    setView('form');
  };

  // Show loading overlay
  if (loading) {
    return <LoadingScreen />;
  }

  // After submission, if error occurred, show error card
  if (error && view === 'dashboard') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorCard message={error} onRetry={handleBack} />
      </div>
    );
  }

  // Dashboard view
  if (view === 'dashboard' && data) {
    return (
      <Dashboard
        weather={data.weather}
        plan={data.plan}
        onReset={handleReset}
      />
    );
  }

  // Form view
  if (view === 'form') {
    return (
      <InputForm
        onSubmit={handleSubmit}
        onBack={() => setView('landing')}
        error={error}
        loading={loading}
      />
    );
  }

  // Landing page
  return <LandingPage onGetStarted={handleGetStarted} />;
}

export default App;
