import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizQuestions, calculateQuizResult, categoryDescriptions, QuizQuestion } from '@/data/quizQuestions';
import { ThemeCategory, useTheme } from '@/contexts/ThemeContext';
import { Confetti } from '@/components/Confetti';
import { majors } from '@/data/majors';
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ThemeCategory[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateQuizResult> | null>(null);
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion) / quizQuestions.length) * 100;

  useEffect(() => {
    if (answers.length === quizQuestions.length && !isComplete) {
      const quizResult = calculateQuizResult(answers);
      setResult(quizResult);
      setTheme(quizResult.category);
      setIsComplete(true);
      setShowConfetti(true);
    }
  }, [answers, isComplete, setTheme]);

  const handleAnswer = (category: ThemeCategory) => {
    const newAnswers = [...answers, category];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
    setShowConfetti(false);
    setResult(null);
    setTheme('general');
  };

  const resultCategory = result?.category ? categoryDescriptions[result.category] : null;
  const suggestedMajors = result?.category 
    ? majors.filter(m => m.category === result.category).slice(0, 5)
    : [];

  if (isComplete && result && resultCategory) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <Confetti isActive={showConfetti} category={result.category} />
        
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Result Card */}
          <div className="glass rounded-3xl p-8 md:p-12 text-center magic-flash animate-scale-in">
            <div className="text-8xl mb-6">{resultCategory.emoji}</div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              You are{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                {resultCategory.title}
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {resultCategory.description}
            </p>

            {/* Match Percentage */}
            <div className="glass rounded-2xl p-6 mb-8 inline-block">
              <p className="text-sm text-muted-foreground mb-2">Your Match Strength</p>
              <div className="text-5xl font-display font-bold text-primary">{result.percentage}%</div>
            </div>

            {/* Traits */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-4">Your Key Traits</p>
              <div className="flex flex-wrap justify-center gap-3">
                {resultCategory.traits.map((trait) => (
                  <span key={trait} className="px-4 py-2 glass rounded-full text-foreground font-medium">
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Breakdown */}
            <div className="glass rounded-2xl p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-4">Category Breakdown</p>
              <div className="grid grid-cols-4 gap-4">
                {(Object.entries(result.breakdown) as [ThemeCategory, number][]).map(([cat, count]) => (
                  <div key={cat} className={`text-center ${cat === result.category ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="text-2xl font-display font-bold text-foreground">{count}</div>
                    <div className="text-xs text-muted-foreground capitalize">{cat}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Majors */}
            <div className="mb-8">
              <p className="text-lg font-display font-bold text-foreground mb-4">
                Recommended Majors for You
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {suggestedMajors.map((major) => (
                  <button
                    key={major.id}
                    onClick={() => navigate(`/major/${major.id}`)}
                    className="glass rounded-xl p-4 text-center hover:scale-105 transition-all group"
                  >
                    <span className="text-3xl block mb-2">{major.icon}</span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {major.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full font-medium text-foreground hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </button>
              <button
                onClick={() => navigate('/majors')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Explore All Majors
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <section className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Passion Matcher</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Discover Your Ideal Career Path
          </h1>
          <p className="text-muted-foreground">
            Answer 10 magical questions to find your perfect match
          </p>
        </section>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 glass rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="glass rounded-3xl p-8 md:p-12 animate-fade-in" key={currentQuestion}>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-8">
            {question.question}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.category)}
                className="glass rounded-2xl p-6 text-left hover:scale-[1.02] hover:bg-white/5 transition-all group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform">
                  {option.emoji}
                </span>
                <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {currentQuestion > 0 && (
          <button
            onClick={handleBack}
            className="mt-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous Question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
