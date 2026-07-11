import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorCardProps {
  message: string;
  onRetry: () => void;
}

export function ErrorCard({ message, onRetry }: ErrorCardProps) {
  return (
    <div className="glass-card border-red-500/25 p-8 max-w-md w-full text-center">
      <div className="w-16 h-16 bg-red-500/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">{message}</p>
      <button onClick={onRetry} className="btn-primary flex items-center gap-2 mx-auto">
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
