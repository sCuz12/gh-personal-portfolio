# Systems Portfolio

A multi-page React portfolio for backend systems, agentic workflows, custom MCP servers, frontends, and bespoke software.

The codebase uses React, Three.js, Tailwind CSS, and Vite. Read `AGENTS.md` before contributing; it documents the architecture and engineering conventions.

## Portfolio content API

The site uses local data by default. To load projects from a database-backed API, copy `.env.example` to `.env.local` and set `VITE_PORTFOLIO_API_URL`.

The API must implement `GET /projects` using the contract in `openapi/portfolio.yaml`. If the API is unavailable or returns an invalid payload, the site safely falls back to `src/data/portfolio.js`.

## Pages

- `index.html` — positioning and separate recruiter/client paths
- `work.html` — case-study index and technical project narratives
- `services.html` — commercial offers and engagement process
- `about.html` — recruiter-facing profile, strengths, CV, and stack

Open `index.html` directly, or serve the directory with any static file server.

## Personalize

- Replace `hello@example.com` in `index.html`.
- Replace the four conceptual project cards with real case studies.
- Add real GitHub, LinkedIn, CV, and project links.
- Adjust availability and positioning copy to match your current focus.
