import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Centers Page and updating Centers data in CMS...');

  // 1. Page Record
  await prisma.page.upsert({
    where: { slug: 'centers' },
    update: {
      title: 'GGems Sports Academy | Centers of Excellence',
      subtitle: 'Structured Training Across Delhi NCR & Western India',
      seoTitle: 'GGEMS Sports Academy | Centers of Excellence',
      seoDescription: "Explore GGEMS Sports Academy's Centers of Excellence across Delhi NCR and other locations.",
      status: 'PUBLISHED',
    },
    create: {
      slug: 'centers',
      title: 'GGems Sports Academy | Centers of Excellence',
      subtitle: 'Structured Training Across Delhi NCR & Western India',
      seoTitle: 'GGEMS Sports Academy | Centers of Excellence',
      seoDescription: "Explore GGEMS Sports Academy's Centers of Excellence across Delhi NCR and other locations.",
      status: 'PUBLISHED',
    },
  });

  // 2. Sections
  const sections = [
    {
      pageSlug: 'centers',
      sectionType: 'HERO',
      title: 'OUR CENTERS OF EXCELLENCE',
      subtitle: 'Structured Coaching Across Premier Facilities',
      content:
        'GGems Sports Academy delivers structured coaching and sports development across leading schools, sports complexes and partner facilities.',
      imageUrl: '/images/centers/hero-squash-court.jpg',
      ctaLabel: 'Explore Our Centers',
      ctaUrl: '#our-centers',
      secondaryCtaLabel: 'Watch Video',
      secondaryCtaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      displayOrder: 1,
      isVisible: true,
    },
    {
      pageSlug: 'centers',
      sectionType: 'FEATURE_STRIP',
      title: 'Why Train At GGems Centers',
      subtitle: 'KEY ADVANTAGES',
      content: 'Standardized excellence across all our operational hubs.',
      styleConfig: JSON.stringify({
        features: [
          {
            number: '01',
            title: 'LEADING INSTITUTIONS',
            description: 'Partnered with reputed schools and sports complexes.',
            icon: 'building',
          },
          {
            number: '02',
            title: 'MULTIPLE LOCATIONS',
            description: 'Across Delhi NCR and beyond.',
            icon: 'map-pin',
          },
          {
            number: '03',
            title: 'QUALITY COACHING',
            description: 'Professional & certified coaching support.',
            icon: 'users',
          },
          {
            number: '04',
            title: 'BETTER OPPORTUNITIES',
            description: 'Structured training & competition exposure.',
            icon: 'trending-up',
          },
        ],
      }),
      displayOrder: 2,
      isVisible: true,
    },
    {
      pageSlug: 'centers',
      sectionType: 'NETWORK',
      title: 'Building a Stronger Sports Network',
      subtitle: 'GGEMS NETWORK',
      content:
        'GGems Sports Academy works across schools, sports complexes and partner facilities to create structured opportunities for athlete development and promote a healthy sporting culture.',
      ctaLabel: 'Our Approach',
      ctaUrl: '/about',
      styleConfig: JSON.stringify({
        stats: [
          {
            value: '10',
            label: 'Centers of Excellence',
            icon: 'bar-chart',
          },
          {
            value: '260+',
            label: 'Active Squash Players',
            icon: 'users',
          },
          {
            value: '20+',
            label: 'Years of Coaching & Sports Development',
            icon: 'award',
          },
          {
            value: 'Multiple',
            label: 'Competitive Opportunities',
            icon: 'trophy',
          },
        ],
      }),
      displayOrder: 3,
      isVisible: true,
    },
    {
      pageSlug: 'centers',
      sectionType: 'DIRECTORY',
      title: 'Our Network of Centers',
      subtitle: 'OUR CENTERS',
      content:
        'Explore our centers of excellence where we deliver structured coaching, training programmes and sports development.',
      displayOrder: 4,
      isVisible: true,
    },
    {
      pageSlug: 'centers',
      sectionType: 'FEATURED_CENTER',
      title: 'Siri Fort Sports Complex',
      subtitle: 'FEATURED CENTER',
      content:
        'A premier sporting destination and one of the key centers where GGems Sports Academy conducts structured squash training programmes.',
      imageUrl: '/images/centers/featured-sirifort.jpg',
      ctaLabel: 'View Center Details',
      ctaUrl: '/centers/siri-fort-sports-complex-delhi',
      displayOrder: 5,
      isVisible: true,
    },
    {
      pageSlug: 'centers',
      sectionType: 'OUR_PRESENCE',
      title: 'Centers Across Delhi NCR and Beyond',
      subtitle: 'OUR PRESENCE',
      content:
        'We are present across leading schools, sports complexes and partner facilities, offering structured sports training and development programmes.',
      styleConfig: JSON.stringify({
        locations: [
          { city: 'Delhi', count: '4 Centers', countNumber: 4 },
          { city: 'Noida', count: '4 Centers', countNumber: 4 },
          { city: 'Greater Noida', count: '1 Center', countNumber: 1 },
          { city: 'Vadodara', count: '1 Center', countNumber: 1 },
        ],
      }),
      displayOrder: 6,
      isVisible: true,
    },
    {
      pageSlug: 'centers',
      sectionType: 'CTA',
      title: 'Train. Compete. Excel.',
      subtitle: 'Be Part of a Stronger Sporting Community',
      content:
        'Join GGems Sports Academy and take the first step towards a healthier, stronger and brighter future.',
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
      where: { pageSlug: 'centers', sectionType: s.sectionType },
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

  // 3. Update the 10 centers in database with their clean images and standard city fields
  const centerUpdates = [
    {
      slug: 'siri-fort-sports-complex-delhi',
      name: 'Siri Fort Sports Complex',
      city: 'Delhi',
      image: '/images/centers/center-sirifort.jpg',
      displayOrder: 1,
    },
    {
      slug: 'kr-mangalam-school-gk-2-new-delhi',
      name: 'KR Manglam School GK-2',
      city: 'Delhi',
      image: '/images/centers/center-krmangalam.jpg',
      displayOrder: 2,
    },
    {
      slug: 'shakti-sports-club-vadodara-gujarat',
      name: 'Shakti Sports Club',
      city: 'Vadodara',
      image: '/images/centers/center-shaktisports.jpg',
      displayOrder: 3,
    },
    {
      slug: 'jaypee-public-school-club-noida',
      name: 'Jaypee Public School & Club',
      city: 'Noida',
      image: '/images/centers/center-jaypee.jpg',
      displayOrder: 4,
    },
    {
      slug: 'gyanshree-school-noida-127',
      name: 'Gyanshree School',
      city: 'Noida',
      image: '/images/centers/center-gyanshree.jpg',
      displayOrder: 5,
    },
    {
      slug: 'squash-badminton-stadium-new-delhi',
      name: 'Squash & Badminton Stadium',
      city: 'Delhi',
      image: '/images/centers/center-stadium.jpg',
      displayOrder: 6,
    },
    {
      slug: 'prometheus-school-noida-131',
      name: 'Prometheus School',
      city: 'Noida',
      image: '/images/centers/center-prometheus.jpg',
      displayOrder: 7,
    },
    {
      slug: 'ahlcon-international-school-mayur-vihar',
      name: 'Ahlcon International School',
      city: 'Delhi',
      image: '/images/centers/center-ahlcon.jpg',
      displayOrder: 8,
    },
    {
      slug: 'ats-society-noida-centers',
      name: 'ATS Society',
      city: 'Noida',
      image: '/images/centers/center-ats.jpg',
      displayOrder: 9,
    },
    {
      slug: 'salvation-tree-school-greater-noida-west',
      name: 'Salvation Tree School',
      city: 'Greater Noida',
      image: '/images/centers/center-salvationtree.jpg',
      displayOrder: 10,
    },
  ];

  for (const cu of centerUpdates) {
    const existing = await prisma.center.findUnique({
      where: { slug: cu.slug },
    });
    if (existing) {
      await prisma.center.update({
        where: { slug: cu.slug },
        data: {
          name: cu.name,
          city: cu.city,
          image: cu.image,
          displayOrder: cu.displayOrder,
        },
      });
      console.log(`Updated center: ${cu.name}`);
    }
  }

  console.log('✔ Successfully seeded Centers page and updated Centers records!');
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
