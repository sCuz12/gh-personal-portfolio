import { AppLink } from './AppLink';
import { cvAssistantQuestions } from '../data/cvAssistant';

const previewQuestions = cvAssistantQuestions.slice(0, 3);

export function CvAssistantPreview() {
  return (
    <section className="cv-assistant-preview zoom-section" aria-labelledby="cv-preview-title">
      <div className="cv-assistant-preview-layout shell">
        <div className="cv-assistant-preview-copy reveal">
          <p className="eyebrow">RECRUITER TOOL / CV ASSISTANT</p>
          <h2 id="cv-preview-title">Don’t scan my CV.<br /><em>Ask it.</em></h2>
          <p>
            Explore my experience, production work, and technical background through a
            conversational interface grounded in my CV.
          </p>
          <AppLink to="/ask-my-cv" className="cv-preview-action" cursor="ASK">
            OPEN THE CV ASSISTANT <span>→</span>
          </AppLink>
          <small>AI can make mistakes. The CV and a direct conversation remain authoritative.</small>
        </div>

        <div className="cv-preview-console reveal" aria-label="Example questions for the CV assistant">
          <header>
            <div><strong>GH_</strong><span>/</span><span>cv-assistant</span></div>
            <p><i /> READY TO ASK</p>
          </header>
          <ol>
            {previewQuestions.map((item, index) => (
              <li key={item.question}>
                <span>{String(index + 1).padStart(2, '0')} / {item.category}</span>
                <p>{item.question}</p>
              </li>
            ))}
          </ol>
          <AppLink to="/ask-my-cv" cursor="ASK" aria-label="Open the CV assistant">
            <span>ASK SOMETHING ELSE</span><b>↗</b>
          </AppLink>
        </div>
      </div>
    </section>
  );
}
