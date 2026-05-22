<p align="center">
  <img src="https://raw.githubusercontent.com/Lintshiwe/FreeBrowse/main/public/hero-animation.gif" alt="FreeBrowse" width="600" />
</p>

<h1 align="center">FreeBrowse</h1>

<p align="center">
  The open directory of <strong>useful websites</strong> — a curated, well-organised catalog of free, freemium, open-source and paid tools. Built for South Africans — students, entrepreneurs, and small businesses.
</p>

<p align="center">
  <a href="https://freebrowse.netlify.app"><strong>freebrowse.netlify.app</strong></a>
</p>

---

## Features

- **1,000+ tools indexed** — curated directory with products from PeerPush
- **Search & filter** — search by name, tagline, or description; filter by pricing (Free/Freemium/Paid), category, and platform
- **Dark mode** — automatic light/dark theme with oklch design tokens
- **Pre-rendered SSR** — built with TanStack Start for fast initial load and SEO
- **Lottie animations** — powered by `@lottiefiles/dotlottie-react`
- **AI-proofed** — `robots.txt` blocks AI crawlers; anti-inspect DevTools protection

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (React 19 SSR) |
| Routing | [TanStack Router](https://tanstack.com/router) (file-based) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Animations | [`@lottiefiles/dotlottie-react`](https://github.com/LottieFiles/dotlottie-web) |
| Icons | [lucide-react](https://lucide.dev) |
| Deployment | [Netlify](https://netlify.com) (static pre-rendering) |
| Package manager | [Bun](https://bun.sh) |

## Local Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Deployment

Deployed as a static site on Netlify with pre-rendering.

```bash
# Build outputs to dist/client/
bun run build

# Deploy to Netlify
netlify deploy --prod --dir=dist/client
```
