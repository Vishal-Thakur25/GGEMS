const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.program.count();
  console.log('Total programs count:', count);
  const programs = await prisma.program.findMany();
  console.log('Programs:', JSON.stringify(programs, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
