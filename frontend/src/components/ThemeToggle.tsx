'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="theme-toggle" aria-label="Theme controls">
        <button
          type="button"
          className="icon-button"
          aria-label="Switch theme"
          title="Switch theme"
        >
          <Sun size={18} />
        </button>
        <button
          type="button"
          className="icon-button"
          aria-label="Use system theme"
          title="Use system theme"
        >
          <Monitor size={18} />
        </button>
      </div>
    );
  }

  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

  return (
    <div className="theme-toggle" aria-label="Theme controls">
      <button
        type="button"
        className="icon-button"
        aria-label={`Switch to ${nextTheme} mode`}
        title={`Switch to ${nextTheme} mode`}
        onClick={() => setTheme(nextTheme)}
      >
        {resolvedTheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
      <button
        type="button"
        className={`icon-button ${theme === 'system' ? 'is-active' : ''}`}
        aria-label="Use system theme"
        title="Use system theme"
        onClick={() => setTheme('system')}
      >
        <Monitor size={18} />
      </button>
    </div>
  );
}
