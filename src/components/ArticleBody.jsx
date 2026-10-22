import { PortableText } from 'next-sanity';
import { urlForImage } from '../sanity/image';
import { ArticleCodeBlock } from './ArticleCodeBlock';

function textFromBlock(value) {
  return (value.children ?? []).map((child) => child.text).join(' ');
}

export function headingId(value) {
  return textFromBlock(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const components = {
  block: {
    h2: ({ children, value }) => <h2 id={headingId(value)}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={headingId(value)}>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const external = /^https?:\/\//.test(value?.href ?? '');
      return <a href={value?.href} target={value?.blank || external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{children}</a>;
    },
    articleLink: ({ children, value }) => <a href={`/brain/${value?.slug}`}>{children}</a>,
  },
  types: {
    image: ({ value }) => {
      const src = urlForImage(value, { width: 1500 });
      if (!src) return null;
      return (
        <figure className="article-image">
          <img src={src} alt={value.alt || ''} />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
    code: ArticleCodeBlock,
    codeBlock: ArticleCodeBlock,
    callout: ({ value }) => (
      <aside className={`article-callout tone-${value.tone || 'note'}`}>
        <span>{value.tone || 'note'}</span>
        {value.title && <strong>{value.title}</strong>}
        <p>{value.body}</p>
      </aside>
    ),
    divider: () => <hr />,
  },
};

export function ArticleBody({ body }) {
  return <PortableText value={body} components={components} />;
}
