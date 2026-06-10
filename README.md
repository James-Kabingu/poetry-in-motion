# Poetry in Motion (StyleAI)

AI-assisted fashion platform prototype: personal styling, creator marketplace, sustainability metrics, and circular fashion flows.

Originally scaffolded with [v0.app](https://v0.app); maintained and published by [Vektasafe](https://github.com/vektasafe).

## Overview

- **Next.js 15** App Router + **React 19** + **Tailwind CSS 4**
- **45** demo API routes backed by mock data in `lib/mock-data.ts`
- Pages for shop, style quiz, creators, recommendations, trade-in, and community features

See **[RESEARCH.md](./RESEARCH.md)** for a full architecture and data-model analysis.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build
pnpm start
```

## Project structure

| Path | Description |
|------|-------------|
| `app/` | Pages and API routes |
| `components/` | UI and mobile components |
| `lib/` | Types, mock data, utilities |
| `public/` | Images, PWA manifest, service worker |

## License

Add a license file before wide public use if not already present.

## Contributing

Issues and pull requests welcome on the Vektasafe GitHub repository.
