import Link from 'next/link';
import { formatArticleDate } from './ArticleCard';

export function ArticleStatus({ status = 'thinking' }) {
  return <span className={`article-status status-${status}`}><i aria-hidden="true" />{status}</span>;
}

export function ArticleRow({ article }) {
  const topic = article.topics?.[0]?.title || 'General';

  return (
    <article className="brain-row">
      <Link href={`/brain/${article.slug}`}>
        <div className="brain-row-main">
          <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
          <span>{article.type}</span>
          <h2>{article.title}</h2>
          <span className="brain-row-topic">{topic}</span>
          <ArticleStatus status={article.status} />
          <span>{article.readingTime} MIN</span>
          <b aria-hidden="true">→</b>
        </div>
        <div className="brain-row-excerpt"><p>{article.excerpt}</p></div>
      </Link>
    </article>
  );
}
