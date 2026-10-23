import Link from 'next/link';
import { ArticleRow, ArticleStatus } from '../../src/components/ArticleRow';
import { Footer } from '../../src/components/Footer';
import { getBrainArticles, getBrainStats, getTopics } from '../../src/sanity/articles';
import { siteConfig } from '../../src/config/site';
import { articleCategories, getArticleCategoryLabel } from '../../src/data/articleCategories';

export const metadata = {
  title: 'Brain',
  description: 'Notes by George Hadjisavva on backend systems, AI agents, MCP, and building software in public.',
};

const articleTypes = [
  { value: '', label: 'All' },
  { value: 'essay', label: 'Essays' },
  { value: 'note', label: 'Notes' },
  { value: 'log', label: 'Logs' },
];

const articleStatuses = ['thinking', 'tested', 'shipped'];

function filterHref(current, changes) {
  const next = new URLSearchParams();
  const filters = { ...current, ...changes };
  Object.entries(filters).forEach(([key, value]) => value && next.set(key, value));
  const query = next.toString();
  return query ? `/brain?${query}` : '/brain';
}

function relativeDate(date) {
  if (!date) return 'recently';
  const days = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86400000));
  if (days === 0) return 'today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

export default async function BrainPage({ searchParams }) {
  const params = await searchParams;
  const filters = {
    q: typeof params?.q === 'string' ? params.q : '',
    category: typeof params?.category === 'string' ? params.category : '',
    topic: typeof params?.topic === 'string' ? params.topic : '',
    type: typeof params?.type === 'string' ? params.type : '',
    status: typeof params?.status === 'string' ? params.status : '',
  };
  const [articles, topics, stats] = await Promise.all([
    getBrainArticles(filters),
    getTopics(),
    getBrainStats(),
  ]);
  const hasFilters = Object.values(filters).some(Boolean);
  const featuredArticle = !hasFilters ? articles.find((article) => article.featured && article.type === 'essay') ?? null : null;
  const rows = featuredArticle ? articles.filter((article) => article._id !== featuredArticle._id) : articles;

  return (
    <>
      <main className="brain-page">
        <header className="brain-index-head shell">
          <div>
            <p className="eyebrow">GH_ / KNOWLEDGE SYSTEM</p>
            <h1>BRAIN_</h1>
            <p>Notes on backend systems, AI agents and building in public.</p>
            <span>{stats.count} NOTES · {stats.topicCount} TOPICS · LAST UPDATED {relativeDate(stats.lastUpdated)}</span>
          </div>
          <form action="/brain" method="get" className="brain-search">
            {filters.category && <input type="hidden" name="category" value={filters.category} />}
            {filters.topic && <input type="hidden" name="topic" value={filters.topic} />}
            {filters.type && <input type="hidden" name="type" value={filters.type} />}
            {filters.status && <input type="hidden" name="status" value={filters.status} />}
            <label htmlFor="brain-search">⌘K SEARCH</label>
            <input id="brain-search" name="q" defaultValue={filters.q} placeholder="Go, agents, architecture…" />
          </form>
        </header>

        <section className="brain-filter-panel shell" aria-label="Filter articles">
          <div><strong>CATEGORY:</strong><nav>{articleCategories.map((item) => <Link className={filters.category === item.value ? 'active' : ''} href={filterHref(filters, { category: item.value })} key={item.value || 'all'}>{item.label}</Link>)}</nav></div>
          <div><strong>TYPE:</strong><nav>{articleTypes.map((item) => <Link className={filters.type === item.value ? 'active' : ''} href={filterHref(filters, { type: item.value })} key={item.label}>{item.label}</Link>)}</nav></div>
          <div><strong>TOPIC:</strong><nav><Link className={!filters.topic ? 'active' : ''} href={filterHref(filters, { topic: '' })}>all</Link>{topics.map((item) => <Link className={filters.topic === item.slug ? 'active' : ''} href={filterHref(filters, { topic: item.slug })} key={item._id}>{item.slug}</Link>)}</nav></div>
          <div><strong>STATUS:</strong><nav>{articleStatuses.map((status) => <Link className={filters.status === status ? 'active' : ''} href={filterHref(filters, { status: filters.status === status ? '' : status })} key={status}><ArticleStatus status={status} /></Link>)}</nav></div>
        </section>

        {featuredArticle && (
          <section className="brain-featured shell">
            <p className="eyebrow">FEATURED ESSAY</p>
            <Link href={`/brain/${featuredArticle.slug}`}>
              <span>{getArticleCategoryLabel(featuredArticle.category)} · {featuredArticle.type} · {featuredArticle.readingTime} MIN</span>
              <h2>{featuredArticle.title}</h2>
              <p>{featuredArticle.excerpt}</p>
              <ArticleStatus status={featuredArticle.status} />
              <b>READ ESSAY →</b>
            </Link>
          </section>
        )}

        <section className="brain-archive shell" aria-live="polite">
          <header><p className="eyebrow">{hasFilters ? 'FILTERED NOTES' : 'LATEST NOTES'}</p><span>{rows.length} RESULTS</span></header>
          {rows.length ? rows.map((article) => <ArticleRow article={article} key={article._id} />) : (
            <div className="brain-empty"><strong>Nothing here yet.</strong><a href={`${siteConfig.contact.mailto}?subject=Brain%20topic%20suggestion`}>Suggest a topic →</a></div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
