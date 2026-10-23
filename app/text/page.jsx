import { TextModePage } from '../../src/views/TextModePage';
import { getLatestArticles } from '../../src/sanity/articles';

export const metadata = {
  title: 'Text Mode',
  description: 'A fast, plain-text version of George Hadjisavva’s portfolio.',
};

export default async function Page() {
  const articles = await getLatestArticles(5);
  return <TextModePage articles={articles} />;
}
