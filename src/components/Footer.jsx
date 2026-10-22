import { AppLink } from './AppLink';
import { siteConfig } from '../config/site';

export function Footer() {
  return (
    <section className="contact">
      <div className="shell reveal">
        <p className="eyebrow">HAVE A HARD PROBLEM?</p>
        <a href={siteConfig.contact.mailto}>Let’s build what’s next.<span>↗</span></a>
        <div className="foot-meta">
          <span>CYPRUS / WORKING GLOBALLY</span>
          <span><a href={siteConfig.social.github} target="_blank" rel="noreferrer">GITHUB</a> · LINKEDIN · <a href={siteConfig.contact.mailto}>EMAIL</a> · <AppLink to="/ask-my-cv">ASK MY CV</AppLink></span>
        </div>
      </div>
    </section>
  );
}
