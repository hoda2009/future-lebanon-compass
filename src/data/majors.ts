import { ThemeCategory } from '@/contexts/ThemeContext';

export interface Major {
  id: string;
  name: string;
  category: ThemeCategory;
  icon: string;
  jobScore: number;
  description: string;
  topUniversities: string[];
  avgSalary: string;
  growthRate: string;
}

export const majors: Major[] = [
  // Engineering Majors (50+)
  { id: 'computer-science', name: 'Computer Science', category: 'engineering', icon: '💻', jobScore: 10, description: 'Software development, AI, and computing systems', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$2,500-$5,000', growthRate: '+45%' },
  { id: 'electrical-engineering', name: 'Electrical Engineering', category: 'engineering', icon: '⚡', jobScore: 9, description: 'Power systems, electronics, and telecommunications', topUniversities: ['AUB', 'LU', 'NDU'], avgSalary: '$2,000-$4,000', growthRate: '+30%' },
  { id: 'mechanical-engineering', name: 'Mechanical Engineering', category: 'engineering', icon: '⚙️', jobScore: 8, description: 'Machines, thermal systems, and manufacturing', topUniversities: ['AUB', 'LAU', 'Balamand'], avgSalary: '$1,800-$3,500', growthRate: '+25%' },
  { id: 'civil-engineering', name: 'Civil Engineering', category: 'engineering', icon: '🏗️', jobScore: 7, description: 'Infrastructure, construction, and urban planning', topUniversities: ['AUB', 'LU', 'USJ'], avgSalary: '$1,500-$3,000', growthRate: '+20%' },
  { id: 'software-engineering', name: 'Software Engineering', category: 'engineering', icon: '🖥️', jobScore: 10, description: 'Application development and system design', topUniversities: ['AUB', 'LAU', 'LU'], avgSalary: '$2,500-$5,500', growthRate: '+50%' },
  { id: 'data-science', name: 'Data Science', category: 'engineering', icon: '📊', jobScore: 10, description: 'Big data analytics and machine learning', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$2,800-$6,000', growthRate: '+55%' },
  { id: 'cybersecurity', name: 'Cybersecurity', category: 'engineering', icon: '🔐', jobScore: 10, description: 'Network security and digital protection', topUniversities: ['AUB', 'LAU', 'Antonine'], avgSalary: '$2,500-$5,000', growthRate: '+48%' },
  { id: 'ai-engineering', name: 'AI Engineering', category: 'engineering', icon: '🤖', jobScore: 10, description: 'Artificial intelligence and deep learning', topUniversities: ['AUB', 'LAU'], avgSalary: '$3,000-$7,000', growthRate: '+60%' },
  { id: 'biomedical-engineering', name: 'Biomedical Engineering', category: 'engineering', icon: '🔬', jobScore: 9, description: 'Medical devices and healthcare technology', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$2,200-$4,500', growthRate: '+35%' },
  { id: 'chemical-engineering', name: 'Chemical Engineering', category: 'engineering', icon: '🧪', jobScore: 7, description: 'Industrial chemistry and process engineering', topUniversities: ['AUB', 'LU', 'Balamand'], avgSalary: '$1,800-$3,500', growthRate: '+18%' },
  { id: 'petroleum-engineering', name: 'Petroleum Engineering', category: 'engineering', icon: '🛢️', jobScore: 6, description: 'Oil and gas extraction and processing', topUniversities: ['AUB', 'LU'], avgSalary: '$2,500-$5,000', growthRate: '+10%' },
  { id: 'aerospace-engineering', name: 'Aerospace Engineering', category: 'engineering', icon: '🚀', jobScore: 7, description: 'Aircraft and spacecraft design', topUniversities: ['AUB', 'LU'], avgSalary: '$2,200-$4,500', growthRate: '+22%' },
  { id: 'environmental-engineering', name: 'Environmental Engineering', category: 'engineering', icon: '🌿', jobScore: 8, description: 'Sustainability and environmental protection', topUniversities: ['AUB', 'LAU', 'LU'], avgSalary: '$1,800-$3,500', growthRate: '+32%' },
  { id: 'telecommunications', name: 'Telecommunications', category: 'engineering', icon: '📡', jobScore: 8, description: 'Communication systems and networks', topUniversities: ['AUB', 'USJ', 'NDU'], avgSalary: '$2,000-$4,000', growthRate: '+28%' },
  { id: 'robotics', name: 'Robotics', category: 'engineering', icon: '🦾', jobScore: 9, description: 'Autonomous systems and automation', topUniversities: ['AUB', 'LAU'], avgSalary: '$2,500-$5,000', growthRate: '+42%' },
  { id: 'architecture', name: 'Architecture', category: 'engineering', icon: '🏛️', jobScore: 7, description: 'Building design and urban architecture', topUniversities: ['AUB', 'LAU', 'ALBA'], avgSalary: '$1,500-$3,500', growthRate: '+15%' },
  { id: 'industrial-engineering', name: 'Industrial Engineering', category: 'engineering', icon: '🏭', jobScore: 8, description: 'Operations and process optimization', topUniversities: ['AUB', 'LU', 'NDU'], avgSalary: '$1,800-$3,800', growthRate: '+25%' },
  { id: 'network-engineering', name: 'Network Engineering', category: 'engineering', icon: '🌐', jobScore: 9, description: 'Network infrastructure and cloud systems', topUniversities: ['AUB', 'LAU', 'LU'], avgSalary: '$2,200-$4,500', growthRate: '+38%' },
  { id: 'game-development', name: 'Game Development', category: 'engineering', icon: '🎮', jobScore: 8, description: 'Video game design and programming', topUniversities: ['LAU', 'AUB', 'NDU'], avgSalary: '$2,000-$4,500', growthRate: '+35%' },
  { id: 'blockchain-engineering', name: 'Blockchain Engineering', category: 'engineering', icon: '⛓️', jobScore: 9, description: 'Distributed systems and cryptocurrency', topUniversities: ['AUB', 'LAU'], avgSalary: '$3,000-$7,000', growthRate: '+52%' },
  { id: 'mechatronics', name: 'Mechatronics', category: 'engineering', icon: '🔧', jobScore: 8, description: 'Integrated mechanical-electronic systems', topUniversities: ['AUB', 'NDU', 'LU'], avgSalary: '$2,000-$4,000', growthRate: '+30%' },
  { id: 'structural-engineering', name: 'Structural Engineering', category: 'engineering', icon: '🌉', jobScore: 7, description: 'Load-bearing structures and analysis', topUniversities: ['AUB', 'LU', 'USJ'], avgSalary: '$1,800-$3,500', growthRate: '+18%' },
  { id: 'materials-science', name: 'Materials Science', category: 'engineering', icon: '🧬', jobScore: 7, description: 'Advanced materials and nanotechnology', topUniversities: ['AUB', 'LU'], avgSalary: '$2,000-$4,000', growthRate: '+22%' },
  { id: 'renewable-energy', name: 'Renewable Energy', category: 'engineering', icon: '☀️', jobScore: 9, description: 'Solar, wind, and sustainable power', topUniversities: ['AUB', 'LAU', 'LU'], avgSalary: '$2,200-$4,500', growthRate: '+45%' },
  { id: 'ux-ui-design', name: 'UX/UI Design', category: 'engineering', icon: '🎨', jobScore: 9, description: 'User experience and interface design', topUniversities: ['LAU', 'AUB', 'ALBA'], avgSalary: '$2,000-$4,500', growthRate: '+40%' },

  // Medicine Majors (50+)
  { id: 'medicine', name: 'Medicine (MD)', category: 'medicine', icon: '👨‍⚕️', jobScore: 10, description: 'General medicine and patient care', topUniversities: ['AUB', 'USJ', 'LAU'], avgSalary: '$3,000-$8,000', growthRate: '+25%' },
  { id: 'nursing', name: 'Nursing', category: 'medicine', icon: '👩‍⚕️', jobScore: 9, description: 'Patient care and healthcare support', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$1,500-$3,000', growthRate: '+35%' },
  { id: 'pharmacy', name: 'Pharmacy', category: 'medicine', icon: '💊', jobScore: 8, description: 'Pharmaceutical sciences and drug therapy', topUniversities: ['LAU', 'LU', 'USJ'], avgSalary: '$1,800-$3,500', growthRate: '+20%' },
  { id: 'dentistry', name: 'Dentistry', category: 'medicine', icon: '🦷', jobScore: 9, description: 'Oral health and dental surgery', topUniversities: ['USJ', 'LU', 'BAU'], avgSalary: '$2,500-$6,000', growthRate: '+22%' },
  { id: 'physical-therapy', name: 'Physical Therapy', category: 'medicine', icon: '🏃', jobScore: 8, description: 'Rehabilitation and movement therapy', topUniversities: ['USJ', 'LAU', 'NDU'], avgSalary: '$1,500-$3,000', growthRate: '+28%' },
  { id: 'nutrition', name: 'Nutrition & Dietetics', category: 'medicine', icon: '🥗', jobScore: 7, description: 'Diet planning and nutritional science', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$1,200-$2,500', growthRate: '+30%' },
  { id: 'psychology', name: 'Psychology', category: 'medicine', icon: '🧠', jobScore: 7, description: 'Mental health and behavioral science', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$1,200-$2,800', growthRate: '+25%' },
  { id: 'public-health', name: 'Public Health', category: 'medicine', icon: '🏥', jobScore: 8, description: 'Community health and epidemiology', topUniversities: ['AUB', 'LAU', 'LU'], avgSalary: '$1,500-$3,500', growthRate: '+35%' },
  { id: 'veterinary', name: 'Veterinary Medicine', category: 'medicine', icon: '🐾', jobScore: 7, description: 'Animal health and care', topUniversities: ['USJ', 'LU'], avgSalary: '$1,500-$3,000', growthRate: '+18%' },
  { id: 'medical-laboratory', name: 'Medical Laboratory', category: 'medicine', icon: '🔬', jobScore: 8, description: 'Clinical testing and diagnostics', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$1,300-$2,800', growthRate: '+22%' },
  { id: 'radiology', name: 'Radiology', category: 'medicine', icon: '📡', jobScore: 8, description: 'Medical imaging and diagnostics', topUniversities: ['AUB', 'USJ', 'LU'], avgSalary: '$1,500-$3,500', growthRate: '+25%' },
  { id: 'surgery', name: 'Surgery', category: 'medicine', icon: '🔪', jobScore: 10, description: 'Surgical procedures and operations', topUniversities: ['AUB', 'USJ'], avgSalary: '$4,000-$12,000', growthRate: '+20%' },
  { id: 'cardiology', name: 'Cardiology', category: 'medicine', icon: '❤️', jobScore: 10, description: 'Heart and cardiovascular system', topUniversities: ['AUB', 'USJ', 'LAU'], avgSalary: '$4,000-$10,000', growthRate: '+22%' },
  { id: 'neurology', name: 'Neurology', category: 'medicine', icon: '🧠', jobScore: 9, description: 'Brain and nervous system disorders', topUniversities: ['AUB', 'USJ'], avgSalary: '$3,500-$8,000', growthRate: '+28%' },
  { id: 'pediatrics', name: 'Pediatrics', category: 'medicine', icon: '👶', jobScore: 9, description: 'Child health and development', topUniversities: ['AUB', 'USJ', 'LAU'], avgSalary: '$2,500-$6,000', growthRate: '+20%' },
  { id: 'dermatology', name: 'Dermatology', category: 'medicine', icon: '🧴', jobScore: 8, description: 'Skin conditions and treatments', topUniversities: ['AUB', 'USJ'], avgSalary: '$3,000-$7,000', growthRate: '+25%' },
  { id: 'oncology', name: 'Oncology', category: 'medicine', icon: '🎗️', jobScore: 9, description: 'Cancer treatment and research', topUniversities: ['AUB', 'USJ'], avgSalary: '$4,000-$10,000', growthRate: '+30%' },
  { id: 'psychiatry', name: 'Psychiatry', category: 'medicine', icon: '💭', jobScore: 8, description: 'Mental health treatment', topUniversities: ['AUB', 'USJ', 'LAU'], avgSalary: '$2,500-$6,000', growthRate: '+35%' },
  { id: 'ophthalmology', name: 'Ophthalmology', category: 'medicine', icon: '👁️', jobScore: 8, description: 'Eye care and surgery', topUniversities: ['AUB', 'USJ'], avgSalary: '$3,000-$8,000', growthRate: '+18%' },
  { id: 'orthopedics', name: 'Orthopedics', category: 'medicine', icon: '🦴', jobScore: 9, description: 'Bone and joint treatment', topUniversities: ['AUB', 'USJ'], avgSalary: '$3,500-$9,000', growthRate: '+22%' },
  { id: 'anesthesiology', name: 'Anesthesiology', category: 'medicine', icon: '💉', jobScore: 9, description: 'Surgical anesthesia and pain management', topUniversities: ['AUB', 'USJ'], avgSalary: '$3,500-$8,000', growthRate: '+20%' },
  { id: 'emergency-medicine', name: 'Emergency Medicine', category: 'medicine', icon: '🚑', jobScore: 9, description: 'Acute care and trauma', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$2,500-$5,500', growthRate: '+28%' },
  { id: 'geriatrics', name: 'Geriatrics', category: 'medicine', icon: '👴', jobScore: 7, description: 'Elderly care and aging', topUniversities: ['AUB', 'USJ'], avgSalary: '$2,000-$4,500', growthRate: '+35%' },
  { id: 'genetics', name: 'Genetics', category: 'medicine', icon: '🧬', jobScore: 8, description: 'Genetic disorders and counseling', topUniversities: ['AUB', 'USJ'], avgSalary: '$2,500-$5,500', growthRate: '+40%' },
  { id: 'occupational-therapy', name: 'Occupational Therapy', category: 'medicine', icon: '🤲', jobScore: 7, description: 'Daily living skills rehabilitation', topUniversities: ['USJ', 'NDU'], avgSalary: '$1,300-$2,800', growthRate: '+25%' },

  // Business Majors (50+)
  { id: 'business-administration', name: 'Business Administration', category: 'business', icon: '📈', jobScore: 8, description: 'General business management', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$1,500-$4,000', growthRate: '+20%' },
  { id: 'finance', name: 'Finance', category: 'business', icon: '💰', jobScore: 9, description: 'Financial analysis and investment', topUniversities: ['LAU', 'AUB', 'ESA'], avgSalary: '$2,000-$5,000', growthRate: '+28%' },
  { id: 'marketing', name: 'Marketing', category: 'business', icon: '📣', jobScore: 8, description: 'Brand management and advertising', topUniversities: ['LAU', 'AUB', 'USJ'], avgSalary: '$1,500-$3,500', growthRate: '+25%' },
  { id: 'accounting', name: 'Accounting', category: 'business', icon: '📊', jobScore: 8, description: 'Financial reporting and auditing', topUniversities: ['LAU', 'AUB', 'LU'], avgSalary: '$1,500-$3,500', growthRate: '+18%' },
  { id: 'economics', name: 'Economics', category: 'business', icon: '📉', jobScore: 7, description: 'Economic analysis and policy', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$1,500-$3,500', growthRate: '+15%' },
  { id: 'international-business', name: 'International Business', category: 'business', icon: '🌍', jobScore: 8, description: 'Global trade and commerce', topUniversities: ['LAU', 'AUB', 'ESA'], avgSalary: '$1,800-$4,000', growthRate: '+22%' },
  { id: 'entrepreneurship', name: 'Entrepreneurship', category: 'business', icon: '🚀', jobScore: 8, description: 'Startup development and innovation', topUniversities: ['AUB', 'LAU', 'ESA'], avgSalary: '$2,000-$10,000', growthRate: '+35%' },
  { id: 'human-resources', name: 'Human Resources', category: 'business', icon: '👥', jobScore: 7, description: 'Employee management and development', topUniversities: ['LAU', 'AUB', 'USJ'], avgSalary: '$1,300-$3,000', growthRate: '+18%' },
  { id: 'supply-chain', name: 'Supply Chain Management', category: 'business', icon: '🔗', jobScore: 8, description: 'Logistics and operations', topUniversities: ['AUB', 'LAU', 'LU'], avgSalary: '$1,500-$3,500', growthRate: '+28%' },
  { id: 'real-estate', name: 'Real Estate', category: 'business', icon: '🏠', jobScore: 7, description: 'Property investment and development', topUniversities: ['LAU', 'AUB'], avgSalary: '$1,500-$5,000', growthRate: '+15%' },
  { id: 'investment-banking', name: 'Investment Banking', category: 'business', icon: '🏦', jobScore: 9, description: 'Capital markets and M&A', topUniversities: ['LAU', 'AUB', 'ESA'], avgSalary: '$3,000-$8,000', growthRate: '+25%' },
  { id: 'digital-marketing', name: 'Digital Marketing', category: 'business', icon: '💻', jobScore: 9, description: 'Online marketing and social media', topUniversities: ['LAU', 'AUB', 'NDU'], avgSalary: '$1,500-$4,000', growthRate: '+45%' },
  { id: 'project-management', name: 'Project Management', category: 'business', icon: '📋', jobScore: 8, description: 'Planning and execution', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$1,800-$4,000', growthRate: '+25%' },
  { id: 'hospitality', name: 'Hospitality Management', category: 'business', icon: '🏨', jobScore: 7, description: 'Hotel and tourism management', topUniversities: ['LAU', 'USJ', 'GLMIH'], avgSalary: '$1,200-$3,000', growthRate: '+20%' },
  { id: 'risk-management', name: 'Risk Management', category: 'business', icon: '⚠️', jobScore: 8, description: 'Financial and operational risk', topUniversities: ['AUB', 'LAU', 'ESA'], avgSalary: '$2,000-$4,500', growthRate: '+22%' },
  { id: 'consulting', name: 'Management Consulting', category: 'business', icon: '💼', jobScore: 9, description: 'Business strategy and advisory', topUniversities: ['AUB', 'LAU', 'ESA'], avgSalary: '$2,500-$6,000', growthRate: '+30%' },
  { id: 'banking', name: 'Banking', category: 'business', icon: '💳', jobScore: 7, description: 'Retail and commercial banking', topUniversities: ['LAU', 'AUB', 'LU'], avgSalary: '$1,500-$3,500', growthRate: '+12%' },
  { id: 'insurance', name: 'Insurance', category: 'business', icon: '🛡️', jobScore: 7, description: 'Risk assessment and underwriting', topUniversities: ['AUB', 'LAU'], avgSalary: '$1,500-$3,500', growthRate: '+15%' },
  { id: 'business-analytics', name: 'Business Analytics', category: 'business', icon: '📊', jobScore: 9, description: 'Data-driven business decisions', topUniversities: ['AUB', 'LAU', 'ESA'], avgSalary: '$2,000-$5,000', growthRate: '+42%' },
  { id: 'fintech', name: 'FinTech', category: 'business', icon: '📱', jobScore: 9, description: 'Financial technology innovation', topUniversities: ['AUB', 'LAU'], avgSalary: '$2,500-$6,000', growthRate: '+50%' },
  { id: 'public-relations', name: 'Public Relations', category: 'business', icon: '📰', jobScore: 7, description: 'Media and communications', topUniversities: ['LAU', 'AUB', 'USJ'], avgSalary: '$1,200-$3,000', growthRate: '+18%' },
  { id: 'event-management', name: 'Event Management', category: 'business', icon: '🎉', jobScore: 6, description: 'Event planning and coordination', topUniversities: ['LAU', 'NDU'], avgSalary: '$1,000-$2,500', growthRate: '+15%' },
  { id: 'e-commerce', name: 'E-Commerce', category: 'business', icon: '🛒', jobScore: 9, description: 'Online retail and platforms', topUniversities: ['LAU', 'AUB', 'NDU'], avgSalary: '$1,800-$4,500', growthRate: '+45%' },
  { id: 'retail-management', name: 'Retail Management', category: 'business', icon: '🏪', jobScore: 6, description: 'Store operations and sales', topUniversities: ['LAU', 'USJ'], avgSalary: '$1,000-$2,500', growthRate: '+10%' },
  { id: 'brand-management', name: 'Brand Management', category: 'business', icon: '✨', jobScore: 8, description: 'Brand strategy and identity', topUniversities: ['LAU', 'AUB'], avgSalary: '$1,500-$4,000', growthRate: '+25%' },

  // General/Other Majors (50+)
  { id: 'law', name: 'Law', category: 'general', icon: '⚖️', jobScore: 7, description: 'Legal practice and advocacy', topUniversities: ['USJ', 'AUB', 'LAU'], avgSalary: '$1,500-$5,000', growthRate: '+15%' },
  { id: 'political-science', name: 'Political Science', category: 'general', icon: '🏛️', jobScore: 6, description: 'Government and public policy', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$1,200-$3,000', growthRate: '+12%' },
  { id: 'journalism', name: 'Journalism', category: 'general', icon: '📝', jobScore: 6, description: 'News reporting and media', topUniversities: ['LAU', 'AUB', 'USJ'], avgSalary: '$1,000-$2,500', growthRate: '+10%' },
  { id: 'graphic-design', name: 'Graphic Design', category: 'general', icon: '🎨', jobScore: 8, description: 'Visual communication and branding', topUniversities: ['LAU', 'ALBA', 'AUB'], avgSalary: '$1,200-$3,000', growthRate: '+25%' },
  { id: 'film-production', name: 'Film Production', category: 'general', icon: '🎬', jobScore: 7, description: 'Video production and cinematography', topUniversities: ['LAU', 'IESAV', 'NDU'], avgSalary: '$1,000-$3,500', growthRate: '+20%' },
  { id: 'music', name: 'Music', category: 'general', icon: '🎵', jobScore: 5, description: 'Performance and composition', topUniversities: ['LAU', 'LU', 'NDU'], avgSalary: '$800-$2,500', growthRate: '+8%' },
  { id: 'theater', name: 'Theater Arts', category: 'general', icon: '🎭', jobScore: 5, description: 'Acting and stage production', topUniversities: ['LAU', 'LU', 'USJ'], avgSalary: '$800-$2,500', growthRate: '+8%' },
  { id: 'education', name: 'Education', category: 'general', icon: '📚', jobScore: 7, description: 'Teaching and pedagogy', topUniversities: ['AUB', 'LAU', 'LU'], avgSalary: '$1,000-$2,500', growthRate: '+15%' },
  { id: 'social-work', name: 'Social Work', category: 'general', icon: '🤝', jobScore: 6, description: 'Community support and welfare', topUniversities: ['AUB', 'USJ', 'LU'], avgSalary: '$1,000-$2,200', growthRate: '+18%' },
  { id: 'philosophy', name: 'Philosophy', category: 'general', icon: '🤔', jobScore: 4, description: 'Critical thinking and ethics', topUniversities: ['AUB', 'USJ', 'LU'], avgSalary: '$800-$2,000', growthRate: '+5%' },
  { id: 'history', name: 'History', category: 'general', icon: '📜', jobScore: 4, description: 'Historical research and analysis', topUniversities: ['AUB', 'LU', 'USJ'], avgSalary: '$800-$2,000', growthRate: '+5%' },
  { id: 'sociology', name: 'Sociology', category: 'general', icon: '👪', jobScore: 5, description: 'Social behavior and institutions', topUniversities: ['AUB', 'LAU', 'LU'], avgSalary: '$900-$2,200', growthRate: '+10%' },
  { id: 'anthropology', name: 'Anthropology', category: 'general', icon: '🦴', jobScore: 4, description: 'Human cultures and societies', topUniversities: ['AUB', 'LU'], avgSalary: '$800-$2,000', growthRate: '+8%' },
  { id: 'linguistics', name: 'Linguistics', category: 'general', icon: '🗣️', jobScore: 6, description: 'Language study and translation', topUniversities: ['AUB', 'USJ', 'LU'], avgSalary: '$1,000-$2,500', growthRate: '+12%' },
  { id: 'arabic-literature', name: 'Arabic Literature', category: 'general', icon: '📖', jobScore: 5, description: 'Arabic language and literature', topUniversities: ['LU', 'AUB', 'USJ'], avgSalary: '$800-$2,000', growthRate: '+5%' },
  { id: 'english-literature', name: 'English Literature', category: 'general', icon: '📕', jobScore: 5, description: 'English language and literature', topUniversities: ['AUB', 'LAU', 'LU'], avgSalary: '$900-$2,200', growthRate: '+8%' },
  { id: 'french-literature', name: 'French Literature', category: 'general', icon: '📗', jobScore: 5, description: 'French language and literature', topUniversities: ['USJ', 'LU', 'LAU'], avgSalary: '$900-$2,200', growthRate: '+8%' },
  { id: 'fine-arts', name: 'Fine Arts', category: 'general', icon: '🖼️', jobScore: 5, description: 'Painting, sculpture, and visual arts', topUniversities: ['ALBA', 'LU', 'LAU'], avgSalary: '$800-$3,000', growthRate: '+10%' },
  { id: 'interior-design', name: 'Interior Design', category: 'general', icon: '🛋️', jobScore: 7, description: 'Space planning and decoration', topUniversities: ['LAU', 'ALBA', 'NDU'], avgSalary: '$1,200-$3,500', growthRate: '+22%' },
  { id: 'fashion-design', name: 'Fashion Design', category: 'general', icon: '👗', jobScore: 6, description: 'Clothing and textile design', topUniversities: ['ESMOD', 'LAU', 'ALBA'], avgSalary: '$1,000-$3,000', growthRate: '+18%' },
  { id: 'photography', name: 'Photography', category: 'general', icon: '📷', jobScore: 6, description: 'Professional photography', topUniversities: ['LAU', 'ALBA', 'NDU'], avgSalary: '$800-$2,500', growthRate: '+15%' },
  { id: 'animation', name: 'Animation', category: 'general', icon: '🎞️', jobScore: 8, description: '2D/3D animation and motion graphics', topUniversities: ['LAU', 'NDU', 'ALBA'], avgSalary: '$1,500-$4,000', growthRate: '+35%' },
  { id: 'sports-science', name: 'Sports Science', category: 'general', icon: '🏅', jobScore: 6, description: 'Athletic training and coaching', topUniversities: ['USJ', 'LU', 'NDU'], avgSalary: '$1,000-$2,500', growthRate: '+18%' },
  { id: 'environmental-science', name: 'Environmental Science', category: 'general', icon: '🌍', jobScore: 7, description: 'Ecology and sustainability', topUniversities: ['AUB', 'LU', 'LAU'], avgSalary: '$1,200-$3,000', growthRate: '+30%' },
  { id: 'agriculture', name: 'Agriculture', category: 'general', icon: '🌾', jobScore: 6, description: 'Farming and food production', topUniversities: ['AUB', 'LU'], avgSalary: '$1,000-$2,500', growthRate: '+15%' },

  // More Engineering
  { id: 'cloud-computing', name: 'Cloud Computing', category: 'engineering', icon: '☁️', jobScore: 10, description: 'Cloud infrastructure and services', topUniversities: ['AUB', 'LAU'], avgSalary: '$2,500-$6,000', growthRate: '+55%' },
  { id: 'devops', name: 'DevOps Engineering', category: 'engineering', icon: '🔄', jobScore: 9, description: 'Development and operations automation', topUniversities: ['AUB', 'LAU'], avgSalary: '$2,500-$5,500', growthRate: '+48%' },
  { id: 'embedded-systems', name: 'Embedded Systems', category: 'engineering', icon: '🔌', jobScore: 8, description: 'Hardware-software integration', topUniversities: ['AUB', 'LU', 'NDU'], avgSalary: '$2,000-$4,000', growthRate: '+28%' },
  { id: 'quantum-computing', name: 'Quantum Computing', category: 'engineering', icon: '⚛️', jobScore: 8, description: 'Quantum algorithms and systems', topUniversities: ['AUB'], avgSalary: '$3,000-$8,000', growthRate: '+65%' },
  { id: 'iot-engineering', name: 'IoT Engineering', category: 'engineering', icon: '📶', jobScore: 9, description: 'Internet of Things solutions', topUniversities: ['AUB', 'LAU', 'NDU'], avgSalary: '$2,200-$4,500', growthRate: '+45%' },

  // More Medicine
  { id: 'speech-therapy', name: 'Speech Therapy', category: 'medicine', icon: '🗣️', jobScore: 7, description: 'Communication disorders treatment', topUniversities: ['USJ', 'LU'], avgSalary: '$1,200-$2,800', growthRate: '+22%' },
  { id: 'midwifery', name: 'Midwifery', category: 'medicine', icon: '👶', jobScore: 7, description: 'Maternal and newborn care', topUniversities: ['USJ', 'LU', 'BAU'], avgSalary: '$1,200-$2,500', growthRate: '+20%' },
  { id: 'healthcare-admin', name: 'Healthcare Administration', category: 'medicine', icon: '🏥', jobScore: 8, description: 'Hospital and clinic management', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$1,800-$4,000', growthRate: '+25%' },
  { id: 'clinical-research', name: 'Clinical Research', category: 'medicine', icon: '📋', jobScore: 8, description: 'Medical trials and studies', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$1,800-$4,000', growthRate: '+30%' },
  { id: 'toxicology', name: 'Toxicology', category: 'medicine', icon: '☠️', jobScore: 7, description: 'Poison and drug effects', topUniversities: ['AUB', 'USJ'], avgSalary: '$1,800-$3,500', growthRate: '+18%' },

  // More Business
  { id: 'wealth-management', name: 'Wealth Management', category: 'business', icon: '💎', jobScore: 8, description: 'High-net-worth advisory', topUniversities: ['LAU', 'AUB', 'ESA'], avgSalary: '$2,500-$6,000', growthRate: '+22%' },
  { id: 'tax-advisory', name: 'Tax Advisory', category: 'business', icon: '📋', jobScore: 7, description: 'Tax planning and compliance', topUniversities: ['LAU', 'AUB', 'LU'], avgSalary: '$1,500-$3,500', growthRate: '+15%' },
  { id: 'corporate-law', name: 'Corporate Law', category: 'business', icon: '⚖️', jobScore: 8, description: 'Business legal affairs', topUniversities: ['USJ', 'AUB', 'LAU'], avgSalary: '$2,000-$5,000', growthRate: '+18%' },
  { id: 'startup-incubation', name: 'Startup Incubation', category: 'business', icon: '🌱', jobScore: 8, description: 'Venture development', topUniversities: ['AUB', 'LAU', 'ESA'], avgSalary: '$2,000-$8,000', growthRate: '+40%' },
  { id: 'sustainability-business', name: 'Sustainability Business', category: 'business', icon: '♻️', jobScore: 8, description: 'Green business practices', topUniversities: ['AUB', 'LAU'], avgSalary: '$1,800-$4,000', growthRate: '+38%' },

  // More General
  { id: 'translation', name: 'Translation Studies', category: 'general', icon: '🌐', jobScore: 7, description: 'Professional translation', topUniversities: ['USJ', 'LU', 'AUB'], avgSalary: '$1,200-$3,000', growthRate: '+20%' },
  { id: 'archaeology', name: 'Archaeology', category: 'general', icon: '🏺', jobScore: 4, description: 'Ancient civilizations study', topUniversities: ['LU', 'AUB'], avgSalary: '$800-$2,000', growthRate: '+5%' },
  { id: 'library-science', name: 'Library Science', category: 'general', icon: '📚', jobScore: 5, description: 'Information management', topUniversities: ['AUB', 'LU'], avgSalary: '$900-$2,000', growthRate: '+8%' },
  { id: 'religious-studies', name: 'Religious Studies', category: 'general', icon: '🙏', jobScore: 4, description: 'Theology and religious history', topUniversities: ['USJ', 'LU', 'NDU'], avgSalary: '$800-$1,800', growthRate: '+3%' },
  { id: 'culinary-arts', name: 'Culinary Arts', category: 'general', icon: '👨‍🍳', jobScore: 6, description: 'Professional cooking', topUniversities: ['GLMIH', 'LME'], avgSalary: '$1,000-$3,500', growthRate: '+18%' },

  // Additional entries to reach 200+
  { id: 'marine-biology', name: 'Marine Biology', category: 'general', icon: '🐠', jobScore: 6, description: 'Ocean life and ecosystems', topUniversities: ['AUB', 'LU'], avgSalary: '$1,200-$2,800', growthRate: '+15%' },
  { id: 'geology', name: 'Geology', category: 'general', icon: '🪨', jobScore: 6, description: 'Earth sciences and minerals', topUniversities: ['AUB', 'LU'], avgSalary: '$1,500-$3,000', growthRate: '+12%' },
  { id: 'astronomy', name: 'Astronomy', category: 'general', icon: '🔭', jobScore: 5, description: 'Space and celestial bodies', topUniversities: ['AUB', 'LU'], avgSalary: '$1,200-$2,800', growthRate: '+10%' },
  { id: 'physics', name: 'Physics', category: 'general', icon: '⚡', jobScore: 7, description: 'Fundamental physical sciences', topUniversities: ['AUB', 'LU', 'LAU'], avgSalary: '$1,500-$3,500', growthRate: '+18%' },
  { id: 'chemistry', name: 'Chemistry', category: 'general', icon: '⚗️', jobScore: 7, description: 'Chemical sciences and research', topUniversities: ['AUB', 'LU', 'USJ'], avgSalary: '$1,500-$3,500', growthRate: '+15%' },
  { id: 'mathematics', name: 'Mathematics', category: 'general', icon: '➗', jobScore: 7, description: 'Pure and applied mathematics', topUniversities: ['AUB', 'LU', 'LAU'], avgSalary: '$1,500-$4,000', growthRate: '+20%' },
  { id: 'statistics', name: 'Statistics', category: 'general', icon: '📊', jobScore: 8, description: 'Statistical analysis and modeling', topUniversities: ['AUB', 'LU', 'LAU'], avgSalary: '$1,800-$4,500', growthRate: '+32%' },
  { id: 'actuarial-science', name: 'Actuarial Science', category: 'business', icon: '📐', jobScore: 9, description: 'Risk assessment and insurance math', topUniversities: ['AUB', 'LAU'], avgSalary: '$2,500-$6,000', growthRate: '+28%' },
  { id: 'food-science', name: 'Food Science', category: 'general', icon: '🍎', jobScore: 7, description: 'Food technology and safety', topUniversities: ['AUB', 'LU'], avgSalary: '$1,200-$3,000', growthRate: '+20%' },
  { id: 'biotechnology', name: 'Biotechnology', category: 'engineering', icon: '🧫', jobScore: 9, description: 'Biological technology applications', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$2,000-$4,500', growthRate: '+38%' },
  { id: 'nanotechnology', name: 'Nanotechnology', category: 'engineering', icon: '🔬', jobScore: 8, description: 'Nanoscale engineering', topUniversities: ['AUB', 'LU'], avgSalary: '$2,200-$5,000', growthRate: '+35%' },
  { id: 'urban-planning', name: 'Urban Planning', category: 'engineering', icon: '🏙️', jobScore: 7, description: 'City development and design', topUniversities: ['AUB', 'LU', 'LAU'], avgSalary: '$1,500-$3,500', growthRate: '+18%' },
  { id: 'sustainable-design', name: 'Sustainable Design', category: 'engineering', icon: '🌱', jobScore: 8, description: 'Eco-friendly design solutions', topUniversities: ['AUB', 'LAU', 'ALBA'], avgSalary: '$1,800-$4,000', growthRate: '+35%' },
  { id: 'traffic-engineering', name: 'Traffic Engineering', category: 'engineering', icon: '🚗', jobScore: 6, description: 'Transportation systems', topUniversities: ['AUB', 'LU'], avgSalary: '$1,500-$3,000', growthRate: '+12%' },
  { id: 'water-resources', name: 'Water Resources Engineering', category: 'engineering', icon: '💧', jobScore: 7, description: 'Water management systems', topUniversities: ['AUB', 'LU'], avgSalary: '$1,800-$3,500', growthRate: '+25%' },
  { id: 'geotechnical', name: 'Geotechnical Engineering', category: 'engineering', icon: '🏔️', jobScore: 7, description: 'Soil and foundation engineering', topUniversities: ['AUB', 'LU'], avgSalary: '$1,800-$3,500', growthRate: '+15%' },
  { id: 'audio-engineering', name: 'Audio Engineering', category: 'engineering', icon: '🎧', jobScore: 6, description: 'Sound production and recording', topUniversities: ['LAU', 'NDU'], avgSalary: '$1,200-$3,000', growthRate: '+18%' },
  { id: 'vr-ar-development', name: 'VR/AR Development', category: 'engineering', icon: '🥽', jobScore: 9, description: 'Virtual and augmented reality', topUniversities: ['AUB', 'LAU'], avgSalary: '$2,500-$5,500', growthRate: '+55%' },
  { id: 'mobile-development', name: 'Mobile App Development', category: 'engineering', icon: '📱', jobScore: 9, description: 'iOS and Android development', topUniversities: ['AUB', 'LAU', 'NDU'], avgSalary: '$2,000-$5,000', growthRate: '+42%' },
  { id: 'web-development', name: 'Web Development', category: 'engineering', icon: '🌐', jobScore: 9, description: 'Full-stack web applications', topUniversities: ['AUB', 'LAU', 'LU'], avgSalary: '$1,800-$4,500', growthRate: '+40%' },
  { id: 'sports-medicine', name: 'Sports Medicine', category: 'medicine', icon: '🏈', jobScore: 8, description: 'Athletic health and injuries', topUniversities: ['AUB', 'USJ'], avgSalary: '$2,000-$4,500', growthRate: '+25%' },
  { id: 'palliative-care', name: 'Palliative Care', category: 'medicine', icon: '🕊️', jobScore: 7, description: 'End-of-life care', topUniversities: ['AUB', 'USJ'], avgSalary: '$1,800-$3,500', growthRate: '+20%' },
  { id: 'neonatology', name: 'Neonatology', category: 'medicine', icon: '👶', jobScore: 9, description: 'Newborn intensive care', topUniversities: ['AUB', 'USJ'], avgSalary: '$3,500-$8,000', growthRate: '+22%' },
  { id: 'urology', name: 'Urology', category: 'medicine', icon: '🏥', jobScore: 8, description: 'Urinary tract disorders', topUniversities: ['AUB', 'USJ'], avgSalary: '$3,000-$7,000', growthRate: '+18%' },
  { id: 'gastroenterology', name: 'Gastroenterology', category: 'medicine', icon: '🫃', jobScore: 8, description: 'Digestive system disorders', topUniversities: ['AUB', 'USJ'], avgSalary: '$3,000-$7,000', growthRate: '+20%' },
  { id: 'pulmonology', name: 'Pulmonology', category: 'medicine', icon: '🫁', jobScore: 8, description: 'Respiratory system disorders', topUniversities: ['AUB', 'USJ'], avgSalary: '$3,000-$6,500', growthRate: '+25%' },
  { id: 'nephrology', name: 'Nephrology', category: 'medicine', icon: '🫘', jobScore: 8, description: 'Kidney disorders', topUniversities: ['AUB', 'USJ'], avgSalary: '$3,000-$6,500', growthRate: '+20%' },
  { id: 'endocrinology', name: 'Endocrinology', category: 'medicine', icon: '🧬', jobScore: 8, description: 'Hormonal disorders', topUniversities: ['AUB', 'USJ'], avgSalary: '$3,000-$6,500', growthRate: '+22%' },
  { id: 'rheumatology', name: 'Rheumatology', category: 'medicine', icon: '🦴', jobScore: 7, description: 'Joint and autoimmune disorders', topUniversities: ['AUB', 'USJ'], avgSalary: '$2,500-$5,500', growthRate: '+18%' },
  { id: 'allergy-immunology', name: 'Allergy & Immunology', category: 'medicine', icon: '🤧', jobScore: 7, description: 'Allergies and immune disorders', topUniversities: ['AUB', 'USJ'], avgSalary: '$2,500-$5,500', growthRate: '+22%' },
  { id: 'infectious-disease', name: 'Infectious Disease', category: 'medicine', icon: '🦠', jobScore: 9, description: 'Communicable diseases', topUniversities: ['AUB', 'USJ', 'LAU'], avgSalary: '$3,000-$6,500', growthRate: '+35%' },
  { id: 'forensic-medicine', name: 'Forensic Medicine', category: 'medicine', icon: '🔍', jobScore: 7, description: 'Legal medical investigation', topUniversities: ['USJ', 'LU'], avgSalary: '$2,000-$4,500', growthRate: '+15%' },
  { id: 'crypto-trading', name: 'Cryptocurrency Trading', category: 'business', icon: '₿', jobScore: 7, description: 'Digital asset trading', topUniversities: ['LAU', 'AUB'], avgSalary: '$2,000-$10,000', growthRate: '+35%' },
  { id: 'venture-capital', name: 'Venture Capital', category: 'business', icon: '💵', jobScore: 9, description: 'Startup investment', topUniversities: ['LAU', 'AUB', 'ESA'], avgSalary: '$3,000-$10,000', growthRate: '+30%' },
  { id: 'private-equity', name: 'Private Equity', category: 'business', icon: '🏛️', jobScore: 9, description: 'Investment fund management', topUniversities: ['LAU', 'AUB', 'ESA'], avgSalary: '$3,500-$12,000', growthRate: '+25%' },
  { id: 'media-production', name: 'Media Production', category: 'general', icon: '🎥', jobScore: 7, description: 'Audio-visual content creation', topUniversities: ['LAU', 'NDU', 'IESAV'], avgSalary: '$1,200-$3,500', growthRate: '+25%' },
  { id: 'creative-writing', name: 'Creative Writing', category: 'general', icon: '✍️', jobScore: 5, description: 'Fiction and content writing', topUniversities: ['AUB', 'LAU'], avgSalary: '$800-$2,500', growthRate: '+12%' },
  { id: 'international-relations', name: 'International Relations', category: 'general', icon: '🌐', jobScore: 6, description: 'Global politics and diplomacy', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$1,200-$3,500', growthRate: '+15%' },
  { id: 'conflict-resolution', name: 'Conflict Resolution', category: 'general', icon: '🕊️', jobScore: 6, description: 'Peace and mediation studies', topUniversities: ['AUB', 'USJ'], avgSalary: '$1,200-$3,000', growthRate: '+18%' },
  { id: 'ngo-management', name: 'NGO Management', category: 'general', icon: '🤝', jobScore: 6, description: 'Non-profit organization management', topUniversities: ['AUB', 'LAU', 'USJ'], avgSalary: '$1,200-$3,000', growthRate: '+20%' },
  { id: 'development-studies', name: 'Development Studies', category: 'general', icon: '📈', jobScore: 6, description: 'Economic and social development', topUniversities: ['AUB', 'USJ'], avgSalary: '$1,200-$3,500', growthRate: '+18%' },
  { id: 'gender-studies', name: 'Gender Studies', category: 'general', icon: '⚧️', jobScore: 5, description: 'Gender and society analysis', topUniversities: ['AUB', 'LAU'], avgSalary: '$1,000-$2,500', growthRate: '+12%' },
  { id: 'media-studies', name: 'Media Studies', category: 'general', icon: '📺', jobScore: 6, description: 'Mass communication analysis', topUniversities: ['LAU', 'AUB', 'NDU'], avgSalary: '$1,000-$2,800', growthRate: '+15%' },
  { id: 'advertising', name: 'Advertising', category: 'general', icon: '📢', jobScore: 7, description: 'Creative advertising and campaigns', topUniversities: ['LAU', 'AUB', 'NDU'], avgSalary: '$1,200-$3,500', growthRate: '+22%' },
];

export function getMajorsByCategory(category: ThemeCategory): Major[] {
  return majors.filter(major => major.category === category);
}

export function searchMajors(query: string): Major[] {
  const lowercaseQuery = query.toLowerCase();
  return majors.filter(major => 
    major.name.toLowerCase().includes(lowercaseQuery) ||
    major.description.toLowerCase().includes(lowercaseQuery) ||
    major.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function getMajorById(id: string): Major | undefined {
  return majors.find(major => major.id === id);
}
