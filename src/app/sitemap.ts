import { MetadataRoute } from 'next';
import db from '@/lib/db';
import { ContentStatus } from '@prisma/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ggemssquash.com';

  const [programs, teamMembers, centers, newsArticles] = await Promise.all([
    db.program.findMany({
      where: { status: ContentStatus.PUBLISHED },
      select: { slug: true, updatedAt: true },
    }),
    db.teamMember.findMany({
      where: { status: ContentStatus.PUBLISHED },
      select: { slug: true, updatedAt: true },
    }),
    db.center.findMany({
      where: { status: ContentStatus.PUBLISHED },
      select: { slug: true, updatedAt: true },
    }),
    db.newsArticle.findMany({
      where: { status: ContentStatus.PUBLISHED },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/programs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/centers`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/school-partnership`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/achievements`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const programRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
    url: `${baseUrl}/programs/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const teamRoutes: MetadataRoute.Sitemap = teamMembers.map((t) => ({
    url: `${baseUrl}/team/${t.slug}`,
    lastModified: t.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const centerRoutes: MetadataRoute.Sitemap = centers.map((c) => ({
    url: `${baseUrl}/centers/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const newsRoutes: MetadataRoute.Sitemap = newsArticles.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: n.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...programRoutes, ...teamRoutes, ...centerRoutes, ...newsRoutes];
}
