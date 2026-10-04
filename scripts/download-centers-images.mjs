import fs from 'fs';
import path from 'path';

const destDir = 'C:\\Users\\Vishal Singh\\Desktop\\GGemsSports\\public\\images\\centers';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const centersImages = [
  {
    name: 'featured-sirifort.jpg',
    url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop', // Sports complex entrance
  },
  {
    name: 'center-sirifort.jpg',
    url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=800&auto=format&fit=crop', // Modern sports complex
  },
  {
    name: 'center-krmangalam.jpg',
    url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=800&auto=format&fit=crop', // Brick school building
  },
  {
    name: 'center-shaktisports.jpg',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop', // Glass back squash court / club
  },
  {
    name: 'center-jaypee.jpg',
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop', // Campus building
  },
  {
    name: 'center-gyanshree.jpg',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop', // Modern white school campus
  },
  {
    name: 'center-stadium.jpg',
    url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=800&auto=format&fit=crop', // Stadium arena
  },
  {
    name: 'center-prometheus.jpg',
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop', // School facade
  },
  {
    name: 'center-ahlcon.jpg',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', // International school building
  },
  {
    name: 'center-ats.jpg',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop', // ATS luxury residential towers & lawns
  },
  {
    name: 'center-salvationtree.jpg',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop', // School building gate
  },
];

async function downloadAll() {
  for (const item of centersImages) {
    const dest = path.join(destDir, item.name);
    if (!fs.existsSync(dest)) {
      try {
        console.log(`Downloading ${item.name}...`);
        const res = await fetch(item.url);
        if (res.ok) {
          const buffer = await res.arrayBuffer();
          fs.writeFileSync(dest, Buffer.from(buffer));
          console.log(`Saved ${item.name}`);
        } else {
          console.warn(`Failed ${item.name}: ${res.status}`);
        }
      } catch (err) {
        console.error(`Error downloading ${item.name}:`, err.message);
      }
    } else {
      console.log(`${item.name} already exists.`);
    }
  }
}

downloadAll();
