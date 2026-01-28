import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { searchMajors, Major } from '@/data/majors';
import { useTheme, ThemeCategory } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

export function RainbowSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Major[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const searchResults = searchMajors(query).slice(0, 8);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelectMajor = (major: Major) => {
    setTheme(major.category as ThemeCategory);
    navigate(`/major/${major.id}`);
    setQuery('');
    setIsOpen(false);
  };

  const getCategoryColor = (category: ThemeCategory) => {
    switch (category) {
      case 'engineering': return 'text-cyan-400';
      case 'medicine': return 'text-teal-400';
      case 'business': return 'text-amber-400';
      default: return 'text-violet-400';
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="rainbow-glow rounded-2xl">
        <div className="relative glass-strong rounded-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 200+ majors... (e.g., Computer Science, Medicine, Finance)"
            className="w-full bg-transparent py-4 pl-12 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none text-lg"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl overflow-hidden z-50 animate-fade-in">
          {results.map((major, index) => (
            <button
              key={major.id}
              onClick={() => handleSelectMajor(major)}
              className="w-full px-4 py-3 flex items-center gap-4 hover:bg-white/5 transition-colors text-left"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-2xl">{major.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-foreground">{major.name}</p>
                <p className={`text-sm ${getCategoryColor(major.category)}`}>
                  {major.category.charAt(0).toUpperCase() + major.category.slice(1)}
                </p>
              </div>
              <div className="score-badge px-3 py-1 rounded-full text-sm font-bold">
                {major.jobScore}/10
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl p-6 text-center z-50 animate-fade-in">
          <p className="text-muted-foreground">No majors found for "{query}"</p>
          <p className="text-sm text-muted-foreground mt-2">Try searching for Computer Science, Medicine, or Business</p>
        </div>
      )}
    </div>
  );
}
