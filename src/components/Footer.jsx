import { AppLink } from './AppLink';

export function Footer() {
  return (
    <section className="contact">
      <div className="shell reveal">
        <p className="eyebrow">HAVE A HARD PROBLEM?</p>
        <a href="mailto:hello@example.com">Let’s build what’s next.<span>↗</span></a>
        <div className="foot-meta">
          <span>CYPRUS / WORKING GLOBALLY</span>
          <span>GITHUB · LINKEDIN · EMAIL · <AppLink to="/ask-my-cv">ASK MY CV</AppLink></span>
        </div>
      </div>
    </section>
  );
}
