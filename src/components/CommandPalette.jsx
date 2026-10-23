'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const commands = [
  {
    label: 'Ask my CV',
    description: 'Chat with my experience, projects, and technical background.',
    path: '/ask-my-cv',
    keywords: 'ask cv experience recruiter chat',
  },
  {
    label: 'View my work',
    description: 'Explore selected systems, case studies, and engineering decisions.',
    path: '/work',
    keywords: 'work projects portfolio case studies decree',
  },
];

export function CommandPalette({ isOpen, onOpen, onClose }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCommands = commands.filter((command) => (
    `${command.label} ${command.keywords}`.toLowerCase().includes(normalizedQuery)
  ));

  const runCommand = (command) => {
    onClose();
    document.querySelector('.app')?.classList.add('leaving');
    window.setTimeout(() => router.push(command.path), 450);
  };

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (isOpen) onClose();
        else onOpen();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [isOpen, onClose, onOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setQuery('');
    setSelectedIndex(0);
    window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  const handleDialogKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key === 'ArrowDown' && filteredCommands.length) {
      event.preventDefault();
      setSelectedIndex((index) => (index + 1) % filteredCommands.length);
      return;
    }

    if (event.key === 'ArrowUp' && filteredCommands.length) {
      event.preventDefault();
      setSelectedIndex((index) => (index - 1 + filteredCommands.length) % filteredCommands.length);
      return;
    }

    if (event.key === 'Enter' && filteredCommands[selectedIndex]) {
      event.preventDefault();
      runCommand(filteredCommands[selectedIndex]);
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = [...event.currentTarget.querySelectorAll('input, button:not([disabled])')];
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="command-palette-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="command-palette"
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        onKeyDown={handleDialogKeyDown}
      >
        <header>
          <div>
            <span>GH_ / COMMAND</span>
            <h2 id="command-palette-title">Jump anywhere.</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close command palette">ESC</button>
        </header>

        <label className="command-search">
          <span>⌕</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command…"
            autoComplete="off"
          />
          <kbd>⌘K</kbd>
        </label>

        <div className="command-results" aria-live="polite">
          {filteredCommands.length ? (
            filteredCommands.map((command, index) => (
              <button
                className={`command-result ${index === selectedIndex ? 'active' : ''}`}
                type="button"
                onClick={() => runCommand(command)}
                onMouseMove={() => setSelectedIndex(index)}
                key={command.path}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{command.label}</strong><small>{command.description}</small></div>
                <kbd>↵</kbd>
              </button>
            ))
          ) : (
            <p className="command-empty">NO MATCHING COMMANDS</p>
          )}
        </div>

        <footer><span>↑↓ NAVIGATE</span><span>↵ OPEN</span><span>ESC CLOSE</span></footer>
      </section>
    </div>
  );
}
