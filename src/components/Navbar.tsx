import { NavLink } from '@/components/NavLink';
import { useTheme } from '@/contexts/ThemeContext';
import { Home, GraduationCap, Building2, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { currentTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/majors', label: 'Majors', icon: GraduationCap },
    { to: '/universities', label: 'Universities', icon: Building2 },
    { to: '/quiz', label: 'Passion Matcher', icon: Sparkles },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🇱🇧</span>
            <span className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
              Future Lebanon <span className="text-primary">2026</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all flex items-center gap-2"
                activeClassName="text-primary bg-primary/10"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all rounded-lg"
                activeClassName="text-primary bg-primary/10"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
