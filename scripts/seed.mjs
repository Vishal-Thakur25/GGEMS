import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Database Seeding for GGems Squash Academy ---');

  // 1. Super Admin Account
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: 'admin@ggemssquash.com' },
  });

  const adminPasswordHash = await bcrypt.hash('GGemsAdmin2026!Secure', 12);

  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        email: 'admin@ggemssquash.com',
        passwordHash: adminPasswordHash,
        name: 'Gyanendra Prajapati',
        role: 'SUPER_ADMIN',
        isActive: true,
      },
    });
    console.log('✔ Super Admin created: admin@ggemssquash.com');
  } else {
    await prisma.adminUser.update({
      where: { email: 'admin@ggemssquash.com' },
      data: { passwordHash: adminPasswordHash },
    });
    console.log('✔ Super Admin credentials synchronized.');
  }

  // 2. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: 'GGEMS SQUASH ACADEMY',
      siteTagline: 'Unleash Your Inner Champion at Squash Academy',
      siteDescription:
        'With over 20 years of experience in squash coaching and sports development, GGems develops players from grassroots to national and international excellence across Delhi NCR and beyond.',
      phone: '8826433044',
      secondaryPhone: '9810000000',
      email: 'contact@ggemssquash.com',
      address: 'Office - Jaypee Wish Town, Kosmos-62, Sector 134',
      city: 'Noida',
      state: 'Delhi NCR & UP',
      pincode: '201304',
      associationText: 'In Association with Dhairya Bharat Foundation, India',
      instagramUrl: 'https://instagram.com/ggemssquash',
      instagramAltUrl: 'https://instagram.com/ggemssirifort',
      youtubeUrl: 'https://youtube.com/@ggemssquash',
      facebookUrl: 'https://facebook.com/ggemssquash',
      linkedinUrl: 'https://linkedin.com/company/ggems-squash',
      officeLocationDetails: 'Jaypee Wish Town, Noida-134, Kosmos -62, PIN- 201304',
      copyrightText: '© 2026 GGems Squash Academy. In association with Dhairya Bharat Foundation. All Rights Reserved.',
    },
  });
  console.log('✔ Site Settings initialized.');

  // 3. Theme Settings (Design tokens)
  await prisma.themeSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      primaryColor: '#050505',
      secondaryColor: '#0B0B0B',
      accentColor: '#FFE000',
      backgroundColor: '#050505',
      surfaceColor: '#121212',
      textColor: '#FFFFFF',
      textMutedColor: '#888888',
      borderColor: '#1F1F1F',
      headingFont: 'Inter',
      bodyFont: 'Inter',
      borderRadius: 'rounded-xl',
      buttonStyle: 'pill',
      containerWidth: 'max-w-7xl',
    },
  });
  console.log('✔ Theme Settings initialized.');

  // 4. SEO Settings
  await prisma.seoSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      metaTitle: 'GGems Squash Academy | Delhi NCR Premier High-Performance Squash Coaching',
      metaDescription:
        'Official website of GGems Squash Academy, Delhi NCR. Led by Founder Gyanendra Prajapati & Head Coach Aakash Sharma. Operating 25% of regional courts, elite athlete development from beginner to national ranks.',
      metaKeywords:
        'squash academy delhi ncr, squash coaching noida, siri fort squash, gyanendra prajapati, aakash sharma, junior squash training, professional squash coach india, school squash partnership',
      canonicalBaseUrl: 'https://ggemssquash.com',
      ogImageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop',
    },
  });
  console.log('✔ SEO Settings initialized.');

  // 5. Hero Section
  await prisma.heroSection.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      badgeText: 'DELHI NCR • HIGH PERFORMANCE SQUASH ACADEMY',
      headline: 'GGEMS SQUASH ACADEMY',
      subHeadline: 'TRAIN. COMPETE. EXCEL.',
      description:
        'Professional squash coaching and athlete development for beginners, competitive players and high-performance athletes across premier centers in Delhi NCR.',
      primaryCtaText: 'START YOUR JOURNEY',
      primaryCtaUrl: '/contact',
      secondaryCtaText: 'PARTNER WITH US',
      secondaryCtaUrl: '/school-partnership',
      callNowPhone: '8826433044',
      mediaType: 'IMAGE',
      imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2000&auto=format&fit=crop',
      backgroundOverlayOpacity: 75,
      alignment: 'left',
      isActive: true,
    },
  });
  console.log('✔ Hero Section initialized.');

  // 6. Navigation: Header Main & Footer Menus
  const headerNav = await prisma.navigation.upsert({
    where: { name: 'HEADER_MAIN' },
    update: {},
    create: {
      name: 'HEADER_MAIN',
      location: 'header',
      isActive: true,
    },
  });

  const headerItems = [
    { label: 'Home', url: '/', displayOrder: 1 },
    { label: 'About', url: '/about', displayOrder: 2 },
    { label: 'Programs', url: '/programs', displayOrder: 3 },
    { label: 'Coaches & Team', url: '/team', displayOrder: 4 },
    { label: 'Centers', url: '/centers', displayOrder: 5 },
    { label: 'School Partnership', url: '/school-partnership', displayOrder: 6 },
    { label: 'Achievements', url: '/achievements', displayOrder: 7 },
    { label: 'Gallery', url: '/gallery', displayOrder: 8 },
    { label: 'News', url: '/news', displayOrder: 9 },
    { label: 'Contact', url: '/contact', displayOrder: 10 },
  ];

  for (const item of headerItems) {
    const existing = await prisma.navigationItem.findFirst({
      where: { navigationId: headerNav.id, label: item.label },
    });
    if (!existing) {
      await prisma.navigationItem.create({
        data: {
          navigationId: headerNav.id,
          label: item.label,
          url: item.url,
          displayOrder: item.displayOrder,
          isVisible: true,
        },
      });
    }
  }

  const footerNav = await prisma.navigation.upsert({
    where: { name: 'FOOTER_QUICK_LINKS' },
    update: {},
    create: {
      name: 'FOOTER_QUICK_LINKS',
      location: 'footer',
      isActive: true,
    },
  });

  const footerItems = [
    { label: 'About GGems', url: '/about', displayOrder: 1 },
    { label: 'Player Pathway', url: '/#pathway', displayOrder: 2 },
    { label: 'All Centers', url: '/centers', displayOrder: 3 },
    { label: 'School Partnership Proposal', url: '/school-partnership', displayOrder: 4 },
    { label: 'Hall of Fame', url: '/achievements', displayOrder: 5 },
    { label: 'Latest Updates', url: '/news', displayOrder: 6 },
    { label: 'Contact Academy', url: '/contact', displayOrder: 7 },
  ];

  for (const item of footerItems) {
    const existing = await prisma.navigationItem.findFirst({
      where: { navigationId: footerNav.id, label: item.label },
    });
    if (!existing) {
      await prisma.navigationItem.create({
        data: {
          navigationId: footerNav.id,
          label: item.label,
          url: item.url,
          displayOrder: item.displayOrder,
          isVisible: true,
        },
      });
    }
  }
  console.log('✔ Dynamic Navigation established.');

  // 7. Homepage Sections
  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'GGems Squash Academy | Delhi NCR',
      subtitle: 'Unleash Your Inner Champion at Squash Academy',
      seoTitle: 'GGems Squash Academy - High-Performance Squash Coaching in Delhi NCR',
      seoDescription: 'Premier squash academy operating 25% of squash courts across Delhi NCR, led by certified elite coaches.',
      status: 'PUBLISHED',
    },
  });

  const sectionsData = [
    {
      pageSlug: homePage.slug,
      sectionType: 'HERO',
      title: 'GGEMS SQUASH ACADEMY',
      subtitle: 'DELHI NCR • TRAIN. COMPETE. EXCEL.',
      content: 'Professional squash coaching and athlete development for beginners, competitive players and high-performance athletes.',
      ctaLabel: 'START YOUR JOURNEY',
      ctaUrl: '/contact',
      secondaryCtaLabel: 'PARTNER WITH US',
      secondaryCtaUrl: '/school-partnership',
      imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2000&auto=format&fit=crop',
      displayOrder: 1,
      isVisible: true,
    },
    {
      pageSlug: homePage.slug,
      sectionType: 'INTRO',
      title: 'MORE THAN COACHING. WE DEVELOP ATHLETES.',
      subtitle: '20+ Years of Squash Coaching & Sports Development Excellence',
      content:
        'With over 20 years of experience in squash coaching and physical & health education (PHE), GGems Sports Academy focuses on developing athletes from grassroots beginner level to competitive state, national, and international championship levels. Through structured training, match play, physical conditioning, and mental resilience, we transform athletic passion into podium triumph.',
      ctaLabel: 'EXPLORE OUR PHILOSOPHY',
      ctaUrl: '/about',
      displayOrder: 2,
      isVisible: true,
    },
    {
      pageSlug: homePage.slug,
      sectionType: 'IMPACT',
      title: 'OUR IMPACT & CONTRIBUTION',
      subtitle: 'Verified Benchmark Metrics Across Delhi NCR & India',
      content:
        'GGems Squash Academy manages 25% of squash court operations in Delhi NCR, training over 260 active athletes across 10 centers of excellence in partnership with schools, institutions, and Dhairya Bharat Foundation.',
      displayOrder: 3,
      isVisible: true,
    },
    {
      pageSlug: homePage.slug,
      sectionType: 'PATHWAY',
      title: 'ATHLETE DEVELOPMENT PATHWAY',
      subtitle: 'From First Grip to International Tournaments',
      content:
        'Our progressive 6-stage development system systematically equips athletes with technical biomechanics, tactical court craft, match temperament, and high-performance conditioning.',
      displayOrder: 4,
      isVisible: true,
    },
    {
      pageSlug: homePage.slug,
      sectionType: 'PROGRAMS',
      title: 'STRUCTURED SQUASH PROGRAMS',
      subtitle: 'Tailored for Every Age & Performance Tier',
      content:
        'From foundational beginner clinics to elite competitive regimens including nutrition, video analysis, and sports psychology.',
      ctaLabel: 'VIEW ALL PROGRAMS',
      ctaUrl: '/programs',
      displayOrder: 5,
      isVisible: true,
    },
    {
      pageSlug: homePage.slug,
      sectionType: 'WHY_GGEMS',
      title: 'WHY GGEMS SQUASH ACADEMY',
      subtitle: 'The Gold Standard of Performance Squash',
      content:
        'Certified WSF & ASF coaching staff, international-spec glass back courts, comprehensive physical conditioning, and dedicated tournament management.',
      displayOrder: 6,
      isVisible: true,
    },
    {
      pageSlug: homePage.slug,
      sectionType: 'PHILOSOPHY',
      title: 'DISCIPLINE. CONSISTENCY. INNOVATION.',
      subtitle: 'Core Pillars of Athletic Greatness',
      content:
        'We blend sports science with rigorous on-court discipline. Every rally is dissected, every movement optimized, and every player mentored with bespoke attention.',
      displayOrder: 7,
      isVisible: true,
    },
    {
      pageSlug: homePage.slug,
      sectionType: 'TEAM',
      title: 'OUR ELITE COACHING TEAM',
      subtitle: 'National Champions, WSF Certified Facilitators & Seasoned Mentors',
      content:
        'Our coaching panel unites former national players, certified WSF coaches, and physical conditioning masters who have coached Asian Medalists and national champions.',
      ctaLabel: 'MEET FULL COACHING PANEL',
      ctaUrl: '/team',
      displayOrder: 8,
      isVisible: true,
    },
    {
      pageSlug: homePage.slug,
      sectionType: 'CENTERS',
      title: 'CENTERS OF EXCELLENCE',
      subtitle: '10 Premier Squash Hubs in Delhi NCR & Beyond',
      content:
        'Accessible, world-class squash facilities situated in leading sports complexes, international schools, and premier clubs.',
      ctaLabel: 'FIND A CENTER NEAR YOU',
      ctaUrl: '/centers',
      displayOrder: 9,
      isVisible: true,
    },
    {
      pageSlug: homePage.slug,
      sectionType: 'PARTNERSHIP',
      title: 'BUILD A SQUASH PROGRAM AT YOUR SCHOOL',
      subtitle: 'Turnkey Sports Academy Integration for Leading Institutions',
      content:
        'Partner with GGems to introduce Olympic and Asian Games recognized squash sports programs to your campus with zero operational friction.',
      ctaLabel: 'DISCUSS SCHOOL PARTNERSHIP',
      ctaUrl: '/school-partnership',
      displayOrder: 10,
      isVisible: true,
    },
    {
      pageSlug: homePage.slug,
      sectionType: 'TESTIMONIALS',
      title: 'PROVEN EXCELLENCE',
      subtitle: 'What Our Athletes and Parents Say',
      content:
        'Read real feedback from competitive juniors, adult masters players, and school athletic directors.',
      displayOrder: 11,
      isVisible: true,
    },
    {
      pageSlug: homePage.slug,
      sectionType: 'CTA',
      title: 'YOU’VE COME SO FAR. DON’T QUIT NOW.',
      subtitle: 'Step onto the court with India’s foremost squash coaching team.',
      content: 'Book a comprehensive evaluation session with Head Coach Aakash Sharma and Founder Gyanendra Prajapati today.',
      ctaLabel: 'BOOK AN EVALUATION SESSION',
      ctaUrl: '/contact',
      displayOrder: 12,
      isVisible: true,
    },
  ];

  for (const s of sectionsData) {
    const existing = await prisma.pageSection.findFirst({
      where: { pageSlug: s.pageSlug, sectionType: s.sectionType },
    });
    if (!existing) {
      await prisma.pageSection.create({ data: s });
    }
  }
  console.log('✔ Dynamic Homepage Sections created.');

  // 8. Statistics from Verified Source PDF
  const statsData = [
    {
      key: 'EXP_YEARS',
      label: 'Years of Coaching & Sports Development',
      numericValue: 20,
      prefix: '',
      suffix: '+',
      description: 'Extensive coaching experience at grassroots, national, and university levels',
      displayOrder: 1,
    },
    {
      key: 'ACTIVE_PLAYERS',
      label: 'Active Squash Athletes',
      numericValue: 260,
      prefix: '',
      suffix: '',
      description: 'Currently enrolled across all GGems academy hubs and partner schools',
      displayOrder: 2,
    },
    {
      key: 'COURTS_PERCENT',
      label: 'Courts Under GGems Operations',
      numericValue: 25,
      prefix: '',
      suffix: '%',
      description: 'Major share of institutional and club squash facilities across Delhi NCR',
      displayOrder: 3,
    },
    {
      key: 'BEGINNERS_COUNT',
      label: 'Beginner Players in Foundation',
      numericValue: 200,
      prefix: '',
      suffix: '',
      description: '73.5% of player base mastering fundamentals, grip, racket-prep and footwork',
      displayOrder: 4,
    },
    {
      key: 'INTERMEDIATE_COUNT',
      label: 'Intermediate Level Athletes',
      numericValue: 45,
      prefix: '',
      suffix: '',
      description: '16.5% competing in regional and age-group state circuits',
      displayOrder: 5,
    },
    {
      key: 'ADVANCED_COUNT',
      label: 'Advanced & National Ranked Players',
      numericValue: 15,
      prefix: '',
      suffix: '',
      description: '5.5% elite performers ranked in Top 10 Indian squash circuit',
      displayOrder: 6,
    },
  ];

  for (const st of statsData) {
    await prisma.statistic.upsert({
      where: { key: st.key },
      update: st,
      create: st,
    });
  }
  console.log('✔ Statistics seeded from source PDF.');

  // 9. Verified Programs
  const programsData = [
    {
      title: 'Beginners Program',
      slug: 'beginners-program',
      ageGroup: 'All Age Groups (Ages 6+)',
      skillLevel: 'Beginner / Grassroots',
      duration: 'Ongoing / 3-6 Months Cycles',
      shortDescription:
        'Skills learnt in the Beginners’ Program are further fine-tuned at the intermediate level. Introduces players to court awareness, proper racket grip, and kinetic body movement.',
      fullDescription:
        'The GGems Beginners Program lays the indispensable foundation for every aspiring squash player. Focus is placed on mastering basic swing mechanics, the correct continental grip, court safety, dynamic footwork, and front/back-court recovery. Each player receives structured group coaching, fun rally drills, and progressive skill assessments before advancing to intermediate competition.',
      featuredImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop',
      trainingFocus: 'Grip Fundamentals, Kinetic Footwork, Eye-to-Ball Tracking, Rally Dynamics, Court Rules & Etiquette',
      scheduleInfo: 'Weekday & Weekend Batches Available (3 sessions per week)',
      status: 'PUBLISHED',
      displayOrder: 1,
      isFeatured: true,
      features: [
        { title: 'Biomechanical Grip & Swing Form', description: 'Eliminating early bad habits through focused technical repetitions.' },
        { title: 'Court Movement & Agility', description: 'T-position recovery and lunging mechanics to prevent injuries.' },
        { title: 'Introductory Matchplay', description: 'Regular practice friendly games to instill tournament rules and confidence.' },
      ],
    },
    {
      title: 'Junior Advance Program',
      slug: 'junior-advance-program',
      ageGroup: 'Students Under 14 Years',
      skillLevel: 'Intermediate to Advanced Junior',
      duration: 'Annual Comprehensive High-Performance',
      shortDescription:
        'Designed for students below the age of fourteen who aspire to become professional racket sports players. Combines intensive group lessons with private 1-on-1 tactical coaching.',
      fullDescription:
        'Junior Advance Program is designed for students below the age of fourteen, who aspire to become professional racket sports players. Coaches ensure that a player can make maximum use of this program by taking a combination of group lessons along with one-on-one private sessions. This program continuously lays the seeds to produce better and more professional players, preparing them for state ranking tournaments, national junior circuits, and international junior opens.',
      featuredImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
      trainingFocus: 'Tactical Deception, Nick & Drop Accuracy, Pace Variations, Competitive Mental Conditioning, Aerobic Base',
      scheduleInfo: '4 to 5 sessions weekly + Weekly Competitive Match Nights',
      status: 'PUBLISHED',
      displayOrder: 2,
      isFeatured: true,
      features: [
        { title: '1-on-1 Tactical Coaching', description: 'Weekly personalized private sessions focused on individual court weaknesses.' },
        { title: 'Tournament Preparation', description: 'Periodized training plans targeting National Junior Circuits and ASF Junior events.' },
        { title: 'Mental Conditioning', description: 'Handling match pressure, tiebreakers, and staying composed under high stakes.' },
      ],
    },
    {
      title: 'Professional Program',
      slug: 'professional-program',
      ageGroup: 'Ages 14 & Above / Elite Seniors',
      skillLevel: 'Advanced / Competitive National & PSA',
      duration: 'Full-Year Elite Performance Track',
      shortDescription:
        'The professional sports program for players 14 years and above who have a desire to compete at the highest level. Combines on-court practice, tailored diet, fitness routines, and mental conditioning.',
      fullDescription:
        'The professional sports program for players of fourteen years and above, who have a desire to compete at the highest level. The program is an intensive combination of on-court practice, customized athlete nutrition, rigorous fitness routines, and mental conditioning. Led directly by Head Coach Aakash Sharma (National Medalist) and Senior Coach Consultant Dushyant Singh (Former India Top 5), athletes undergo video match analysis, ghosting sessions, solo drill regimes, and tactical periodization.',
      featuredImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=1200&auto=format&fit=crop',
      trainingFocus: 'High-Tempo Rallies, Sports Nutrition, Plyometrics & VO2 Max, Video Analytics, National & International PSA Exposure',
      scheduleInfo: 'Daily Double Sessions (Morning Conditioning + Evening Tactical & Matchplay)',
      status: 'PUBLISHED',
      displayOrder: 3,
      isFeatured: true,
      features: [
        { title: 'Bespoke Diet & Nutrition Plans', description: 'Tailored macro-nutrition and tournament hydration strategies.' },
        { title: 'Full Sports Conditioning', description: 'Under supervision of certified Physical Education & Fitness Trainers.' },
        { title: 'Video Match Analytics', description: 'Detailed frame-by-frame analysis of technical errors and opponent tactical patterns.' },
      ],
    },
    {
      title: 'Development Camps & Clinics',
      slug: 'development-program',
      ageGroup: 'Ages 7 to 18 (Grouped by Skill)',
      skillLevel: 'All Skill Levels',
      duration: 'Seasonal Intensives (Summer / Winter / Weekend Bootcamps)',
      shortDescription:
        'Our camps are developed to provide athletes an opportunity to become improved players in a fun and positive atmosphere, developing confidence and a passion to enjoy the sport for a lifetime.',
      fullDescription:
        'GGems Development Camps provide an intensive, immersive training environment during school vacations and weekends. Campers learn from the best coaches in the country, engage with guest international masters, and leave camp with enhanced technical shot repertoires, newfound confidence, and a lifelong passion for squash.',
      featuredImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop',
      trainingFocus: 'Shot Selection, Dynamic Footwork Drills, Team Relays, Sportsmanship, Match Simulations',
      scheduleInfo: 'Seasonal Intensive: 5-Day and 10-Day Camp Modules',
      status: 'PUBLISHED',
      displayOrder: 4,
      isFeatured: false,
      features: [
        { title: 'Multi-Coach Exposure', description: 'Learn varied coaching styles and specialized techniques from visiting senior mentors.' },
        { title: 'Camp Championship Tournament', description: 'Friendly yet competitive tournament concluding every camp session.' },
        { title: 'Comprehensive Progress Report', description: 'Detailed individual assessment card given to every athlete at camp completion.' },
      ],
    },
  ];

  for (const p of programsData) {
    const { features, ...pData } = p;
    const program = await prisma.program.upsert({
      where: { slug: p.slug },
      update: pData,
      create: pData,
    });

    for (let i = 0; i < features.length; i++) {
      const f = features[i];
      const existingF = await prisma.programFeature.findFirst({
        where: { programId: program.id, title: f.title },
      });
      if (!existingF) {
        await prisma.programFeature.create({
          data: {
            programId: program.id,
            title: f.title,
            description: f.description,
            displayOrder: i + 1,
          },
        });
      }
    }
  }
  console.log('✔ Programs & features seeded.');

  // 10. Verified Team Members (Exact from PDF)
  const teamData = [
    {
      name: 'Gyanendra Prajapati',
      slug: 'gyanendra-prajapati',
      role: 'Founder & CEO | Pro Coach',
      experienceYears: 20,
      qualifications: 'ASF Certified Coach | Physical & Health Education (PHE) Specialist',
      specialization: 'Grassroots Talent Scouting, Long-Term Athlete Development, Academy Operations',
      shortBio:
        'Founder of GGems Sports Academy with over 20 years of experience in Squash coaching and Physical & Health Education (PHE). All India Inter-University medalist in Badminton and Squash.',
      fullBio:
        'With over 20 years of experience in Squash coaching and Physical & Health Education (PHE), Gyanendra Prajapati has developed extensive expertise in grassroots as well as competitive player development. He is the Founder of GGems Sports Academy and currently directs GGems Squash Centres across the country. He has represented at the All India Inter-University level, winning medals in both Badminton and Squash, and has participated in numerous State and National-level championships.',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 1,
      isFeatured: true,
      achievements: [
        'ASF Certified Squash Coach',
        'All India Inter-University Medalist in Squash & Badminton',
        'State & National Tournament Competitor',
        'Over two decades shaping school & club sports programs across Delhi NCR',
      ],
    },
    {
      name: 'Aakash Sharma',
      slug: 'aakash-sharma',
      role: 'Head Squash Coach & Advisor',
      experienceYears: 15,
      qualifications: 'WSF Level 1 Certified Coach | National Bronze Medalist (2024)',
      specialization: 'High-Performance Tactical Coaching, Elite Junior Development, Tournament Psychology',
      shortBio:
        'Accomplished player and coach. National Bronze Medalist (2024), Level 1 WSF Coach, former official DDA & IIT Delhi Coach. Coached Asian Medalist Anahat Singh.',
      fullBio:
        'Aakash Sharma is an accomplished Squash player and coach with extensive experience in competitive Squash and high-performance player development. He is a National Bronze Medalist (2024) and a Level 1 Certified Squash Coach by the World Squash Federation. He has served as an Official Squash Coach in association with the Delhi Development Authority (DDA) and is also associated with IIT Delhi as a Squash Coach. He has coached Anahat Singh, an Asian Medalist, and has won several Masters Squash tournaments across India. In Master Over 40, he holds India Rank - 10.',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 2,
      isFeatured: true,
      achievements: [
        'National Bronze Medalist (2024)',
        'Coached Asian Medalist Anahat Singh',
        'Master Over 40 - India Rank 10',
        'Official Coach for DDA and IIT Delhi',
        'Multiple Masters Squash Championship Titles across India',
      ],
    },
    {
      name: 'Dushyant Singh',
      slug: 'dushyant-singh',
      role: 'Senior Coach Consultant',
      experienceYears: 30,
      qualifications: 'WSF Level-2 Certified Coach | Former India Top 5 (1984–1986)',
      specialization: 'Elite Biomechanics, Stroke Refinement, Championship Temperament',
      shortBio:
        'Ranked among Top 5 Squash players in India (1984–1986) and Junior National Finalist (1983). Over 30 years of coaching experience, awarded "Best Coach in the Country" in Mumbai.',
      fullBio:
        'Highly experienced Squash professional with an outstanding playing and coaching career. Dushyant Singh was ranked among the Top 5 Squash players in India from 1984–1986 and was a Finalist at the Junior National Squash Championship in 1983. He is a qualified Level-2 Squash Coach with over 30 years of coaching experience and has produced and developed numerous National and International-level Squash players. He was honored with the prestigious "Best Coach in the Country" award in Mumbai.',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 3,
      isFeatured: true,
      achievements: [
        'India Top 5 Squash Player (1984–1986)',
        'Junior National Squash Championship Finalist (1983)',
        'WSF Level-2 Certified Coach',
        'Awarded "Best Coach in the Country" in Mumbai',
        'Over 30 years training national champions',
      ],
    },
    {
      name: 'Parmeet Singh',
      slug: 'parmeet-singh',
      role: 'Squash Facilitator',
      experienceYears: 10,
      qualifications: 'WSF Level 1 Certified Coach | 7-Time National Champion',
      specialization: 'Agility, Speed Drills, High-Intensity Match Preparation',
      shortBio:
        '7-Time National Champion, former India representative at World Junior Championships, silver medalist Indian team Qatar Open & Asian Junior Championships.',
      fullBio:
        'WSF Level 1 Certified Squash Coach with 10+ years of high-performance coaching experience. Experienced in senior coaching roles at Daly College Indore, Jaipur Squash Academy, and the Prakash Padukone & Rahul Dravid Sports Centre for Excellence in Bangalore. A former India representative at the World Junior Championships and silver medalist with the Indian team at the Qatar Open and Asian Junior Championships.',
      profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 4,
      isFeatured: true,
      achievements: [
        '7-Time National Champion',
        'World Junior Championships India Representative',
        'Silver Medalist with Indian Team at Qatar Open & Asian Junior Championships',
        'Coach at Padukone-Dravid Centre for Sports Excellence',
      ],
    },
    {
      name: 'Akash Sharma (Facilitator)',
      slug: 'akash-sharma-facilitator',
      role: 'Squash Facilitator',
      experienceYears: 10,
      qualifications: 'WSF Level 1 Certified Coach | World Junior Championships Representative',
      specialization: 'Athlete Development, Junior Competition Conditioning',
      shortBio:
        'WSF Level 1 Certified Squash Coach with over 10 years experience across India’s leading squash academies, currently associated with Sagar School Rajasthan.',
      fullBio:
        'WSF Level 1 Certified Squash Coach, currently working with Sagar School Rajasthan. Over 10 years of coaching experience across India’s leading squash academies with a proven track record of developing national and international-level players through high-performance coaching and athlete development. Former India representative at the World Junior Championships.',
      profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 5,
      isFeatured: false,
      achievements: ['WSF Level 1 Certified', 'Former India Representative World Junior Championships', '10+ Years Coaching'],
    },
    {
      name: 'Sanjeev Kumar',
      slug: 'sanjeev-kumar',
      role: 'Squash Facilitator',
      experienceYears: 6,
      qualifications: 'State Player (UP) | Physical Education (PE) Coach',
      specialization: 'Technical Skill Development, Talent Identification, Match Strategy',
      shortBio:
        'Presently working at BLS World School, Greater Noida West. Representing Uttar Pradesh for the last 5 years in state and national competitions.',
      fullBio:
        'Presently working at BLS World School, Greater Noida West, playing for Uttar Pradesh for the past 5 years. Participated in various state and national level competitions. Also leads Physical Education classes, possessing deep expertise in technical skill development, match strategy, fitness conditioning, talent identification, and preparing athletes for competitive tournaments.',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 6,
      isFeatured: false,
      achievements: ['Representing UP for 5 years', 'PE Instructor BLS World School', 'State & National Competitor'],
    },
    {
      name: 'Raj Yadav',
      slug: 'raj-yadav',
      role: 'Squash Facilitator & Active Competitor',
      experienceYears: 7,
      qualifications: 'India Rank - 66 (Boys U-19) | UP State Team Player',
      specialization: 'Match Strategy, Fitness Conditioning, High-Performance Drills',
      shortBio:
        'Squash Coach at Jaypee Sports Complex, Greater Noida. Representing Uttar Pradesh for the past 7 years in state and national championships. Ranked 66 in India Boys U-19.',
      fullBio:
        'Currently serving as a Squash Coach at Jaypee Sports Complex, Greater Noida, with extensive experience in coaching players across beginner, intermediate, and high-performance levels. Representing Uttar Pradesh for the past seven years in various state and national championships, with expertise in technical skill development, match strategy, fitness conditioning, talent identification, and tournament preparation.',
      profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 7,
      isFeatured: false,
      achievements: ['India Rank 66 (Boys U-19)', 'UP State Representative 7 Years', 'Coach Jaypee Sports Complex'],
    },
    {
      name: 'Ajit Singh',
      slug: 'ajit-singh',
      role: 'Fitness Trainer & Sports Conditioning Specialist',
      experienceYears: 14,
      qualifications: 'M.Phil. in Physical Education | Specialization in Yoga & Fitness',
      specialization: 'Squash Conditioning, Flexibility, Injury Prevention, Yoga',
      shortBio:
        'PET Delhi Govt. Formerly PET at Indian School Doha Qatar (2010–2013) and Bright Riders School Abu Dhabi UAE (2014–2018). M.Phil. in Physical Education.',
      fullBio:
        'Presently working as a Physical Education Teacher with the Delhi Government. Extensive international sports conditioning tenure including PET at Indian School, Doha, Qatar (2010–2013) and PET at Bright Riders School, Abu Dhabi, UAE (2014–2018). Area of specialization: Yoga, core stability, and athletic fitness conditioning. Holds an M.Phil. in Physical Education.',
      profileImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 8,
      isFeatured: false,
      achievements: ['M.Phil in Physical Education', 'International Coaching Experience UAE & Qatar', 'PET Delhi Government'],
    },
    {
      name: 'Mukesh Rai',
      slug: 'mukesh-rai',
      role: 'Squash Facilitator',
      experienceYears: 8,
      qualifications: 'Academy & School Coaching Specialist',
      specialization: 'Grassroots Mentoring, Match Strategy, Player-Centric Approach',
      shortBio:
        'Passionate Squash Coach with expertise in coaching beginners, intermediate, and competitive players in school and academy environments.',
      fullBio:
        'Passionate Squash Coach with experience in coaching beginners, intermediate, and competitive players in school and academy environments. Expertise in skill development, match strategy, fitness training, and tournament preparation. Strong communication and mentoring skills with a player-centric coaching approach.',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 9,
      isFeatured: false,
      achievements: ['Academy Facilitator', 'Specialist in junior tournament mentoring'],
    },
    {
      name: 'Nitesh Kumar',
      slug: 'nitesh-kumar',
      role: 'Squash Facilitator',
      experienceYears: 5,
      qualifications: 'WSF Level 1 Squash Officiating Certified',
      specialization: 'Match Rules, Technical Coaching, Physical Conditioning',
      shortBio:
        'Squash Coach at GGems Squash Academy, Mayur Vihar, New Delhi. WSF Level 1 Squash Officiating Certification holder.',
      fullBio:
        'Currently serving as a Squash Coach at GGems Squash Academy, Mayur Vihar, New Delhi, with a passion for developing players of all age groups. Recently earned the WSF Level 1 Squash Officiating Certification, demonstrating a strong understanding of international rules and match management. Skilled in technical coaching, tactical development, physical conditioning, and tournament preparation.',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 10,
      isFeatured: false,
      achievements: ['WSF Level 1 Officiating Certified', 'Coach at Mayur Vihar Center'],
    },
    {
      name: 'Saddam Husain',
      slug: 'saddam-husain',
      role: 'Squash Facilitator & Endurance Specialist',
      experienceYears: 7,
      qualifications: 'State Player (UP) | Long Distance Runner',
      specialization: 'Tactical Coaching, Personalized Development, Cardiovascular Stamina',
      shortBio:
        'Presently working at DPS GBN Noida-132, playing for UP for the last 7 years. Passionate about structured training and tactical coaching.',
      fullBio:
        'Presently working in DPS GBN Noida-132, playing for UP for the last 7 years. Participated in various state and national level competitions. Passionate about developing competitive athletes through structured training, tactical coaching, and personalized player development programs. Long-distance runner with emphasis on supreme court stamina.',
      profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 11,
      isFeatured: false,
      achievements: ['UP State Player 7 Years', 'Coach DPS GBN Sector 132', 'Long Distance Runner'],
    },
    {
      name: 'Vishal Rajput',
      slug: 'vishal-rajput',
      role: 'Squash Coach',
      experienceYears: 8,
      qualifications: '8 Years Squash Coaching Experience | State Competitor',
      specialization: 'Court Craft, Drills, Junior School Coaching',
      shortBio:
        'Presently working at Gems Academy, KR Manglam School GK-2 New Delhi. 8 years of Squash coaching experience.',
      fullBio:
        'Presently working in Gems Academy, KR Manglam School GK-2 New Delhi. 8 years of dedicated Squash coaching experience. Has participated in various state and national level competitions, instilling high discipline and court discipline in junior athletes.',
      profileImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 12,
      isFeatured: false,
      achievements: ['8 Years Coaching Experience', 'Coach KR Manglam School GK-2 New Delhi'],
    },
    {
      name: 'Dipendra Singh',
      slug: 'dipendra-singh',
      role: 'Squash Facilitator',
      experienceYears: 8,
      qualifications: 'World Squash Federation Level-1 Course | 8 Years Coaching Experience',
      specialization: 'West India Coaching Hub, Fundamental Mechanics, Footwork',
      shortBio:
        'Presently working at Shakti Sports Club Vadodara, Gujarat. 8 years of coaching experience, participated in WSF Level-1 coaching course.',
      fullBio:
        'Presently working in Shakti Sports Club Vadodara, Gujarat. 8 years of Squash coaching experience. Participated in various state and national level competitions. Participated in Level-1 Squash coaching Course conducted by World Squash Federation.',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
      displayOrder: 13,
      isFeatured: false,
      achievements: ['WSF Level 1 Course Participant', 'Coach Shakti Sports Club Vadodara', '8 Years Experience'],
    },
  ];

  for (const t of teamData) {
    const { achievements, ...tData } = t;
    const member = await prisma.teamMember.upsert({
      where: { slug: t.slug },
      update: tData,
      create: tData,
    });

    for (let i = 0; i < achievements.length; i++) {
      const ach = achievements[i];
      const existingAch = await prisma.teamMemberAchievement.findFirst({
        where: { teamMemberId: member.id, title: ach },
      });
      if (!existingAch) {
        await prisma.teamMemberAchievement.create({
          data: {
            teamMemberId: member.id,
            title: ach,
            displayOrder: i + 1,
          },
        });
      }
    }
  }
  console.log('✔ All 13 coaches and consultants seeded.');

  // 11. Verified Centers of Excellence (Exact from PDF)
  const centersData = [
    {
      name: 'Siri Fort Sports Complex',
      slug: 'siri-fort-sports-complex-delhi',
      city: 'New Delhi',
      state: 'Delhi',
      address: 'August Kranti Marg, Siri Fort, New Delhi, Delhi 110049',
      phone: '8826433044',
      email: 'sirifort@ggemssquash.com',
      facilities: 'International Standard Glass-back Courts, Air-conditioned Spectator Gallery, Pro Fitness Center, Locker Rooms, Video Analysis Booth',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop',
      displayOrder: 1,
      isFeatured: true,
      googleMapsUrl: 'https://maps.google.com/?q=Siri+Fort+Sports+Complex+Delhi',
    },
    {
      name: 'Gyanshree School Noida-127',
      slug: 'gyanshree-school-noida-127',
      city: 'Noida',
      state: 'Uttar Pradesh',
      address: 'Sector 127, Expressway, Noida, UP 201304',
      phone: '8826433044',
      facilities: 'WSF Approved Squash Courts, School Athletic Integration, High-Performance Junior Batch, Safety Flooring',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
      displayOrder: 2,
      isFeatured: true,
      googleMapsUrl: 'https://maps.google.com/?q=Gyanshree+School+Noida+127',
    },
    {
      name: 'Squash & Badminton Stadium, New Delhi',
      slug: 'squash-badminton-stadium-new-delhi',
      city: 'New Delhi',
      state: 'Delhi',
      address: 'Siri Fort Institutional Area, New Delhi',
      phone: '8826433044',
      facilities: 'Commonwealth Games Legacy Courts, Championship Arenas, National Squad Training Setup',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=1200&auto=format&fit=crop',
      displayOrder: 3,
      isFeatured: true,
      googleMapsUrl: 'https://maps.google.com/?q=Squash+and+Badminton+Stadium+New+Delhi',
    },
    {
      name: 'Prometheus School Noida-131',
      slug: 'prometheus-school-noida-131',
      city: 'Noida',
      state: 'Uttar Pradesh',
      address: 'Jaypee Wish Town, Sector 131, Noida, UP 201304',
      phone: '8826433044',
      facilities: 'State-of-the-art International School Courts, Dedicated Junior Development Hub, Fitness Conditioning Area',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop',
      displayOrder: 4,
      isFeatured: false,
      googleMapsUrl: 'https://maps.google.com/?q=Prometheus+School+Noida+131',
    },
    {
      name: 'Ahlcon International School, Mayur Vihar',
      slug: 'ahlcon-international-school-mayur-vihar',
      city: 'Delhi',
      state: 'Delhi',
      address: 'Mayur Vihar Phase 1, Near Metro Station, Delhi 110091',
      phone: '8826433044',
      facilities: 'Twin Competition Courts, East Delhi Junior Training Hub, Supervised Coaching & Officiating',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop',
      displayOrder: 5,
      isFeatured: false,
      googleMapsUrl: 'https://maps.google.com/?q=Ahlcon+International+School+Mayur+Vihar+Delhi',
    },
    {
      name: 'ATS Society, Noida Sector-150, 105 & 93',
      slug: 'ats-society-noida-centers',
      city: 'Noida',
      state: 'Uttar Pradesh',
      address: 'ATS Pristine Sector 150 / ATS One Hamlet Sector 104 / ATS Greens Village Sector 93A, Noida',
      phone: '8826433044',
      facilities: 'Exclusive Residential Community Hubs, Floodlit Glass Back Courts, Weekend Adult & Junior Coaching Clinics',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
      displayOrder: 6,
      isFeatured: false,
      googleMapsUrl: 'https://maps.google.com/?q=ATS+Pristine+Sector+150+Noida',
    },
    {
      name: 'Salvation Tree School, Greater Noida West',
      slug: 'salvation-tree-school-greater-noida-west',
      city: 'Greater Noida West',
      state: 'Uttar Pradesh',
      address: 'Plot No. 1, Sector 16B, Greater Noida West, UP 201306',
      phone: '8826433044',
      facilities: 'Modern Academic Sports Facility, Junior Grassroots Foundation, PE Integrated Squash Training',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=1200&auto=format&fit=crop',
      displayOrder: 7,
      isFeatured: false,
      googleMapsUrl: 'https://maps.google.com/?q=Salvation+Tree+School+Greater+Noida+West',
    },
    {
      name: 'KR Mangalam School GK-2, New Delhi',
      slug: 'kr-mangalam-school-gk-2-new-delhi',
      city: 'New Delhi',
      state: 'Delhi',
      address: 'Greater Kailash II, New Delhi, Delhi 110048',
      phone: '8826433044',
      facilities: 'South Delhi Premier Hub, Advanced Junior Squads, Certified WSF Coaching Personnel',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop',
      displayOrder: 8,
      isFeatured: false,
      googleMapsUrl: 'https://maps.google.com/?q=KR+Mangalam+School+GK+2+New+Delhi',
    },
    {
      name: 'Jaypee Public School & Club at Noida',
      slug: 'jaypee-public-school-club-noida',
      city: 'Noida',
      state: 'Uttar Pradesh',
      address: 'Sector 128 / Wish Town Sports Hub, Noida, UP 201304',
      phone: '8826433044',
      facilities: 'Comprehensive Sports Complex, Multi-Court Facility, Masters & Junior Competition Leagues',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop',
      displayOrder: 9,
      isFeatured: false,
      googleMapsUrl: 'https://maps.google.com/?q=Jaypee+Public+School+Noida+Sector+128',
    },
    {
      name: 'Shakti Sports Club, Vadodara Gujarat',
      slug: 'shakti-sports-club-vadodara-gujarat',
      city: 'Vadodara',
      state: 'Gujarat',
      address: 'Shakti Sports Complex, Gotri Road, Vadodara, Gujarat 390021',
      phone: '8826433044',
      facilities: 'Western India Regional Center, WSF Certified Coaching Staff, State Player Development Wing',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
      displayOrder: 10,
      isFeatured: false,
      googleMapsUrl: 'https://maps.google.com/?q=Shakti+Sports+Club+Vadodara',
    },
  ];

  for (const c of centersData) {
    await prisma.center.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }
  console.log('✔ All 10 Centers of Excellence seeded.');

  // 12. Verified Achievers / Glimpse of Our Champions (Exact from PDF)
  const achieversData = [
    {
      athleteName: 'Vedant Patel',
      category: "Men's Category",
      rank: 'India Rank - 08',
      title: 'Top 10 Men’s National Squash Circuit',
      competition: 'SRFI National Circuit',
      year: '2024',
      athleteImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
      medal: 'Top 8 National Rank',
      displayOrder: 1,
      isFeatured: true,
    },
    {
      athleteName: 'Devshree',
      category: 'Girls Under-19',
      rank: 'India Rank - 10',
      title: 'Top 10 Junior National Circuit',
      competition: 'National Junior Championships',
      year: '2024',
      athleteImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
      medal: 'Top 10 National Rank',
      displayOrder: 2,
      isFeatured: true,
    },
    {
      athleteName: 'Abhiraj Singh',
      category: 'Boys Under-19',
      rank: 'India Rank - 10',
      title: 'Top 10 Junior National Ranking',
      competition: 'All India Junior Squash Open',
      year: '2024',
      athleteImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
      medal: 'Top 10 National Rank',
      displayOrder: 3,
      isFeatured: true,
    },
    {
      athleteName: 'Raj Yadav',
      category: 'Boys Under-19',
      rank: 'India Rank - 66',
      title: 'UP State Representative & National Contender',
      competition: 'National Ranking Tournaments',
      year: '2024',
      athleteImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
      medal: 'State Representation',
      displayOrder: 4,
      isFeatured: true,
    },
    {
      athleteName: 'Aakash Sharma',
      category: 'Master Over 40',
      rank: 'India Rank - 10',
      title: 'National Bronze Medalist (2024)',
      competition: 'National Masters Squash Championship',
      year: '2024',
      athleteImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
      medal: 'National Bronze Medal',
      displayOrder: 5,
      isFeatured: true,
    },
    {
      athleteName: 'Gyanendra Prajapati',
      category: 'Pro Coach & Mentor',
      rank: 'Inter-University Champion',
      title: 'Founder & Head of Academy Development',
      competition: 'All India Inter-University Games',
      year: 'Legacy',
      athleteImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
      medal: 'Badminton & Squash University Medals',
      displayOrder: 6,
      isFeatured: true,
    },
  ];

  for (const ach of achieversData) {
    const existing = await prisma.achievement.findFirst({
      where: { athleteName: ach.athleteName, category: ach.category },
    });
    if (!existing) {
      await prisma.achievement.create({ data: ach });
    }
  }
  console.log('✔ Achievers seeded from PDF.');

  // 13. School Partnership Page & Details
  await prisma.schoolPartnership.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      headline: 'BUILD A WORLD-CLASS SQUASH PROGRAM AT YOUR SCHOOL',
      subheadline:
        'Transform your institution’s athletic standing with professional WSF coaching, complete court operations, tournament exposure, and holistic athlete development.',
      description:
        'GGems Squash Academy partners with leading international and CBSE/ICSE schools across Delhi NCR to implement comprehensive, Olympic-caliber squash programs. We take full responsibility for certified coaching staff, customized curriculum, physical conditioning, safety oversight, and escorting talented students to State, National and ASF Asian Junior tournaments.',
      benefitsList: JSON.stringify([
        'Certified World Squash Federation (WSF) & ASF coaches stationed at your campus',
        'Complete structured curriculum from grassroots beginner to national ranking',
        'Physical education integration with strength, agility and flexibility training',
        'Zero administrative headache: equipment, stringing, match management handled by GGems',
        'Elevated school prestige through national tournament medals and sports scholarships',
        'Direct pathway for students to earn national sports quotas and Ivy League recruitment credentials',
      ]),
      contactPhone: '8826433044',
      contactEmail: 'partnerships@ggemssquash.com',
      proposalPdfUrl: '/proposals/ggems-school-partnership-2026.pdf',
    },
  });

  // School Partners
  const schoolPartnersData = [
    { schoolName: 'Gyanshree School', location: 'Noida Sector 127', partnershipType: 'Full-Time Academy Center' },
    { schoolName: 'Prometheus School', location: 'Noida Sector 131', partnershipType: 'Sports Academy Partner' },
    { schoolName: 'Ahlcon International School', location: 'Mayur Vihar, Delhi', partnershipType: 'Academy Center' },
    { schoolName: 'Salvation Tree School', location: 'Greater Noida West', partnershipType: 'School Squash Program' },
    { schoolName: 'KR Manglam School', location: 'GK-2, New Delhi', partnershipType: 'Academy Operations' },
    { schoolName: 'Jaypee Public School', location: 'Noida', partnershipType: 'Sports Complex Partner' },
    { schoolName: 'DPS GBN', location: 'Noida Sector 132', partnershipType: 'Training Facilitation' },
    { schoolName: 'BLS World School', location: 'Greater Noida West', partnershipType: 'Coaching Facilitation' },
  ];

  for (let i = 0; i < schoolPartnersData.length; i++) {
    const sp = schoolPartnersData[i];
    const existing = await prisma.schoolPartner.findFirst({ where: { schoolName: sp.schoolName } });
    if (!existing) {
      await prisma.schoolPartner.create({
        data: {
          schoolName: sp.schoolName,
          location: sp.location,
          partnershipType: sp.partnershipType,
          displayOrder: i + 1,
          isActive: true,
        },
      });
    }
  }
  console.log('✔ School partnership data seeded.');

  // 14. Testimonials
  const testimonialsData = [
    {
      authorName: 'Sunita Patel',
      authorRole: 'Parent of Vedant Patel (India Rank - 08)',
      quote:
        'GGems Squash Academy has provided exceptional coaching. Under Gyanendra Sir and Aakash Sir’s mentorship, Vedant transitioned from a regional player to achieving a Top 8 All India Men’s ranking. Their commitment to player discipline and fitness is unmatched.',
      rating: 5,
    },
    {
      authorName: 'Col. Rajesh Sharma',
      authorRole: 'Parent of Under-14 Junior Athlete',
      quote:
        'The structured Player Development System at GGems gave our son clarity. The blend of 1-on-1 tactical drills, physical conditioning with Coach Ajit, and mental preparation on court made all the difference.',
      rating: 5,
    },
    {
      authorName: 'Dr. Meenakshi Roy',
      authorRole: 'Sports Director, Partner School',
      quote:
        'Partnering with GGems was the finest athletic decision for our school. Their certified coaches manage the courts with immense professional standards, and our students have brought home numerous regional squash trophies.',
      rating: 5,
    },
  ];

  for (let i = 0; i < testimonialsData.length; i++) {
    const t = testimonialsData[i];
    const existing = await prisma.testimonial.findFirst({ where: { authorName: t.authorName } });
    if (!existing) {
      await prisma.testimonial.create({
        data: {
          ...t,
          displayOrder: i + 1,
          status: 'PUBLISHED',
        },
      });
    }
  }

  // 15. News & Announcements
  const newsCategory = await prisma.newsCategory.upsert({
    where: { slug: 'academy-news' },
    update: {},
    create: {
      name: 'Academy News',
      slug: 'academy-news',
    },
  });

  const newsArticles = [
    {
      title: 'GGems Athletes Secure Top 10 National Rankings in Latest SRFI Circuit',
      slug: 'ggems-athletes-secure-top-10-national-rankings',
      excerpt:
        'Vedant Patel reaches India Rank 8 in Men’s Category, while Devshree and Abhiraj Singh break into Top 10 in Under-19 categories.',
      content:
        'GGems Squash Academy players have once again delivered outstanding performances at the National Junior & Senior Circuit tournaments. With rigorous periodized training at Siri Fort and Gyanshree School centers, our athletes proved their technical prowess and fitness against the nation’s best competitors.',
      featuredImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop',
      authorName: 'GGems Sports Desk',
      categoryId: newsCategory.id,
      status: 'PUBLISHED',
    },
    {
      title: 'Head Coach Aakash Sharma Claims Bronze at National Championship 2024',
      slug: 'head-coach-aakash-sharma-bronze-national-championship-2024',
      excerpt:
        'National Bronze Medalist Aakash Sharma showcases veteran brilliance, cementing his position among India’s elite top 10 master players.',
      content:
        'Demonstrating that leading by example is at the core of GGems coaching philosophy, Head Squash Coach Aakash Sharma captured the Bronze medal at the 2024 National Championships. His tournament insights directly benefit our junior and professional trainees daily.',
      featuredImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=1200&auto=format&fit=crop',
      authorName: 'GGems Sports Desk',
      categoryId: newsCategory.id,
      status: 'PUBLISHED',
    },
  ];

  for (const art of newsArticles) {
    await prisma.newsArticle.upsert({
      where: { slug: art.slug },
      update: art,
      create: art,
    });
  }

  // 16. FAQs
  const faqsData = [
    {
      question: 'What is the ideal age to start squash coaching at GGems?',
      answer:
        'Children can start as early as 6 or 7 years old in our Beginners Foundation program. We use specialized junior balls and lighter junior rackets to cultivate correct hand-eye coordination and body balance.',
      category: 'GENERAL',
      displayOrder: 1,
    },
    {
      question: 'Do I need to own professional squash equipment before joining?',
      answer:
        'For initial evaluation and beginner trials, GGems provides non-marking shoes guidelines, racquets, and balls. Once enrolled in a structured batch, coaches recommend the appropriate racquet weight, string tension, and protective eyewear.',
      category: 'EQUIPMENT',
      displayOrder: 2,
    },
    {
      question: 'How do you transition players from grassroots to national tournaments?',
      answer:
        'We follow our structured 6-phase Player Development System. When a player meets intermediate proficiency benchmarks, they are integrated into our Junior Advance squad with dedicated private 1-on-1 sessions, match simulations, and registration with the Squash Rackets Federation of India (SRFI).',
      category: 'TRAINING',
      displayOrder: 3,
    },
    {
      question: 'Can schools partner with GGems without pre-existing squash courts?',
      answer:
        'Yes. We provide complete advisory services from court design, architectural specifications (WSF dimensions & glass back installations), to post-construction academy coaching and facility revenue models.',
      category: 'PARTNERSHIP',
      displayOrder: 4,
    },
  ];

  for (const f of faqsData) {
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (!existing) {
      await prisma.faq.create({ data: f });
    }
  }

  // 17. Gallery Images
  const galleryImagesData = [
    {
      title: 'Elite Forehand Drive Technique Training',
      imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop',
      category: 'TRAINING',
      altText: 'GGems squash athlete executing a forehand drive on court',
      displayOrder: 1,
    },
    {
      title: 'Intensive Footwork and T-Position Recovery',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
      category: 'SQUASH',
      altText: 'Athletic agility and footwork session in squash court',
      displayOrder: 2,
    },
    {
      title: 'National Tournament Matchplay Simulation',
      imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=1200&auto=format&fit=crop',
      category: 'TOURNAMENTS',
      altText: 'Competitive match at national tournament level',
      displayOrder: 3,
    },
    {
      title: 'Siri Fort Glass Back Court Championship Arena',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop',
      category: 'CENTERS',
      altText: 'State of the art glass back squash court',
      displayOrder: 4,
    },
    {
      title: 'Junior Academy Squad Conditioning',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
      category: 'ATHLETES',
      altText: 'Junior academy athletes during physical fitness drill',
      displayOrder: 5,
    },
  ];

  for (const gi of galleryImagesData) {
    const existing = await prisma.galleryImage.findFirst({ where: { title: gi.title } });
    if (!existing) {
      await prisma.galleryImage.create({ data: gi });
    }
  }

  // Contact Information (Phones, Emails, Addresses)
  const phoneCount = await prisma.contactPhone.count();
  if (phoneCount === 0) {
    await prisma.contactPhone.createMany({
      data: [
        {
          phoneNumber: '+91 8826433044',
          role: 'Admissions & General Enquiries',
          description: 'Mon - Sat, 9:00 AM - 6:00 PM',
          displayOrder: 1,
          isPrimary: true,
          isActive: true,
        },
        {
          phoneNumber: '+91 9810000000',
          role: 'Founder & Head Coach',
          description: 'High Performance Training Desk',
          displayOrder: 2,
          isPrimary: false,
          isActive: true,
        },
        {
          phoneNumber: '+91 8826433045',
          role: 'School Partnerships',
          description: 'Inter-school programmes & Tie-ups',
          displayOrder: 3,
          isPrimary: false,
          isActive: true,
        },
      ],
    });
    console.log('✔ Contact Phones seeded.');
  }

  const emailCount = await prisma.contactEmail.count();
  if (emailCount === 0) {
    await prisma.contactEmail.createMany({
      data: [
        {
          email: 'info@ggemssportsacademy.com',
          role: 'General Enquiries & Support',
          description: 'We reply within 24 hours',
          displayOrder: 1,
          isPrimary: true,
          isActive: true,
        },
        {
          email: 'admissions@ggemssportsacademy.com',
          role: 'Admissions & Enrolments',
          description: 'New batch queries & trial booking',
          displayOrder: 2,
          isPrimary: false,
          isActive: true,
        },
        {
          email: 'partnerships@ggemssquash.com',
          role: 'School Partnerships',
          description: 'Institutional tie-ups & infrastructure',
          displayOrder: 3,
          isPrimary: false,
          isActive: true,
        },
      ],
    });
    console.log('✔ Contact Emails seeded.');
  }

  const addressCount = await prisma.contactAddress.count();
  if (addressCount === 0) {
    await prisma.contactAddress.createMany({
      data: [
        {
          label: 'Head Office & Academy Headquarters',
          addressLine1: 'Jaypee Wish Town, Kosmos-62, Sector 134',
          addressLine2: 'Near Jaypee Hospital',
          city: 'Noida',
          state: 'Uttar Pradesh',
          pincode: '201304',
          country: 'India',
          mapUrl:
            'https://www.google.com/maps/search/?api=1&query=Jaypee+Wish+Town+Kosmos+62+Sector+134+Noida+201304',
          directionsUrl:
            'https://www.google.com/maps/dir/?api=1&destination=Jaypee+Wish+Town+Kosmos+62+Sector+134+Noida+201304',
          isPrimary: true,
          isActive: true,
          displayOrder: 1,
        },
      ],
    });
    console.log('✔ Contact Addresses seeded.');
  }

  console.log('--- Database Seeding Completed Successfully! ---');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
