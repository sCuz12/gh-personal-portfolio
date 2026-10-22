import { HomePage } from '../src/views/HomePage';
import { getLatestArticles } from '../src/sanity/articles';

export default async function Page() {
  const articles = await getLatestArticles(3);
  return <HomePage brainArticles={articles} />;
}
