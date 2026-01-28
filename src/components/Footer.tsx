import { NavLink } from '@/components/NavLink';
import { Home, GraduationCap, Sparkles, Heart } from 'lucide-react';

export function Footer() {
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/majors', label: 'All Majors', icon: GraduationCap },
    { to: '/quiz', label: 'Passion Matcher', icon: Sparkles },
  ];

  return (
    <footer className="relative mt-16 py-8 border-t border-white/10" style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(20px)' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Signature - Centered */}
          <p className="text-sm font-light tracking-wide text-center" style={{ 
            color: 'rgba(192, 192, 192, 0.9)',
            textShadow: '0 0 10px rgba(192, 192, 192, 0.5), 0 0 20px rgba(192, 192, 192, 0.3)'
          }}>
            © 2026 Future Lebanon | Handcrafted with Magic by <span className="font-medium text-primary">Hoda Nshawy</span>
          </p>

          {/* Navigation & Lebanon */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  activeClassName="text-primary"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Lebanon with Heartbeat */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇱🇧</span>
              <span className="text-sm text-muted-foreground">Lebanon</span>
              <Heart className="w-4 h-4 animate-heartbeat" style={{ fill: 'url(#heartGradient)', stroke: 'url(#heartGradient)' }} />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
