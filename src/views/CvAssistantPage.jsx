import { CopyQuestionButton } from '../components/CopyQuestionButton';

import { Footer } from '../components/Footer';
import { cvAssistantQuestions } from '../data/cvAssistant';
import { profileLinks } from '../data/profileLinks';
import { siteConfig } from '../config/site';

const assistantUrl = 'https://georgehadjisavva-conversations-me.hf.space/?__theme=dark';

export function CvAssistantPage() {
  return (
    <>
      <article className="cv-assistant-page">
        <header className="cv-assistant-hero shell">
          <div>
            <p className="eyebrow">RECRUITER TOOL / CV ASSISTANT</p>
            <h1>Ask my<br /><em>experience.</em></h1>
          </div>
          <p>Ask anything about my work, stack, and experience. Answers come from my CV.</p>
        </header>

        <div className="cv-assistant-layout shell">
          <section className="cv-console" aria-labelledby="cv-console-title">
            <header>
              <div><strong id="cv-console-title">GH_</strong><span>/</span><span>cv-assistant</span></div>
              <p><i /> SYSTEM ONLINE</p>
            </header>
            <div className="cv-iframe-frame">
              <iframe
                src={assistantUrl}
                title="Chat with George's CV assistant"
                loading="lazy"
                allow="clipboard-write"
              />
            </div>
            <p className="cv-disclaimer">AI can make mistakes. For exact details, see the CV.</p>
          </section>

          <aside className="cv-assistant-sidebar">
            <section className="try-asking" aria-labelledby="try-asking-title">
              <div>
                <p className="eyebrow">TRY ASKING</p>
                <h2 id="try-asking-title">Copy, paste,<br />then explore.</h2>
              </div>
              <div className="cv-question-list">
                {cvAssistantQuestions.map((item) => (
                  <CopyQuestionButton
                    category={item.category}
                    question={item.question}
                    key={item.question}
                  />
                ))}
              </div>
            </section>

            <section className="cv-trust-panel" aria-labelledby="cv-trust-title">
              <p className="eyebrow">SOURCE OF TRUTH</p>
              <h2 id="cv-trust-title">Prefer the document?</h2>
              <p>The assistant helps you navigate my experience. The CV and a direct conversation remain authoritative.</p>
              <div>
                <a href={profileLinks.cv} className="cv-primary-action" target="_blank" rel="noreferrer">
                  DOWNLOAD CV <span>↗</span>
                </a>
                <a href={siteConfig.contact.mailto} className="cv-secondary-action">EMAIL GEORGE <span>↗</span></a>
              </div>
            </section>
          </aside>
        </div>
      </article>
      <Footer />
    </>
  );
}
