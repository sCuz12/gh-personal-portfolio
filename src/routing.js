import { useEffect, useState } from 'react';

export const NAVIGATE_EVENT = 'portfolio:navigate';

export function navigateTo(path) {
  window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, { detail: path }));
}

export function useClientRouter() {
  const [path, setPath] = useState(window.location.pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleNavigation = (event) => {
      setIsTransitioning(true);

      window.setTimeout(() => {
        window.history.pushState({}, '', event.detail);
        setPath(event.detail);
        setIsTransitioning(false);
      }, 450);
    };

    const handleBackOrForward = () => setPath(window.location.pathname);

    window.addEventListener(NAVIGATE_EVENT, handleNavigation);
    window.addEventListener('popstate', handleBackOrForward);

    return () => {
      window.removeEventListener(NAVIGATE_EVENT, handleNavigation);
      window.removeEventListener('popstate', handleBackOrForward);
    };
  }, []);

  return { path, isTransitioning };
}
