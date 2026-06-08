# fal.ai Integration — Alquifiestas

## What

We use [fal.ai](https://fal.ai) (serverless GPU inference) to generate product/category images on demand. The user provided a full API key.

## Packages

```bash
npm install @fal-ai/client @fal-ai/server-proxy
```

## Env Var

Add to `.env.local` and **Netlify Environment Variables**:

```
FAL_KEY=2cd2fb5c-fd3e-4660-97af-d318378141c1:3db09aa667e2e5b815c650dc3f6ccb6a
```

## Architecture

```
Browser client → /api/fal/proxy (Next.js Route Handler) → fal.ai API
```

The proxy prevents exposing the API key in the browser. The `@fal-ai/server-proxy` package handles auth transparently.

## Files

| File | Purpose |
|------|---------|
| `apps/web/app/api/fal/proxy/route.ts` | Proxy route handler (auto-auth) |
| `apps/web/lib/fal.ts` | Client config + helper `generateImage(prompt)` |

## Usage

```tsx
import { generateImage } from "@/lib/fal";

const url = await generateImage("elegant white plastic chair for events, studio lighting, product photography");
```

## Model Used

- `fal-ai/flux/schnell` — fastest, cheapest. 4 steps. Good for product mockups.

## Safety

- `enable_safety_checker: true` is on by default.
- All images are hosted on fal.ai CDN (temporary URLs, ~1 week TTL). If you want persistence, download and save to Supabase Storage.

## TODO

- [ ] Add a "Generate Image" button in the Provider Dashboard for products/categories.
- [ ] Store generated images in Supabase Storage for permanent hosting.
- [ ] Add fallback to local images if fal.ai quota is exceeded.
