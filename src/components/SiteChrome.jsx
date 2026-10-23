'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CommandPalette } from './CommandPalette';
import { CustomScrollbar } from './CustomScrollbar';
import { Navigation } from './Navigation';
import { useCustomCursor } from '../hooks/useCustomCursor';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useScrollZoom } from '../hooks/useScrollZoom';

export function SiteChrome({ children }) {
  const pathname = usePathname();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const openCommandPalette = useCallback(() => setIsCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setIsCommandPaletteOpen(false), []);

  useRevealOnScroll(pathname);
  useCustomCursor(pathname);
  useScrollZoom(pathname);

  useEffect(() => {
    document.querySelector('.app')?.classList.remove('leaving');
    setIsCommandPaletteOpen(false);
  }, [pathname]);

  return (
    <div className="app antialiased selection:bg-acid selection:text-ink">
      <div className="cursor-dot" />
      <div className="cursor-ring" />
      <div className="transition">GH_</div>
      <CustomScrollbar />
      <Navigation currentPath={pathname} onOpenCommandPalette={openCommandPalette} />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onOpen={openCommandPalette}
        onClose={closeCommandPalette}
      />
      <main id="page-content">{children}</main>
    </div>
  );
}
