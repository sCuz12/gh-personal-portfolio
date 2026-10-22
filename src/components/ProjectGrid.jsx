import { useProjects } from '../hooks/useProjects';
import { SectionHeading } from './SectionHeading';
import { TiltCard } from './TiltCard';

function getProjectMark(type) {
  if (type === 'CUSTOM MCP') return 'MCP';
  if (type === 'BACKEND PLATFORM') return 'API';
  return '{ }';
}

export function ProjectGrid() {
  const projects = useProjects();

  return (
    <section className="work shell">
      <SectionHeading
        kicker="01 / SELECTED SYSTEMS"
        title={<>Work that <em>works.</em></>}
        description="Complex engineering, translated into products people can actually use."
      />

      <div className="project-grid">
        {projects.map((project) => (
          <TiltCard key={project.id} to="/work" className={`project ${project.tone}`}>
            <div className="project-top"><span>{project.type}</span><span>{project.id}</span></div>
            <div className="project-art"><strong>{getProjectMark(project.type)}</strong><i /><i /><i /></div>
            <div className="project-copy">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <small>SYSTEM DESIGN · ENGINEERING · DELIVERY</small>
            </div>
          </TiltCard>
        ))}
      </div>

      <p className="note">CONCEPTUAL CASE-STUDY SLOTS — READY FOR YOUR REAL WORK.</p>
    </section>
  );
}
