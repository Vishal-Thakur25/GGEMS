import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Programmes Page in CMS...');

  const programsPage = await prisma.page.upsert({
    where: { slug: 'programs' },
    update: {
      title: 'GGems Sports Academy | Programmes',
      subtitle: 'Structured Training. Stronger Athletes. Brighter Futures.',
      seoTitle: 'GGems Sports Academy | Programmes',
      seoDescription: 'At GGems Sports Academy, we offer comprehensive sports training programmes designed for all age groups and skill levels. Our goal is to develop well-rounded athletes through expert coaching, modern facilities and a structured curriculum.',
      status: 'PUBLISHED',
    },
    create: {
      slug: 'programs',
      title: 'GGems Sports Academy | Programmes',
      subtitle: 'Structured Training. Stronger Athletes. Brighter Futures.',
      seoTitle: 'GGems Sports Academy | Programmes',
      seoDescription: 'At GGems Sports Academy, we offer comprehensive sports training programmes designed for all age groups and skill levels. Our goal is to develop well-rounded athletes through expert coaching, modern facilities and a structured curriculum.',
      status: 'PUBLISHED',
    },
  });

  const sections = [
    {
      pageSlug: 'programs',
      sectionType: 'HERO',
      title: 'OUR PROGRAMMES',
      subtitle: 'Structured Training. Stronger Athletes. Brighter Futures.',
      content: 'At GGems Sports Academy, we offer comprehensive sports training programmes designed for all age groups and skill levels. Our goal is to develop well-rounded athletes through expert coaching, modern facilities and a structured curriculum.',
      imageUrl: '/images/Dynamic-Squash-Court-Action.png',
      ctaLabel: 'Enquire Now',
      ctaUrl: '/contact',
      secondaryCtaLabel: 'Watch Video',
      secondaryCtaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      displayOrder: 1,
      isVisible: true,
    },
    {
      pageSlug: 'programs',
      sectionType: 'BENEFITS_STRIP',
      title: 'Core Programme Highlights',
      subtitle: 'KEY ADVANTAGES',
      content: 'Everything an athlete needs to reach top performance.',
      styleConfig: JSON.stringify({
        benefits: [
          {
            title: 'World-Class Coaching',
            description: 'Learn from certified and experienced coaches.',
            icon: 'graduation-cap',
          },
          {
            title: 'Structured Curriculum',
            description: 'Age-appropriate training programmes.',
            icon: 'bar-chart',
          },
          {
            title: 'All Age Groups',
            description: 'From beginners to advanced athletes.',
            icon: 'users',
          },
          {
            title: 'Competitive Exposure',
            description: 'Tournaments and match opportunities.',
            icon: 'trophy',
          },
        ],
      }),
      displayOrder: 2,
      isVisible: true,
    },
    {
      pageSlug: 'programs',
      sectionType: 'PHILOSOPHY',
      title: 'Building Better Athletes Everyday',
      subtitle: 'OUR TRAINING PHILOSOPHY',
      content: 'At GGems Sports, our training philosophy is built around consistency, discipline, and innovation. We aim to develop athletes who are technically proficient, physically strong, and mentally resilient.',
      ctaLabel: 'Know Our Approach',
      ctaUrl: '#our-approach',
      styleConfig: JSON.stringify({
        pillars: [
          {
            title: 'Scientific Approach',
            description: 'Our training programs are backed by the latest sports science research to improve performance, prevent injury, and accelerate recovery.',
            icon: 'flask',
          },
          {
            title: 'Progressive Skill Development',
            description: 'We introduce athletes to advanced techniques and strategies, building upon the basics to push their limits.',
            icon: 'trending-up',
          },
          {
            title: 'Collaborative Learning',
            description: 'We nurture athletes beyond physical training, focusing on mindset, leadership, and self-discipline.',
            icon: 'users',
          },
        ],
      }),
      displayOrder: 3,
      isVisible: true,
    },
    {
      pageSlug: 'programs',
      sectionType: 'SPORTS_OFFERING',
      title: 'Explore Our Sports Programmes',
      subtitle: 'SPORTS OFFERING',
      content: 'At GGems Sports, we are committed to offering comprehensive training programs across a variety of sports. Our mission is to help athletes hone their skills, develop a love for the game, and excel both on and off the field.',
      displayOrder: 4,
      isVisible: true,
    },
    {
      pageSlug: 'programs',
      sectionType: 'HOLISTIC_APPROACH',
      title: 'Holistic Sports Development for Every Athlete',
      subtitle: 'OUR APPROACH',
      content: 'We aim to develop a generation of healthier and fitter children through in-school physical education and sports programs. GGems Sports is a company founded by Gyanendra Pratap in 2018 with the aim of adding innovative value to both the sporting and corporate worlds.',
      imageUrl: '/images/programs/approach-basketball.jpg',
      styleConfig: JSON.stringify({
        checklists: [
          {
            title: 'Infrastructure Development',
            description: 'We help schools develop, upgrade, and optimize sports facilities to enhance student engagement and performance.',
          },
          {
            title: 'Professional Coaching',
            description: 'Personalized support for student-athletes and school teams to enhance performance at every level.',
          },
          {
            title: 'Comprehensive Training Programs',
            description: 'Structured sports and PE programs in schools imparting fundamental skills.',
          },
          {
            title: 'Competitive Opportunities',
            description: 'We organize tournaments and matches to help students gain valuable experience and elevate their performance.',
          },
          {
            title: 'In-School & After-School Programs',
            description: 'We collaborate with schools to run sports programs during school hours and after school.',
          },
          {
            title: 'Customized Sports Curriculum',
            description: 'We design structured sports programs tailored to the school’s needs.',
          },
        ],
      }),
      displayOrder: 5,
      isVisible: true,
    },
    {
      pageSlug: 'programs',
      sectionType: 'PROGRAMME_LEVELS',
      title: 'Programmes for Every Stage',
      subtitle: 'PROGRAMME LEVELS',
      content: 'From beginners to advanced athletes, our programmes are designed to help every athlete grow, learn and achieve their full potential.',
      styleConfig: JSON.stringify({
        levels: [
          {
            title: 'Beginner',
            description: 'Learn the basics with expert guidance.',
            icon: 'user-check',
            slug: 'beginners-program',
          },
          {
            title: 'Intermediate',
            description: 'Build skills and confidence with structured training.',
            icon: 'activity',
            slug: 'junior-advance-program',
          },
          {
            title: 'Competitive',
            description: 'Advanced coaching for tournament exposure.',
            icon: 'bar-chart-2',
            slug: 'professional-program',
          },
          {
            title: 'High Performance',
            description: 'Elite training for professional development.',
            icon: 'award',
            slug: 'development-program',
          },
        ],
      }),
      displayOrder: 6,
      isVisible: true,
    },
    {
      pageSlug: 'programs',
      sectionType: 'CTA',
      title: 'Train. Compete. Excel.',
      subtitle: 'Be Part of Our Journey',
      content: 'Join GGems Sports Academy and take the first step towards a healthier, stronger and brighter future.',
      imageUrl: '/images/about/cta-squash-racket-ball.jpg',
      ctaLabel: 'Enquire Now',
      ctaUrl: '/contact',
      secondaryCtaLabel: 'Call Now',
      secondaryCtaUrl: 'tel:8826433044',
      displayOrder: 7,
      isVisible: true,
    },
  ];

  for (const s of sections) {
    const existing = await prisma.pageSection.findFirst({
      where: { pageSlug: 'programs', sectionType: s.sectionType },
    });
    if (existing) {
      await prisma.pageSection.update({
        where: { id: existing.id },
        data: s,
      });
    } else {
      await prisma.pageSection.create({
        data: s,
      });
    }
  }

  console.log('✔ Successfully seeded Programmes page and sections in CMS!');
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
