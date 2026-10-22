import { AppLink } from '../components/AppLink';

import { CaseStudyArchitecture } from '../components/CaseStudyArchitecture';
import { CaseStudyDecisionCard, CaseStudySummaryCard } from '../components/CaseStudyCards';
import { Footer } from '../components/Footer';
import { decreeCaseStudy } from '../data/decreeCaseStudy';

export function DecreeCaseStudyPage() {
  return (
    <>
      <article className="decree-case-study">
        <header className="decree-case-hero shell">
          <div className="decree-case-heading">
            <p className="eyebrow">CASE STUDY 01 / AI GOVERNANCE</p>
            <h1>{decreeCaseStudy.title}<span>®</span></h1>
            <p>{decreeCaseStudy.subtitle}</p>
          </div>
          <CaseStudySummaryCard summary={decreeCaseStudy.summary} />
          <figure className="decree-hero-image">
            <img src="/images/portfolio/decree/decree-thumb.png" alt="Decree approval platform interface" />
            <figcaption>SURFACE / PRODUCT UI</figcaption>
          </figure>
        </header>

        <section className="decree-stake shell" aria-labelledby="stake-title">
          <p className="eyebrow">01 / THE STAKE</p>
          <h2 id="stake-title">{decreeCaseStudy.stake}</h2>
        </section>

        <CaseStudyArchitecture steps={decreeCaseStudy.architectureSteps} />

        <section className="decree-decisions shell" aria-labelledby="decisions-title">
          <header>
            <p className="eyebrow">03 / KEY DECISIONS</p>
            <h2 id="decisions-title">The architecture is<br /><em>a set of trade-offs.</em></h2>
          </header>
          <div className="decision-grid">
            {decreeCaseStudy.decisions.map((decision) => (
              <CaseStudyDecisionCard decision={decision} key={decision.number} />
            ))}
          </div>
        </section>

        <section className="decree-interface" aria-labelledby="interface-title">
          <div className="shell decree-section-heading">
            <p className="eyebrow">04 / THE INTERFACE</p>
            <h2 id="interface-title">Complex decisions.<br /><em>Calm surface.</em></h2>
            <p>Drag or scroll horizontally to inspect the product surfaces.</p>
          </div>
          <div className="decree-gallery" role="region" aria-label="Decree interface gallery" tabIndex="0">
            {decreeCaseStudy.gallery.map((image, index) => (
              <figure key={image.src}>
                <img src={image.src} alt={image.alt} />
                <figcaption>{String(index + 1).padStart(2, '0')} / {String(decreeCaseStudy.gallery.length).padStart(2, '0')} — {image.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="decree-retrospective shell" aria-labelledby="result-title">
          <div>
            <p className="eyebrow">05 / RESULT</p>
            <h2 id="result-title">A single control point between intent and execution.</h2>
            <p>Decree gives agents and workflows one place to request a decision, involve a human when policy requires it, and retain the path from request to delivery.</p>
          </div>
          <div>
            <p className="eyebrow">WHAT I’D CHANGE</p>
            <h3>Make policy behavior observable earlier.</h3>
            <p>I’d invest sooner in policy simulation and decision explainability, so teams can test rule changes against representative actions before publishing a new version.</p>
          </div>
        </section>

        <AppLink to="/work/problem-miner-ai-demand-discovery" className="next-project next-project-problem-miner" cursor="NEXT">
          <span><small>NEXT PROJECT</small><strong>Problem Miner<br />Demand Discovery</strong></span>
          <div className="next-project-surface" aria-hidden="true">
            <i>AI RESEARCH PLATFORM</i><b>PM</b><em>→</em>
          </div>
        </AppLink>
      </article>
      <Footer />
    </>
  );
}
