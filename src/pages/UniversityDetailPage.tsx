import { useParams, useNavigate } from 'react-router-dom';
import { getUniversityById } from '@/data/universities';
import { majors } from '@/data/majors';
import { ArrowLeft, MapPin, Users, Globe, Award, Calendar, BookOpen, DollarSign } from 'lucide-react';

const UniversityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const uni = getUniversityById(id || '');

  if (!uni) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">University Not Found</h1>
          <button
            onClick={() => navigate('/universities')}
            className="text-primary hover:underline"
          >
            Browse all universities
          </button>
        </div>
      </div>
    );
  }

  const universityMajors = majors.filter(m => 
    m.topUniversities.includes(uni.shortName)
  ).slice(0, 8);

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
            <div className="text-8xl">{uni.logo}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  uni.type === 'public' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {uni.type === 'public' ? 'Public University' : 'Private University'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
                {uni.name}
              </h1>
              <p className="text-xl text-primary font-semibold mb-4">{uni.shortName}</p>
              <p className="text-lg text-muted-foreground mb-6">{uni.description}</p>
              
              <div className="flex flex-wrap gap-4">
                <div className="glass px-4 py-3 rounded-xl flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">2026 Ranking</p>
                    <p className="font-semibold text-foreground">{uni.ranking2026.description}</p>
                  </div>
                </div>
                <div className="glass px-4 py-3 rounded-xl flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-semibold text-foreground">{uni.location}</p>
                  </div>
                </div>
                <div className="glass px-4 py-3 rounded-xl flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Founded</p>
                    <p className="font-semibold text-foreground">{uni.foundedYear}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Fees */}
          <div className="lg:col-span-2 space-y-8">
            {/* Statistics */}
            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                University Statistics
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Students</p>
                  <p className="text-2xl font-display font-bold text-foreground">{uni.studentCount}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Faculty Members</p>
                  <p className="text-2xl font-display font-bold text-foreground">{uni.facultyCount}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">International Students</p>
                  <p className="text-2xl font-display font-bold text-foreground">{uni.internationalStudents}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Campus Size</p>
                  <p className="text-2xl font-display font-bold text-foreground">{uni.campusSize}</p>
                </div>
              </div>
            </section>

            {/* Fees Table */}
            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-secondary" />
                2026 Tuition Fees
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Faculty</th>
                      <th className="text-right py-3 px-4 text-muted-foreground font-medium">Per Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 text-foreground">⚡ Engineering</td>
                      <td className="py-4 px-4 text-right font-semibold text-foreground">{uni.fees.engineering}</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 text-foreground">💚 Medicine</td>
                      <td className="py-4 px-4 text-right font-semibold text-foreground">{uni.fees.medicine}</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-4 px-4 text-foreground">💰 Business</td>
                      <td className="py-4 px-4 text-right font-semibold text-foreground">{uni.fees.business}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-foreground">🎨 Arts & Sciences</td>
                      <td className="py-4 px-4 text-right font-semibold text-foreground">{uni.fees.arts}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-muted-foreground italic">{uni.fees.note}</p>
            </section>

            {/* Available Majors */}
            {universityMajors.length > 0 && (
              <section className="glass rounded-2xl p-6">
                <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-accent" />
                  Popular Majors at {uni.shortName}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {universityMajors.map((major) => (
                    <button
                      key={major.id}
                      onClick={() => navigate(`/major/${major.id}`)}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors text-left"
                    >
                      <span className="text-2xl">{major.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{major.name}</p>
                        <p className="text-sm text-muted-foreground">Score: {major.jobScore}/10</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Highlights */}
          <div className="space-y-6">
            {/* Strengths */}
            <section className="glass rounded-2xl p-6">
              <h3 className="text-lg font-display font-bold text-foreground mb-4">Key Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {uni.strengths.map((strength) => (
                  <span key={strength} className="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    {strength}
                  </span>
                ))}
              </div>
            </section>

            {/* Notable */}
            <section className="glass rounded-2xl p-6">
              <h3 className="text-lg font-display font-bold text-foreground mb-4">Notable Facts</h3>
              <ul className="space-y-3">
                {uni.notable.map((fact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary">✓</span>
                    <span className="text-muted-foreground">{fact}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Website */}
            <a
              href={`https://${uni.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 glass rounded-2xl p-4 hover:bg-white/5 transition-colors"
            >
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">Visit Official Website</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailPage;
