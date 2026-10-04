import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function run() {
  await db.themeSettings.upsert({
    where: { id: 1 },
    update: {
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F8FAFC',
      textColor: '#0F172A',
      textMutedColor: '#64748B',
      borderColor: '#E2E8F0',
      primaryColor: '#0F172A',
      secondaryColor: '#F8FAFC',
      accentColor: '#EAB308',
      buttonStyle: 'pill',
      borderRadius: 'rounded-2xl',
      containerWidth: 'max-w-7xl'
    },
    create: {
      id: 1,
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F8FAFC',
      textColor: '#0F172A',
      textMutedColor: '#64748B',
      borderColor: '#E2E8F0',
      primaryColor: '#0F172A',
      secondaryColor: '#F8FAFC',
      accentColor: '#EAB308',
      buttonStyle: 'pill',
      borderRadius: 'rounded-2xl',
      containerWidth: 'max-w-7xl'
    }
  });
  console.log('Successfully set ThemeSettings to light theme in DB!');
  await db.$disconnect();
}

run().catch(console.error);
