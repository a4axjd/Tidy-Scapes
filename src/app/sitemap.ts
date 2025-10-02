import { getBlogPosts } from '@/lib/firebase-data';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.tidyscapesllc.com';

  const staticRoutes = [
    '/',
    '/lawn-care',
    '/tree-service',
    '/hardscaping',
    '/gallery',
    '/blog',
    '/visualizer',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  const posts = await getBlogPosts();
  const blogPostRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(), // Or post.date if available and in correct format
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogPostRoutes];
}
