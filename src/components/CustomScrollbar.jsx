import { useEffect, useRef } from 'react';

const TRACK_PADDING = 18;

function handleScrollbarKeyDown(event) {
  const pageStep = window.innerHeight * 0.85;
  const keyActions = {
    ArrowDown: () => window.scrollBy({ top: 80, behavior: 'smooth' }),
    ArrowUp: () => window.scrollBy({ top: -80, behavior: 'smooth' }),
    PageDown: () => window.scrollBy({ top: pageStep, behavior: 'smooth' }),
    PageUp: () => window.scrollBy({ top: -pageStep, behavior: 'smooth' }),
    Home: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    End: () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }),
  };

  const action = keyActions[event.key];
  if (!action) return;

  event.preventDefault();
  action();
}

function getScrollMetrics(trackHeight, thumbHeight) {
  const documentHeight = document.documentElement.scrollHeight;
  const scrollableDocument = Math.max(1, documentHeight - window.innerHeight);
  const scrollableTrack = Math.max(1, trackHeight - thumbHeight - TRACK_PADDING * 2);

  return { scrollableDocument, scrollableTrack };
}

export function CustomScrollbar() {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    let animationFrame = 0;
    let dragOffset = 0;

    const updateThumb = () => {
      animationFrame = 0;
      const { scrollableDocument, scrollableTrack } = getScrollMetrics(
        track.clientHeight,
        thumb.offsetHeight,
      );
      const progress = Math.min(1, window.scrollY / scrollableDocument);
      const thumbPosition = TRACK_PADDING + progress * scrollableTrack;

      thumb.style.transform = `translateY(${thumbPosition}px)`;
      thumb.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateThumb);
    };

    const scrollFromPointer = (pointerY) => {
      const trackBounds = track.getBoundingClientRect();
      const { scrollableDocument, scrollableTrack } = getScrollMetrics(
        track.clientHeight,
        thumb.offsetHeight,
      );
      const position = pointerY - trackBounds.top - dragOffset - TRACK_PADDING;
      const progress = Math.max(0, Math.min(1, position / scrollableTrack));
      window.scrollTo({ top: progress * scrollableDocument, behavior: 'auto' });
    };

    const handlePointerMove = (event) => scrollFromPointer(event.clientY);

    const stopDragging = () => {
      document.body.classList.remove('scrollbar-dragging');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDragging);
    };

    const startDragging = (event) => {
      event.preventDefault();
      const thumbBounds = thumb.getBoundingClientRect();
      dragOffset = event.clientY - thumbBounds.top;
      document.body.classList.add('scrollbar-dragging');
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', stopDragging, { once: true });
    };

    const handleTrackClick = (event) => {
      if (event.target === thumb) return;
      dragOffset = thumb.offsetHeight / 2;
      scrollFromPointer(event.clientY);
    };

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(document.documentElement);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    thumb.addEventListener('pointerdown', startDragging);
    track.addEventListener('pointerdown', handleTrackClick);
    updateThumb();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      stopDragging();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      thumb.removeEventListener('pointerdown', startDragging);
      track.removeEventListener('pointerdown', handleTrackClick);
    };
  }, []);

  return (
    <aside className="custom-scrollbar" ref={trackRef} aria-label="Page scroll control">
      <div className="scrollbar-track" aria-hidden="true" />
      <button
        ref={thumbRef}
        className="scrollbar-thumb"
        type="button"
        role="scrollbar"
        aria-label="Drag to scroll the page"
        aria-controls="page-content"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="0"
        onKeyDown={handleScrollbarKeyDown}
      >
        GH
      </button>
    </aside>
  );
}
