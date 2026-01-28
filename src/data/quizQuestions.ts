import { ThemeCategory } from '@/contexts/ThemeContext';

export interface QuizOption {
  id: string;
  text: string;
  emoji: string;
  category: ThemeCategory;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When you wake up, what excites you most about the day?",
    options: [
      { id: 'a', text: "Building or fixing something technical", emoji: '🔧', category: 'engineering' },
      { id: 'b', text: "Helping people feel better", emoji: '💊', category: 'medicine' },
      { id: 'c', text: "Making deals and growing wealth", emoji: '💰', category: 'business' },
      { id: 'd', text: "Creating something beautiful or meaningful", emoji: '🎨', category: 'general' }
    ]
  },
  {
    id: 2,
    question: "Your friend group sees you as the one who...",
    options: [
      { id: 'a', text: "Solves tech problems and gadgets issues", emoji: '💻', category: 'engineering' },
      { id: 'b', text: "Gives health advice and emotional support", emoji: '❤️', category: 'medicine' },
      { id: 'c', text: "Has the best business ideas", emoji: '📈', category: 'business' },
      { id: 'd', text: "Brings creative ideas and perspectives", emoji: '✨', category: 'general' }
    ]
  },
  {
    id: 3,
    question: "What would be your dream workspace?",
    options: [
      { id: 'a', text: "A high-tech lab with cutting-edge equipment", emoji: '🔬', category: 'engineering' },
      { id: 'b', text: "A modern hospital or wellness center", emoji: '🏥', category: 'medicine' },
      { id: 'c', text: "A sleek corner office with city views", emoji: '🌆', category: 'business' },
      { id: 'd', text: "A creative studio or inspiring space", emoji: '🎭', category: 'general' }
    ]
  },
  {
    id: 4,
    question: "When watching the news, which stories grab your attention?",
    options: [
      { id: 'a', text: "New technology breakthroughs and innovations", emoji: '🚀', category: 'engineering' },
      { id: 'b', text: "Medical discoveries and health research", emoji: '🧬', category: 'medicine' },
      { id: 'c', text: "Economic trends and market movements", emoji: '📊', category: 'business' },
      { id: 'd', text: "Cultural events and human interest stories", emoji: '🌍', category: 'general' }
    ]
  },
  {
    id: 5,
    question: "If you could solve one world problem, it would be...",
    options: [
      { id: 'a', text: "Climate change through sustainable technology", emoji: '🌱', category: 'engineering' },
      { id: 'b', text: "Eradicating diseases and improving healthcare", emoji: '💉', category: 'medicine' },
      { id: 'c', text: "Economic inequality and poverty", emoji: '🤝', category: 'business' },
      { id: 'd', text: "Education and cultural understanding", emoji: '📚', category: 'general' }
    ]
  },
  {
    id: 6,
    question: "On a weekend, you're most likely to...",
    options: [
      { id: 'a', text: "Work on a coding project or build something", emoji: '🖥️', category: 'engineering' },
      { id: 'b', text: "Volunteer at a health clinic or help others", emoji: '🩺', category: 'medicine' },
      { id: 'c', text: "Attend networking events or read business books", emoji: '📖', category: 'business' },
      { id: 'd', text: "Visit museums, galleries, or create art", emoji: '🖼️', category: 'general' }
    ]
  },
  {
    id: 7,
    question: "Your perfect YouTube rabbit hole would be...",
    options: [
      { id: 'a', text: "How things are made and engineering marvels", emoji: '⚙️', category: 'engineering' },
      { id: 'b', text: "Medical documentaries and surgery videos", emoji: '🫀', category: 'medicine' },
      { id: 'c', text: "Entrepreneur interviews and investment tips", emoji: '💡', category: 'business' },
      { id: 'd', text: "Art tutorials and creative process videos", emoji: '🎬', category: 'general' }
    ]
  },
  {
    id: 8,
    question: "What would your superpower be?",
    options: [
      { id: 'a', text: "Control all technology with your mind", emoji: '🤖', category: 'engineering' },
      { id: 'b', text: "Heal any person or disease instantly", emoji: '✋', category: 'medicine' },
      { id: 'c', text: "See the future of any investment", emoji: '🔮', category: 'business' },
      { id: 'd', text: "Bring any imagination to life", emoji: '🌈', category: 'general' }
    ]
  },
  {
    id: 9,
    question: "In a group project, you naturally take the role of...",
    options: [
      { id: 'a', text: "The technical expert and problem solver", emoji: '🔍', category: 'engineering' },
      { id: 'b', text: "The caring one who ensures everyone's wellbeing", emoji: '🤗', category: 'medicine' },
      { id: 'c', text: "The leader who organizes and delegates", emoji: '👔', category: 'business' },
      { id: 'd', text: "The creative one with unique ideas", emoji: '💫', category: 'general' }
    ]
  },
  {
    id: 10,
    question: "What legacy would you want to leave behind?",
    options: [
      { id: 'a', text: "Revolutionary technology that changed the world", emoji: '🌐', category: 'engineering' },
      { id: 'b', text: "Saved countless lives and improved healthcare", emoji: '🏆', category: 'medicine' },
      { id: 'c', text: "Built a successful empire and created jobs", emoji: '🏢', category: 'business' },
      { id: 'd', text: "Created timeless art or inspired millions", emoji: '⭐', category: 'general' }
    ]
  }
];

export function calculateQuizResult(answers: ThemeCategory[]): { 
  category: ThemeCategory; 
  percentage: number;
  breakdown: Record<ThemeCategory, number>;
} {
  const counts: Record<ThemeCategory, number> = {
    engineering: 0,
    medicine: 0,
    business: 0,
    general: 0
  };

  answers.forEach(answer => {
    counts[answer]++;
  });

  const total = answers.length;
  let maxCategory: ThemeCategory = 'general';
  let maxCount = 0;

  (Object.keys(counts) as ThemeCategory[]).forEach(category => {
    if (counts[category] > maxCount) {
      maxCount = counts[category];
      maxCategory = category;
    }
  });

  return {
    category: maxCategory,
    percentage: Math.round((maxCount / total) * 100),
    breakdown: counts
  };
}

export const categoryDescriptions: Record<ThemeCategory, {
  title: string;
  emoji: string;
  description: string;
  traits: string[];
  suggestedMajors: string[];
}> = {
  engineering: {
    title: 'The Innovator',
    emoji: '⚡',
    description: 'You have the mind of an engineer! You love solving complex problems, building things, and pushing the boundaries of technology.',
    traits: ['Analytical', 'Problem-solver', 'Tech-savvy', 'Innovative', 'Detail-oriented'],
    suggestedMajors: ['Computer Science', 'Software Engineering', 'Data Science', 'AI Engineering', 'Cybersecurity']
  },
  medicine: {
    title: 'The Healer',
    emoji: '💚',
    description: 'You have the heart of a healer! You\'re driven by compassion and a desire to help others live healthier, happier lives.',
    traits: ['Compassionate', 'Caring', 'Patient', 'Dedicated', 'Empathetic'],
    suggestedMajors: ['Medicine', 'Nursing', 'Pharmacy', 'Psychology', 'Public Health']
  },
  business: {
    title: 'The Achiever',
    emoji: '🏆',
    description: 'You have the spirit of an achiever! You\'re ambitious, strategic, and destined to lead in the world of business and finance.',
    traits: ['Ambitious', 'Strategic', 'Leadership', 'Entrepreneurial', 'Decisive'],
    suggestedMajors: ['Finance', 'Business Administration', 'Marketing', 'Entrepreneurship', 'Investment Banking']
  },
  general: {
    title: 'The Creator',
    emoji: '🎨',
    description: 'You have the soul of a creator! You see the world differently and are driven to express, inspire, and make meaning through your unique perspective.',
    traits: ['Creative', 'Expressive', 'Intuitive', 'Adaptable', 'Visionary'],
    suggestedMajors: ['Graphic Design', 'Film Production', 'Architecture', 'Law', 'Education']
  }
};
