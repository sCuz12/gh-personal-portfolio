'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CustomScrollbar } from './CustomScrollbar';
import { Navigation } from './Navigation';
import { useCustomCursor } from '../hooks/useCustomCursor';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useScrollZoom } from '../hooks/useScrollZoom';

export function SiteChrome({ children }) {
  const pathname = usePathname();

  useRevealOnScroll(pathname);
  useCustomCursor(pathname);
  useScrollZoom(pathname);

  useEffect(() => {
    document.querySelector('.app')?.classList.remove('leaving');
  }, [pathname]);

  return (
    <div className="app antialiased selection:bg-acid selection:text-ink">
      <div className="cursor-dot" />
      <div className="cursor-ring" />
      <div className="transition">GH_</div>
      <CustomScrollbar />
      <Navigation currentPath={pathname} />
      <main id="page-content">{children}</main>
    </div>
  );
}
