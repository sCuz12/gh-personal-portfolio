'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { articleCategories, getArticleCategoryLabel } from '../data/articleCategories';

const regions = articleCategories.filter((category) => category.value);
const statusSymbols = { thinking: '◌', tested: '◐', shipped: '●' };
const regionBounds = {
  engineering: { x: [9, 42], y: [20, 43] },
  'ai-systems': { x: [57, 90], y: [20, 43] },
  business: { x: [9, 42], y: [61, 84] },
  mind: { x: [57, 90], y: [61, 84] },
};

function hashValue(value) {
  return [...value].reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) >>> 0, 7);
}

function getNodePosition(article) {
  const bounds = regionBounds[article.category] || regionBounds.engineering;
  const hash = hashValue(article._id);
  return {
    x: bounds.x[0] + (hash % 1000) / 1000 * (bounds.x[1] - bounds.x[0]),
    y: bounds.y[0] + ((hash >>> 10) % 1000) / 1000 * (bounds.y[1] - bounds.y[0]),
  };
}

function getLinkedArticleIds(article) {
  return (article.body ?? []).flatMap((block) => (
    (block.markDefs ?? [])
      .filter((mark) => mark._type === 'articleLink' && mark.article?._ref)
      .map((mark) => mark.article._ref)
  ));
}

function BrainIndex({ articles, selectedId, activeCategory, onSelect, className = '' }) {
  return (
    <div className={`brain-map-index ${className}`}>
      {regions.map((region) => {
        const regionArticles = articles.filter((article) => article.category === region.value);
        const isDimmed = activeCategory && activeCategory !== region.value;

        return (
          <section className={isDimmed ? 'dimmed' : ''} key={region.value} aria-labelledby={`brain-region-${region.value}`}>
            <header><h3 id={`brain-region-${region.value}`}>{region.label}</h3><span>{regionArticles.length}</span></header>
            {regionArticles.length ? (
              <ul>
                {regionArticles.map((article) => (
                  <li key={article._id}>
                    <button className={selectedId === article._id ? 'active' : ''} type="button" onClick={() => onSelect(article._id)}>
                      <span aria-hidden="true">{statusSymbols[article.status] || '◌'}</span>
                      <strong>{article.title}</strong>
                      <small>{article.type} · {article.readingTime} min</small>
                    </button>
                  </li>
                ))}
              </ul>
            ) : <p>Growing soon.</p>}
          </section>
        );
      })}
    </div>
  );
}

function BrainMap({ articles, selectedId, activeCategory, onSelect }) {
  const nodes = useMemo(() => articles.map((article) => ({ article, ...getNodePosition(article), links: getLinkedArticleIds(article) })), [articles]);
  const selectedNode = nodes.find((node) => node.article._id === selectedId);
  const connectedIds = new Set([
    ...(selectedNode?.links ?? []),
    ...nodes.filter((node) => node.links.includes(selectedId)).map((node) => node.article._id),
  ]);

  return (
    <div className="brain-map-canvas" aria-label="Visual map of Brain articles">
      {regions.map((region) => <span className={`brain-map-region-label region-${region.value}`} key={region.value}>{region.label}</span>)}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.flatMap((node) => node.links.map((targetId) => {
          const target = nodes.find((candidate) => candidate.article._id === targetId);
          if (!target) return null;
          const isActive = node.article._id === selectedId || targetId === selectedId;
          return <line className={isActive ? 'active' : ''} x1={node.x} y1={node.y} x2={target.x} y2={target.y} key={`${node.article._id}-${targetId}`} />;
        }))}
      </svg>
      {nodes.map((node) => {
        const isSelected = node.article._id === selectedId;
        const isConnected = connectedIds.has(node.article._id);
        const isDimmed = (activeCategory && node.article.category !== activeCategory) || (selectedId && !isSelected && !isConnected);
        return (
          <button
            className={`brain-map-node type-${node.article.type} ${isSelected ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            type="button"
            onClick={() => onSelect(node.article._id)}
            tabIndex="-1"
            aria-label={`Select ${node.article.title}`}
            key={node.article._id}
          ><span>{statusSymbols[node.article.status] || '◌'}</span></button>
        );
      })}
    </div>
  );
}

export function BrainPreview({ articles, totalCount = articles.length }) {
  const [selectedId, setSelectedId] = useState(articles.find((article) => article.featured)?._id || articles[0]?._id || '');
  const [activeCategory, setActiveCategory] = useState('');

  if (!articles.length) return null;

  const usesMap = articles.length >= 6;
  const displayedCount = Math.max(totalCount, articles.length);
  const selectedArticle = articles.find((article) => article._id === selectedId) || articles[0];
  const linkedIds = getLinkedArticleIds(selectedArticle);
  const connectedArticles = articles.filter((article) => linkedIds.includes(article._id));

  return (
    <section className="brain-preview zoom-section">
      <div className="shell">
        <header className="brain-map-heading">
          <div><p className="eyebrow">FROM THE BRAIN_</p><span>HOW I THINK / WHAT I LEARN</span></div>
          <p>{displayedCount} PUBLISHED THOUGHTS · 4 REGIONS</p>
          <Link href="/brain">OPEN THE BRAIN <span>→</span></Link>
        </header>

        <div className="brain-map-shell">
          <div className="brain-map-explorer">
            {usesMap ? (
              <>
                <BrainMap articles={articles} selectedId={selectedId} activeCategory={activeCategory} onSelect={setSelectedId} />
                <BrainIndex articles={articles} selectedId={selectedId} activeCategory={activeCategory} onSelect={setSelectedId} className="screen-reader-only" />
              </>
            ) : <BrainIndex articles={articles} selectedId={selectedId} activeCategory={activeCategory} onSelect={setSelectedId} />}
          </div>

          <aside className="brain-map-selected" aria-live="polite">
            <p>SELECTED</p>
            <span><b aria-hidden="true">{statusSymbols[selectedArticle.status] || '◌'}</b> {selectedArticle.status} · {getArticleCategoryLabel(selectedArticle.category)}</span>
            <h2>{selectedArticle.title}</h2>
            <p>{selectedArticle.excerpt}</p>
            <small>{selectedArticle.type} · {selectedArticle.readingTime} min read</small>
            {(connectedArticles.length > 0 || selectedArticle.relatedProject) && (
              <div className="brain-map-connections">
                <strong>CONNECTED TO:</strong>
                {connectedArticles.map((article) => <Link href={`/brain/${article.slug}`} key={article._id}>→ {article.title}</Link>)}
                {selectedArticle.relatedProject && <Link href={selectedArticle.relatedProject.href}>→ {selectedArticle.relatedProject.title} <i>(project)</i></Link>}
              </div>
            )}
            <Link className="brain-map-read" href={`/brain/${selectedArticle.slug}`}>READ ARTICLE <span>→</span></Link>
          </aside>
        </div>

        <footer className="brain-map-filters">
          <strong>FILTER:</strong>
          {articleCategories.map((category) => (
            <button className={activeCategory === category.value ? 'active' : ''} type="button" onClick={() => setActiveCategory(category.value)} key={category.value || 'all'}>{category.label}</button>
          ))}
          <span>◌ THINKING · ◐ TESTED · ● SHIPPED</span>
        </footer>
      </div>
    </section>
  );
}
