<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` · `npm run build` · `npm run lint` (ESLint 9 flat config). Verify with `npm run lint && npm run build`.
- There is **no test, typecheck, or formatter script** and no test framework installed — don't guess `npm test`.
- Deeper prerender stacks: `npm run build -- --debug-prerender`.

## Next.js 16 specifics (next 16.4.3, react 19.3, App Router + Cache Components)

- Turbopack is the **default bundler**; the `turbopack.rules` block in `next.config.mjs` wires `@tailwindcss/turbopack` for CSS — keep it, don't add PostCSS.
- `cacheComponents` + `partialPrefetching` are on (both must be set together): data is dynamic by default, `'use cache'` / `cacheTag` / `cacheLife` opt into caching. Don't re-add removed flags: `experimental.ppr`, `experimental_ppr`, `runtime` (Node.js runtime only).
- Prerender errors offer three fixes: `[stream]` Suspense · `[cache]` use cache · `[block]` `export const instant = false`. What works in this repo:
  - A **Suspense hole on a fully static route is never filled server-side** (`<!--$?-->` stays open; content only appears after hydration). When the HTML must contain the content (navbar, hero), prefer the `[block]` route.
  - `/` = `export const instant = false` + `await connection()` (from `next/server`) so it renders per request (ƒ) — Swiper calls `new Date()` during render.
  - `/all-books/[id]` = `export const instant = false` so `params` may block (◐ partial prerender). Its `notFound()` streams inside an already-committed 200 shell — expected PPR behavior, don't chase it.
  - `usePathname()` prerenders fine on **static** routes unwrapped — never wrap the shared Navbar in Suspense (it turns nav into a client-fill hole on every page); it only blocks on dynamic routes, which use `instant = false`.
- Client navigation keeps the previous route mounted via React `<Activity>`: state survives back/forward navigation, effects re-run when a route reappears — factor this into dropdowns/dialogs/forms.
- Local docs: `node_modules/next/dist/docs/` (start at `01-app/`).

## Conventions

- **JavaScript, not TypeScript**: `.js`/`.jsx`, `jsconfig.json` only, shadcn `"tsx": false`. Don't create `.tsx` files.
- shadcn style `base-nova` runs on **Base UI (`@base-ui/react`)**, not Radix. Add components with `npx shadcn add <name> --yes`. Theme tokens live in `src/app/globals.css` (`@theme inline` + `:root`) — if they vanish, restore with `npx shadcn init -d -f` (check `git diff` first).
- `cn` (npm package) re-exports through `src/lib/utils.js`, along with the server-safe `initials()` helper. Never import helpers from a `"use client"` module into a server component — its exports become client references and throw at render.
- Auth is demo-only: localStorage read via `useSyncExternalStore` in `src/lib/auth-context.jsx`. The `react-hooks/set-state-in-effect` error forbids setState-in-effect hydration — keep the store pattern.
- lucide-react 1.x ships **no brand icons** — footer socials are inline SVG paths in `src/components/social-links.jsx`.
- Tailwind CSS v4, CSS-first: config in `src/app/globals.css`; no `tailwind.config.*`. Path alias `@/*` → `./src/*`.

## Repo status

- BookNook frontend UI: Navbar (auth-gated links, user dropdown), Footer on all pages; Home (Swiper slider, New Arrivals, How Borrowing Works, Reader Reviews); All Books + book details; Login/Register/Profile; private Add Book / My Books / My Borrows (empty states, guarded by `src/components/private-route.jsx`).
- Frontend-only by user request: no backend, no real auth — accounts/sessions in localStorage, catalog in `src/lib/books.js` (sorted by `createdAt` desc, mirroring MongoDB sort/limit).
- No CI, no other instruction files; parent dir contains only `frontend/`.
