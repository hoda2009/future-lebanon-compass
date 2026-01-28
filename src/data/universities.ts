export interface University {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  ranking2026: { global: number | null; regional: number | null; description: string };
  type: 'private' | 'public';
  foundedYear: number;
  location: string;
  website: string;
  description: string;
  strengths: string[];
  fees: {
    engineering: string;
    medicine: string;
    business: string;
    arts: string;
    note: string;
  };
  studentCount: string;
  facultyCount: string;
  internationalStudents: string;
  campusSize: string;
  notable: string[];
}

export const universities: University[] = [
  {
    id: 'aub',
    name: 'American University of Beirut',
    shortName: 'AUB',
    logo: '🏛️',
    ranking2026: { global: 237, regional: 5, description: '#237 Global (QS 2026), #5 Arab Region' },
    type: 'private',
    foundedYear: 1866,
    location: 'Beirut, Ras Beirut',
    website: 'www.aub.edu.lb',
    description: 'The oldest and most prestigious university in Lebanon, known for its rigorous academic programs and research excellence.',
    strengths: ['Medicine', 'Engineering', 'Business', 'Sciences', 'Agriculture'],
    fees: {
      engineering: '$983/credit',
      medicine: '$1,160/credit (graduate)',
      business: '$952/credit',
      arts: '$822-$872/credit',
      note: '2025-2026 rates. Financial aid available for up to 70% of students.'
    },
    studentCount: '9,500+',
    facultyCount: '850+',
    internationalStudents: '20%',
    campusSize: '65 acres',
    notable: ['Oldest English-language university in Middle East', 'AUBMC is top regional hospital', 'Strong alumni network globally']
  },
  {
    id: 'lu',
    name: 'Lebanese University',
    shortName: 'LU',
    logo: '🎓',
    ranking2026: { global: 515, regional: 15, description: '#515 Global (QS 2026), #15 Arab Region' },
    type: 'public',
    foundedYear: 1951,
    location: 'Multiple campuses across Lebanon',
    website: 'www.ul.edu.lb',
    description: 'The only public university in Lebanon, serving the largest student population with affordable quality education.',
    strengths: ['Engineering', 'Law', 'Sciences', 'Medicine', 'Education'],
    fees: {
      engineering: 'Free (Public)',
      medicine: 'Free (Public)',
      business: 'Free (Public)',
      arts: 'Free (Public)',
      note: 'Registration fees only (~$50-200/year). Some graduate programs have minimal fees.'
    },
    studentCount: '80,000+',
    facultyCount: '5,000+',
    internationalStudents: '5%',
    campusSize: 'Multiple campuses',
    notable: ['Largest university in Lebanon', 'Free public education', 'Strong engineering and medical faculties']
  },
  {
    id: 'lau',
    name: 'Lebanese American University',
    shortName: 'LAU',
    logo: '🌟',
    ranking2026: { global: 650, regional: 22, description: '#1 Business School in Lebanon (Eduniversal 2026)' },
    type: 'private',
    foundedYear: 1924,
    location: 'Beirut & Byblos',
    website: 'www.lau.edu.lb',
    description: 'Known for its American-style education and top-ranked business programs, LAU combines academic excellence with practical experience.',
    strengths: ['Business', 'Finance', 'Engineering', 'Architecture', 'Communication Arts'],
    fees: {
      engineering: '$935/credit',
      medicine: '$1,200/credit',
      business: '$911/credit',
      arts: '$859/credit',
      note: '2025-2026 rates. Need-based and merit scholarships available.'
    },
    studentCount: '8,500+',
    facultyCount: '650+',
    internationalStudents: '15%',
    campusSize: '2 main campuses',
    notable: ['#1 Business School in Lebanon', 'AACSB accredited', 'Strong industry connections']
  },
  {
    id: 'usj',
    name: 'Saint Joseph University of Beirut',
    shortName: 'USJ',
    logo: '⚜️',
    ranking2026: { global: 520, regional: 16, description: '#520 Global (QS 2026), Top Francophone University' },
    type: 'private',
    foundedYear: 1875,
    location: 'Beirut',
    website: 'www.usj.edu.lb',
    description: 'The leading French-language university in the Middle East, renowned for its medical and law programs.',
    strengths: ['Medicine', 'Law', 'Dentistry', 'Pharmacy', 'Political Science'],
    fees: {
      engineering: '$650-$750/credit',
      medicine: '$900-$1,100/credit',
      business: '$600-$700/credit',
      arts: '$550-$650/credit',
      note: '2026 rates. Scholarships and payment plans available.'
    },
    studentCount: '12,000+',
    facultyCount: '750+',
    internationalStudents: '12%',
    campusSize: '5 campuses',
    notable: ['Top Medical Faculty', 'Best Law School', 'French-language excellence']
  },
  {
    id: 'ndu',
    name: 'Notre Dame University - Louaize',
    shortName: 'NDU',
    logo: '✝️',
    ranking2026: { global: 800, regional: 35, description: 'Top 800 Global, Strong Engineering Programs' },
    type: 'private',
    foundedYear: 1987,
    location: 'Zouk Mosbeh',
    website: 'www.ndu.edu.lb',
    description: 'A leading Catholic university known for its engineering, business, and communication programs.',
    strengths: ['Engineering', 'Business', 'Communication', 'Architecture', 'Humanities'],
    fees: {
      engineering: '$580-$680/credit',
      medicine: 'N/A',
      business: '$550-$650/credit',
      arts: '$500-$600/credit',
      note: '2026 rates. Merit-based and athletic scholarships available.'
    },
    studentCount: '6,500+',
    facultyCount: '400+',
    internationalStudents: '8%',
    campusSize: '50 acres',
    notable: ['Strong engineering reputation', 'Beautiful mountain campus', 'Active student life']
  },
  {
    id: 'balamand',
    name: 'University of Balamand',
    shortName: 'Balamand',
    logo: '🌲',
    ranking2026: { global: 750, regional: 30, description: 'Top 750 Global, Excellent Engineering Value' },
    type: 'private',
    foundedYear: 1988,
    location: 'Koura, North Lebanon',
    website: 'www.balamand.edu.lb',
    description: 'A comprehensive university offering quality education at competitive rates, known for engineering and medical programs.',
    strengths: ['Engineering', 'Medicine', 'Architecture', 'Fine Arts', 'Sciences'],
    fees: {
      engineering: '$530 + 3,310,000 L.L./credit',
      medicine: '$480 + 3,015,000 L.L./credit (Health Sciences)',
      business: '$475 + 2,950,000 L.L./credit',
      arts: '$430 + 2,690,000 L.L./credit (Arts) | $480 + 2,990,000 L.L./credit (Sciences)',
      note: '2025-2026 rates. All fees include USD + Lebanese Lira component per credit.'
    },
    studentCount: '5,500+',
    facultyCount: '350+',
    internationalStudents: '10%',
    campusSize: '350 acres',
    notable: ['Best engineering value', 'Beautiful coastal campus', 'Medical school excellence']
  },
  {
    id: 'antonine',
    name: 'Antonine University',
    shortName: 'Antonine',
    logo: '🔔',
    ranking2026: { global: 900, regional: 45, description: 'Strong in Technology and Business' },
    type: 'private',
    foundedYear: 1996,
    location: 'Baabda',
    website: 'www.ua.edu.lb',
    description: 'A growing university with strong programs in technology, business, and music.',
    strengths: ['Information Technology', 'Business', 'Music', 'Sports', 'Engineering'],
  fees: {
      engineering: '$220-$250/credit',
      medicine: 'N/A',
      business: '$170/credit',
      arts: '$155-$180/credit',
      note: '2026 rates. Affordable private education. Fees vary by program.'
    },
    studentCount: '4,000+',
    facultyCount: '250+',
    internationalStudents: '5%',
    campusSize: '25 acres',
    notable: ['Leading music conservatory', 'Growing IT programs', 'Sports excellence']
  },
  {
    id: 'esa',
    name: 'ESA Business School',
    shortName: 'ESA',
    logo: '📊',
    ranking2026: { global: null, regional: null, description: '#1 Executive Education in MENA (Financial Times)' },
    type: 'private',
    foundedYear: 1996,
    location: 'Beirut',
    website: 'www.esa.edu.lb',
    description: 'Premier business school partnered with ESCP Europe, focusing exclusively on business education.',
    strengths: ['MBA', 'Executive Education', 'Finance', 'Marketing', 'Entrepreneurship'],
    fees: {
      engineering: 'N/A',
      medicine: 'N/A',
      business: '$850-$1,200/credit',
      arts: 'N/A',
      note: '2026 rates. Premium executive programs. Corporate sponsorships available.'
    },
    studentCount: '1,500+',
    facultyCount: '80+',
    internationalStudents: '25%',
    campusSize: 'Urban campus',
    notable: ['Top MBA in region', 'ESCP Europe partnership', 'Strong executive network']
  },
  {
    id: 'bau',
    name: 'Beirut Arab University',
    shortName: 'BAU',
    logo: '🌍',
    ranking2026: { global: 700, regional: 28, description: 'Affiliated with Alexandria University, Egypt' },
    type: 'private',
    foundedYear: 1960,
    location: 'Beirut & Tripoli',
    website: 'www.bau.edu.lb',
    description: 'Affiliated with Alexandria University, offering diverse programs with strong regional connections.',
    strengths: ['Dentistry', 'Engineering', 'Architecture', 'Health Sciences', 'Law'],
    fees: {
      engineering: '$480-$550/credit',
      medicine: '$700-$850/credit',
      business: '$420-$500/credit',
      arts: '$380-$450/credit',
      note: '2026 rates. Affordable fees with Alexandria University recognition.'
    },
    studentCount: '8,000+',
    facultyCount: '500+',
    internationalStudents: '15%',
    campusSize: '2 campuses',
    notable: ['Strong dental school', 'Regional connections', 'Affordable quality education']
  },
  {
    id: 'alba',
    name: 'Académie Libanaise des Beaux-Arts',
    shortName: 'ALBA',
    logo: '🎨',
    ranking2026: { global: null, regional: null, description: 'Top Fine Arts School in Arab World' },
    type: 'private',
    foundedYear: 1937,
    location: 'Beirut',
    website: 'www.alba.edu.lb',
    description: 'The premier art and design school in Lebanon and the Arab world.',
    strengths: ['Fine Arts', 'Architecture', 'Interior Design', 'Graphic Design', 'Film'],
    fees: {
      engineering: 'N/A',
      medicine: 'N/A',
      business: 'N/A',
      arts: '$600-$800/credit',
      note: '2026 rates. Specialized arts education. Scholarships for talented students.'
    },
    studentCount: '1,800+',
    facultyCount: '150+',
    internationalStudents: '10%',
    campusSize: 'Urban campus',
    notable: ['Top art school in Arab world', 'Industry connections', 'Gallery exhibitions']
  }
];

export function getUniversityById(id: string): University | undefined {
  return universities.find(uni => uni.id === id);
}

export function getUniversityByShortName(shortName: string): University | undefined {
  return universities.find(uni => uni.shortName.toLowerCase() === shortName.toLowerCase());
}
