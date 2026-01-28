import { universities } from '@/data/universities';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Globe, Award } from 'lucide-react';

const UniversitiesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Lebanese Universities
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compare rankings, fees, and programs across Lebanon's top institutions for 2026.
          </p>
        </section>

        {/* Universities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni, index) => (
            <button
              key={uni.id}
              onClick={() => navigate(`/university/${uni.id}`)}
              className="glass rounded-2xl p-6 text-left hover:scale-[1.02] transition-all group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{uni.logo}</span>
                  <div>
                    <h2 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                      {uni.shortName}
                    </h2>
                    <p className="text-sm text-muted-foreground">{uni.name}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  uni.type === 'public' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {uni.type === 'public' ? 'Public' : 'Private'}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-primary mb-1">
                  <Award className="w-4 h-4 inline mr-1" />
                  {uni.ranking2026.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {uni.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {uni.studentCount}
                </span>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Engineering Fees</p>
                <p className="text-lg font-bold text-foreground">
                  {uni.fees.engineering}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversitiesPage;
