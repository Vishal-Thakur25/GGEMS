const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const initialVerticals = [
  {
    title: 'GGems Sports',
    slug: 'ggems-sports',
    subtitle: 'Sports Development & Management',
    description:
      'Pioneering structured athlete development pathways, grassroot youth training, institutional partnerships, and competitive tournament management.',
    image: '/images/programs/sport-athletics.jpg',
    mobileImage: null,
    icon: 'Trophy',
    accentText: 'DEVELOPMENT & MANAGEMENT',
    link: '/programs',
    ctaText: 'Explore Sports',
    displayOrder: 1,
    published: true,
  },
  {
    title: 'GGems Sports Infrastructure',
    slug: 'ggems-sports-infrastructure',
    subtitle: 'Sports Infrastructure & Facility Development',
    description:
      'Designing and executing international-standard sports courts, glass-back squash arenas, high-performance wooden flooring, and elite training facilities.',
    image: '/images/about/story-squash-court.jpg',
    mobileImage: null,
    icon: 'Building2',
    accentText: 'FACILITY DEVELOPMENT',
    link: '/centers',
    ctaText: 'Discover Facilities',
    displayOrder: 2,
    published: true,
  },
  {
    title: 'GGems Squash Centre of Excellence',
    slug: 'ggems-squash-centre-of-excellence',
    subtitle: 'High Performance | Player Development | Coaching | Competition',
    description:
      'The premier squash coaching hub in Delhi NCR. Home to national top-rankers, certified international coaches, and structured high-performance clinics.',
    image: '/images/Dynamic-Squash-Court-Action.png',
    mobileImage: null,
    icon: 'Activity',
    accentText: 'CENTRE OF EXCELLENCE',
    link: '/programmes/squash-training',
    ctaText: 'Join the Academy',
    displayOrder: 3,
    published: true,
  },
];

async function seed() {
  console.log('Seeding GGEMS Ecosystem Verticals...');
  for (const v of initialVerticals) {
    const existing = await prisma.ggemsVertical.findUnique({
      where: { slug: v.slug },
    });
    if (existing) {
      console.log(`Updating ${v.title}...`);
      await prisma.ggemsVertical.update({
        where: { slug: v.slug },
        data: v,
      });
    } else {
      console.log(`Creating ${v.title}...`);
      await prisma.ggemsVertical.create({
        data: v,
      });
    }
  }
  console.log('Ecosystem Verticals seeded successfully!');
  await prisma.$disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
