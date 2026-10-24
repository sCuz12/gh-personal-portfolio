'use client';

import { useEffect, useState } from 'react';
import { AppLink } from './AppLink';
import { siteConfig } from '../config/site';

const navigationItems = [
  ['/portfolio', 'Portfolio'],
  ['/work', <>Work <sup>04</sup></>],
  ['/services', 'Services'],
  ['/about', 'About'],
  ['/brain', 'Brain'],
  ['/ask-my-cv', 'Ask my CV'],
];

export function Navigation({ currentPath, onOpenCommandPalette }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light-theme', isLightTheme);
    return () => document.body.classList.remove('light-theme');
  }, [isLightTheme]);

  return (
    <header className="site-nav">
      <div className="nav-frame">
        <AppLink to="/" className="nav-identity">
          <strong>GH_</strong><i>/</i><span>GEORGE HADJISAVVA</span>
        </AppLink>

        <button
          className="nav-menu-trigger"
          type="button"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? 'CLOSE' : 'MENU'} <span>{isMenuOpen ? '×' : '='}</span>
        </button>

        <div className="nav-actions">
          <button
            className="nav-utility command-trigger"
            type="button"
            aria-label="Open command palette"
            onClick={onOpenCommandPalette}
          >
            ⌘K
          </button>
          <button
            className="nav-utility"
            type="button"
            aria-label="Toggle color theme"
            onClick={() => setIsLightTheme((light) => !light)}
          >
            {isLightTheme ? '☾' : '☼'}
          </button>
          <AppLink to="/text" className="nav-utility terminal-link" cursor="OPEN" aria-label="Open text mode">
            &gt;_
          </AppLink>
          <a className="nav-cta" href={siteConfig.contact.mailto}>
            WORK WITH ME <span>»</span>
          </a>
        </div>

        <nav className={`nav-drawer ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
          {navigationItems.map(([path, label]) => (
            <AppLink key={path} to={path} className={currentPath === path || currentPath.startsWith(`${path}/`) ? 'active' : ''}>
              {label}
            </AppLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
