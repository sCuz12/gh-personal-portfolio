import { useEffect } from 'react';

export function useCustomCursor(dependency) {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return undefined;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let animationFrame;

    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      document.documentElement.style.setProperty('--mx', `${targetX}px`);
      document.documentElement.style.setProperty('--my', `${targetY}px`);
    };

    const animateRing = () => {
      ringX += (targetX - ringX) * 0.13;
      ringY += (targetY - ringY) * 0.13;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      animationFrame = window.requestAnimationFrame(animateRing);
    };

    const showHoverState = (event) => {
      ring.classList.add('hot');
      ring.textContent = event.currentTarget.dataset.cursor ?? '';
    };

    const hideHoverState = () => {
      ring.classList.remove('hot');
      ring.textContent = '';
    };

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');
    interactiveElements.forEach((element) => {
      element.addEventListener('pointerenter', showHoverState);
      element.addEventListener('pointerleave', hideHoverState);
    });

    window.addEventListener('pointermove', handlePointerMove);
    animateRing();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.cancelAnimationFrame(animationFrame);
      interactiveElements.forEach((element) => {
        element.removeEventListener('pointerenter', showHoverState);
        element.removeEventListener('pointerleave', hideHoverState);
      });
    };
  }, [dependency]);
}
