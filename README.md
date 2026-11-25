# QueueVeld

**Make every service appointment count.**

Marketing website and interactive demo for QueueVeld, AI appointment capacity planning for hospitals, outpatient clinics and diagnostic centres.

- Founder & CEO: Ayomide Akinola
- Co-founder & CTO: Emmanuel Nwafor
- Contact: ayomide@queueveld.com

## Stack
Vite · React 18 · TypeScript · Tailwind CSS v4 · React Router · Lucide. No backend or API keys; the demo runs on seeded data in the browser.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm test         # Vitest: forecast model and form validation
```

## Routes
| Route | Page |
| --- | --- |
| `/` | Home: hero day board, problem, features, how it works, AI & safeguards, AWS architecture, pricing, roadmap, founders, FAQ, pilot form |
| `/product`, `/how-it-works`, `/pricing`, `/about`, `/security`, `/contact`, `/privacy`, `/terms` | Marketing pages |
| `/demo` | Week overview heatmap · `/demo/forecast` day forecast with room slider · `/demo/cancellations` · `/demo/capacity` review queue (accept / decline, saved in localStorage) |

## What is simulated
- Forecasts come from a deterministic model in `src/lib/forecast.ts`. No AI service is called, and the UI says so.
- The pilot form validates on the client and saves requests in the visitor's browser.
- Pricing, statistics and the roadmap are drafts to confirm before launch.

Design rules live in `design.md`, `layout.md` and `product.md`. The proposed AWS architecture is in `docs/architecture.md`. `vercel.json` and `public/_redirects` provide the SPA fallback and security headers.
