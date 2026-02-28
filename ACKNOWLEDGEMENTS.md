# Acknowledgements

## CodeXtremeOS — Oscar

This project originates from **CodeXtremeOS** by **Oscar**, released under the MIT License.

As required by that license, the original copyright notice is reproduced here:

---

MIT License

Copyright (c) 2025 Oscar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

The original CodeXtremeOS project provided the foundational Astro + Tailwind CSS site architecture — including the component structure, i18n scaffolding, layout system, and base styling patterns — on which this website was built.

## What was adapted from the original

- **Overall site architecture** — Astro + React + Tailwind CSS stack, folder structure, and build configuration preserved
- **i18n scaffolding** — `src/i18n/ui.ts` and `src/i18n/utils.ts` translation system preserved; language list changed from Spanish to Portuguese-BR (PT-BR); all translation keys replaced with Rustilian content
- **Component patterns** — `Header.astro`, `Footer.astro`, `BaseLayout.astro`, `CookieBanner.astro`, and `AccessibilityToolbar.astro` adapted from their original counterparts; all CodeXtreme branding, colors, and content replaced

## What was added or changed for Rustilian

- Full rebrand to Rustilian identity (Rust color palette: `red-700` → `orange-500`, background `#200800`)
- `HomePage.astro` — new shared home page component presenting Rustilian and its projects (ORCA Options, ORCA Stocks, QLTSYS)
- All CodeXtreme-specific pages removed: guides, tools, software, downloads, optimizer
- 13 CodeXtreme-specific components removed
- Translation keys (`src/i18n/ui.ts`) stripped from ~855 lines to ~147 lines, keeping only keys used by live components
- EN / PT-BR locale pair replacing the original EN / ES
- Sitemap, robots.txt, and SEO metadata updated for `rustilian.com`
