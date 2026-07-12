import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizQuestions, calculateQuizResult, categoryDescriptions } from '@/data/quizQuestions';
import { ThemeCategory, useTheme } from '@/contexts/ThemeContext';
import { Confetti } from '@/components/Confetti';
import { majors } from '@/data/majors';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw, Share2, Loader2, TrendingDown, Mic, Square } from 'lucide-react';

type Insights = {
  personalized: string;
  narrative: string;
  alternativeReasons: string[];
};

// Deterministic "rarity" from personality type so it feels stable per result
const RARITY: Record<ThemeCategory, number> = {
  engineering: 18,
  medicine: 14,
  business: 22,
  general: 11,
};

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<ThemeCategory[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateQuizResult> | null>(null);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceTranscript, setVoiceTranscript] = useState<string | null>(null);
  const [voiceMatchId, setVoiceMatchId] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const question = quizQuestions[currentQuestion];
  const progress = (currentQuestion / quizQuestions.length) * 100;

  const fetchInsights = useCallback(
    async (
      quizResult: ReturnType<typeof calculateQuizResult>,
      topMajor: (typeof majors)[number],
      alternatives: { name: string; category: ThemeCategory; score: number }[],
    ) => {
      setInsightsLoading(true);
      setInsightsError(false);
      try {
        const resultCategory = categoryDescriptions[quizResult.category];
        const { data, error } = await supabase.functions.invoke('quiz-insights', {
          body: {
            personalityType: resultCategory.title,
            matchPercentage: quizResult.percentage,
            traits: resultCategory.traits,
            breakdown: quizResult.breakdown,
            topMajor: {
              name: topMajor.name,
              jobGrowth: topMajor.growthRate,
              category: topMajor.category,
            },
            alternatives,
          },
        });
        if (error) throw error;
        if (!data || typeof data !== 'object' || !('personalized' in data)) {
          throw new Error('Bad response');
        }
        setInsights(data as Insights);
      } catch (err) {
        console.error('Failed to fetch AI insights:', err);
        setInsightsError(true);
      } finally {
        setInsightsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (answers.length === quizQuestions.length && !isComplete) {
      const quizResult = calculateQuizResult(answers);
      setResult(quizResult);
      setTheme(quizResult.category);
      setIsComplete(true);
      setShowConfetti(true);

      // Determine top major + alternatives to send to AI
      const categoryMatches = majors.filter((m) => m.category === quizResult.category);
      const top = categoryMatches[0] ?? majors[0];

      // Alternatives: 2nd and 3rd highest scoring categories (different from top)
      const sortedCats = (Object.entries(quizResult.breakdown) as [ThemeCategory, number][])
        .filter(([cat]) => cat !== quizResult.category)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2);

      const alternatives = sortedCats
        .map(([cat, score]) => {
          const m = majors.find((x) => x.category === cat);
          return m ? { name: m.name, category: cat, score } : null;
        })
        .filter(Boolean) as { name: string; category: ThemeCategory; score: number }[];

      fetchInsights(quizResult, top, alternatives);
    }
  }, [answers, isComplete, setTheme, fetchInsights]);

  const handleAnswer = (category: ThemeCategory) => {
    const newAnswers = [...answers, category];
    setAnswers(newAnswers);
    setVoiceTranscript(null);
    setVoiceMatchId(null);
    setVoiceError(null);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const matchTranscriptToOption = (transcript: string) => {
    const text = transcript.toLowerCase();
    const words = text.split(/\W+/).filter((w) => w.length > 2);
    const categoryKeywords: Record<ThemeCategory, string[]> = {
      engineering: ['build', 'building', 'fix', 'fixing', 'tech', 'technical', 'technology', 'engineer', 'engineering', 'code', 'coding', 'computer', 'machine', 'robot', 'gadget'],
      medicine: ['help', 'helping', 'people', 'health', 'heal', 'healing', 'doctor', 'medical', 'medicine', 'care', 'patient', 'better', 'sick', 'hospital'],
      business: ['money', 'deal', 'deals', 'wealth', 'rich', 'business', 'sell', 'selling', 'market', 'invest', 'grow', 'growing', 'profit', 'entrepreneur'],
      general: ['create', 'creating', 'beautiful', 'meaningful', 'art', 'artistic', 'design', 'creative', 'write', 'writing', 'music', 'story', 'culture'],
    };
    let best: { id: string; category: ThemeCategory; score: number } | null = null;
    for (const opt of quizQuestions[0].options) {
      const optWords = opt.text.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
      let score = 0;
      for (const w of words) {
        if (optWords.includes(w)) score += 2;
        if (categoryKeywords[opt.category].includes(w)) score += 3;
      }
      if (!best || score > best.score) best = { id: opt.id, category: opt.category, score };
    }
    return best && best.score > 0 ? best : null;
  };

  const startRecording = async () => {
    setVoiceError(null);
    setVoiceTranscript(null);
    setVoiceMatchId(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
      const recorder = new MediaRecorder(stream, { mimeType: mime });
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(audioChunksRef.current, { type: mime });
        if (blob.size < 1024) {
          setVoiceError('Recording was too short — try again.');
          return;
        }
        setIsTranscribing(true);
        try {
          const ext = mime.includes('mp4') ? 'mp4' : 'webm';
          const file = new File([blob], `recording.${ext}`, { type: mime });
          const form = new FormData();
          form.append('file', file);
          const { data, error } = await supabase.functions.invoke('voice-transcribe', {
            body: form,
          });
          if (error) throw error;
          const transcript = (data as { text?: string })?.text?.trim() ?? '';
          if (!transcript) {
            setVoiceError("Couldn't hear you clearly — try again.");
            return;
          }
          setVoiceTranscript(transcript);
          const match = matchTranscriptToOption(transcript);
          if (match) {
            setVoiceMatchId(match.id);
            setTimeout(() => handleAnswer(match.category), 900);
          } else {
            setVoiceError("Couldn't match your answer — try tapping an option.");
          }
        } catch (err) {
          console.error('Transcription failed:', err);
          setVoiceError('Transcription failed. Please try again.');
        } finally {
          setIsTranscribing(false);
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Mic error:', err);
      setVoiceError('Microphone access denied.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
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
    setInsights(null);
    setInsightsError(false);
    setTheme('general');
  };

  const resultCategory = result?.category ? categoryDescriptions[result.category] : null;
  const suggestedMajors = result?.category
    ? majors.filter((m) => m.category === result.category).slice(0, 5)
    : [];
  const topMajor = suggestedMajors[0];

  // Alternative majors (from 2nd/3rd highest categories) for display cards
  const altMajors = result
    ? ((Object.entries(result.breakdown) as [ThemeCategory, number][])
        .filter(([cat]) => cat !== result.category)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([cat]) => majors.find((m) => m.category === cat))
        .filter(Boolean) as (typeof majors)[number][])
    : [];

  const rarity = result ? RARITY[result.category] : 15;

  // Generate a shareable PNG using Canvas
  const handleShare = async () => {
    if (!result || !resultCategory || !topMajor) return;
    setSharing(true);
    try {
      const W = 1080;
      const H = 1080;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas unsupported');

      // Background gradient (matches theme feel)
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#1a0b2e');
      bg.addColorStop(0.5, '#2d1b4e');
      bg.addColorStop(1, '#0f3d3e');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Soft glow blobs
      const blob = (x: number, y: number, r: number, color: string) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      };
      blob(200, 250, 400, 'rgba(168, 85, 247, 0.35)');
      blob(880, 850, 450, 'rgba(20, 184, 166, 0.35)');

      // Card frame
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      const cardX = 80, cardY = 120, cardW = W - 160, cardH = H - 240;
      const radius = 40;
      ctx.beginPath();
      ctx.moveTo(cardX + radius, cardY);
      ctx.arcTo(cardX + cardW, cardY, cardX + cardW, cardY + cardH, radius);
      ctx.arcTo(cardX + cardW, cardY + cardH, cardX, cardY + cardH, radius);
      ctx.arcTo(cardX, cardY + cardH, cardX, cardY, radius);
      ctx.arcTo(cardX, cardY, cardX + cardW, cardY, radius);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Header
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '600 28px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨ Future Lebanon 2026 · Passion Matcher', W / 2, 200);

      // Emoji
      ctx.font = '160px system-ui, sans-serif';
      ctx.fillText(resultCategory.emoji, W / 2, 400);

      // "You are"
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.font = '500 40px system-ui, sans-serif';
      ctx.fillText('You are', W / 2, 490);

      // Personality title (gradient text)
      const titleGrad = ctx.createLinearGradient(0, 0, W, 0);
      titleGrad.addColorStop(0, '#c084fc');
      titleGrad.addColorStop(0.5, '#f472b6');
      titleGrad.addColorStop(1, '#2dd4bf');
      ctx.fillStyle = titleGrad;
      ctx.font = 'bold 96px system-ui, sans-serif';
      ctx.fillText(resultCategory.title, W / 2, 600);

      // Match strength
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = '600 44px system-ui, sans-serif';
      ctx.fillText(`${result.percentage}% Match Strength`, W / 2, 700);

      // Divider
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(280, 760);
      ctx.lineTo(W - 280, 760);
      ctx.stroke();

      // Top major label
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '500 30px system-ui, sans-serif';
      ctx.fillText('Your top major', W / 2, 820);

      // Major name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 64px system-ui, sans-serif';
      ctx.fillText(`${topMajor.icon}  ${topMajor.name}`, W / 2, 890);

      // Footer
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '400 24px system-ui, sans-serif';
      ctx.fillText('Discover your path at Future Lebanon 2026', W / 2, H - 60);

      // Export
      const blob2 = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png'),
      );
      if (!blob2) throw new Error('Blob failed');

      const file = new File([blob2], 'future-lebanon-result.png', { type: 'image/png' });

      // Try Web Share API with file first
      const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean };
      if (nav.canShare && nav.canShare({ files: [file] })) {
        await (navigator as Navigator & { share: (d: { files: File[]; title?: string; text?: string }) => Promise<void> }).share({
          files: [file],
          title: `I'm ${resultCategory.title}!`,
          text: `${result.percentage}% match — my future major is ${topMajor.name}. Discover yours!`,
        });
      } else {
        // Fallback: download
        const url = URL.createObjectURL(blob2);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'future-lebanon-result.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Share failed:', err);
    } finally {
      setSharing(false);
    }
  };

  // ============ RESULT SCREEN ============
  if (isComplete && result && resultCategory && topMajor) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <Confetti isActive={showConfetti} category={result.category} />

        <div className="container mx-auto px-4 max-w-4xl">
          <div className="glass rounded-3xl p-8 md:p-12 text-center magic-flash animate-scale-in">
            {/* Rarity stat */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">
                Only {rarity}% of students get this result
              </span>
            </div>

            <div className="text-8xl mb-6">{resultCategory.emoji}</div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              You are{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                {resultCategory.title}
              </span>
            </h1>

            {/* AI Personalized Explanation Card */}
            <div className="glass rounded-2xl p-6 md:p-8 my-8 text-left border border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Your Personalized Match
                  </h3>
                </div>
                {insightsLoading ? (
                  <div className="flex items-center gap-3 text-muted-foreground py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span>Analyzing your passions... ✨</span>
                  </div>
                ) : insights?.personalized ? (
                  <p className="text-lg text-foreground/90 leading-relaxed">
                    {insights.personalized}
                  </p>
                ) : (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {resultCategory.description}
                  </p>
                )}
              </div>
            </div>

            {/* AI Future Narrative */}
            <div className="glass rounded-2xl p-6 md:p-8 mb-8 text-left border border-accent/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🌅</span>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                    Imagine Your Future
                  </h3>
                </div>
                {insightsLoading ? (
                  <div className="flex items-center gap-3 text-muted-foreground py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-accent" />
                    <span>Painting your 2029... ✨</span>
                  </div>
                ) : insights?.narrative ? (
                  <p className="text-lg text-foreground/90 leading-relaxed italic">
                    {insights.narrative}
                  </p>
                ) : (
                  <p className="text-lg text-muted-foreground leading-relaxed italic">
                    In three years, you're thriving in {topMajor.name} — building a career that
                    matches your strengths right here in Lebanon.
                  </p>
                )}
              </div>
            </div>

            {/* Match Percentage */}
            <div className="glass rounded-2xl p-6 mb-8 inline-block">
              <p className="text-sm text-muted-foreground mb-2">Your Match Strength</p>
              <div className="text-5xl font-display font-bold text-primary">
                {result.percentage}%
              </div>
            </div>

            {/* Traits */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-4">Your Key Traits</p>
              <div className="flex flex-wrap justify-center gap-3">
                {resultCategory.traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-4 py-2 glass rounded-full text-foreground font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Breakdown */}
            <div className="glass rounded-2xl p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-4">Category Breakdown</p>
              <div className="grid grid-cols-4 gap-4">
                {(Object.entries(result.breakdown) as [ThemeCategory, number][]).map(
                  ([cat, count]) => (
                    <div
                      key={cat}
                      className={`text-center ${
                        cat === result.category ? 'opacity-100' : 'opacity-50'
                      }`}
                    >
                      <div className="text-2xl font-display font-bold text-foreground">{count}</div>
                      <div className="text-xs text-muted-foreground capitalize">{cat}</div>
                    </div>
                  ),
                )}
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

            {/* Alternative Matches (2nd + 3rd) */}
            {altMajors.length > 0 && (
              <div className="mb-8 text-left">
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <TrendingDown className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Also Worth Considering
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {altMajors.map((alt, i) => (
                    <button
                      key={alt.id}
                      onClick={() => navigate(`/major/${alt.id}`)}
                      className="glass rounded-2xl p-5 text-left hover:scale-[1.02] transition-all group border border-white/5"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-3xl">{alt.icon}</span>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">
                            #{i + 2} Alternative
                          </div>
                          <div className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                            {alt.name}
                          </div>
                        </div>
                      </div>
                      {insightsLoading ? (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Analyzing fit...</span>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {insights?.alternativeReasons?.[i] ??
                            `A solid option that partially aligns with your ${resultCategory.traits[0]?.toLowerCase()} nature.`}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                onClick={handleShare}
                disabled={sharing}
                className="inline-flex items-center gap-2 px-6 py-3 glass border border-primary/30 rounded-full font-semibold text-foreground hover:bg-primary/10 transition-colors disabled:opacity-50"
              >
                {sharing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Share2 className="w-5 h-5" />
                )}
                Share My Result
              </button>
              <button
                onClick={() => navigate('/majors')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Explore All Majors
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {insightsError && (
              <p className="mt-6 text-xs text-muted-foreground">
                (Showing default descriptions — AI insights unavailable right now.)
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============ QUIZ SCREEN ============
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
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

        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 glass rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 animate-fade-in" key={currentQuestion}>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-8">
            {question.question}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.category)}
                className={`glass rounded-2xl p-6 text-left hover:scale-[1.02] hover:bg-white/5 transition-all group animate-fade-in ${
                  voiceMatchId === option.id ? 'ring-2 ring-primary bg-primary/10 scale-[1.02]' : ''
                }`}
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

          {currentQuestion === 0 && (
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Or answer with your voice
              </p>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTranscribing}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all disabled:opacity-50 ${
                  isRecording
                    ? 'bg-red-500/20 border border-red-500/40 text-red-300 animate-pulse'
                    : 'glass border border-primary/30 text-foreground hover:bg-primary/10'
                }`}
              >
                {isTranscribing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Listening for your answer...
                  </>
                ) : isRecording ? (
                  <>
                    <Square className="w-5 h-5 fill-current" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    Speak Your Answer
                  </>
                )}
              </button>
              {voiceTranscript && (
                <p className="text-sm text-muted-foreground italic max-w-md text-center">
                  &ldquo;{voiceTranscript}&rdquo;
                </p>
              )}
              {voiceError && (
                <p className="text-sm text-red-400">{voiceError}</p>
              )}
            </div>
          )}
        </div>

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
