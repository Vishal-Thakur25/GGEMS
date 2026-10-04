import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\Vishal Singh\\.gemini\\antigravity-ide\\brain\\0cd65bda-3ef5-4e57-b735-1e8d4a67ed15';
const destDir = 'C:\\Users\\Vishal Singh\\Desktop\\GGemsSports\\public\\images\\programs';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(brainDir);

const mapping = [
  { prefix: 'holistic_basketball_outdoors_', dest: 'approach-basketball.jpg' },
  { prefix: 'sport_squash_racket_', dest: 'sport-squash.jpg' },
  { prefix: 'sport_badminton_racket_', dest: 'sport-badminton.jpg' },
  { prefix: 'sport_table_tennis_', dest: 'sport-table-tennis.jpg' },
  { prefix: 'sport_tennis_court_', dest: 'sport-tennis.jpg' },
  { prefix: 'sport_athletics_track_', dest: 'sport-athletics.jpg' },
  { prefix: 'sport_basketball_hoop_', dest: 'sport-basketball.jpg' },
  { prefix: 'sport_gymnastics_beam_', dest: 'sport-gymnastics.jpg' },
  { prefix: 'sport_chess_board_', dest: 'sport-chess.jpg' },
  { prefix: 'sport_football_grass_', dest: 'sport-football.jpg' },
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
