import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\Vishal Singh\\.gemini\\antigravity-ide\\brain\\0cd65bda-3ef5-4e57-b735-1e8d4a67ed15';
const destDir = 'C:\\Users\\Vishal Singh\\Desktop\\GGemsSports\\public\\images\\about';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(brainDir);

const mapping = [
  { prefix: 'founder_gyanendra_hd_', dest: 'founder-gyanendra.jpg' },
  { prefix: 'story_squash_court_hd_', dest: 'story-squash-court.jpg' },
  { prefix: 'cta_squash_ball_racket_', dest: 'cta-squash-racket-ball.jpg' },
  { prefix: 'coach_aakash_sharma_hd_', dest: 'coach-aakash-sharma.jpg' },
  { prefix: 'coach_dushyant_singh_hd_', dest: 'coach-dushyant-singh.jpg' },
  { prefix: 'coach_rahul_verma_hd_', dest: 'coach-rahul-verma.jpg' },
];

for (const m of mapping) {
  const match = files.find(f => f.startsWith(m.prefix) && f.endsWith('.jpg'));
  if (match) {
    fs.copyFileSync(path.join(brainDir, match), path.join(destDir, m.dest));
    console.log(`Copied ${match} -> ${m.dest}`);
  } else {
    console.warn(`Could not find file with prefix ${m.prefix}`);
  }
}
