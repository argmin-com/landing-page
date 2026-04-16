# Troubleshooting

Common issues and solutions for developing on argmin.co.

## Build fails

### `npm run build` errors

**Symptom:** Build fails with module resolution, type errors, or missing dependencies.

**Fix:**
```bash
rm -rf node_modules .astro dist
npm ci
npm run build
```

If the error persists after a clean install, check:
1. Node version: requires >= 22.12.0 (check `.nvmrc`).
2. `npm run check` for type errors -- fix those first.
3. Recent changes to `astro.config.mjs` or `tsconfig.json`.

### Type errors in Astro components

**Symptom:** `npm run check` fails with type errors in `.astro` files.

**Fix:**
- Check the `Props` interface matches the component's usage.
- Check imports: use `import type` for type-only imports.
- Check `import.meta.env` usage: only `PUBLIC_*` vars are available client-side.
- Run `npx astro sync` to regenerate `.astro/` types.

## Validator failures

### `validate:design-tokens` fails

**Symptom:** "Found hardcoded color" errors.

**Fix:** Replace the flagged color with the appropriate `argmin-*` token:

| Hardcoded | Replace with |
|---|---|
| `text-slate-600`, `text-gray-600` | `text-argmin-mid` |
| `text-slate-500`, `text-gray-500` | `text-argmin-light` |
| `bg-white`, `bg-gray-50` | `bg-argmin-surface`, `bg-argmin-surface-alt` |
| `border-gray-200` | `border-argmin-border` |
| `text-blue-600` | `text-argmin-accent` |
| Any hex value in template | Use the corresponding `argmin-*` token |

If you need a color that has no token, add a new semantic token to `global.css` first (see design-system.md).

### `validate:page-structure` fails

**Symptom:** "Missing required element" or "Section count below minimum."

**Fix:**
- Read `docs/content-standards.md` for per-page requirements.
- Check `scripts/validate-page-structure.mjs` for the specific check that failed.
- Restore any deleted content. Content is sacred -- restructure to present better, never delete.
- If a section was restructured (tabbed, collapsed), ensure the content still exists in the built HTML (`dist/`).

### `validate:contact-fallbacks` fails

**Symptom:** Form submit button visible without valid Formspree URL.

**Fix:**
- Check `src/components/ContactForm.astro` conditional rendering.
- The form must hide the submit button and show email fallback when `PUBLIC_FORMSPREE_URL` is absent or invalid.
- Check `src/lib/formspree.ts` validation logic.
- Test both states:
  ```bash
  npm run build && npm run validate:contact-fallbacks
  PUBLIC_FORMSPREE_URL=https://formspree.io/f/test000 npm run validate:contact-configured
  ```

### `validate:navbar` fails

**Symptom:** Navigation links inconsistent with `src/content/site.ts`.

**Fix:** Ensure nav links in component markup match the configuration in `src/content/site.ts`.

## Lighthouse regression

### Performance drops below 90

**Common causes:**
1. **Large images:** Check image sizes. Compress to < 50KB for hero, < 30KB for cards. Use WebP.
2. **Missing lazy loading:** Images below the fold need `loading="lazy" decoding="async"`.
3. **Unoptimized CSS:** Check if `global.css` has grown significantly.
4. **New dependencies:** Any recently added npm package adding to bundle size.

**Diagnosis:**
```bash
# Check dist/ size
du -sh dist/
# Check individual page sizes
ls -la dist/**/*.html
# Check image sizes
ls -la dist/**/*.{png,jpg,webp,svg} 2>/dev/null
```

### Total transfer exceeds 150KB

**Fix:**
- Compress images further.
- Remove unused CSS (Tailwind purges automatically, but check for manual additions to `global.css`).
- Check for accidentally committed large files.
- Inline small SVGs instead of loading as external assets.

## Dark mode broken

### Text disappears or is unreadable

**Fix:**
- Replace hardcoded colors with `argmin-*` tokens (they have automatic dark variants).
- Check `src/styles/global.css` for `html[data-theme="dark"]` overrides.
- Accent-tinted backgrounds must use opacity: `bg-argmin-accent/5` not `bg-blue-50`.

### Cards or panels invisible

**Fix:**
- Ensure `.surface-panel` pattern is used (it includes dark-mode-aware gradient and border).
- Check that `bg-argmin-surface` and `border-argmin-border` are used, not hardcoded equivalents.

## Content deleted accidentally

**Symptom:** `validate:page-structure` fails or content-guardian agent flags deletions.

**Fix:**
1. Check git diff: `git diff main...HEAD -- src/pages/`.
2. Identify what was removed.
3. Restore the content. Restructure the layout if the content appeared cluttered.
4. Run `npm run validate:page-structure` to confirm restoration.

## Workers Builds / Cloudflare deploy failing

**Symptom:** Cloudflare Workers Builds deploy fails after merge to main.

**Common causes:**
1. **Build command mismatch:** Check `wrangler.jsonc` and Cloudflare dashboard config.
2. **Node version:** Cloudflare build needs Node >= 22.12.0. Check environment variables in dashboard.
3. **Missing env vars:** `PUBLIC_FORMSPREE_URL` must be set in Cloudflare dashboard for production.
4. **Build output path:** Must produce `dist/` directory with static HTML.

**Fix:**
- Check the Cloudflare Workers Builds dashboard for build logs.
- Verify `wrangler.jsonc` configuration matches expectations.
- Ensure `astro.config.mjs` has `output: 'static'` (default).
- Test locally: `npm run build && ls dist/`.

## Environment setup

### First time setup

```bash
nvm use           # Use Node version from .nvmrc
npm ci            # Clean install
npm run check     # Verify types
npm run build     # Verify build
npm run audit:site # Full validation
```

### After pulling changes

```bash
npm ci            # Re-install in case deps changed
npm run audit:site # Verify everything still passes
```
