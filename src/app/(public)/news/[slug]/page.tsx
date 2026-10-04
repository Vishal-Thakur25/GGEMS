import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getNewsArticleBySlug, getNewsArticles } from '@/server/queries';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { articles } = await getNewsArticles(100, 1);
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} | GGems Squash Academy`,
    description: article.excerpt,
  };
}

export default async function SingleNewsPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-white">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-[#48A427] uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News & Updates</span>
        </Link>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 mb-4">
          {article.category && (
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#48A427] border border-emerald-200 font-bold uppercase font-mono">
              {article.category.name}
            </span>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#48A427]" />
            <span>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-zinc-400" />
            <span>{article.authorName}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-zinc-950 uppercase tracking-tight leading-tight mb-8 font-display">
          {article.title}
        </h1>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-200 mb-12 shadow-2xl bg-zinc-950">
          <Image
            src={
              article.featuredImage ||
              'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop'
            }
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>

        {/* Content */}
        <div className="max-w-none text-zinc-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
          <p className="text-lg text-zinc-900 font-medium mb-6 leading-relaxed">
            {article.excerpt}
          </p>
          <div>{article.content}</div>
        </div>
      </article>
    </div>
  );
}
