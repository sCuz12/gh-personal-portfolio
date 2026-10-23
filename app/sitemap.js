import { getBrainArticles } from '../src/sanity/articles';

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const staticPaths = ['', '/work', '/services', '/about', '/ask-my-cv', '/brain', '/text'];
  const articles = await getBrainArticles();

  return [
    ...staticPaths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() })),
    ...articles.map((article) => ({ url: `${siteUrl}/brain/${article.slug}`, lastModified: new Date(article.publishedAt) })),
  ];
}
