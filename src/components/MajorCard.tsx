import { Major } from '@/data/majors';
import { useTheme, ThemeCategory } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Building2 } from 'lucide-react';

interface MajorCardProps {
  major: Major;
  index?: number;
}

export function MajorCard({ major, index = 0 }: MajorCardProps) {
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    setTheme(major.category as ThemeCategory);
    navigate(`/major/${major.id}`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'from-emerald-500 to-cyan-500';
    if (score >= 7) return 'from-amber-500 to-orange-500';
    if (score >= 5) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <button
      onClick={handleClick}
      className="card-3d glass rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] group w-full animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl float">{major.icon}</span>
        <div className={`px-3 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r ${getScoreColor(major.jobScore)} text-white shadow-lg`}>
          {major.jobScore}/10
        </div>
      </div>

      <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {major.name}
      </h3>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {major.description}
      </p>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span>{major.growthRate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Building2 className="w-4 h-4 text-primary" />
          <span>{major.topUniversities.length} universities</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-2">Top Universities</p>
        <div className="flex flex-wrap gap-2">
          {major.topUniversities.slice(0, 3).map((uni) => (
            <span key={uni} className="px-2 py-1 bg-muted rounded-full text-xs text-foreground">
              {uni}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
