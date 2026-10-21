import { Footer } from '../components/Footer';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { projects } from '../data/portfolio';

const caseStudyPoints = [
  ['THE PROBLEM', 'Long-running work crosses APIs, permissions, data sources, and ambiguous intent.'],
  ['THE APPROACH', 'Separate reasoning from execution, persist state, constrain tools, and escalate deliberately.'],
  ['THE PROOF', 'Replace this with your real evaluation results and operational impact.'],
];

export function WorkPage() {
  return (
    <>
      <PageHero kicker="01 / SELECTED WORK" title={<>Systems with<br /><em>something at stake.</em></>}>
        <p>I care about the work behind the screenshot: constraints, contracts, failure modes, and decisions that keep software useful.</p>
      </PageHero>

      <section className="work-list shell">
        {projects.map((project) => (
          <article className="work-row reveal" key={project.id} data-cursor="OPEN">
            <span>{project.id}</span>
            <div><small>{project.type}</small><h2>{project.title}</h2></div>
            <p>{project.description}</p><b>↘</b>
          </article>
        ))}
      </section>

      <section className="case dark-section">
        <div className="shell">
          <SectionHeading kicker="DEEP DIVE / AGENTIC SYSTEM" title={<>A reliable agent is a system,<br /><em>not a prompt.</em></>} />
          <div className="case-grid reveal">
            <p className="lead">Durable execution that can interpret requests, retrieve context, select tools, and recover when real services fail.</p>
            {caseStudyPoints.map(([title, description]) => <div key={title}><span>{title}</span><p>{description}</p></div>)}
          </div>
          <div className="flow reveal"><span>INTENT</span><i>→</i><span>PLANNER</span><i>→</i><span>TOOL GATEWAY</span><i>→</i><span>BUSINESS SYSTEMS</span></div>
        </div>
      </section>
      <Footer />
    </>
  );
}
