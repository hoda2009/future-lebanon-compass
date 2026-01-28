import { useParams, useNavigate } from 'react-router-dom';
import { getMajorById, majors } from '@/data/majors';
import { getUniversityByShortName } from '@/data/universities';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect } from 'react';
import { ArrowLeft, TrendingUp, DollarSign, Building2, Briefcase, Star } from 'lucide-react';

const MajorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  
  const major = getMajorById(id || '');

  useEffect(() => {
    if (major) {
      setTheme(major.category);
    }
  }, [major, setTheme]);

  if (!major) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Major Not Found</h1>
          <button
            onClick={() => navigate('/majors')}
            className="text-primary hover:underline"
          >
            Browse all majors
          </button>
        </div>
      </div>
    );
  }

  const relatedMajors = majors
    .filter(m => m.category === major.category && m.id !== major.id)
    .slice(0, 4);

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'from-emerald-500 to-cyan-500';
    if (score >= 7) return 'from-amber-500 to-orange-500';
    return 'from-orange-500 to-red-500';
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Hero */}
        <section className="glass rounded-3xl p-8 md:p-12 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="text-7xl float">{major.icon}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                  {major.name}
                </h1>
                <span className={`px-4 py-2 rounded-full font-bold text-lg bg-gradient-to-r ${getScoreColor(major.jobScore)} text-white shadow-lg`}>
                  {major.jobScore}/10 Job Score
                </span>
              </div>
              <p className="text-xl text-muted-foreground mb-6">{major.description}</p>
              
              <div className="flex flex-wrap gap-4">
                <div className="glass px-4 py-3 rounded-xl flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Growth Rate</p>
                    <p className="font-semibold text-foreground">{major.growthRate}</p>
                  </div>
                </div>
                <div className="glass px-4 py-3 rounded-xl flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Avg. Salary (Monthly)</p>
                    <p className="font-semibold text-foreground">{major.avgSalary}</p>
                  </div>
                </div>
                <div className="glass px-4 py-3 rounded-xl flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="font-semibold text-foreground capitalize">{major.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Universities */}
        <section className="mb-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
            <Building2 className="w-7 h-7 text-primary" />
            Top Universities for {major.name}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {major.topUniversities.map((uniName, index) => {
              const uni = getUniversityByShortName(uniName);
              return (
                <button
                  key={uniName}
                  onClick={() => uni && navigate(`/university/${uni.id}`)}
                  className="glass rounded-2xl p-6 text-left hover:scale-[1.02] transition-all group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{uni?.logo || '🎓'}</span>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {uni?.name || uniName}
                      </h3>
                      <p className="text-sm text-muted-foreground">{uni?.shortName || ''}</p>
                    </div>
                  </div>
                  {uni && (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">{uni.ranking2026.description}</p>
                      <p className="text-sm font-medium text-primary">
                        {uni.type === 'public' ? 'Free (Public)' : `From ${uni.fees.engineering}`}
                      </p>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Related Majors */}
        {relatedMajors.length > 0 && (
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
              <Star className="w-7 h-7 text-secondary" />
              Related {major.category.charAt(0).toUpperCase() + major.category.slice(1)} Majors
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedMajors.map((related, index) => (
                <button
                  key={related.id}
                  onClick={() => navigate(`/major/${related.id}`)}
                  className="glass rounded-xl p-4 text-left hover:scale-[1.02] transition-all group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{related.icon}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getScoreColor(related.jobScore)} text-white`}>
                      {related.jobScore}/10
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {related.name}
                  </h4>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MajorDetailPage;
