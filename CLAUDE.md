# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`daviscole.com` — a personal site built with **Hugo** (extended not required; min v0.116.0). There is no Hugo theme module: all templates live in `layouts/` directly and all styling/scripting is two hand-written files (`assets/css/main.css`, `assets/js/main.js`). There is no Node/npm toolchain.

## Commands

```bash
hugo server -D            # local dev server, includes drafts (http://localhost:1313)
hugo server               # preview as production (drafts hidden)
hugo                      # build to ./public (gitignored)
hugo new posts/my-post.md # scaffold content from the matching archetype
hugo new books/some-book.md
```

There is no test/lint suite. Validate changes by running `hugo server -D` and checking the page, and `hugo` to confirm a clean production build.

## Content model

- Front matter is **TOML** (`+++` delimiters), not YAML. Match the existing files.
- Archetypes in `archetypes/` set defaults per section; **`draft = true` by default**, so new content is invisible in production until flipped to `false`.
- Sections under `content/`: `posts`, `opinions`, `books`, `updates`, `projects`, plus `about` and standalone pages (`contact.md`). The site search index (`layouts/index.json`) only covers `posts opinions books projects updates` — adding a new searchable section means editing that list.
- `books` use extra front matter fields: `dateRead`, `bookCover`, `author`, `rating`, `status` — rendered by the dedicated `layouts/books/` templates.
- `gallery` items are **page bundles**: a directory with `index.md` + `.webp` images. The `{{< gallery >}}` shortcode auto-collects `Page.Resources` images (or a comma-separated `images=` list) into a lightbox grid.
- `lastmod` is resolved from `lastmod`/`lastUpdated`/`date` (see comment block in `hugo.toml`). Git-derived dates are deliberately disabled to avoid a fake repo-wide "Updated" timestamp; supply explicit dates per page.

## Architecture notes

- **Layout lookup**: `layouts/_default/{baseof,single,list,home}.html` are the base; section-specific overrides live in `layouts/<section>/`. `baseof.html` wires in `partials/{head,sidebar,footer}.html` and a `{{ block "main" }}`.
- **Client-side search**: `layouts/index.json` generates a static JSON index at `/index.json` (enabled via `[outputs] home = ["HTML","RSS","JSON"]` in `hugo.toml`). The IIFE in `main.js` fetches it lazily on first search-input focus and filters in-browser — no search service or dependency.
- **Render hooks**: `layouts/_default/_markup/render-image.html` injects intrinsic `width`/`height` from the image resource and supports a max-width via the Markdown title; `render-codeblock-mermaid.html` handles mermaid fences. Editing image rendering means editing this hook, not individual templates.
- **Shortcodes** (`layouts/shortcodes/`): `gallery`, `collapse`, `timeline`/`timeline_item`, `video`, `pdf`. `collapse` and the nav sections use native `<details>`; `main.js` adds JS height-animated expand/collapse to `details.nav-section, details.collapse, .toc details` (respecting `prefers-reduced-motion`). The animation duration constant must stay in sync with `--transition-normal` in the CSS.
- **Theming**: light/dark is a `data-theme` attribute on `<html>`. An inline script in `head.html` sets it pre-paint to prevent a flash; `toggleTheme()` in `main.js` persists the choice to `localStorage` and OS preference is the fallback.
- **Math**: KaTeX is loaded from CDN in `head.html` and auto-rendered over the page body by `main.js` with `$`/`$$` delimiters.
- CSS/JS are referenced through Hugo Pipes with `fingerprint` + subresource integrity; reference assets via `resources.Get`, not hardcoded paths.

## Editing conventions

- `content/media/` and `public/` are gitignored; don't commit build output or local media.
