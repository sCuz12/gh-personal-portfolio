import { useEffect, useState } from 'react';
import { AppLink } from './AppLink';
import { useProjects } from '../hooks/useProjects';
import { useProjectChoreography } from '../hooks/useProjectChoreography';

const clamp = (value) => Math.max(0, Math.min(1, value));

function SurfaceView({ project }) {
  return (
    <div className="choreography-surface">
      <div className="surface-placeholder" aria-label={`${project.title} conceptual interface`}>
        <header><span>{project.type}</span><i /><i /><i /></header>
        <div className="surface-dashboard">
          <aside><b>{project.title.slice(0, 2).toUpperCase()}</b><i /><i /><i /></aside>
          <div className="surface-main"><span>SYSTEM OVERVIEW</span><strong>{project.title}</strong><div><i /><i /><i /></div></div>
        </div>
      </div>
      <span className="view-label">SURFACE / PRODUCT UI</span>
    </div>
  );
}

function ProjectMediaView({ project, mediaUrls, activeImageIndex, onImageChange }) {
  const hasMultipleImages = mediaUrls.length > 1;

  return (
    <div className="choreography-media">
      <span className="view-label">SCREENS / PROJECT MEDIA</span>
      <img
        src={mediaUrls[activeImageIndex]}
        alt={`${project.title} screen ${activeImageIndex + 1} of ${mediaUrls.length}`}
      />
      {hasMultipleImages && (
        <div className="media-navigation" aria-label={`${project.title} project screens`}>
          <button
            type="button"
            aria-label="Previous project screen"
            onClick={() => onImageChange((activeImageIndex - 1 + mediaUrls.length) % mediaUrls.length)}
          >
            ←
          </button>
          <span>{String(activeImageIndex + 1).padStart(2, '0')} / {String(mediaUrls.length).padStart(2, '0')}</span>
          <button
            type="button"
            aria-label="Next project screen"
            onClick={() => onImageChange((activeImageIndex + 1) % mediaUrls.length)}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

function UnderneathView({ project, diagramProgress, gateIsActive }) {
  const firstLineProgress = clamp(diagramProgress * 2);
  const secondLineProgress = clamp((diagramProgress - 0.5) * 2);
  const nodeProgress = [firstLineProgress, firstLineProgress, secondLineProgress];
  const architecture = project.architecture ?? [
    { label: 'INTENT', detail: 'Request enters' },
    { label: 'GATE', detail: 'System decides' },
    { label: 'ACTION', detail: 'System executes' },
  ];
  const architectureLabel = architecture.map((node) => node.label).join(' to ');

  return (
    <div className="choreography-underneath">
      <span className="view-label">UNDERNEATH / SYSTEM LOGIC</span>
      <div className="diagram-grid" aria-label={`${project.title} architecture: ${architectureLabel}`}>
        {architecture.map((node, index) => (
          <div
            className={`diagram-node ${index === 1 ? `gate-node ${gateIsActive ? 'active' : ''}` : ''}`}
            key={node.label}
            style={{ '--node-progress': nodeProgress[index] }}
          >
            <small>{String(index + 1).padStart(2, '0')}</small>
            <strong>{node.label}</strong>
            <span>{node.detail}</span>
          </div>
        ))}
        <svg viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden="true">
          <path className="diagram-line line-one" pathLength="1" d="M190 110 C300 110 320 110 430 110" style={{ '--line-progress': firstLineProgress }} />
          <path className="diagram-line line-two" pathLength="1" d="M570 110 C680 110 700 110 810 110" style={{ '--line-progress': secondLineProgress }} />
        </svg>
      </div>
    </div>
  );
}

function ViewToggle({ mode, hasMedia, onChange }) {
  return (
    <div className="view-toggle" aria-label="Project visualization">
      <button type="button" aria-pressed={mode === 'surface'} onClick={() => onChange('surface')}>
        Surface
      </button>
      <button type="button" aria-pressed={mode === 'underneath'} onClick={() => onChange('underneath')}>
        Underneath
      </button>
      {hasMedia && (
        <button type="button" aria-pressed={mode === 'media'} onClick={() => onChange('media')}>
          Screens
        </button>
      )}
    </div>
  );
}

export function ProjectChoreography({
  id,
  indexLabel = 'PROJECT INDEX',
  maxProjects,
}) {
  const allProjects = useProjects();
  const projects = typeof maxProjects === 'number'
    ? allProjects.slice(0, maxProjects)
    : allProjects;
  const { sectionRef, activeIndex, progress, scrollToProject } = useProjectChoreography(projects.length);
  const [manualMode, setManualMode] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    setManualMode(null);
    setActiveImageIndex(0);
  }, [activeIndex]);
  if (!activeProject) return null;

  const mediaUrls = [...new Set([
    activeProject.imageUrl,
    ...(activeProject.galleryUrls ?? []),
  ].filter(Boolean))];

  const enterProgress = clamp(progress / 0.2);
  const automaticPeel = clamp((progress - 0.35) / 0.3);
  const peelProgress = manualMode === 'surface' ? 0 : manualMode ? 1 : automaticPeel;
  const diagramProgress = manualMode === 'underneath' ? 1 : peelProgress;
  const gateIsActive = manualMode === 'underneath' || progress >= 0.65;
  const crossfadeProgress = clamp((progress - 0.8) / 0.2);
  const displayedNumber = Math.ceil((activeIndex + 1) * enterProgress);
  const status = activeProject.year === 'CURRENT' ? 'MVP' : 'SHIPPED';
  const caseStudyUrl = activeProject.projectUrl ?? `#${activeProject.slug}`;

  return (
    <section
      id={id}
      className="project-choreography"
      ref={sectionRef}
      style={{ height: `${(projects.length + 1) * 100}vh` }}
    >
      <div className="choreography-sticky shell">
        <aside className="choreography-index" aria-label="Project list">
          <span className="eyebrow">{indexLabel}</span>
          <ol>
            {projects.map((project, index) => (
              <li key={project.id} className={index === activeIndex ? 'active' : ''}>
                <button type="button" onClick={() => scrollToProject(index)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{project.title}</strong>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <article
          className={`choreography-project tone-${activeProject.tone}`}
          id={activeProject.slug}
          style={{
            '--enter-progress': enterProgress,
            '--peel-progress': peelProgress,
            '--crossfade-progress': crossfadeProgress,
          }}
        >
          <header className="choreography-header">
            <span className="choreography-number">{String(displayedNumber).padStart(2, '0')}</span>
            <div>
              <small>{activeProject.type} / {activeProject.year}</small>
              <h2>{activeProject.title}</h2>
            </div>
            <span className={`project-status ${gateIsActive ? 'active' : ''}`}>● {status}</span>
          </header>

          <div className="choreography-stage">
            <UnderneathView
              project={activeProject}
              diagramProgress={diagramProgress}
              gateIsActive={gateIsActive}
            />
            <div className="surface-peel"><SurfaceView project={activeProject} /></div>
            {manualMode === 'media' && (
              <ProjectMediaView
                project={activeProject}
                mediaUrls={mediaUrls}
                activeImageIndex={activeImageIndex}
                onImageChange={setActiveImageIndex}
              />
            )}
            <ViewToggle
              mode={manualMode ?? (peelProgress >= 0.5 ? 'underneath' : 'surface')}
              hasMedia={mediaUrls.length > 0}
              onChange={setManualMode}
            />
          </div>

          <footer className="choreography-footer">
            <div className="choreography-summary">
              <p>{activeProject.description}</p>
              <ul className="choreography-technologies" aria-label={`${activeProject.title} technologies`}>
                {activeProject.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
            {activeProject.caseStudyPath ? (
              <AppLink to={activeProject.caseStudyPath}>View case study <span>→</span></AppLink>
            ) : (
              <a href={caseStudyUrl} target={activeProject.projectUrl ? '_blank' : undefined} rel={activeProject.projectUrl ? 'noreferrer' : undefined}>
                View case study <span>→</span>
              </a>
            )}
          </footer>
        </article>
      </div>
    </section>
  );
}
