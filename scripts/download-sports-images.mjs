import fs from 'fs';
import path from 'path';

const destDir = 'C:\\Users\\Vishal Singh\\Desktop\\GGemsSports\\public\\images\\programs';

const images = [
  { name: 'sport-cricket.jpg', url: 'https://images.unsplash.com/photo-1531415074868-036b1c5f53ec?q=80&w=800&auto=format&fit=crop' },
  { name: 'sport-swimming.jpg', url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800&auto=format&fit=crop' },
  { name: 'sport-yoga.jpg', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop' },
  { name: 'sport-self-defence.jpg', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop' },
  { name: 'sport-skating.jpg', url: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=800&auto=format&fit=crop' },
  { name: 'sport-shooting.jpg', url: 'https://images.unsplash.com/photo-1584448141569-69f342da535c?q=80&w=800&auto=format&fit=crop' },
];

async function downloadImages() {
  for (const img of images) {
    const dest = path.join(destDir, img.name);
    if (!fs.existsSync(dest)) {
      try {
        console.log(`Downloading ${img.name}...`);
        const res = await fetch(img.url);
        if (res.ok) {
          const buffer = await res.arrayBuffer();
          fs.writeFileSync(dest, Buffer.from(buffer));
          console.log(`Saved ${img.name}`);
        } else {
          console.warn(`Failed to download ${img.name}: status ${res.status}`);
        }
      } catch (err) {
        console.error(`Error downloading ${img.name}:`, err.message);
      }
    }
  }
}

downloadImages();
