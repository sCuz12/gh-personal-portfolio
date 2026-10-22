import { AppLink } from '../components/AppLink';

import { CaseStudyArchitecture } from '../components/CaseStudyArchitecture';
import { CaseStudyDecisionCard, CaseStudySummaryCard } from '../components/CaseStudyCards';
import { Footer } from '../components/Footer';
import { shopifyStockSyncCaseStudy } from '../data/shopifyStockSyncCaseStudy';

function StockSyncSurface() {
  return (
    <div className="stock-sync-surface" aria-label="Stock synchronization system overview">
      <header><span>STOCK-SYNC / GO CLI</span><i>PRODUCTION</i></header>
      <div className="stock-sync-surface-flow">
        <div><small>INPUT</small><strong>POWERSOFT<br />ESOFT</strong></div>
        <span>→</span>
        <div className="sync-engine"><small>ENGINE</small><strong>NORMALIZE<br />+ DIFF</strong></div>
        <span>→</span>
        <div><small>OUTPUT</small><strong>SHOPIFY<br />INVENTORY</strong></div>
      </div>
      <footer><span>DAILY AUTOMATION</span><span>DETERMINISTIC UPDATES</span><span>RUN REPORT</span></footer>
    </div>
  );
}

export function ShopifyStockSyncCaseStudyPage() {
  const caseStudy = shopifyStockSyncCaseStudy;

  return (
    <>
      <article className="decree-case-study stock-sync-case-study">
        <header className="decree-case-hero shell">
          <div className="decree-case-heading stock-sync-heading">
            <p className="eyebrow">CASE STUDY 03 / BACKEND AUTOMATION</p>
            <h1>Stock<br /><em>Sync</em></h1>
            <p>{caseStudy.subtitle}</p>
          </div>
          <CaseStudySummaryCard summary={caseStudy.summary} />
          <figure className="decree-hero-image stock-sync-hero-surface">
            <StockSyncSurface />
            <figcaption>SURFACE / SYSTEM OVERVIEW</figcaption>
          </figure>
        </header>

        <section className="decree-stake shell" aria-labelledby="stock-sync-stake-title">
          <p className="eyebrow">01 / THE STAKE</p>
          <h2 id="stock-sync-stake-title">{caseStudy.stake}</h2>
        </section>

        <CaseStudyArchitecture
          steps={caseStudy.architectureSteps}
          eyebrow="02 / SYNC LIFECYCLE"
          title={<>One run.<br /><em>Four controlled stages.</em></>}
          ariaLabel="Stock synchronization lifecycle"
        />

        <section className="decree-decisions shell" aria-labelledby="stock-sync-decisions-title">
          <header>
            <p className="eyebrow">03 / KEY DECISIONS</p>
            <h2 id="stock-sync-decisions-title">Automation should be<br /><em>boringly predictable.</em></h2>
          </header>
          <div className="decision-grid">
            {caseStudy.decisions.map((decision) => (
              <CaseStudyDecisionCard decision={decision} key={decision.number} />
            ))}
          </div>
        </section>


        <section className="decree-retrospective shell" aria-labelledby="stock-sync-result-title">
          <div>
            <p className="eyebrow">05 / RESULT</p>
            <h2 id="stock-sync-result-title">Inventory updates became one repeatable operation.</h2>
            <p>The tool turns different stock-control exports into a consistent synchronization flow, reducing manual updates and making each run easier to inspect.</p>
          </div>
          <div>
            <p className="eyebrow">WHAT I’D CHANGE</p>
            <h3>Turn adapters into explicit contracts.</h3>
            <p>I’d formalize source adapters behind a versioned interface with fixtures and conformance tests, making additional stock systems safer to introduce.</p>
          </div>
        </section>

        <AppLink to="/work/symvaseis-cy-public-procurement-explorer" className="next-project next-project-symvaseis" cursor="NEXT">
          <span><small>NEXT PROJECT</small><strong>Symvaseis.cy<br />Procurement Explorer</strong></span>
          <div className="next-project-surface" aria-hidden="true">
            <i>DATA PLATFORM</i><b>Σ</b><em>→</em>
          </div>
        </AppLink>
      </article>
      <Footer />
    </>
  );
}
