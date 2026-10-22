import { AppLink } from './AppLink';
import { useProjects } from '../hooks/useProjects';

function ProjectNumber({ index }) {
  return <span className="featured-project-number">{String(index + 1).padStart(2, '0')}</span>;
}

function FeaturedProject({ project, index }) {
  return (
    <article className={`featured-project featured-${project.tone}`} data-cursor="CASE">
      <div className="featured-project-meta">
        <ProjectNumber index={index} />
        <span>{project.type}</span>
        <span>{project.year}</span>
      </div>

      <div className="featured-project-visual">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={`${project.title} project preview`} />
        ) : (
          <div className="featured-generated-visual" aria-hidden="true">
            <div className="featured-orbit orbit-large" />
            <div className="featured-orbit orbit-small" />
            <strong>{project.type === 'CUSTOM MCP' ? 'MCP' : project.title.split(' ')[0]}</strong>
          </div>
        )}
        <span className="featured-signal">SYSTEM / ONLINE</span>
      </div>

      <div className="featured-project-copy">
        <p>{project.role}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul>
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        {project.projectUrl && (
          <a href={project.projectUrl} target="_blank" rel="noreferrer">
            VISIT PROJECT ↗
          </a>
        )}
      </div>
    </article>
  );
}

export function FeaturedWork() {
  const projects = useProjects({ featuredOnly: true });

  return (
    <section className="featured-work zoom-section" id="featured-work">
      <div className="shell">
        <header className="featured-work-heading reveal">
          <div><span className="eyebrow">02 / FEATURED WORK</span><i /></div>
          <h2>Selected systems.<br /><em>Built with intent.</em></h2>
          <p>A closer look at the architecture, tooling, and product decisions behind the work.</p>
        </header>

        <div className="featured-projects">
          {projects.map((project, index) => (
            <FeaturedProject key={project.id} project={project} index={index} />
          ))}
        </div>

        <AppLink to="/work" className="featured-work-link" cursor="OPEN">
          <span>VIEW ALL CASE STUDIES</span><b>↗</b>
        </AppLink>
      </div>
    </section>
  );
}
