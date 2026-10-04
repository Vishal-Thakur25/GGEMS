import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getNewsArticles } from '@/server/queries';
import { Newspaper, Calendar, ArrowRight, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academy News & Tournament Updates | GGems Squash Academy',
  description:
    'Latest tournament reports, athlete achievements, national rankings, and coaching announcements from GGems Squash Academy.',
};

export default async function NewsPage() {
  const { articles } = await getNewsArticles(20, 1);

  return (
    <div className="pt-28 pb-24 bg-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#48A427] text-xs font-bold tracking-widest uppercase mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            <span>DISPATCHES & REPORTS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-950 uppercase leading-none mb-6 font-display">
            NEWS & ANNOUNCEMENTS
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
            Stay up to date with national tournament results, junior circuit medals, coaching clinics,
            and expansion of GGems centers across Delhi NCR.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="rounded-3xl bg-white border border-zinc-200 overflow-hidden flex flex-col group hover:border-[#48A427]/50 transition-all duration-300 shadow-xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-zinc-950">
                <Image
                  src={
                    art.featuredImage ||
                    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1000&auto=format&fit=crop'
                  }
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                {art.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold text-[#48A427] border border-zinc-700 uppercase font-mono">
                      {art.category.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#48A427]" />
                      <span>{new Date(art.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{art.authorName}</span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-zinc-950 uppercase tracking-tight group-hover:text-[#48A427] transition-colors mb-4 leading-snug font-display">
                    {art.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-6">
                    {art.excerpt}
                  </p>
                </div>

                <Link
                  href={`/news/${art.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#48A427] hover:text-[#3B8A1D] uppercase tracking-wider group/link self-start"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
