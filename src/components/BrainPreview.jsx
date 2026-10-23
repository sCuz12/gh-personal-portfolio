import Link from 'next/link';
import { ArticleCard } from './ArticleCard';

export function BrainPreview({ articles }) {
  if (!articles.length) return null;
  const columnCount = Math.min(articles.length, 3);

  return (
    <section className="brain-preview zoom-section">
      <div className="shell">
        <header className="brain-preview-heading">
          <div><p className="eyebrow">FROM THE BRAIN</p><span>WRITING / SYSTEMS / AI</span></div>
          <h2>Notes from<br /><em>inside the work.</em></h2>
          <Link href="/brain">EXPLORE ALL ARTICLES <span>→</span></Link>
        </header>
        <div className={`brain-preview-grid article-count-${columnCount}`}>
          {articles.map((article) => (
            <ArticleCard article={article} key={article._id} showImage={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
