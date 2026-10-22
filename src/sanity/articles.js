import { draftMode } from 'next/headers';
import { sanityClient, getDraftClient } from './client';

const articleCardProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  type,
  status,
  coverImage,
  featured,
  publishedAt,
  updatedAt,
  body,
  "topics": topics[]->{title, "slug": slug.current}
}`;

const articleDetailProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  type,
  status,
  coverImage,
  featured,
  publishedAt,
  updatedAt,
  relatedProject,
  body,
  seo,
  "topics": topics[]->{title, "slug": slug.current},
  "body": body[]{..., markDefs[]{..., _type == "articleLink" => {"slug": article->slug.current}}}
}`;

function countBodyWords(body = []) {
  return body.reduce((total, block) => {
    if (block._type === 'block') {
      return total + (block.children ?? []).reduce((count, child) => (
        count + (child.text?.trim().split(/\s+/).filter(Boolean).length ?? 0)
      ), 0);
    }

    if (block._type === 'codeBlock') {
      return total + (block.code?.trim().split(/\s+/).filter(Boolean).length ?? 0);
    }

    return total;
  }, 0);
}

function normalizeArticle(article) {
  if (!article) return null;
  return {
    ...article,
    type: article.type || 'note',
    status: article.status || 'thinking',
    readingTime: Math.max(1, Math.ceil(countBodyWords(article.body) / 220)),
  };
}

async function getClientForRequest() {
  const preview = (await draftMode()).isEnabled;
  return preview ? getDraftClient() : sanityClient;
}

async function fetchContent(query, params = {}) {
  const client = await getClientForRequest();
  if (!client) return null;

  try {
    return await client.fetch(query, params, { cache: 'no-store' });
  } catch (error) {
    console.error('Sanity content request failed.', error);
    return null;
  }
}

export async function getLatestArticles(limit = 3) {
  const articles = await fetchContent(
    `*[_type == "article" && defined(publishedAt)] | order(publishedAt desc)[0...$limit] ${articleCardProjection}`,
    { limit },
  );
  return (articles ?? []).map(normalizeArticle);
}

export async function getBrainArticles({ query = '', topic = '', type = '', status = '' } = {}) {
  const search = query.trim() ? `*${query.trim()}*` : '';
  const articles = await fetchContent(
    `*[
      _type == "article" &&
      defined(publishedAt) &&
      ($topic == "" || $topic in topics[]->slug.current) &&
      ($type == "" || coalesce(type, "note") == $type) &&
      ($status == "" || coalesce(status, "thinking") == $status) &&
      ($search == "" || title match $search || excerpt match $search)
    ] | order(featured desc, publishedAt desc) ${articleCardProjection}`,
    { search, topic, type, status },
  );
  return (articles ?? []).map(normalizeArticle);
}

export async function getBrainStats() {
  const stats = await fetchContent(`{
    "count": count(*[_type == "article" && defined(publishedAt)]),
    "topicCount": count(*[_type == "topic"]),
    "lastUpdated": (*[_type == "article" && defined(publishedAt)] | order(coalesce(updatedAt, publishedAt) desc)[0]) {"value": coalesce(updatedAt, publishedAt)}.value
  }`);
  return stats ?? { count: 0, topicCount: 0, lastUpdated: null };
}

export async function getBacklinks(articleId) {
  const articles = await fetchContent(
    `*[_type == "article" && defined(publishedAt) && references($articleId)] | order(publishedAt desc) ${articleCardProjection}`,
    { articleId },
  );
  return (articles ?? []).map(normalizeArticle);
}

export async function getTopics() {
  return (await fetchContent(
    `*[_type == "topic"] | order(title asc){_id, title, "slug": slug.current, description}`,
  )) ?? [];
}

export async function getArticleBySlug(slug) {
  const article = await fetchContent(
    `*[_type == "article" && slug.current == $slug && defined(publishedAt)][0] ${articleDetailProjection}`,
    { slug },
  );
  return normalizeArticle(article);
}

export async function getRelatedArticles(article, limit = 3) {
  const topicSlugs = article.topics?.map((topic) => topic.slug) ?? [];
  if (!topicSlugs.length) return [];

  const articles = await fetchContent(
    `*[
      _type == "article" &&
      defined(publishedAt) &&
      slug.current != $slug &&
      count((topics[]->slug.current)[@ in $topicSlugs]) > 0
    ] | order(publishedAt desc)[0...$limit] ${articleCardProjection}`,
    { slug: article.slug, topicSlugs, limit },
  );
  return (articles ?? []).map(normalizeArticle);
}

export async function getAdjacentArticles(publishedAt) {
  if (!publishedAt) return { previous: null, next: null };

  const [previous, next] = await Promise.all([
    fetchContent(
      `*[_type == "article" && defined(publishedAt) && publishedAt < $publishedAt] | order(publishedAt desc)[0] ${articleCardProjection}`,
      { publishedAt },
    ),
    fetchContent(
      `*[_type == "article" && defined(publishedAt) && publishedAt > $publishedAt] | order(publishedAt asc)[0] ${articleCardProjection}`,
      { publishedAt },
    ),
  ]);

  return { previous: normalizeArticle(previous), next: normalizeArticle(next) };
}
