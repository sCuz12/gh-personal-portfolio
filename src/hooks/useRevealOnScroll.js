import { useEffect } from 'react';

export function useRevealOnScroll(dependency) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('shown');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    window.scrollTo(0, 0);

    return () => observer.disconnect();
  }, [dependency]);
}
