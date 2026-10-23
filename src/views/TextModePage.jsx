import Link from 'next/link';
import { siteConfig } from '../config/site';
import { profileLinks } from '../data/profileLinks';
import { projects, services, technicalTerritory } from '../data/portfolio';

function TextSection({ id, index, title, children }) {
  return (
    <section className="text-mode-section" id={id} aria-labelledby={`${id}-title`}>
      <header>
        <span>[{index}]</span>
        <h2 id={`${id}-title`}>{title}</h2>
      </header>
      {children}
    </section>
  );
}

export function TextModePage({ articles = [] }) {
  return (
    <article className="text-mode-page" id="top">
      <a className="text-mode-skip" href="#text-mode-content">Skip to content</a>

      <header className="text-mode-header">
        <p>GEORGE.HADJISAVVA / PORTFOLIO / TEXT_MODE</p>
        <pre aria-hidden="true">{`>_ SYSTEM READY
>_ CYPRUS / WORKING GLOBALLY
>_ JAVASCRIPT: NOT REQUIRED`}</pre>
        <h1>George Hadjisavva</h1>
        <p className="text-mode-role">Software engineer and systems builder.</p>
        <p>I build backend infrastructure, agentic workflows, custom MCP servers, and interfaces as one coherent product.</p>
        <nav aria-label="Text mode sections">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#brain">Brain</a>
          <a href="#contact">Contact</a>
        </nav>
        <Link className="text-mode-return" href="/">[ EXIT TEXT MODE ]</Link>
      </header>

      <div id="text-mode-content">
        <TextSection id="work" index="01" title="Selected work">
          <ol className="text-mode-list">
            {projects.map((project) => (
              <li key={project.id}>
                <p>{project.type} / {project.year} / {project.role}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p>STACK: {project.technologies.join(' · ')}</p>
                <div className="text-mode-links">
                  {project.caseStudyPath && <Link href={project.caseStudyPath}>[ READ CASE STUDY ]</Link>}
                  {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noreferrer">[ VISIT PROJECT ]</a>}
                </div>
              </li>
            ))}
          </ol>
          <Link href="/work">[ OPEN VISUAL WORK INDEX ]</Link>
        </TextSection>

        <TextSection id="services" index="02" title="Services">
          <p>For companies that need technical clarity, production-minded engineering, and one partner across the system.</p>
          <ol className="text-mode-compact-list">
            {services.map(([index, title, description]) => (
              <li key={index}><strong>{index} / {title}</strong><span>{description}</span></li>
            ))}
          </ol>
          <Link href="/services">[ EXPLORE SERVICES ]</Link>
        </TextSection>

        <TextSection id="about" index="03" title="About">
          <p>I’m George, a software engineer based in Cyprus, working across backend architecture, AI systems, developer tooling, and product interfaces.</p>
          <p>I like problems that cross boundaries: backend and frontend, models and deterministic code, product requirements and infrastructure constraints.</p>
          <dl className="text-mode-territory">
            {technicalTerritory.map(([category, technologies]) => (
              <div key={category}><dt>{category}</dt><dd>{technologies}</dd></div>
            ))}
          </dl>
          <div className="text-mode-links">
            <a href={profileLinks.cv} download>[ DOWNLOAD CV ]</a>
            <Link href="/ask-my-cv">[ ASK MY CV ]</Link>
          </div>
        </TextSection>

        <TextSection id="brain" index="04" title="Brain">
          <p>Notes on backend systems, AI agents, architecture, and building software in public.</p>
          {articles.length > 0 && (
            <ul className="text-mode-article-list">
              {articles.map((article) => (
                <li key={article._id}>
                  <Link href={`/brain/${article.slug}`}>{article.title}</Link>
                  <span>{article.type} / {article.readingTime} min</span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/brain">[ OPEN BRAIN INDEX ]</Link>
        </TextSection>

        <TextSection id="contact" index="05" title="Contact">
          <p>Have a hard problem? Let’s build what’s next.</p>
          <address>
            <a href={siteConfig.contact.mailto}>{siteConfig.contact.email}</a>
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer">GitHub</a>
          </address>
        </TextSection>
      </div>

      <footer className="text-mode-footer">
        <span>EOF</span>
        <a href="#top">[ BACK TO TOP ]</a>
      </footer>
    </article>
  );
}
