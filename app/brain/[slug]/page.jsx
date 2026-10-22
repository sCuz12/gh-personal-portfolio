import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleBody, headingId } from '../../../src/components/ArticleBody';
import { formatArticleDate } from '../../../src/components/ArticleCard';
import { ArticleStatus } from '../../../src/components/ArticleRow';
import { Footer } from '../../../src/components/Footer';
import { ReadingProgress } from '../../../src/components/ReadingProgress';
import { getAdjacentArticles, getArticleBySlug, getBacklinks } from '../../../src/sanity/articles';
import { urlForImage } from '../../../src/sanity/image';

function getHeadings(body = []) {
  return body
    .filter((block) => block._type === 'block' && ['h2', 'h3'].includes(block.style))
    .map((block) => ({ id: headingId(block), title: (block.children ?? []).map((child) => child.text).join(' '), level: block.style }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article not found' };
  const image = urlForImage(article.seo?.image || article.coverImage, { width: 1200, height: 630 });
  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    alternates: { canonical: `/brain/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.seo?.title || article.title,
      description: article.seo?.description || article.excerpt,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [backlinks, adjacent] = await Promise.all([
    getBacklinks(article._id),
    getAdjacentArticles(article.publishedAt),
  ]);
  const headings = getHeadings(article.body);
  const topic = article.topics?.[0]?.title || 'General';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: { '@type': 'Person', name: 'George Hadjisavva' },
    mainEntityOfPage: `${siteUrl}/brain/${article.slug}`,
  };

  return (
    <>
      <ReadingProgress />
      <main className="brain-article">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />

        <div className="article-system shell">
          <aside className="article-back"><Link href="/brain">← BRAIN</Link></aside>

          <article className="article-center">
            <header className="article-hero">
              <div className="article-kicker"><span>{article.type} · {topic}</span><ArticleStatus status={article.status} /></div>
              <h1>{article.title}</h1>
              <p>{article.excerpt}</p>
              <div className="article-dates">
                <span>{formatArticleDate(article.publishedAt)}</span>
                {article.updatedAt && <span>UPDATED {formatArticleDate(article.updatedAt)}</span>}
                <span>{article.readingTime} MIN READ</span>
              </div>
            </header>

            {article.status === 'thinking' && <aside className="article-thinking"><strong>EARLY THINKING.</strong><span>This may change.</span></aside>}
            <div className="article-prose"><ArticleBody body={article.body} /></div>
          </article>

          <aside className="article-toc">
            <details open>
              <summary>ON THIS PAGE</summary>
              <nav>{headings.map((heading) => <a className={heading.level} href={`#${heading.id}`} key={heading.id}>{heading.title}</a>)}</nav>
            </details>
          </aside>
        </div>

        <footer className="article-connections">
          {article.relatedProject && <div><span>RELATED PROJECT:</span><Link href={article.relatedProject.href}>{article.relatedProject.title} →</Link></div>}
          <div>
            <span>LINKS HERE:</span>
            {backlinks.length ? <nav>{backlinks.map((item) => <Link href={`/brain/${item.slug}`} key={item._id}>{item.title}</Link>)}</nav> : <p>No notes reference this one yet.</p>}
          </div>
          <Link className="article-next" href={adjacent.next ? `/brain/${adjacent.next.slug}` : '/brain'}>
            <small>{adjacent.next ? 'NEXT NOTE →' : 'BACK TO BRAIN →'}</small>
            <strong>{adjacent.next?.title || 'Explore all notes'}</strong>
          </Link>
        </footer>
      </main>
      <Footer />
    </>
  );
}
