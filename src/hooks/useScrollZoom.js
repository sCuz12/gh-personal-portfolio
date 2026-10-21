import { useEffect } from 'react';

const clamp = (value) => Math.max(0, Math.min(1, value));

export function useScrollZoom(dependency) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const stage = document.querySelector('.hero-stage');
    const hero = document.querySelector('.hero');
    const network = document.querySelector('.network');
    const copy = document.querySelector('.hero-copy');
    const zoomSections = [...document.querySelectorAll('.zoom-section')];
    let animationFrame = 0;

    const updateHero = () => {
      if (!stage || !hero) return;

      const stageBounds = stage.getBoundingClientRect();
      const scrollDistance = Math.max(1, stage.offsetHeight - window.innerHeight);
      const progress = clamp(-stageBounds.top / scrollDistance);

      hero.style.setProperty('--hero-progress', progress);
      hero.style.transform = `scale(${1 + progress * 0.08})`;
      hero.style.borderRadius = `${progress * 34}px`;
      hero.style.opacity = 1 - progress * 0.5;

      if (network) {
        network.style.transform = `scale(${1 + progress * 0.75}) translate3d(${progress * -5}%, ${progress * 4}%, 0)`;
      }

      if (copy) {
        copy.style.transform = `translate3d(0, ${progress * -70}px, 0) scale(${1 - progress * 0.08})`;
      }
    };

    const updateSections = () => {
      zoomSections.forEach((section) => {
        const bounds = section.getBoundingClientRect();
        const distanceFromFocus = Math.abs(bounds.top - window.innerHeight * 0.55);
        const progress = clamp(1 - distanceFromFocus / (window.innerHeight * 0.8));

        section.style.transform = `scale(${0.9 + progress * 0.1}) translateY(${(1 - progress) * 60}px)`;
        section.style.opacity = 0.35 + progress * 0.65;
      });
    };

    const update = () => {
      animationFrame = 0;
      updateHero();
      updateSections();
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [dependency]);
}
