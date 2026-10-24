import { AppLink } from '../components/AppLink';
import { Footer } from '../components/Footer';
import { projects } from '../data/portfolio';
import { profileLinks } from '../data/profileLinks';
import { siteConfig } from '../config/site';
import {
  corporateProjects,
  experience,
  recruiterProfile,
  skillGroups,
} from '../data/recruiterPortfolio';

function SectionLabel({ index, children }) {
  return <p className="recruiter-section-label reveal"><span>{index}</span>{children}</p>;
}

export function RecruiterPortfolioPage() {
  return (
    <>
      <header className="recruiter-hero">
        <div className="shell recruiter-hero-grid">
          <div className="recruiter-hero-copy">
            <p className="eyebrow">RECRUITER BRIEF / 01</p>
            <h1>{recruiterProfile.name}</h1>
            <p className="recruiter-role">{recruiterProfile.role}</p>
            <p className="recruiter-summary">{recruiterProfile.summary}</p>
            <div className="recruiter-actions">
              <a className="button" href={profileLinks.cv} download>DOWNLOAD CV ↓</a>
              <a className="button recruiter-button-outline" href={siteConfig.contact.mailto}>EMAIL GEORGE ↗</a>
              <span className="button recruiter-button-outline"> <AppLink to="/ask-my-cv">Ask my CV <b>→</b></AppLink></span>
             
            </div>
          </div>

          <dl className="recruiter-facts" aria-label="Location and availability">
            <div><dt>Location</dt><dd>{recruiterProfile.location}</dd></div>
            <div><dt>Timezone</dt><dd>{recruiterProfile.timezone}</dd></div>
            <div><dt>Work mode</dt><dd>{recruiterProfile.workMode}</dd></div>
            <div className="recruiter-status"><dt>Status</dt><dd>{recruiterProfile.availability}<span>{recruiterProfile.focus}</span></dd></div>
          </dl>
        </div>
      </header>

      <section className="recruiter-skills shell" aria-labelledby="skills-title">
        <SectionLabel index="02">SKILLS / HONESTLY GROUPED</SectionLabel>
        <div className="recruiter-section-heading reveal">
          <h2 id="skills-title">The stack,<br /><em>with context.</em></h2>
          <p>Depth matters more than logo count. These groups separate recent production tools from broader project experience and active exploration.</p>
        </div>
        <div className="skill-levels">
          {skillGroups.map((group, index) => (
            <article className="skill-level reveal" key={group.level}>
              <header><span>0{index + 1}</span><h3>{group.level}</h3></header>
              <p>{group.note}</p>
              <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="recruiter-experience" aria-labelledby="experience-title">
        <div className="shell">
          <SectionLabel index="03">EXPERIENCE / 7+ YEARS</SectionLabel>
          <div className="recruiter-section-heading reveal">
            <h2 id="experience-title">Built in<br /><em>production.</em></h2>
            <p>From telecom operations to high-traffic platforms, messaging infrastructure, and independent backend systems.</p>
          </div>
          <ol className="experience-list">
            {experience.map((entry, index) => (
              <li className="experience-entry reveal" key={`${entry.company}-${entry.period}`}>
                <span className="experience-number">0{experience.length - index}</span>
                <div className="experience-identity">
                  <p>{entry.period}</p><h3>{entry.company}</h3><strong>{entry.role}</strong>
                </div>
                <div className="experience-details">
                  <p>{entry.summary}</p>
                  <ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="recruiter-projects shell" aria-labelledby="projects-title">
        <SectionLabel index="04">PROJECTS / CORPORATE + INDEPENDENT</SectionLabel>
        <div className="recruiter-section-heading reveal">
          <h2 id="projects-title">What I’ve<br /><em>worked on.</em></h2>
          <p>Corporate systems are described at a safe level. Independent products link to public case studies where available.</p>
        </div>

        <div className="corporate-projects">
          {corporateProjects.map((project) => (
            <article className="corporate-project reveal" key={project.id}>
              <p>{project.context}</p><h3>{project.title}</h3><p>{project.description}</p>
              <ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
            </article>
          ))}
        </div>

        <div className="recruiter-project-list">
          {projects.map((project, index) => (
            <article className="recruiter-project reveal" key={project.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><p>{project.type} · {project.year}</p><h3>{project.title}</h3><p>{project.description}</p></div>
              <ul>{project.technologies.slice(0, 5).map((technology) => <li key={technology}>{technology}</li>)}</ul>
              <div className="recruiter-project-links">
                {project.caseStudyPath && <AppLink to={project.caseStudyPath}>CASE STUDY ↗</AppLink>}
                {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noreferrer">LIVE ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="recruiter-links" aria-labelledby="links-title">
        <div className="shell">
          <SectionLabel index="05">NEXT STEP</SectionLabel>
          <h2 className="reveal" id="links-title">Everything you need<br /><em>to keep looking.</em></h2>
          <nav className="recruiter-link-grid reveal" aria-label="Professional links">
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer"><span>01</span>GitHub <b>↗</b></a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer"><span>02</span>LinkedIn <b>↗</b></a>
            <a href={siteConfig.contact.mailto}><span>03</span>Email <b>↗</b></a>
            <a href={profileLinks.cv} download><span>04</span>CV <b>↓</b></a>
            <AppLink to="/ask-my-cv"><span>05</span>Ask my CV <b>→</b></AppLink>
          </nav>
        </div>
      </section>

      <Footer />
    </>
  );
}
