import { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, Loader2 } from 'lucide-react';
import { searchMajors, majors as allMajors, Major } from '@/data/majors';
import { useTheme, ThemeCategory } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export function RainbowSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Major[]>([]);
  const [aiResults, setAiResults] = useState<Major[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const aiReqIdRef = useRef(0);

  useEffect(() => {
    const q = query.trim();
    if (q.length === 0) {
      setResults([]);
      setAiResults([]);
      setIsOpen(false);
      setAiLoading(false);
      return;
    }

    const searchResults = searchMajors(q).slice(0, 6);
    setResults(searchResults);
    setIsOpen(true);
    setAiResults([]);

    // Only fall back to AI when no direct matches and query is meaningful
    if (searchResults.length === 0 && q.length >= 3) {
      const reqId = ++aiReqIdRef.current;
      setAiLoading(true);
      const timer = setTimeout(async () => {
        try {
          const { data, error } = await supabase.functions.invoke('smart-search', {
            body: { query: q, majorNames: allMajors.map((m) => m.name) },
          });
          if (reqId !== aiReqIdRef.current) return;
          if (error) throw error;
          const names: string[] = data?.majors ?? [];
          const matched = names
            .map((n) => allMajors.find((m) => m.name === n))
            .filter((m): m is Major => Boolean(m))
            .slice(0, 6);
          setAiResults(matched);
        } catch (e) {
          if (reqId === aiReqIdRef.current) setAiResults([]);
        } finally {
          if (reqId === aiReqIdRef.current) setAiLoading(false);
        }
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setAiLoading(false);
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

  const showAiSection = results.length === 0 && query.trim().length >= 3;

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
            placeholder="Search 200+ majors or describe your interest..."
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

      {/* Direct match results */}
      {isOpen && results.length > 0 && (
        <div className="relative w-full mt-2 glass-strong rounded-xl overflow-hidden animate-fade-in max-h-[300px] overflow-y-auto">
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

      {/* AI fallback */}
      {isOpen && showAiSection && (
        <div className="relative w-full mt-2 glass-strong rounded-xl overflow-hidden animate-fade-in max-h-[340px] overflow-y-auto">
          {aiLoading && (
            <div className="px-4 py-4 flex items-center gap-3 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm">Interpreting your interest with AI…</span>
            </div>
          )}
          {!aiLoading && aiResults.length > 0 && (
            <>
              <div className="px-4 py-2 flex items-center gap-2 border-b border-white/10">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">AI Suggestions</span>
              </div>
              {aiResults.map((major, index) => (
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
            </>
          )}
          {!aiLoading && aiResults.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No majors found for "{query}"</p>
              <p className="text-sm text-muted-foreground mt-2">Try describing what you enjoy or a career interest</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
