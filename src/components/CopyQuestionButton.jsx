'use client';

import { useState } from 'react';

export function CopyQuestionButton({ category, question }) {
  const [copyState, setCopyState] = useState('idle');

  const copyQuestion = async () => {
    try {
      await navigator.clipboard.writeText(question);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      setCopyState('failed');
    }
  };

  return (
    <button className="cv-question" type="button" onClick={copyQuestion}>
      <span>{category}</span>
      <strong>{question}</strong>
      <small aria-live="polite">
        {copyState === 'copied' ? 'COPIED ✓' : copyState === 'failed' ? 'COPY FAILED' : 'COPY ↗'}
      </small>
    </button>
  );
}
