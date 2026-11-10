import { AppLink } from '../components/AppLink';

import { CaseStudyArchitecture } from '../components/CaseStudyArchitecture';
import { CaseStudySummaryCard } from '../components/CaseStudyCards';
import { Footer } from '../components/Footer';
import { wooferryCaseStudy } from '../data/wooferryCaseStudy';

const heroImage = 'https://cdn.shopify.com/app-store/listing_images/bc6e8e87a309ab5792fae3d2627859bf/promotional_image/CL3UtNur3JcDEAE%3D.jpeg?height=720&quality=90&width=1280';
const previewImage = 'https://cdn.shopify.com/app-store/listing_images/bc6e8e87a309ab5792fae3d2627859bf/desktop_screenshot/CJCy6Mq32pcDEAE%3D.png?height=720&width=1280';

export function WooFerryCaseStudyPage() {
  const caseStudy = wooferryCaseStudy;

  return (
    <>
      <article className="decree-case-study wooferry-case-study">
        <header className="decree-case-hero shell">
          <div className="decree-case-heading wooferry-heading">
            <p className="eyebrow">CASE STUDY 05 / COMMERCE MIGRATION</p>
            <h1>Woo<br /><em>Ferry</em></h1>
            <p>{caseStudy.subtitle}</p>
          </div>
          <CaseStudySummaryCard summary={caseStudy.summary} />
          <figure className="decree-hero-image wooferry-hero-image">
            <img src={heroImage} alt="WooFerry WooCommerce to Shopify migration app" />
            <figcaption>SURFACE / SHOPIFY EMBEDDED APP</figcaption>
          </figure>
        </header>

        <section className="decree-stake shell" aria-labelledby="wooferry-stake-title">
          <p className="eyebrow">01 / THE PROBLEM</p>
          <h2 id="wooferry-stake-title">{caseStudy.stake}</h2>
          <div className="wooferry-problem-copy">
            {caseStudy.problem.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <CaseStudyArchitecture
          steps={caseStudy.architectureSteps}
          eyebrow="02 / MIGRATION LIFECYCLE"
          title={<>Preview first.<br /><em>Move without surprises.</em></>}
          ariaLabel="WooFerry migration lifecycle"
        />

        <section className="wooferry-moments shell" aria-labelledby="wooferry-moments-title">
          <header className="decree-section-heading">
            <p className="eyebrow">03 / HARD MOMENTS</p>
            <h2 id="wooferry-moments-title">The real catalog<br /><em>changed the system.</em></h2>
            <p>The difficult work began where the clean demo ended: large catalogs, repeated delivery, unpredictable WordPress environments, and platform rules.</p>
          </header>
          <div className="wooferry-moment-list">
            {caseStudy.hardMoments.map((moment) => (
              <article key={moment.number}>
                <span>{moment.number}</span>
                <div className="wooferry-moment-story">
                  <h3>{moment.title}</h3>
                  <p>{moment.problem}</p>
                </div>
                <div className="wooferry-moment-decision">
                  <small>DECISION</small>
                  <p>{moment.decision}</p>
                  <strong>{moment.evidence}</strong>
                  <small>LEARNING</small>
                  <p>{moment.learning}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="decree-interface wooferry-trust" aria-labelledby="wooferry-trust-title">
          <div className="shell decree-section-heading">
            <p className="eyebrow">04 / MIGRATION TRUST</p>
            <h2 id="wooferry-trust-title">Visible exceptions.<br /><em>No quiet data loss.</em></h2>
            <p>WooFerry treats fidelity as a product feature. Anything that cannot be moved safely is surfaced for review instead of being silently rewritten or discarded.</p>
          </div>
          <div className="shell wooferry-trust-layout">
            <figure>
              <img src={previewImage} alt="WooFerry product preview before Shopify import" />
              <figcaption>SCAN / PREVIEW / REVIEW BEFORE WRITING</figcaption>
            </figure>
            <div className="wooferry-trust-rules">
              {caseStudy.trustRules.map((rule, index) => (
                <article key={rule.label}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><strong>{rule.label}</strong><p>{rule.detail}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="wooferry-product shell" aria-labelledby="wooferry-product-title">
          <header className="decree-section-heading">
            <p className="eyebrow">05 / PRODUCT MODEL</p>
            <h2 id="wooferry-product-title">Prove the move.<br /><em>Then charge once.</em></h2>
            <p>The commercial model follows the job: reduce uncertainty on the merchant’s own data, then charge once for a migration that happens once.</p>
          </header>
          <div className="wooferry-product-grid">
            {caseStudy.productDecisions.map((decision, index) => (
              <article key={decision.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{decision.title}</h3>
                <p>{decision.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="decree-retrospective shell" aria-labelledby="wooferry-result-title">
          <div>
            <p className="eyebrow">06 / RESULT</p>
            <h2 id="wooferry-result-title">A migration flow designed for imperfect stores and interrupted work.</h2>
            <p>WooFerry gives merchants a plugin-free path from WooCommerce to Shopify, with a bounded-cost preview, resumable background processing, idempotent writes, explicit compatibility review, and customer migration.</p>
          </div>
          <div>
            <p className="eyebrow">WHAT’S NEXT</p>
            <h3>Broaden the move without weakening trust.</h3>
            <ul className="wooferry-next-list">
              {caseStudy.nextSteps.map((step) => <li key={step}>{step}</li>)}
            </ul>
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
