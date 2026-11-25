# QueueVeld

**Make every service appointment count.** Appointment capacity planning for outpatient clinics.

- Founder and CEO: Ayomide Akinola
- Co-founder and CTO: Emmanuel Nwafor

## Structure

- `index.html`: the marketing page, built on the TasteSkill kit (`public/assets`) with a dealt hero, palette, type and moments. Design rules: `design.md`, `layout.md`, `product.md`.
- `demo/` + `src/demo`: the React demo workspace (forecast, hours, room suggestions with approve/decline, audit log in localStorage).
- `privacy.html`, `terms.html`, `docs/architecture.md`, `vercel.json`.

```bash
npm install
npm run dev
npm run build
npm test
```

Forecasts in the demo come from fixed sample data; no AI service is called. Prices are on request until the pilot terms are set.
