import { useState, useMemo } from 'react';
import { RainbowSearch } from '@/components/RainbowSearch';
import { MajorCard } from '@/components/MajorCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { majors, getMajorsByCategory } from '@/data/majors';
import { ThemeCategory, useTheme } from '@/contexts/ThemeContext';

const MajorsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'jobScore' | 'growth'>('jobScore');

  const filteredMajors = useMemo(() => {
    let result = selectedCategory === 'all' 
      ? [...majors]
      : getMajorsByCategory(selectedCategory);

    // Sort
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'jobScore':
        result.sort((a, b) => b.jobScore - a.jobScore);
        break;
      case 'growth':
        result.sort((a, b) => {
          const aGrowth = parseInt(a.growthRate.replace(/[^0-9]/g, ''));
          const bGrowth = parseInt(b.growthRate.replace(/[^0-9]/g, ''));
          return bGrowth - aGrowth;
        });
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Explore <span className="text-primary">{majors.length}+</span> Majors
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find your perfect major with 2026 job scores, salary data, and university recommendations.
          </p>

          <div className="mb-8">
            <RainbowSearch />
          </div>
        </section>

        {/* Filters */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Sort Options */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            Showing <span className="text-foreground font-semibold">{filteredMajors.length}</span> majors
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="glass px-4 py-2 rounded-lg text-foreground bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="jobScore">Job Score</option>
              <option value="name">Name (A-Z)</option>
              <option value="growth">Growth Rate</option>
            </select>
          </div>
        </div>

        {/* Majors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMajors.map((major, index) => (
            <MajorCard key={major.id} major={major} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MajorsPage;
