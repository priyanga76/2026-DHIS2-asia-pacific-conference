import type { MetadataRoute } from 'next';
import { event, sessions, speakers } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = event.siteUrl;
  const staticRoutes = [
    '',
    '/programme',
    '/speakers',
    '/registration',
    '/venue',
    '/travel',
    '/hotels',
    '/gallery',
    '/sponsors',
    '/faqs',
    '/recordings',
    '/contact',
    '/terms',
  ].map((path) => ({
    url: `${base}${path}/`,
    lastModified: event.lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const sessionRoutes = sessions.map((s) => ({
    url: `${base}/programme/${s.slug}/`,
    lastModified: event.lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  const speakerRoutes = speakers.map((s) => ({
    url: `${base}/speakers/${s.slug}/`,
    lastModified: event.lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...sessionRoutes, ...speakerRoutes];
}
