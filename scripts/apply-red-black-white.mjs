import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'src/components/home/PathwaySection.tsx',
  'src/components/home/ProgramsSection.tsx',
  'src/components/home/WhySection.tsx',
  'src/components/home/PhilosophySection.tsx',
  'src/components/home/TeamSection.tsx',
  'src/components/home/CentersSection.tsx',
  'src/components/home/PartnershipBanner.tsx',
  'src/components/home/TestimonialsSection.tsx',
  'src/components/home/ContactSection.tsx',
  'src/app/(public)/about/page.tsx',
  'src/app/(public)/programs/page.tsx',
  'src/app/(public)/programs/[slug]/page.tsx',
  'src/app/(public)/team/page.tsx',
  'src/app/(public)/team/[slug]/page.tsx',
  'src/app/(public)/centers/page.tsx',
  'src/app/(public)/centers/[slug]/page.tsx',
  'src/app/(public)/school-partnership/page.tsx',
  'src/app/(public)/achievements/page.tsx',
  'src/app/(public)/gallery/page.tsx',
  'src/app/(public)/news/page.tsx',
  'src/app/(public)/news/[slug]/page.tsx',
  'src/app/(public)/contact/page.tsx',
];

for (const relPath of filesToUpdate) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace Yellow colors with Red
  content = content.replace(/#FFE000/g, '#E10600');
  content = content.replace(/#ffe000/g, '#E10600');
  content = content.replace(/#E6CA00/g, '#B91C1C');
  content = content.replace(/#e6ca00/g, '#B91C1C');
  content = content.replace(/#F5C200/g, '#DC2626');
  content = content.replace(/#f5c200/g, '#DC2626');
  content = content.replace(/amber-500/g, 'red-600');
  content = content.replace(/amber-400/g, 'red-500');

  // Replace dark backgrounds on main sections with clean white / zinc-50
  content = content.replace(/bg-\[#050505\]/g, 'bg-white');
  content = content.replace(/bg-\[#060606\]/g, 'bg-white');
  content = content.replace(/bg-\[#080808\]/g, 'bg-zinc-50');
  content = content.replace(/bg-\[#090909\]/g, 'bg-white');
  content = content.replace(/bg-\[#0A0A0A\]/g, 'bg-zinc-50');
  content = content.replace(/bg-\[#0B0B0B\]/g, 'bg-white');
  content = content.replace(/bg-\[#0D0D0D\]/g, 'bg-white');
  content = content.replace(/bg-\[#111111\]/g, 'bg-zinc-50');
  content = content.replace(/bg-\[#121212\]/g, 'bg-white');

  // Card & Border adjustments
  content = content.replace(/border-white\/10/g, 'border-zinc-200');
  content = content.replace(/border-white\/5/g, 'border-zinc-200');
  content = content.replace(/border-white\/15/g, 'border-zinc-200');
  content = content.replace(/border-white\/20/g, 'border-zinc-200');

  // Replace text-zinc-400 in body text with higher contrast text-zinc-600
  content = content.replace(/text-zinc-400/g, 'text-zinc-600');
  content = content.replace(/text-zinc-300/g, 'text-zinc-700');

  // Replace main headings from text-white to text-zinc-950
  content = content.replace(/font-black tracking-tight text-white/g, 'font-black tracking-tight text-zinc-950');
  content = content.replace(/font-bold text-white/g, 'font-bold text-zinc-950');
  content = content.replace(/font-extrabold text-white/g, 'font-extrabold text-zinc-950');
  content = content.replace(/text-lg font-black text-white/g, 'text-lg font-black text-zinc-950');
  content = content.replace(/text-xl font-black text-white/g, 'text-xl font-black text-zinc-950');
  content = content.replace(/text-2xl font-black text-white/g, 'text-2xl font-black text-zinc-950');

  // Badges: bg-white/5 border border-white/10 -> bg-red-50 border border-red-200
  content = content.replace(/bg-white\/5 border border-zinc-200 text-\[#E10600\]/g, 'bg-red-50 border border-red-200 text-[#E10600]');
  content = content.replace(/bg-white\/5 border border-white\/10 text-\[#E10600\]/g, 'bg-red-50 border border-red-200 text-[#E10600]');

  // Ensure button styling: bg-[#E10600] has text-white, not text-black
  content = content.replace(/bg-\[#E10600\] text-black/g, 'bg-[#E10600] text-white');
  content = content.replace(/hover:bg-\[#E10600\] hover:text-black/g, 'hover:bg-[#E10600] hover:text-white');
  content = content.replace(/hover:bg-\[#E10600\] text-zinc-300 hover:text-black/g, 'hover:bg-[#E10600] text-zinc-700 hover:text-white');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Updated: ${relPath}`);
}

console.log('Finished applying Red, Black, and White theme across all components & pages!');
