import Link from 'next/link';
import { ArticleCard } from './ArticleCard';

export function BrainPreview({ articles }) {
  if (!articles.length) return null;

  return (
    <section className="brain-preview zoom-section">
      <div className="shell">
        <header className="brain-preview-heading">
          <div><p className="eyebrow">FROM THE BRAIN</p><span>WRITING / SYSTEMS / AI</span></div>
          <h2>Notes from<br /><em>inside the work.</em></h2>
          <Link href="/brain">EXPLORE ALL ARTICLES <span>→</span></Link>
        </header>
        <div className="brain-preview-grid">
          {articles.map((article) => <ArticleCard article={article} key={article._id} />)}
        </div>
      </div>
    </section>
  );
}
