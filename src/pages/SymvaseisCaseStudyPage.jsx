import { AppLink } from '../components/AppLink';
import { CaseStudyArchitecture } from '../components/CaseStudyArchitecture';
import { CaseStudyDecisionCard, CaseStudySummaryCard } from '../components/CaseStudyCards';
import { Footer } from '../components/Footer';
import { symvaseisCaseStudy } from '../data/symvaseisCaseStudy';

export function SymvaseisCaseStudyPage() {
  const caseStudy = symvaseisCaseStudy;

  return (
    <>
      <article className="decree-case-study symvaseis-case-study">
        <header className="decree-case-hero shell">
          <div className="decree-case-heading symvaseis-heading">
            <p className="eyebrow">CASE STUDY 03 / DATA PLATFORM</p>
            <h1>Symvaseis<span>.cy</span></h1>
            <p>{caseStudy.subtitle}</p>
          </div>
          <CaseStudySummaryCard summary={caseStudy.summary} />
          <figure className="decree-hero-image symvaseis-hero-image">
            <img src="/images/portfolio/symvaseis/symvaseis-thumb.png" alt="Symvaseis.cy public procurement explorer" />
            <figcaption>SURFACE / PUBLIC DATA EXPLORER</figcaption>
          </figure>
        </header>

        <section className="decree-stake shell" aria-labelledby="symvaseis-stake-title">
          <p className="eyebrow">01 / THE STAKE</p>
          <h2 id="symvaseis-stake-title">{caseStudy.stake}</h2>
        </section>

        <CaseStudyArchitecture
          steps={caseStudy.architectureSteps}
          eyebrow="02 / DATA LIFECYCLE"
          title={<>Many records.<br /><em>One explorable model.</em></>}
          ariaLabel="Symvaseis public procurement data lifecycle"
        />

        <section className="decree-decisions shell" aria-labelledby="symvaseis-decisions-title">
          <header>
            <p className="eyebrow">03 / KEY DECISIONS</p>
            <h2 id="symvaseis-decisions-title">Trust begins with<br /><em>traceable data.</em></h2>
          </header>
          <div className="decision-grid">
            {caseStudy.decisions.map((decision) => (
              <CaseStudyDecisionCard decision={decision} key={decision.number} />
            ))}
          </div>
        </section>

        <section className="decree-interface symvaseis-interface" aria-labelledby="symvaseis-interface-title">
          <div className="shell decree-section-heading">
            <p className="eyebrow">04 / THE EXPLORER</p>
            <h2 id="symvaseis-interface-title">Documents become<br /><em>questions people can ask.</em></h2>
            <p>The interface organizes procurement activity around the entities and values people need to investigate.</p>
          </div>

          <div className="shell symvaseis-explorer-grid">
            <figure>
              <img src="/images/portfolio/symvaseis/symvaseis-thumb.png" alt="Symvaseis.cy search and exploration interface" />
              <figcaption>SEARCH / FILTER / FOLLOW THE RECORD</figcaption>
            </figure>
            <div className="symvaseis-dimensions">
              {caseStudy.dimensions.map((dimension, index) => (
                <article key={dimension.label}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{dimension.label}</strong>
                  <p>{dimension.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="decree-retrospective shell" aria-labelledby="symvaseis-result-title">
          <div>
            <p className="eyebrow">05 / RESULT</p>
            <h2 id="symvaseis-result-title">Procurement activity became easier to search and connect.</h2>
            <p>Symvaseis.cy brings tenders and awarded contracts into a common exploration layer, giving people clearer paths through authorities, companies, award values, and historical activity.</p>
          </div>
          <div>
            <p className="eyebrow">WHAT I’D CHANGE</p>
            <h3>Expose data quality as part of the product.</h3>
            <p>I’d make source freshness, normalization confidence, and incomplete fields more visible, helping visitors understand not only the record but the quality of the evidence behind it.</p>
          </div>
        </section>

        <AppLink to="/work/decree" className="next-project next-project-decree" cursor="NEXT">
          <span><small>NEXT PROJECT / BACK TO 01</small><strong>Decree<br />Human Approval</strong></span>
          <div className="next-project-surface" aria-hidden="true">
            <i>AI GOVERNANCE</i><b>DH</b><em>→</em>
          </div>
        </AppLink>
      </article>
      <Footer />
    </>
  );
}
