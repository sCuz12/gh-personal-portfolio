'use client';

import { useState } from 'react';

const assistantUrl = 'https://georgehadjisavva-conversations-me.hf.space/?__theme=dark';

export function CvAssistantEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="cv-console" aria-labelledby="cv-console-title">
      <header>
        <div><strong id="cv-console-title">GH_</strong><span>/</span><span>cv-assistant</span></div>
        <p><i /> {isLoaded ? 'SYSTEM ONLINE' : 'CONNECTING'}</p>
      </header>
      <div className="cv-iframe-frame">
        <iframe
          className={isLoaded ? '' : 'cv-iframe-loading'}
          src={assistantUrl}
          title="Chat with George's CV assistant"
          loading="eager"
          allow="clipboard-write"
          aria-hidden={!isLoaded}
          tabIndex={isLoaded ? 0 : -1}
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && (
          <div className="cv-iframe-placeholder" role="status" aria-live="polite">
            <span className="cv-loading-spinner" aria-hidden="true" />
            <p className="cv-loading-label">STARTING CV ASSISTANT</p>
            <h2>Getting the conversation ready.</h2>
            <p>The assistant may take a minute to wake up. You can explore the suggested questions while it loads.</p>
            <a href={assistantUrl} target="_blank" rel="noreferrer">OPEN IN A NEW TAB <span aria-hidden="true">↗</span></a>
          </div>
        )}
      </div>
      <p className="cv-disclaimer">AI can make mistakes. For exact details, see the CV.</p>
    </section>
  );
}
