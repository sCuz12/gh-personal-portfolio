import { Footer } from '../components/Footer';
import { PageHero } from '../components/PageHero';
import { technicalTerritory } from '../data/portfolio';

export function AboutPage() {
  return (
    <>
      <PageHero kicker="03 / ABOUT" title={<>Engineer across layers.<br /><em>Partner through ambiguity.</em></>}>
        <p>I’m George, a software engineer based in Cyprus, working across backend architecture, AI systems, developer tooling, and product interfaces.</p>
      </PageHero>
      <section className="profile dark-section">
        <div className="shell profile-grid">
          <div className="monogram reveal">G<i>H</i></div>
          <div className="profile-copy reveal">
            <p className="eyebrow">THE SHORT VERSION</p><h2>I like problems that cross boundaries.</h2>
            <p>Backend or frontend. Model or deterministic code. Product need or infrastructure constraint. The most interesting software rarely fits one neat box.</p>
            <a className="button light" href="#">DOWNLOAD CV ↗</a>
          </div>
        </div>
      </section>
      <section className="territory shell">
        <p className="eyebrow reveal">TECHNICAL TERRITORY</p>
        {technicalTerritory.map(([category, technologies]) => <p className="reveal" key={category}><span>{category}</span>{technologies}</p>)}
      </section>
      <Footer />
    </>
  );
}
