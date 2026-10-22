'use client';

import { useActiveArchitectureStep } from '../hooks/useActiveArchitectureStep';

export function CaseStudyArchitecture({
  steps,
  eyebrow = '02 / REQUEST LIFECYCLE',
  title = <>One decision.<br /><em>Four accountable steps.</em></>,
  ariaLabel = 'Decree request lifecycle',
}) {
  const { sectionRef, activeStep } = useActiveArchitectureStep(steps.length);

  return (
    <section className="decree-architecture" ref={sectionRef} aria-labelledby="architecture-title">
      <div className="shell decree-architecture-layout">
        <div className="architecture-sticky">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="architecture-title">{title}</h2>

          <ol className="architecture-diagram" aria-label={ariaLabel}>
            {steps.map((step, index) => (
              <li key={step.id} className={index <= activeStep ? 'active' : ''} aria-current={index === activeStep ? 'step' : undefined}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step.label}</strong>
              </li>
            ))}
          </ol>
        </div>

        <div className="architecture-captions">
          {steps.map((step, index) => (
            <article key={step.id} className={index === activeStep ? 'active' : ''}>
              <span>{String(index + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span>
              <p>{step.caption}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
