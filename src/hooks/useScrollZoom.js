import { useEffect } from 'react';

const clamp = (value) => Math.max(0, Math.min(1, value));

export function useScrollZoom(dependency) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const stage = document.querySelector('.hero-stage');
    const hero = document.querySelector('.hero');
    const network = document.querySelector('.network');
    const copy = document.querySelector('.hero-copy');
    const zoomMark = document.querySelector('.hero-zoom-mark');
    const transitionShape = document.querySelector('.hero-transition-shape');
    const heroInterface = [...document.querySelectorAll(
      '.hero-meta, .hero-bottom, .local-time',
    )];
    const zoomSections = [...document.querySelectorAll('.zoom-section')];
    let animationFrame = 0;

    const updateHero = () => {
      if (!stage || !hero) return;

      const stageBounds = stage.getBoundingClientRect();
      const scrollDistance = Math.max(1, stage.offsetHeight - window.innerHeight);
      const progress = clamp(-stageBounds.top / scrollDistance);
      const acceleratedProgress = progress ** 2.4;
      const shapeProgress = clamp((progress - 0.38) / 0.62);
      const interfaceOpacity = 1 - clamp(progress * 1.8);

      hero.style.setProperty('--hero-progress', progress);
      hero.style.transform = `scale(${1 + progress * 0.03})`;
      hero.style.borderRadius = `${progress * 20}px`;
      hero.style.opacity = '1';

      heroInterface.forEach((element) => {
        element.style.opacity = interfaceOpacity;
      });

      if (zoomMark) {
        const markScale = 1 + acceleratedProgress * 26;
        const markExit = clamp((progress - 0.76) / 0.18);
        zoomMark.style.opacity = clamp(0.18 + progress * 1.65) * (1 - markExit);
        zoomMark.style.transform = `translate(-50%, -50%) rotate(${progress * 14}deg) scale(${markScale})`;
      }

      if (transitionShape) {
        const isMobile = window.innerWidth <= 800;
        const originX = isMobile ? 76 : 63;
        const originY = isMobile ? 43 : 52;
        const targetPoints = [
          [0, 0], [100, 0], [100, 73], [95, 75], [90, 75], [84, 74],
          [78, 70], [71, 64], [64, 58], [57, 53], [50, 51], [43, 52],
          [36, 56], [29, 62], [22, 68], [15, 73], [8, 76], [0, 73],
        ];
        const points = targetPoints.map(([targetX, targetY]) => {
          const x = originX + (targetX - originX) * shapeProgress;
          const y = originY + (targetY - originY) * shapeProgress;
          return `${x}% ${y}%`;
        });

        transitionShape.style.clipPath = `polygon(${points.join(', ')})`;
      }

      if (network) {
        network.style.opacity = 1 - clamp(progress * 1.45);
        network.style.transform = `scale(${1 + progress * 2.5}) translate3d(${progress * -5}%, ${progress * 4}%, 0)`;
      }

      if (copy) {
        copy.style.opacity = interfaceOpacity;
        copy.style.transform = `translate3d(0, ${progress * -90}px, 0) scale(${1 - progress * 0.12})`;
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

      [hero, network, copy, zoomMark, transitionShape, ...heroInterface].filter(Boolean).forEach((element) => {
        element.removeAttribute('style');
      });
    };
  }, [dependency]);
}
