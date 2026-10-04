import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding About Page in CMS...');

  const aboutPage = await prisma.page.upsert({
    where: { slug: 'about' },
    update: {
      title: 'About GGems Sports Academy',
      subtitle: 'Building Stronger Athletes for a Brighter Tomorrow',
      seoTitle: 'About Us | GGems Sports Academy Delhi NCR',
      seoDescription: 'Learn about GGems Sports Academy, founded by Gyanendra Prajapati. Over 20 years of coaching excellence, physical health education, and elite player development.',
      status: 'PUBLISHED',
    },
    create: {
      slug: 'about',
      title: 'About GGems Sports Academy',
      subtitle: 'Building Stronger Athletes for a Brighter Tomorrow',
      seoTitle: 'About Us | GGems Sports Academy Delhi NCR',
      seoDescription: 'Learn about GGems Sports Academy, founded by Gyanendra Prajapati. Over 20 years of coaching excellence, physical health education, and elite player development.',
      status: 'PUBLISHED',
    },
  });

  const sections = [
    {
      pageSlug: 'about',
      sectionType: 'HERO',
      title: 'ABOUT GGEMS',
      subtitle: 'Building Stronger Athletes for a Brighter Tomorrow',
      content: 'At GGems Sports Academy, we are committed to developing well-rounded athletes through world-class coaching, structured programmes and a nurturing environment.',
      imageUrl: '/images/Dynamic-Squash-Court-Action.png',
      ctaLabel: 'Enquire Now',
      ctaUrl: '/contact',
      displayOrder: 1,
      isVisible: true,
    },
    {
      pageSlug: 'about',
      sectionType: 'STORY',
      title: 'Passion for Sports. Commitment to Excellence.',
      subtitle: 'OUR STORY',
      content: 'GGems Sports Academy was founded with a simple vision — to create a platform where young athletes can discover their potential, develop their skills and compete at higher levels.\n\nWith a strong focus on discipline, fitness and mental strength, we provide professional coaching and world-class facilities to help players excel in squash and beyond.',
      imageUrl: '/images/about/story-squash-court.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      styleConfig: JSON.stringify({
        features: [
          { title: 'Structured Programmes', icon: 'book' },
          { title: 'Experienced Coaches', icon: 'users' },
          { title: 'Focus on Overall Development', icon: 'chart' }
        ]
      }),
      displayOrder: 2,
      isVisible: true,
    },
    {
      pageSlug: 'about',
      sectionType: 'MISSION_VISION',
      title: 'Empowering Young Athletes & Building A Healthier, Stronger Tomorrow',
      subtitle: 'OUR MISSION & VISION',
      content: JSON.stringify({
        mission: {
          label: 'OUR MISSION',
          title: 'Empowering Young Athletes',
          description: 'To provide world-class coaching, modern infrastructure and a supportive environment that helps athletes develop their skills, confidence and character.'
        },
        vision: {
          label: 'OUR VISION',
          title: 'A Healthier, Stronger Tomorrow',
          description: 'To be a leading sports academy that nurtures talent, promotes a healthy lifestyle and produces champions at national and international levels.'
        }
      }),
      displayOrder: 3,
      isVisible: true,
    },
    {
      pageSlug: 'about',
      sectionType: 'IMPACT',
      title: 'Numbers That Define Our Journey',
      subtitle: 'OUR IMPACT',
      content: 'Verified benchmark metrics across Delhi NCR and national circuits.',
      imageUrl: '/images/Dynamic-Squash-Court-Action.png',
      styleConfig: JSON.stringify({
        stats: [
          { key: 'EXP_YEARS', label: 'Years of Coaching & Sports Development', value: '20+', icon: 'trophy' },
          { key: 'ACTIVE_PLAYERS', label: 'Active Squash Players', value: '260+', icon: 'users' },
          { key: 'ADVANCED_PLAYERS', label: 'Advanced Players', value: '15+', icon: 'medal' },
          { key: 'CHAMPIONSHIPS', label: 'Tournaments & Championships', value: '25+', icon: 'chart' }
        ]
      }),
      displayOrder: 4,
      isVisible: true,
    },
    {
      pageSlug: 'about',
      sectionType: 'VALUES',
      title: 'The Principles We Stand For',
      subtitle: 'OUR VALUES',
      content: 'At GGems, our values shape everything we do — from coaching on the court to building character off the court.',
      styleConfig: JSON.stringify({
        values: [
          { title: 'Discipline', description: 'Building strong habits for long-term success.', icon: 'dumbbell' },
          { title: 'Excellence', description: 'Striving for continuous improvement.', icon: 'star' },
          { title: 'Integrity', description: 'Promoting fair play and respect.', icon: 'shield' },
          { title: 'Community & Support', description: 'Nurturing environment for every athlete.', icon: 'users' }
        ]
      }),
      displayOrder: 5,
      isVisible: true,
    },
    {
      pageSlug: 'about',
      sectionType: 'FOUNDER',
      title: 'A Visionary Leader in Sports Development',
      subtitle: 'MEET OUR FOUNDER',
      content: "Our founder's vision has been the driving force behind GGems Sports Academy, creating a platform for young athletes to grow, compete and achieve excellence.",
      imageUrl: '/images/about/founder-gyanendra.jpg',
      styleConfig: JSON.stringify({
        name: 'Gyanendra Prajapati',
        role: 'Founder & CEO',
        association: 'GGems Sports Academy',
        quote: 'Our goal is to create not just better players, but stronger, more confident individuals who can excel in every aspect of life.'
      }),
      displayOrder: 6,
      isVisible: true,
    },
    {
      pageSlug: 'about',
      sectionType: 'TEAM',
      title: 'Meet the People Behind GGems',
      subtitle: 'OUR TEAM',
      content: 'Our team of certified coaches and sports professionals work tirelessly to provide the best training, guidance and support to every player.',
      ctaLabel: 'View All Team Members',
      ctaUrl: '/team',
      displayOrder: 7,
      isVisible: true,
    },
    {
      pageSlug: 'about',
      sectionType: 'CTA',
      title: "Let's Build a Stronger Sports Community",
      subtitle: 'Be Part of Our Journey',
      content: 'Join GGems Sports Academy and take the first step towards a healthier, stronger and brighter future.',
      ctaLabel: 'Enquire Now',
      ctaUrl: '/contact',
      secondaryCtaLabel: 'Call 8826433044',
      secondaryCtaUrl: 'tel:8826433044',
      imageUrl: '/images/about/cta-squash-racket-ball.jpg',
      styleConfig: JSON.stringify({
        audience: [
          { label: 'For Students', icon: 'graduation' },
          { label: 'For Parents', icon: 'users' },
          { label: 'For Schools', icon: 'school' },
          { label: 'For Institutions', icon: 'building' }
        ]
      }),
      displayOrder: 8,
      isVisible: true,
    },
  ];

  for (const s of sections) {
    const existing = await prisma.pageSection.findFirst({
      where: { pageSlug: s.pageSlug, sectionType: s.sectionType },
    });
    if (existing) {
      await prisma.pageSection.update({
        where: { id: existing.id },
        data: s,
      });
    } else {
      await prisma.pageSection.create({ data: s });
    }
  }

  // Also ensure Rahul Verma exists or updated in team members
  const existingRahul = await prisma.teamMember.findFirst({
    where: { slug: 'rahul-verma' },
  });
  if (!existingRahul) {
    await prisma.teamMember.create({
      data: {
        name: 'Rahul Verma',
        slug: 'rahul-verma',
        role: 'Fitness & Conditioning Coach',
        experienceYears: 8,
        qualifications: 'CSCS Certified | Sports Physiologist',
        specialization: 'Squash Biomechanics, Agility & Injury Prevention',
        shortBio: 'Specialist in athlete fitness and injury prevention.',
        fullBio: 'Rahul Verma is a dedicated fitness and conditioning coach specializing in junior squash agility, injury rehabilitation, and sports power endurance.',
        profileImage: '/images/about/coach-rahul-verma.jpg',
        displayOrder: 4,
        isFeatured: true,
        status: 'PUBLISHED',
      },
    });
    console.log('✔ Created Rahul Verma team member');
  }

  // Update founder and coach profile images to use local high-res photos
  await prisma.teamMember.updateMany({
    where: { slug: 'gyanendra-prajapati' },
    data: { profileImage: '/images/about/founder-gyanendra.jpg' },
  });
  await prisma.teamMember.updateMany({
    where: { slug: 'aakash-sharma' },
    data: { profileImage: '/images/about/coach-aakash-sharma.jpg' },
  });
  await prisma.teamMember.updateMany({
    where: { slug: 'dushyant-singh' },
    data: { profileImage: '/images/about/coach-dushyant-singh.jpg' },
  });

  console.log('✔ About Page sections and team members successfully synchronized in DB!');
}

main().finally(() => prisma.$disconnect());
