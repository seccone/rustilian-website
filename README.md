# Rustilian Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/-Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

Official website for **Rustilian** — built with Astro and Tailwind CSS. Open source, statically generated, and fully bilingual (EN / PT-BR).

## Project Purpose

Rustilian is an IT company specialising in high-performance backend systems written in Rust. This website serves as the public portfolio, presenting active and upcoming projects to potential clients, collaborators, and the broader developer community.

Current featured projects:

- **ORCA Options** — ultra-low latency options trading engine (available)
- **ORCA Stocks** — equity market extension of the ORCA suite (in development)
- **QLTSYS** — backend system for pool maintenance and management (available)
- **WWTS** — backend system for Wastewater Treatment System maintenance and management (in development)

The site is intentionally minimal: no bloat, no dead pages — just a fast, accessible, branded landing that clearly communicates what Rustilian builds and why it matters.

## Technical Features

✨ **Modern Interface**
Clean, professional design with Rust brand palette (`red-700` → `orange-500`) and dark-first theming

📱 **Responsive Design**
Full adaptation across mobile, tablet, and desktop

♿ **Accessibility First**
Built-in accessibility toolbar (contrast, font size, grayscale, readable font)

🔍 **Advanced SEO**
Dynamic meta tags, structured data, and automated sitemap

🌐 **Internationalization**
Built-in EN / PT-BR support via Astro i18n — default locale at `/`, Portuguese at `/pt-br/`

⚡ **Performance Optimized**
Fully static output — zero JS by default, minimal client bundle

🛠️ **Developer Experience**
Hot reload, TypeScript throughout, and pnpm for fast installs

## Tech Stack

| Layer           | Technology                                 |
| --------------- | ------------------------------------------ |
| Framework       | [Astro](https://astro.build) v5            |
| UI components   | [React](https://react.dev) v19             |
| Styling         | [Tailwind CSS](https://tailwindcss.com) v3 |
| Icons           | [Heroicons](https://heroicons.com)         |
| Language        | TypeScript                                 |
| Package manager | pnpm                                       |

## Project Architecture

```tree
src/
├── components/     # Reusable Astro components
├── i18n/           # Translation labels and utilities (EN / PT-BR)
├── layouts/        # Base page layout
├── pages/          # Routes — / (EN) and /pt-br/ (PT-BR)
└── styles/         # Global Tailwind CSS entry point
public/
└── assets/         # Static assets (logo, favicon)
```

### Key Configuration Files

- `astro.config.mjs` — Astro config with React, Tailwind, and sitemap integrations
- `tailwind.config.cjs` — Tailwind theme and plugin config
- `postcss.config.cjs` — PostCSS config
- `tsconfig.json` — TypeScript config

## Local Development

Prerequisites:

- **Node.js** v22.x or higher (see `.nvmrc`)
- **pnpm** v10 or higher

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Deployment

See [HETZNER_DEPLOYMENT.md](on local dev/ directory, not on this REPO) for deployment instructions.

## Acknowledgements

This project was adapted from **CodeXtremeOS** by **Oscar**, released under the MIT License.  
See [ACKNOWLEDGEMENTS.md](ACKNOWLEDGEMENTS.md) for the full original copyright notice and a description of what was adapted.

## License

This project is open source under the [MIT License](LICENSE).  
Copyright © 2026 Ricardo Freire.

## Contact

[contact@rustilian.com](mailto:contact@rustilian.com)

---
