import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.page.findUnique({ where: { slug: 'programs' } });
  console.log('Programs page:', page);
  const sections = await prisma.pageSection.findMany({ where: { pageSlug: 'programs' } });
  console.log('Programs sections:', sections.length);
  const progs = await prisma.program.findMany();
  console.log('Programs count in DB:', progs.length, progs.map(p => ({ title: p.title, slug: p.slug })));
  await prisma.$disconnect();
}

main().catch(console.error);
