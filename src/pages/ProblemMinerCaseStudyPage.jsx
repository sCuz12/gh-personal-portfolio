import { AppLink } from '../components/AppLink';
import { CaseStudyArchitecture } from '../components/CaseStudyArchitecture';
import { CaseStudyDecisionCard, CaseStudySummaryCard } from '../components/CaseStudyCards';
import { Footer } from '../components/Footer';
import { problemMinerCaseStudy } from '../data/problemMinerCaseStudy';

export function ProblemMinerCaseStudyPage() {
  const caseStudy = problemMinerCaseStudy;

  return (
    <>
      <article className="decree-case-study problem-miner-case-study">
        <header className="decree-case-hero shell">
          <div className="decree-case-heading problem-miner-heading">
            <p className="eyebrow">CASE STUDY 02 / AI RESEARCH PLATFORM</p>
            <h1>Problem<br /><em>Miner</em></h1>
            <p>{caseStudy.subtitle}</p>
          </div>
          <CaseStudySummaryCard summary={caseStudy.summary} />
          <figure className="decree-hero-image problem-miner-hero-image">
            <img src="/images/portfolio/problem-miner/problem-miner-thumb.png" alt="Problem Miner demand discovery interface" />
            <figcaption>SURFACE / OPPORTUNITY EXPLORER</figcaption>
          </figure>
        </header>

        <section className="decree-stake shell" aria-labelledby="problem-miner-stake-title">
          <p className="eyebrow">01 / THE STAKE</p>
          <h2 id="problem-miner-stake-title">{caseStudy.stake}</h2>
        </section>

        <CaseStudyArchitecture
          steps={caseStudy.architectureSteps}
          eyebrow="02 / RESEARCH PIPELINE"
          title={<>Raw conversations.<br /><em>Ranked opportunities.</em></>}
          ariaLabel="Problem Miner research pipeline"
        />

        <section className="decree-decisions shell" aria-labelledby="problem-miner-decisions-title">
          <header>
            <p className="eyebrow">03 / KEY DECISIONS</p>
            <h2 id="problem-miner-decisions-title">AI finds patterns.<br /><em>Evidence earns trust.</em></h2>
          </header>
          <div className="decision-grid">
            {caseStudy.decisions.map((decision) => (
              <CaseStudyDecisionCard decision={decision} key={decision.number} />
            ))}
          </div>
        </section>

        <section className="decree-interface problem-miner-interface" aria-labelledby="problem-miner-interface-title">
          <div className="shell decree-section-heading">
            <p className="eyebrow">04 / THE EXPLORER</p>
            <h2 id="problem-miner-interface-title">From a feed of noise<br /><em>to research direction.</em></h2>
            <p>The interface keeps the ranking useful by showing the dimensions behind each opportunity.</p>
          </div>

          <div className="shell problem-miner-explorer">
            <figure>
              <img src="/images/portfolio/problem-miner/problem-miner-thumb.png" alt="Problem Miner ranked opportunity interface" />
              <figcaption>DISCOVER / COMPARE / FOLLOW THE EVIDENCE</figcaption>
            </figure>
            <div className="problem-miner-signals">
              {caseStudy.insightDimensions.map((dimension, index) => (
                <article key={dimension.label}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><strong>{dimension.label}</strong><p>{dimension.detail}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="decree-retrospective shell" aria-labelledby="problem-miner-result-title">
          <div>
            <p className="eyebrow">05 / RESULT</p>
            <h2 id="problem-miner-result-title">Problem discovery became a repeatable research workflow.</h2>
            <p>Problem Miner collects scattered conversations, identifies repeated pain, and organizes the evidence into opportunities that founders can investigate further.</p>
          </div>
          <div>
            <p className="eyebrow">WHAT I’D CHANGE</p>
            <h3>Make ranking quality continuously measurable.</h3>
            <p>I’d introduce a review loop for marking useful, duplicated, or weak opportunities, then use that feedback to evaluate extraction and ranking changes over time.</p>
          </div>
        </section>

        <AppLink to="/work/shopify-stock-synchronization-app" className="next-project next-project-stock-sync" cursor="NEXT">
          <span><small>NEXT PROJECT</small><strong>Shopify Stock<br />Synchronization</strong></span>
          <div className="next-project-surface" aria-hidden="true">
            <i>BACKEND AUTOMATION</i><b>SS</b><em>→</em>
          </div>
        </AppLink>
      </article>
      <Footer />
    </>
  );
}
