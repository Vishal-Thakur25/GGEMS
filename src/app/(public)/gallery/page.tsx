import type { Metadata } from 'next';
import Image from 'next/image';
import { getGalleryImages } from '@/server/queries';
import { Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Squash Academy Gallery | High Performance Court Photography | GGems',
  description:
    'Visual glimpse into GGems Squash Academy training sessions, match simulation, glass-back courts, and tournament action.',
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="pt-28 pb-24 bg-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#48A427] text-xs font-bold tracking-widest uppercase mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>VISUAL CHRONICLES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-950 uppercase leading-none mb-6 font-display">
            INSIDE GGEMS SQUASH ACADEMY
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
            Real court moments, high-intensity ghosting drills, tournament championships, and
            focused athletic development captured in motion.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="rounded-3xl bg-white border border-zinc-200 overflow-hidden flex flex-col group hover:border-[#48A427]/40 transition-all duration-300 shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950" data-cursor="view">
                <Image
                  src={img.imageUrl}
                  alt={img.altText || img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono text-[#48A427] border border-zinc-700 uppercase font-bold">
                    {img.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider line-clamp-1 font-display">
                    {img.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
