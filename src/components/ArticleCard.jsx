import Link from 'next/link';
import { urlForImage } from '../sanity/image';
import { getArticleCategoryLabel } from '../data/articleCategories';

export function formatArticleDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function ArticleCard({ article, featured = false, showImage = true }) {
  const imageUrl = showImage
    ? urlForImage(article.coverImage, { width: featured ? 1400 : 900 })
    : null;

  return (
    <article className={`brain-card ${featured ? 'featured' : ''} ${showImage ? '' : 'without-image'}`}>
      <Link href={`/brain/${article.slug}`}>
        {showImage && (
          <div className="brain-card-image">
            {imageUrl ? <img src={imageUrl} alt={article.coverImage?.alt || ''} /> : <span>GH_ / BRAIN</span>}
          </div>
        )}
        <div className="brain-card-meta">
          <span>{getArticleCategoryLabel(article.category)} · {formatArticleDate(article.publishedAt)}</span>
          <span>{article.readingTime} MIN READ</span>
        </div>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <ul aria-label="Article topics">
          {(article.topics ?? []).map((topic) => <li key={topic.slug}>{topic.title}</li>)}
        </ul>
        <strong>READ ARTICLE <i>→</i></strong>
      </Link>
    </article>
  );
}
