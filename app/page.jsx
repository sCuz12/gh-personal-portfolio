import { HomePage } from '../src/views/HomePage';
import { getBrainStats, getLatestArticles } from '../src/sanity/articles';

export default async function Page() {
  const [articles, stats] = await Promise.all([getLatestArticles(8), getBrainStats()]);
  return <HomePage brainArticles={articles} brainArticleCount={stats.count} />;
}
