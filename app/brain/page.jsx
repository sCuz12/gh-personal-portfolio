import Link from 'next/link';
import { ArticleCard } from '../../src/components/ArticleCard';
import { Footer } from '../../src/components/Footer';
import { getBrainArticles, getTopics } from '../../src/sanity/articles';

export const metadata = {
  title: 'Brain',
  description: 'Writing by George Hadjisavva about backend systems, AI workflows, developer tooling, and product engineering.',
};

export default async function BrainPage({ searchParams }) {
  const filters = await searchParams;
  const query = typeof filters?.q === 'string' ? filters.q : '';
  const topic = typeof filters?.topic === 'string' ? filters.topic : '';
  const [articles, topics] = await Promise.all([
    getBrainArticles({ query, topic }),
    getTopics(),
  ]);
  const featuredArticle = !query && !topic ? articles.find((article) => article.featured) ?? articles[0] : null;
  const remainingArticles = featuredArticle ? articles.filter((article) => article._id !== featuredArticle._id) : articles;

  return (
    <>
      <article className="brain-page">
        <header className="brain-hero shell">
          <div>
            <p className="eyebrow">GEORGE’S BRAIN / FIELD NOTES</p>
            <h1>Thinking<br /><em>in systems.</em></h1>
          </div>
          <div className="brain-hero-note">
            <span>{String(articles.length).padStart(2, '0')} ARTICLES</span>
            <p>Notes on backend architecture, agentic workflows, developer tools, and the decisions behind shipped software.</p>
          </div>
        </header>

        <section className="brain-controls shell" aria-label="Filter articles">
          <form action="/brain" method="get">
            <label htmlFor="brain-search">SEARCH THE BRAIN</label>
            <div><input id="brain-search" name="q" defaultValue={query} placeholder="Agents, Go, architecture…" /><button type="submit">SEARCH →</button></div>
          </form>
          <nav aria-label="Article topics">
            <Link className={!topic ? 'active' : ''} href={query ? `/brain?q=${encodeURIComponent(query)}` : '/brain'}>ALL</Link>
            {topics.map((item) => (
              <Link
                className={topic === item.slug ? 'active' : ''}
                href={`/brain?topic=${encodeURIComponent(item.slug)}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                key={item._id}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </section>

        {featuredArticle && (
          <section className="brain-featured shell">
            <p className="eyebrow">FEATURED NOTE</p>
            <ArticleCard article={featuredArticle} featured />
          </section>
        )}

        <section className="brain-archive shell" aria-live="polite">
          <header><p className="eyebrow">{query || topic ? 'FILTERED NOTES' : 'LATEST NOTES'}</p><span>{remainingArticles.length} RESULTS</span></header>
          {remainingArticles.length ? (
            <div className="brain-grid">{remainingArticles.map((article) => <ArticleCard article={article} key={article._id} />)}</div>
          ) : (
            <div className="brain-empty"><strong>NOTHING MATCHED.</strong><p>Try another phrase or clear the active topic.</p><Link href="/brain">CLEAR FILTERS →</Link></div>
          )}
        </section>
      </article>
      <Footer />
    </>
  );
}
