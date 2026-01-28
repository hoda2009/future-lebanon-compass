import { ThemeCategory, themeConfigs, useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategory: ThemeCategory | 'all';
  onCategoryChange: (category: ThemeCategory | 'all') => void;
}

const categories: { id: ThemeCategory | 'all'; name: string; icon: string }[] = [
  { id: 'all', name: 'All Majors', icon: '🌟' },
  { id: 'engineering', name: 'Engineering', icon: '⚡' },
  { id: 'medicine', name: 'Medicine', icon: '💚' },
  { id: 'business', name: 'Business', icon: '💰' },
  { id: 'general', name: 'Arts & Sciences', icon: '🎨' },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { setTheme } = useTheme();

  const handleCategoryClick = (category: ThemeCategory | 'all') => {
    onCategoryChange(category);
    if (category !== 'all') {
      setTheme(category);
    } else {
      setTheme('general');
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={cn(
            'px-5 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2',
            selectedCategory === category.id
              ? 'bg-primary text-primary-foreground shadow-lg scale-105'
              : 'glass hover:bg-white/10 text-foreground'
          )}
        >
          <span className="text-lg">{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
