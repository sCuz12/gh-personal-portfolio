'use client';

import { useRef } from 'react';
import { AppLink } from './AppLink';

export function TiltCard({ children, to, className }) {
  const cardRef = useRef(null);

  const handlePointerMove = (event) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const card = cardRef.current;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-6px)`;
    card.style.setProperty('--cx', `${(x + 0.5) * 100}%`);
    card.style.setProperty('--cy', `${(y + 0.5) * 100}%`);
  };

  const resetTransform = () => {
    cardRef.current.style.transform = '';
  };

  return (
    <AppLink to={to} className={className} cursor="VIEW">
      <article ref={cardRef} onPointerMove={handlePointerMove} onPointerLeave={resetTransform}>
        {children}
      </article>
    </AppLink>
  );
}
