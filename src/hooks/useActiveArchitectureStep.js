import { useEffect, useRef, useState } from 'react';

export function useActiveArchitectureStep(stepCount) {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || stepCount === 0) return undefined;

    let animationFrame;

    const updateActiveStep = () => {
      const bounds = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(0.999, -bounds.top / scrollableDistance));
      setActiveStep(Math.min(stepCount - 1, Math.floor(progress * stepCount)));
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveStep);
    };

    updateActiveStep();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [stepCount]);

  return { sectionRef, activeStep };
}
