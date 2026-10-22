import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleBody, headingId } from '../../../src/components/ArticleBody';
import { ArticleCard, formatArticleDate } from '../../../src/components/ArticleCard';
import { Footer } from '../../../src/components/Footer';
import { getAdjacentArticles, getArticleBySlug, getRelatedArticles } from '../../../src/sanity/articles';
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
      images: image ? [{ url: image }] : [],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [related, adjacent] = await Promise.all([
    getRelatedArticles(article),
    getAdjacentArticles(article.publishedAt),
  ]);
  const headings = getHeadings(article.body);
  const coverImage = urlForImage(article.coverImage, { width: 1800 });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { '@type': 'Person', name: 'George Hadjisavva' },
    mainEntityOfPage: `${siteUrl}/brain/${article.slug}`,
    image: coverImage || undefined,
  };

  return (
    <>
      <article className="brain-article">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
        <header className="article-hero shell">
          <Link href="/brain">← BACK TO BRAIN</Link>
          <ul>{(article.topics ?? []).map((topic) => <li key={topic.slug}>{topic.title}</li>)}</ul>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <div><span>{formatArticleDate(article.publishedAt)}</span><span>{article.readingTime} MIN READ</span><span>BY GEORGE HADJISAVVA</span></div>
        </header>

        {coverImage && <figure className="article-cover shell"><img src={coverImage} alt={article.coverImage?.alt || ''} />{article.coverImage?.caption && <figcaption>{article.coverImage.caption}</figcaption>}</figure>}

        <div className="article-layout shell">
          <aside className="article-toc">
            <span>IN THIS NOTE</span>
            <nav>{headings.map((heading) => <a className={heading.level} href={`#${heading.id}`} key={heading.id}>{heading.title}</a>)}</nav>
          </aside>
          <div className="article-prose"><ArticleBody body={article.body} /></div>
        </div>

        {related.length > 0 && <section className="related-articles shell"><header><p className="eyebrow">RELATED THINKING</p><Link href="/brain">ALL ARTICLES →</Link></header><div>{related.map((item) => <ArticleCard article={item} key={item._id} />)}</div></section>}

        <nav className="article-adjacent" aria-label="Adjacent articles">
          {adjacent.previous ? <Link href={`/brain/${adjacent.previous.slug}`}><small>PREVIOUS</small><strong>{adjacent.previous.title}</strong><span>←</span></Link> : <span />}
          {adjacent.next ? <Link href={`/brain/${adjacent.next.slug}`}><small>NEXT</small><strong>{adjacent.next.title}</strong><span>→</span></Link> : <Link href="/brain"><small>CONTINUE</small><strong>Explore the Brain</strong><span>→</span></Link>}
        </nav>
      </article>
      <Footer />
    </>
  );
}
