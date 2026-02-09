import { useState, useEffect } from 'react';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] -top-1/4 -left-1/4 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[120px] -bottom-1/4 -right-1/4 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <span className="text-4xl">🇱🇧</span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Future Lebanon
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> 2026</span>
          </h1>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-200"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <p className="text-sm text-muted-foreground animate-pulse">Loading your future...</p>
      </div>
    </div>
  );
};
