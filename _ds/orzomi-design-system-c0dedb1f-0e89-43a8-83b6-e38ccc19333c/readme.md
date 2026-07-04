# ORZOMI Design System

**"Software, crafted in proportion."**

ORZOMI is a software house with four practices under one standard of craft:
1. **Products** — its own software, designed, built and stood behind under its own name
2. **Client work** — websites and mobile apps for other businesses
3. **Games** — game development with the same rigor as tools
4. **Education** — teaching the next generation how to program (the "academy")

Mission: *"make software — and software makers — in the right proportion."*
Contact: hello@orzomi.com · orzomi.com · Founder: Aziz Orzomi

**Source:** `uploads/ORZOMI BrandBook (1).html` — a 12-page brand guidelines book (Edition 01, 2026). Unbundled copy at `extracted/brandbook-template.html`; all assets extracted to `assets/`. No codebase, Figma, or product screens were provided — the only application reference is the brandbook's "Applications" page (business card, social avatar, website hero).

The organizing idea of the entire brand is the **golden ratio (φ = 1.618)**: type scale, spacing, logo clear space, grid columns and even the color-usage proportion derive from Fibonacci steps (5, 8, 13, 21, 34, 55, 89).

---

## CONTENT FUNDAMENTALS

Voice: **"Say less, mean it."** Four rules from the brandbook:
- **Clear, not clever** — explain like good teachers; if a sentence needs a second read, rewrite it.
- **Confident, not loud** — no exclamation marks doing the work of substance; facts over hype.
- **Precise, like code** — concrete numbers, named things, no vague promises. "Ship dates, not 'soon'."
- **Warm, like a mentor** — talk to juniors and CEOs the same way: with patience and respect.

Say / Not examples (verbatim from the book):
- Say: "We build software products, client apps, games — and programmers." Not: "We are a 360° digital innovation ecosystem synergy partner."
- Say: "Your app ships in 12 weeks. Here is the plan." Not: "We leverage agile best-practices for rapid time-to-value!!"
- Say: "Lesson 1: you will write real code today." Not: "Unlock your coding superpowers on a learning journey."

Style mechanics:
- "We" voice; addresses the reader as "you". Sentence case for prose; mono labels are UPPERCASE with wide tracking.
- No emoji, ever. No exclamation marks. Em dashes and the φ glyph appear as typographic accents.
- Numbers are celebrated (Fibonacci numerals as display elements; "φ 1.618" as a motif).
- Tone flexes by audience — more playful in games, more patient in education, more exact in client work — but the voice never changes.
- CTAs are quiet mono links: "→ start a project" (arrow prefix, lowercase, gold).

## VISUAL FOUNDATIONS

**Color** — "Charcoal, paper, gold." Warm monochrome scale; gold is the *single* accent, "spent like money."
- Charcoal 900 `#100F0E` (deepest, covers/page bg) · Charcoal 700 `#1C1A18` (standard surface) · Graphite `#524C45` (quiet mark, strokes) · Stone `#8A857A` (muted text/labels) · Paper `#ECE8DF` · Gold `#D9A038` · Ink `#171717` (mark on paper)
- Hairlines: `#33302C`; image borders `#38342F`; body copy on dark `#C9C4B9`; the only red is `#C96F5A` (errors/"never" labels).
- Usage proportion is itself golden: charcoal 61.8% / graphite 23.6% / paper 9% / gold 5.6%.
- Dark surfaces are default; documents and product UI may invert to paper with the same scale.

**Type** — "Two voices, one grid" (three faces really):
- Space Grotesk 400/500/700 — display: headlines, numbers, anything loud. H1 = 55/1.04, ls -0.01em; H2 = 34/1.1; H3 = 21 medium.
- Jost 400/500/600 — body & UI copy, 16/26 with generous measure. Geometric like the wordmark.
- IBM Plex Mono 400/500 — labels, code, data. Label style: 12px, 0.22em tracking, uppercase, Stone.
- Fibonacci type scale: 89 / 55 / 34 / 21 / 16 / 13 (/11 for finest captions).

**Spacing & layout** — Fibonacci steps (5, 8, 13, 21, 34, 55, 89). Standard grid gap 21px; tile padding 24–28px. Grid columns use golden splits (1.618fr : 1fr). Subjects framed on golden-section lines, never dead center.

**Shape & depth** — **No corner radius anywhere** except perfect circles (avatar discs). **No drop shadows** — depth comes from surface steps (900 vs 700) and 1px hairline borders. Section blocks (`.vp`) use a 2px top rule in graphite. Placeholder areas use a 45° repeating-stripe pattern.

**Backgrounds & imagery** — flat charcoal surfaces; no gradients, no textures. Photography is "real work, warm light": actual people making things, warm low-key lighting matching charcoal surfaces, slight warm grade toward charcoal shadows, gold only as natural light. No stock handshakes, no rocket ships. Images get a 1px `#38342F` border.

**Motion & states** — the brandbook defines none. Recommended (intentional addition, kept minimal to match the brand): fast quiet transitions (120–180ms ease), hover = hairline brightens to graphite or text steps from stone→paper, gold link hover = paper. No bounces, no scale effects. Press = slightly deeper surface. Focus = 1px gold outline, offset 2px.

**Cards/tiles** — squared, 1px `#33302C` border, transparent or Charcoal 700 fill, 24px padding. Variant: `.vp` value-prop block — 2px graphite top rule, mono gold mini-label, no side borders.

## ICONOGRAPHY

- **"Drawn like the mark"**: geometric forms, uniform 2px stroke on a 24px grid, butt caps, miter joins, squared terminals, **no fills**, no rounding beyond perfect circles, 2px minimum gap between strokes.
- The brand ships its own six line icons, copied verbatim to `assets/icons/`: `code`, `web`, `mobile`, `games`, `academy`, `online`. They use `stroke="currentColor"` — recolor via CSS.
- Color: paper on dark, ink on light; gold only for a single active state.
- No icon font. No emoji. Unicode used sparingly as typographic accents only: φ, →, ✕ (for "never" labels), Ø.
- **Substitution note:** for icons beyond the six brand glyphs, the nearest CDN match is **Lucide** with `stroke-width="2"` — but the brand style has *butt caps and miter joins* while Lucide is round-capped; prefer composing from the six real icons, or flag new needs to the brand team.
- **Logo:** `assets/logo/orzomi-mark.svg` — the keyline-framed OR/ZO/MI wordmark (single-color, `currentColor`). Approved colorways: Ink `#171717` on Paper (primary); Graphite `#524C45` on Charcoal (dark-mode standard); Gold (reserved: covers, awards, launches). Clear space = Ø of the letter O on all sides; min size 24px digital / 12mm print. Never stretch, rotate, recolor off-palette, or place on busy backgrounds. Never redraw — always this vector.

## INDEX

- `styles.css` — global entry (imports everything under `tokens/`)
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`, `base.css`
- `assets/logo/orzomi-mark.svg` · `assets/icons/*.svg` (6 brand icons) · `assets/images/*.jpg` (3 brand photos) · `assets/fonts/*.woff2`
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/core/` — Button, IconButton, Input, Select, Checkbox, Radio, Switch, Card, Badge, Tag, Tabs, Dialog, Toast, Tooltip, Icon — each with `.d.ts`, `.prompt.md`, and a specimen card
- `ui_kits/website/` — orzomi.com marketing site recreation (hero from brandbook Applications page; other sections extrapolated from foundations)
- `extracted/` — raw brandbook template + assets (reference only)
- `SKILL.md` — agent skill entry point

**Intentional additions** (no component inventory existed in the source; the brandbook is guidelines-only):
- The `components/core/` set is authored from the visual foundations, since no product UI was provided.
- `Icon` — a wrapper for the six brand glyphs (needed for consistent sizing/color).
- Motion/hover/focus conventions (documented above) — the book is silent on these.
