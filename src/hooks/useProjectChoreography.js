import { useCallback, useEffect, useRef, useState } from 'react';

export function useProjectChoreography(projectCount) {
  const sectionRef = useRef(null);
  const [timeline, setTimeline] = useState({ activeIndex: 0, progress: 0 });

  useEffect(() => {
    if (!projectCount) return undefined;

    let animationFrame = 0;

    const updateTimeline = () => {
      animationFrame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const bounds = section.getBoundingClientRect();
      const elapsedViewports = Math.max(0, -bounds.top / window.innerHeight);
      const absoluteProgress = Math.min(projectCount - 0.001, elapsedViewports);
      const activeIndex = Math.floor(absoluteProgress);
      const progress = absoluteProgress - activeIndex;

      setTimeline((current) => {
        const progressChanged = Math.abs(current.progress - progress) > 0.002;
        if (current.activeIndex === activeIndex && !progressChanged) return current;
        return { activeIndex, progress };
      });
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateTimeline);
    };

    updateTimeline();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [projectCount]);

  const scrollToProject = useCallback((projectIndex) => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo({
      top: sectionTop + projectIndex * window.innerHeight + 2,
      behavior: 'smooth',
    });
  }, []);

  return { sectionRef, scrollToProject, ...timeline };
}
