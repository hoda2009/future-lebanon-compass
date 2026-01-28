import { useState, useEffect } from 'react';
import { RainbowSearch } from '@/components/RainbowSearch';
import { MajorCard } from '@/components/MajorCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { majors, getMajorsByCategory } from '@/data/majors';
import { ThemeCategory, useTheme } from '@/contexts/ThemeContext';
import { universities } from '@/data/universities';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, GraduationCap, Building2, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory | 'all'>('all');
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setTheme('general');
  }, [setTheme]);

  const filteredMajors = selectedCategory === 'all' 
    ? majors.slice(0, 12)
    : getMajorsByCategory(selectedCategory).slice(0, 12);

  const topMajors = majors
    .sort((a, b) => b.jobScore - a.jobScore)
    .slice(0, 5);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <span className="text-2xl">🇱🇧</span>
            <span className="text-sm font-medium text-primary">Lebanon's Future Starts Here</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
            Future Lebanon
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              2026
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Discover 200+ majors, explore top universities, and find your perfect career path with our 
            <span className="text-primary font-semibold"> AI-powered Passion Matcher</span>.
          </p>

          {/* Rainbow Search */}
          <div className="mb-10">
            <RainbowSearch />
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <div className="glass px-6 py-4 rounded-2xl">
              <div className="text-3xl font-display font-bold text-primary">{majors.length}+</div>
              <div className="text-sm text-muted-foreground">Majors</div>
            </div>
            <div className="glass px-6 py-4 rounded-2xl">
              <div className="text-3xl font-display font-bold text-secondary">{universities.length}</div>
              <div className="text-sm text-muted-foreground">Universities</div>
            </div>
            <div className="glass px-6 py-4 rounded-2xl">
              <div className="text-3xl font-display font-bold text-accent">2026</div>
              <div className="text-sm text-muted-foreground">Latest Data</div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/majors')}
              className="glass rounded-2xl p-6 text-left group hover:scale-[1.02] transition-all duration-300"
            >
              <GraduationCap className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-display font-bold text-foreground mb-2">Explore Majors</h3>
              <p className="text-muted-foreground text-sm mb-4">Browse our comprehensive directory of 200+ majors with job scores and rankings.</p>
              <span className="inline-flex items-center gap-2 text-primary font-medium">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => navigate('/universities')}
              className="glass rounded-2xl p-6 text-left group hover:scale-[1.02] transition-all duration-300"
            >
              <Building2 className="w-10 h-10 text-secondary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-display font-bold text-foreground mb-2">Universities</h3>
              <p className="text-muted-foreground text-sm mb-4">Compare fees, rankings, and programs across Lebanon's top universities.</p>
              <span className="inline-flex items-center gap-2 text-secondary font-medium">
                Compare Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => navigate('/quiz')}
              className="glass rounded-2xl p-6 text-left group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Sparkles className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform relative z-10" />
              <h3 className="text-xl font-display font-bold text-foreground mb-2 relative z-10">Passion Matcher</h3>
              <p className="text-muted-foreground text-sm mb-4 relative z-10">Take our magical 10-question quiz to discover your ideal career path.</p>
              <span className="inline-flex items-center gap-2 text-accent font-medium relative z-10">
                Start Quiz <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </section>

        {/* Top Scoring Majors */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                <TrendingUp className="w-8 h-8 inline mr-3 text-primary" />
                Top Scoring Majors 2026
              </h2>
              <p className="text-muted-foreground">Highest job market demand this year</p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {topMajors.map((major, index) => (
              <button
                key={major.id}
                onClick={() => {
                  setTheme(major.category);
                  navigate(`/major/${major.id}`);
                }}
                className="glass rounded-xl p-4 text-center group hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{major.icon}</div>
                <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">{major.name}</h4>
                <div className="text-2xl font-display font-bold text-primary">{major.jobScore}/10</div>
              </button>
            ))}
          </div>
        </section>

        {/* Browse by Category */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">Filter majors by field of study</p>
          </div>

          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMajors.map((major, index) => (
              <MajorCard key={major.id} major={major} index={index} />
            ))}
          </div>

          {filteredMajors.length > 0 && (
            <div className="text-center mt-10">
              <button
                onClick={() => navigate('/majors')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:scale-105 transition-transform"
              >
                View All {majors.length}+ Majors
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
