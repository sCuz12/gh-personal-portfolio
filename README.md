# George Hadjisavva — Systems Portfolio

A Next.js portfolio for backend systems, agentic workflows, custom MCP servers, product engineering, and technical writing.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The main application runs at `http://localhost:3000`.

## Brain publishing

Brain articles are stored in Sanity and rendered server-side by Next.js. Publishing in Sanity updates the public site without rebuilding the portfolio.

1. Create a free Sanity project with a `production` dataset.
2. Copy `studio/.env.example` to `studio/.env` and add the Sanity project ID.
3. Copy `.env.example` to `.env.local` and configure the matching values plus a server-only viewer token for draft preview.
4. Run `npm --prefix studio install`, then `npm run studio:dev`.
5. Add `http://localhost:3000` and the production Vercel domain to Sanity CORS with credentials enabled.
6. Deploy the editor with `npm run studio:deploy`, then set `NEXT_PUBLIC_SANITY_STUDIO_URL` in Vercel.

The public site degrades to an empty Brain state when Sanity is not configured. Drafts are visible only through Sanity Presentation and Next.js Draft Mode.

## Portfolio content API

Projects use local data by default. To use the optional read-only API, set `NEXT_PUBLIC_PORTFOLIO_API_URL`.

The API must implement `GET /projects` using the contract in `openapi/portfolio.yaml`. If the API is unavailable or returns an invalid payload, the site safely falls back to `src/data/portfolio.js`.

## Commands

- `npm run dev` — run the Next.js portfolio
- `npm run build` — create the production build
- `npm run start` — run the production build
- `npm run studio:dev` — run Sanity Studio locally
- `npm run studio:deploy` — deploy the hosted writing studio
