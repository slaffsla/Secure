# Dwelling Risk Assessment

An early MVP prototype for a consumer-first residential security assessment tool.

The current app is intentionally cheap to test: it runs as a React/Vite client app, stores draft state in the browser, uses a local rule-based risk engine, and avoids paid AI, maps, OSINT, storage, or vendor APIs.

## Current Shape

- `src/components` - UI sections for intake, evidence collection, hero metrics, and reports.
- `src/data` - configurable intake options and evidence slot definitions.
- `src/data/recommendations.ts` - reusable mitigation catalog with impact, cost, effort, rationale, and cautions.
- `src/engine` - local scoring and finding generation that links findings to recommendation IDs.
- `src/storage` - local draft persistence.
- `src/types.ts` - shared domain types.

## Low-Cost MVP Path

1. Keep the rule engine useful before paying for AI calls.
2. Use human review manually before building reviewer workflow software.
3. Add Firebase only when real testers need accounts and persistent uploads.
4. Add paid vision analysis behind a feature flag and per-report cost cap.
5. Keep vendor recommendations category-first until report quality is proven.
6. Grow the recommendation catalog from real review notes before automating more analysis.

## Commands

```sh
npm install
npm run dev
npm run build
```

## Product Principle

The report should be credible because it is clear about evidence, uncertainty, and what to fix first.
