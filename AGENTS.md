# Portfolio Engineering Guide

## Purpose

This repository contains a React portfolio for two audiences:

1. Recruiters and engineering teams evaluating George as an engineer.
2. Companies and founders looking for backend systems, custom MCP servers, agentic workflows, or complete software products.

Preserve those two user journeys when changing navigation, copy, or calls to action.

## Stack

- React for UI composition and state.
- Three.js for the interactive agent-network scene.
- Tailwind CSS for reusable utilities and design tokens.
- Custom CSS for art direction, complex motion, and WebGL framing.
- Vite for development and production builds.

## Architecture

```text
src/
├── components/   Reusable presentational and interactive components
├── data/         Portfolio content and structured display data
├── hooks/        Browser side effects and animation behavior
├── pages/        Route-level composition only
├── App.jsx       Route selection and application shell
├── routing.js    Minimal client-side navigation
├── main.jsx      React bootstrap only
└── site.css      Global visual system and complex motion styles
```

## Code principles

- Keep one primary responsibility per component, hook, or module.
- Prefer named exports and descriptive names. Avoid one-letter identifiers except conventional loop indexes.
- Keep page components declarative. Browser APIs, animation frames, event listeners, and Three.js objects belong in hooks or focused components.
- Store repeated content in `src/data` and render it with stable identifiers.
- Extract a component when behavior is reused, independently testable, or obscures a page's narrative.
- Do not extract tiny fragments solely to reduce line count.
- Keep props explicit. Avoid passing large unstructured objects when a component only needs a few fields.
- Clean up every event listener, animation frame, observer, Three.js geometry, material, and renderer created by an effect.
- Respect `prefers-reduced-motion` and touch input for every new animation.
- Use semantic HTML and preserve keyboard navigation, focus behavior, and meaningful link destinations.
- Do not invent clients, testimonials, metrics, employment history, or project outcomes.
- Keep conceptual content clearly labelled until it is replaced by verified portfolio information.

## React conventions

- Use function components and hooks.
- Never mutate React state or props.
- Derive values during rendering unless they require an actual side effect.
- Keep effect dependency arrays accurate.
- Avoid using effects for pure data transformations.
- Use refs for imperative animation targets, not as alternate state.
- Prefer composition over highly configurable all-purpose components.
- Keep route-level state in `App` or the routing module; keep local interaction state near the owning component.

## Styling conventions

- Use Tailwind utilities for ordinary spacing, layout, responsive behavior, and small visual adjustments.
- Use named CSS classes for complex animations, coordinated hover states, pseudo-elements, and Three.js containers.
- Reuse the color tokens defined in `tailwind.config.js` and `:root`.
- Avoid inline styles except for continuously changing animation values calculated at runtime.
- Mobile behavior and reduced-motion behavior are required, not optional follow-up work.

## Validation

Run the production build after meaningful changes:

```bash
npm run build
```

Treat build errors, uncleaned effects, broken internal routes, and inaccessible motion as regressions.
