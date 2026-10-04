const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding / updating dynamic programmes...');

  const squashTrainingData = {
    title: 'Squash Training',
    slug: 'squash-training',
    category: 'Racket Sports',
    ageGroup: 'All Age Groups (Ages 6+)',
    skillLevel: 'Beginner to Advanced',
    duration: 'Ongoing Professional Batches',
    shortDescription:
      'Our Squash Training programme is designed for all age groups, focusing on technical skills, physical fitness, mental resilience and match practice to help players reach their full potential.',
    fullDescription:
      'Our Squash Training programme provides a structured and progressive learning environment for players of all levels. Whether you are a beginner or an advanced player, our certified coaches focus on building strong fundamentals, improving game strategy and enhancing overall fitness.\n\nWe follow a holistic development approach that combines on-court training, fitness conditioning, mental preparation and regular match practice to help players perform at their best in competitive tournaments.',
    featuredImage: '/images/Dynamic-Squash-Court-Action.png',
    trainingFocus:
      'Technical stroke mechanics, court movement & ghosting, tactical deception, endurance conditioning, and competitive tournament preparation.',
    scheduleInfo: 'Weekday & Weekend Batches Available (Morning & Evening Slots)',
    status: 'PUBLISHED',
    displayOrder: 1,
    isFeatured: true,

    // Hero Section
    heroEyebrow: 'OUR PROGRAMME',
    heroTitle: 'SQUASH TRAINING',
    heroSubtitle: 'Build Skills. Develop Discipline. Compete with Confidence.',
    heroDescription:
      'Our Squash Training programme is designed for all age groups, focusing on technical skills, physical fitness, mental resilience and match practice to help players reach their full potential.',
    heroImage: '/images/Dynamic-Squash-Court-Action.png',
    heroVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    primaryCtaText: 'Enquire Now',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'Watch Video',
    secondaryCtaLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    heroBadgesData: JSON.stringify([
      { icon: 'Users', title: 'For All Age Groups', subtitle: 'Beginner to Advanced' },
      { icon: 'Award', title: 'Professional Coaching', subtitle: 'Certified Coaches' },
      { icon: 'Layers', title: 'Individual & Group Training', subtitle: 'Flexible Batches' },
      { icon: 'Trophy', title: 'Tournament Exposure', subtitle: 'State, National & International' },
    ]),

    // Highlights
    highlightsTitle: 'PROGRAMME HIGHLIGHTS',
    highlightsData: JSON.stringify([
      {
        id: 'h1',
        title: 'Technical Skills',
        description: 'Strong foundation with expert guidance.',
        icon: 'Activity',
        displayOrder: 1,
        published: true,
      },
      {
        id: 'h2',
        title: 'Physical Fitness',
        description: 'Improve strength, speed and endurance.',
        icon: 'Dumbbell',
        displayOrder: 2,
        published: true,
      },
      {
        id: 'h3',
        title: 'Mental Resilience',
        description: 'Build focus and competitive mindset.',
        icon: 'Brain',
        displayOrder: 3,
        published: true,
      },
      {
        id: 'h4',
        title: 'Career Growth',
        description: 'Pathway to state, national and international level.',
        icon: 'TrendingUp',
        displayOrder: 4,
        published: true,
      },
    ]),

    // Overview Section
    overviewLabel: 'PROGRAMME OVERVIEW',
    overviewTitle: 'About Squash Training',
    overviewDescription:
      'Our Squash Training programme provides a structured and progressive learning environment for players of all levels. Whether you are a beginner or an advanced player, our certified coaches focus on building strong fundamentals, improving game strategy and enhancing overall fitness.',
    overviewSecondaryDescription:
      'We follow a holistic development approach that combines on-court training, fitness conditioning, mental preparation and regular match practice to help players perform at their best in competitive tournaments.',
    overviewImage: '/images/about/story-squash-court.jpg',
    overviewVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    overviewCtaText: 'Join the Programme',
    overviewCtaLink: '/contact',

    // Who Can Join
    whoCanJoinTitle: 'WHO CAN JOIN?',
    audienceData: JSON.stringify([
      { id: 'a1', title: 'Kids (6+ Years)', description: 'Grassroots foundations', icon: 'Smile', displayOrder: 1, published: true },
      { id: 'a2', title: 'School Students', description: 'Inter-school & national circuits', icon: 'GraduationCap', displayOrder: 2, published: true },
      { id: 'a3', title: 'College Students', description: 'University championship prep', icon: 'BookOpen', displayOrder: 3, published: true },
      { id: 'a4', title: 'Working Professionals', description: 'Fitness & weekend leagues', icon: 'Briefcase', displayOrder: 4, published: true },
      { id: 'a5', title: 'Competitive Players', description: 'PSA & state rankings', icon: 'Trophy', displayOrder: 5, published: true },
    ]),

    // Training Structure
    trainingStructureEyebrow: 'TRAINING STRUCTURE',
    trainingStructureTitle: 'A Step-by-Step Approach',
    trainingStructureDescription:
      'Our progressive pathway takes athletes from learning court basics to competing on the international junior squash circuit.',
    stagesData: JSON.stringify([
      {
        id: 's1',
        stepNumber: '01',
        title: 'Beginner Level',
        description: 'Learn basics, technique and game rules.',
        icon: 'Footprints',
        displayOrder: 1,
        published: true,
      },
      {
        id: 's2',
        stepNumber: '02',
        title: 'Intermediate Level',
        description: 'Skill development, match practice and strategy building.',
        icon: 'BarChart3',
        displayOrder: 2,
        published: true,
      },
      {
        id: 's3',
        stepNumber: '03',
        title: 'Advanced Level',
        description: 'High-performance training and tournament preparation.',
        icon: 'Trophy',
        displayOrder: 3,
        published: true,
      },
      {
        id: 's4',
        stepNumber: '04',
        title: 'Competitive Exposure',
        description: 'Opportunities in state, national and international tournaments.',
        icon: 'Medal',
        displayOrder: 4,
        published: true,
      },
    ]),

    // Facilities
    facilitiesEyebrow: 'OUR FACILITIES',
    facilitiesTitle: 'World-Class Training Environment',
    facilitiesDescription:
      'Experience elite WSF-certified glass back courts, precision hardwood flooring, and professional strength & conditioning spaces.',
    facilitiesData: JSON.stringify([
      {
        id: 'f1',
        title: 'Squash Courts',
        description: 'International WSF standard glass-back courts with maple hardwood flooring.',
        image: '/images/centers/gallery-squash.jpg',
        displayOrder: 1,
        published: true,
      },
      {
        id: 'f2',
        title: 'Fitness Training',
        description: 'State-of-the-art conditioning zone with agility ladders, weights and cardio rigs.',
        image: '/images/centers/gallery-fitness.jpg',
        displayOrder: 2,
        published: true,
      },
      {
        id: 'f3',
        title: 'Training Sessions',
        description: 'Focused 1-on-1 coach drills and high-tempo tactical ghosting routines.',
        image: '/images/centers/hero-squash-court.jpg',
        displayOrder: 3,
        published: true,
      },
      {
        id: 'f4',
        title: 'Group Classes',
        description: 'Dynamic group squads fostering competitive peer sparring and camaraderie.',
        image: '/images/centers/gallery-club.jpg',
        displayOrder: 4,
        published: true,
      },
    ]),

    // Testimonials
    testimonialEyebrow: 'WHAT OUR PLAYERS SAY',
    testimonialTitle: 'Student Success Stories',
    testimonialsData: JSON.stringify([
      {
        id: 't1',
        name: 'Student',
        designation: 'Squash Training Programme',
        organization: 'GGems Sports Academy',
        profileImage: '/images/centers/representative-avatar.jpg',
        quote:
          'The training at GGems has helped me improve my game, fitness and confidence. The coaches are very supportive and the environment is excellent for learning and growth.',
        rating: 5,
        displayOrder: 1,
        published: true,
      },
      {
        id: 't2',
        name: 'Arjun Sharma',
        designation: 'Junior National Circuit Player',
        organization: 'Delhi Squash Association',
        profileImage: '/images/about/coach-1-thumb.png',
        quote:
          'The tactical coaching and tournament mentoring at GGems completely transformed my game. I jumped 15 spots on the national junior rankings within 8 months!',
        rating: 5,
        displayOrder: 2,
        published: true,
      },
      {
        id: 't3',
        name: 'Pooja Verma',
        designation: 'Parent of Under-15 Athlete',
        organization: 'Noida Center',
        profileImage: '/images/about/coach-2-thumb.png',
        quote:
          'GGems provides an unmatched blend of discipline, fitness and sportsmanship. The personal attention each athlete receives from certified coaches is world-class.',
        rating: 5,
        displayOrder: 3,
        published: true,
      },
    ]),

    // FAQs
    faqEyebrow: 'FREQUENTLY ASKED QUESTIONS',
    faqTitle: 'Quick Answers',
    faqDescription: 'Find clear answers to common questions about training batches, gear, and registration.',
    faqsData: JSON.stringify([
      {
        id: 'faq1',
        question: 'What age groups can join the Squash Training programme?',
        answer:
          'Our squash training programme welcomes athletes from age 6 onwards, ranging from young juniors starting out to competitive teens and working adults. Players are grouped into batches based on their age and skill level.',
        displayOrder: 1,
        published: true,
      },
      {
        id: 'faq2',
        question: 'Do you provide beginner level training?',
        answer:
          'Yes, absolutely! We have dedicated beginner tracks focusing on fundamental racket grip, footwork mechanics, hand-eye coordination, and core game rules in a fun and encouraging environment.',
        displayOrder: 2,
        published: true,
      },
      {
        id: 'faq3',
        question: 'Are there opportunities to participate in tournaments?',
        answer:
          'Yes! We conduct internal ranking leagues and prepare our athletes for district, state, national junior circuits, and international PSA satellite tournaments with on-ground coach accompaniment.',
        displayOrder: 3,
        published: true,
      },
      {
        id: 'faq4',
        question: 'What is the duration and timing of the classes?',
        answer:
          'Standard batches are 60 to 90 minutes per session, held 3 to 5 times per week. We offer flexible morning and evening slots across weekdays and dedicated weekend intensive clinics.',
        displayOrder: 4,
        published: true,
      },
    ]),

    // Final CTA
    ctaLabel: 'READY TO START?',
    ctaTitle: 'Take Your Game to the Next Level',
    ctaDescription:
      'Join our Squash Training programme and be part of a professional and supportive sporting community.',
    ctaBackgroundImage: '/images/about/cta-squash-racket-ball.jpg',
    ctaPrimaryText: 'Enquire Now',
    ctaPrimaryLink: '/contact',
    ctaSecondaryText: 'Call Now',
    ctaSecondaryLink: 'tel:8826433044',
    ctaAudienceLinks: JSON.stringify([
      { label: 'For Students', link: '/contact?type=student', icon: 'GraduationCap' },
      { label: 'For Parents', link: '/contact?type=parent', icon: 'Users' },
      { label: 'For Schools', link: '/school-partnership', icon: 'Building' },
      { label: 'For Institutions', link: '/contact?type=institution', icon: 'Landmark' },
    ]),

    // SEO
    metaTitle: 'Squash Training | GGEMS Sports Academy',
    metaDescription:
      'Professional Squash Training in Delhi NCR. Certified coaches, WSF standard courts, tournament exposure, and structured progressive curriculums.',
    ogImage: '/images/Dynamic-Squash-Court-Action.png',
  };

  // Upsert Squash Training
  await prisma.program.upsert({
    where: { slug: 'squash-training' },
    update: squashTrainingData,
    create: squashTrainingData,
  });

  // Badminton Training
  const badmintonData = {
    ...squashTrainingData,
    title: 'Badminton Training',
    slug: 'badminton-training',
    heroTitle: 'BADMINTON TRAINING',
    heroEyebrow: 'OUR PROGRAMME',
    heroSubtitle: 'Master Agility. Perfect Smashes. Dominate the Court.',
    heroDescription:
      'Our Badminton Training programme offers expert coaching, footwork agility, tactical gameplay, and fitness conditioning for all levels from beginner to competitive champions.',
    featuredImage: '/images/programs/sport-badminton.jpg',
    heroImage: '/images/programs/sport-badminton.jpg',
    overviewTitle: 'About Badminton Training',
    overviewDescription:
      'Structured badminton coaching that emphasizes lightning-fast court coverage, wrist snap techniques, deceptive drops, and cardiovascular endurance on BWF-standard synthetic courts.',
    overviewSecondaryDescription:
      'Athletes train under national-level coaches with video tactical analysis, multishuttle feeding drills, and competitive match simulations.',
    overviewImage: '/images/programs/sport-badminton.jpg',
    metaTitle: 'Badminton Training | GGEMS Sports Academy',
    metaDescription:
      'High-performance Badminton Coaching in Delhi NCR. Modern indoor courts, certified coaches, and competitive junior tournament tracks.',
    ogImage: '/images/programs/sport-badminton.jpg',
    displayOrder: 2,
  };

  await prisma.program.upsert({
    where: { slug: 'badminton-training' },
    update: badmintonData,
    create: badmintonData,
  });

  // Tennis Training
  const tennisData = {
    ...squashTrainingData,
    title: 'Tennis Training',
    slug: 'tennis-training',
    heroTitle: 'TENNIS TRAINING',
    heroEyebrow: 'OUR PROGRAMME',
    heroSubtitle: 'Serve Strong. Move Fast. Play Like a Champion.',
    heroDescription:
      'Comprehensive Tennis coaching focusing on powerful groundstrokes, explosive footwork, tactical point construction, and mental grit under tournament pressure.',
    featuredImage: '/images/programs/sport-tennis.jpg',
    heroImage: '/images/programs/sport-tennis.jpg',
    overviewTitle: 'About Tennis Training',
    overviewDescription:
      'Designed for players of all ages, our tennis academy combines technical stroke mechanics, match strategy, and modern sport science to nurture competitive tennis champions.',
    overviewSecondaryDescription:
      'With dedicated hard and clay court sessions, fitness plyometrics, and regular match leagues, players develop a complete all-court competitive game.',
    overviewImage: '/images/programs/sport-tennis.jpg',
    metaTitle: 'Tennis Training | GGEMS Sports Academy',
    metaDescription:
      'Elite Tennis coaching and academy training programs across Delhi NCR with ITF-standard courts and certified coaches.',
    ogImage: '/images/programs/sport-tennis.jpg',
    displayOrder: 3,
  };

  await prisma.program.upsert({
    where: { slug: 'tennis-training' },
    update: tennisData,
    create: tennisData,
  });

  console.log('Programmes seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
