import { Footer } from '../components/Footer';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { services } from '../data/portfolio';

export function ServicesPage() {
  return (
    <>
      <PageHero kicker="02 / SERVICES" title={<>Bring the hard part.<br /><em>I’ll build the path.</em></>}>
        <p>For companies that need more than a prototype: technical clarity, production-minded engineering, and one partner across the system.</p>
        <a className="button" href="mailto:hello@example.com">START A CONVERSATION ↗</a>
      </PageHero>
      <section className="services shell">
        {services.map(([id, title, description]) => (
          <article className="service reveal" key={id} data-cursor="EXPLORE">
            <span>{id}</span><div><small>CAPABILITY</small><h2>{title}</h2><p>{description}</p></div><b>↗</b>
          </article>
        ))}
      </section>
      <section className="process">
        <div className="shell">
          <SectionHeading kicker="HOW AN ENGAGEMENT WORKS" title={<>Small steps.<br /><em>Visible progress.</em></>} />
          <div className="steps">{['Frame', 'Design', 'Build', 'Harden'].map((step, index) => <div className="reveal" key={step}><span>0{index + 1}</span><h3>{step}</h3></div>)}</div>
        </div>
      </section>
      <Footer />
    </>
  );
}
