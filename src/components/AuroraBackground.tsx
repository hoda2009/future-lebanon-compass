import { useTheme, themeConfigs } from '@/contexts/ThemeContext';

export function AuroraBackground() {
  const { currentTheme } = useTheme();
  const pattern = themeConfigs[currentTheme].pattern;

  return (
    <div className="aurora-bg">
      <div className="aurora-third" />
      {pattern && <div className={`absolute inset-0 ${pattern} opacity-30`} />}
    </div>
  );
}
