'use client';

import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

function highlightedLineNumbers(value) {
  if (Array.isArray(value.highlightedLines)) return new Set(value.highlightedLines.map(Number));
  const source = value.highlightedLines || value.highlighted || '';
  return new Set(String(source).split(',').flatMap((part) => {
    const [start, end = start] = part.trim().split('-').map(Number);
    return Number.isFinite(start) ? Array.from({ length: end - start + 1 }, (_, index) => start + index) : [];
  }));
}

export function ArticleCodeBlock({ value }) {
  const [copied, setCopied] = useState(false);
  const language = value.language || 'text';
  const code = value.code || '';
  const highlighted = highlightedLineNumbers(value);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <figure className="article-code">
      <figcaption>
        <span>{value.filename || 'CODE'}</span>
        <button type="button" onClick={copyCode}>{copied ? 'COPIED' : 'COPY'}</button>
      </figcaption>
      <Highlight theme={themes.nightOwl} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, lineIndex) => {
              const lineNumber = lineIndex + 1;
              return (
                <div {...getLineProps({ line })} className={highlighted.has(lineNumber) ? 'is-highlighted' : ''} key={lineNumber}>
                  <span className="article-code-line">{String(lineNumber).padStart(2, '0')}</span>
                  {line.map((token, tokenIndex) => <span key={tokenIndex} {...getTokenProps({ token })} />)}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </figure>
  );
}
