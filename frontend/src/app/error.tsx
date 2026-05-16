'use client';

import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="app-shell">
      <div className="error-state" role="alert">
        <AlertTriangle size={38} />
        <h1>Something went wrong</h1>
        <p>The app hit an unexpected error while rendering this view.</p>
        <button type="button" className="primary-button" onClick={reset}>
          <RotateCcw size={16} />
          Retry
        </button>
      </div>
    </main>
  );
}
