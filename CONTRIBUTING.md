# Contributing

Thanks for improving the Argmin marketing site. This repo is the public
landing page for `argmin.co` — a static Astro site deployed to Cloudflare
Pages. It is intentionally small, so keep the bar high and the PRs focused.

## Local setup

Requirements:

- Node.js — version pinned in [`.nvmrc`](./.nvmrc) (use `nvm use`)
- `npm` (comes with Node)

```bash
nvm use
npm ci
npm run dev       # local preview on http://localhost:4321
```

Optional environment variables:

- `PUBLIC_FORMSPREE_URL` — set to your Formspree endpoint URL to exercise
  the configured contact-form path locally. Without it the form renders in
  fallback mode (mailto link). See [`.env.example`](./.env.example).

## Quality bar before you open a PR

Run these locally — they are the same commands CI runs in
[`.github/workflows/quality.yml`](./.github/workflows/quality.yml):

```bash
npm run check                     # Astro diagnostics — must be 0 errors
npm run build                     # static build, outputs to dist/
npm run validate:contact-fallbacks  # confirms mailto fallback paths are intact

# Configured contact path (optional but recommended for contact-form work)
PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run build
PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured
```

CI also runs a **Lighthouse** audit against the built site and fails the
PR if the medians drop below:

- performance ≥ 0.90
- accessibility = 1.00
- best-practices = 1.00
- seo = 1.00
- largest-contentful-paint ≤ 2500 ms
- total transfer size ≤ 150 KB

Please check the Lighthouse summary attached to every PR and justify any
regression in the PR description.

## Branch + commit conventions

- Default branch: `main` (protected).
- Branch names: `claude/<short-topic>-<slug>` for Claude Code agent work;
  `copilot/<topic>` for Copilot agent work; otherwise any descriptive slug.
- Commit messages: imperative mood, describe the **why**, reference the
  audit item or issue when applicable.
- Keep PRs focused. If you change unrelated things, split them.

## Style

- Prefer editing existing Astro components/pages over adding new ones.
- Reuse tokens from [`src/styles/global.css`](./src/styles/global.css).
  Don't hard-code colors; use the `--color-argmin-*` variables or the
  matching Tailwind classes (`text-argmin-dark`, `bg-argmin-surface`, etc.).
- Keep mobile and dark mode in mind — check both before you push.
- Accessibility: every interactive element needs a visible focus state and
  meaningful ARIA where applicable. CI enforces Lighthouse accessibility = 1.

## File layout

```
src/
├── components/   # Reusable Astro components + one React ER diagram
├── content/      # Navigation and site metadata (single source of truth)
├── layouts/      # BaseLayout — theme bootstrap, head metadata, JSON-LD
├── lib/          # Tiny utilities (Formspree, contact email constant)
├── pages/        # File-based routing
└── styles/       # global.css with Tailwind 4 @theme + custom tokens

public/           # Static assets copied verbatim into dist/
scripts/          # CI validation scripts
.github/          # Workflows, Dependabot, templates, this repo's policies
```

## Deployment

Cloudflare Pages is connected to the repo via a Git integration, so
merges to `main` deploy automatically. The manual
[`deploy.yml`](./.github/workflows/deploy.yml) workflow is a fallback that
requires `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` secrets.

## Reporting issues

- Bugs: use the **Bug report** issue template.
- Ideas: use the **Feature request** issue template.
- Security: **do not** open a public issue — see [`.github/SECURITY.md`](./.github/SECURITY.md).

## License

This repository is proprietary. See [`LICENSE`](./LICENSE).
