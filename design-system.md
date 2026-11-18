# New Look Homes — Design System

Home remodeling in Dover, Delaware · Owner: Nathan Morris
Version 1.0 · 2026-11-18

---

## 1. What this site has to do

The site exists to show transformations. Every page decision answers one question: **does this make the "after" land harder?** Photos are the product. Type, color and motion are the frame around them, and the frame stays quiet.

This is not a contractor template. No hard hats, no orange-and-navy, no "Quality You Can Trust!" banners, no stock photos of men shaking hands, no icon grids of hammers and wrenches.

**The feel:** clean, modern, a little upscale. It should feel like a finished room: confident and calm, with nothing extra in it.

---

## 2. Aesthetic references

These are the two references the whole system borrows from. When a design decision is unclear, check it against them.

### A. The reveal moment on *Fixer Upper* (HGTV)
At the end of each episode the homeowners stand in front of a giant photo of their old house. The photo pulls away and the finished home is behind it.

**What we borrow:**
- **Hold the "before" a beat, then release.** On the site the before-and-after slider does this job. The visitor is the one who pulls the poster away.
- **The finished space gets the full frame.** In the reveal shot the after fills the screen with nothing over it. Our after photos run full-bleed or close to it, with no text on top.
- **One emotional peak per project.** Each project page builds to a single reveal, not a gallery of 40 equal thumbnails.

### B. The before-and-after spreads in *Dwell* and *Architectural Digest*
In these magazines the photos are big and get room on the page. A short serif headline sits above, and a small caption gives the specifics: what changed, materials, square footage.

**What we borrow:**
- **Editorial hierarchy.** A big serif headline, a short deck (subheading), then the photo. Text never competes with the image.
- **Captions as credibility.** Small sans-serif specs under each project, for example: *"Kitchen · Camden, DE · 6 weeks · Quartz counters, white oak floors, relocated sink wall."*
- **Generous white space and an asymmetric grid.** Photos are not all the same size. One hero image, then a pair, then a detail shot.
- **Restraint with color.** Color comes from the photography. The page stays neutral.

> We borrow structure and pacing from these references, never their logos, typefaces or branding.

---

## 3. Color

A soft white and warm greige base, charcoal text and **one** accent: deep teal.

### Tokens

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FAF8F5` | Page background. Soft white, never pure `#FFF` for large areas |
| `--greige` | `#ECE6DD` | Alternating section background, cards, caption bands |
| `--greige-deep` | `#D9D1C4` | Hairline dividers, image placeholders (decorative only) |
| `--stone` | `#B5AB9C` | Decorative rules and ornaments only. **Never text** |
| `--line-strong` | `#857C6F` | Form field borders, slider track (meets 3:1 for UI parts) |
| `--charcoal` | `#2B2A27` | Primary text, headings |
| `--charcoal-soft` | `#5E5A53` | Secondary text, captions, meta |
| `--ink` | `#1E1D1B` | Dark "reveal band" sections, footer |
| `--teal` | `#1F4D4E` | **The accent.** Primary buttons, links, slider handle, focus ring |
| `--teal-hover` | `#173B3C` | Button hover/active |
| `--teal-tint` | `#DCE6E4` | Selected states, subtle highlight backgrounds |
| `--teal-on-dark` | `#7FB3AF` | Accent on `--ink` only (links, focus ring on dark) |
| `--white` | `#FFFFFF` | Text on teal buttons, slider labels on photos |

```css
:root {
  --paper: #FAF8F5;
  --greige: #ECE6DD;
  --greige-deep: #D9D1C4;
  --stone: #B5AB9C;
  --line-strong: #857C6F;
  --charcoal: #2B2A27;
  --charcoal-soft: #5E5A53;
  --ink: #1E1D1B;
  --teal: #1F4D4E;
  --teal-hover: #173B3C;
  --teal-tint: #DCE6E4;
  --teal-on-dark: #7FB3AF;
  --white: #FFFFFF;
}
```

### Proportions
- **~70%** paper and greige
- **~25%** charcoal and ink (text, the dark reveal band, footer)
- **≤5%** teal. If teal is on screen in more than two places at once, remove one.

### Contrast check (WCAG 2.2)

These ratios were computed against the actual hex values.

| Pair | Ratio | Result |
|---|---|---|
| Charcoal on paper | 13.54 | AAA |
| Charcoal on greige | 11.57 | AAA |
| Charcoal-soft on paper | 6.47 | AA (AAA for large text) |
| Charcoal-soft on greige | 5.53 | AA |
| Teal on paper (links) | 8.88 | AAA |
| Teal on greige | 7.59 | AAA |
| White on teal (buttons) | 9.42 | AAA |
| White on teal-hover | 12.16 | AAA |
| Teal on teal-tint | 7.39 | AAA |
| Paper on ink | 15.89 | AAA |
| Teal-on-dark on ink | 7.19 | AAA |
| Line-strong on paper (field borders) | 3.88 | Passes 3:1 for UI parts |
| Stone on paper | 2.14 | ✗ Decorative only |
| Greige-deep on paper | 1.43 | ✗ Decorative only |

**Why teal and not brass:** brass (`#A6844A`) reaches only 3.29:1 on paper and 3.49:1 with white text on it. Both fail AA for normal text, so brass can't be used for buttons or links, which is the accent's whole job. A darkened brass (`#7D6232`, 5.41:1) passes but reads as muddy olive-brown rather than metallic. Deep teal passes every pairing above, and its cool tone stands out against the warm greige without fighting the warm wood and stone in the project photos.

**Brass in the real world:** let it appear in the photography (hardware, fixtures). Don't use it in the UI.

### Rule for teal on dark
`--teal` on `--ink` is only 1.79:1. On dark sections, always switch the accent to `--teal-on-dark`.

---

## 4. Typography

### The pairing
- **Headings: Cormorant Garamond** (Google Fonts), weights 500 and 600. A high-contrast Garamond with the magazine-headline elegance of the Dwell/AD reference.
- **Body and UI: DM Sans** (Google Fonts), weights 400, 500 and 600. A clean, low-contrast sans with a large x-height and slightly warm, rounded forms.

**Why they work together:**
- **Contrast in structure, kinship in tone.** Cormorant is high-contrast and calligraphic, and DM Sans is even-stroked and geometric, so there is a clear role split with no muddy middle ground. Both have soft, open curves, so they feel warm together rather than clashing.
- **The x-heights complement each other.** Cormorant's x-height is small, which looks elegant at large sizes and frail at small ones. DM Sans's large x-height carries all the small text the serif can't.
- **Not overused.** Playfair Display + Montserrat is the default "luxury template" pairing. This avoids it.

**The constraint that makes the pairing work:** Cormorant has hairline strokes that break up below about 28px, and worse on low-DPI screens and over photos. Because of that:
- Cormorant is used **only at 28px and above**, and never in weight 300/400 under 40px.
- Cormorant is **never** used over photos, for buttons or form labels, or for anything in the header except the wordmark.
- H4 and everything smaller use DM Sans.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
```

```css
:root {
  --font-display: "Cormorant Garamond", "Cormorant", Garamond, "Times New Roman", serif;
  --font-body: "DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
}
```

### Type scale (fluid, mobile → desktop)

| Role | Font | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| Display (hero) | Cormorant | `clamp(2.75rem, 6vw + 1rem, 5.5rem)` (44→88px) | 500 | 1.02 | -0.015em |
| H1 | Cormorant | `clamp(2.25rem, 4vw + 1rem, 4rem)` (36→64px) | 500 | 1.08 | -0.01em |
| H2 (section header) | Cormorant | `clamp(1.875rem, 2.5vw + 1rem, 3rem)` (30→48px) | 600 | 1.12 | -0.005em |
| H3 (project title) | Cormorant | `clamp(1.75rem, 1.2vw + 1.2rem, 2.25rem)` (28→36px) | 600 | 1.2 | 0 |
| H4 | DM Sans | 1.125rem (18px) | 600 | 1.35 | 0 |
| Eyebrow / kicker | DM Sans | 0.8125rem (13px) | 600 | 1.2 | 0.14em, uppercase |
| Body large (deck) | DM Sans | 1.1875rem (19px) | 400 | 1.6 | 0 |
| Body | DM Sans | 1.0625rem (17px) | 400 | 1.65 | 0 |
| Caption / spec line | DM Sans | 0.875rem (14px) | 500 | 1.5 | 0.01em |
| Button | DM Sans | 1rem (16px) | 600 | 1 | 0.02em |

- Body measure: **60–72 characters** (`max-width: 38rem`).
- Italic Cormorant 500 may be used for one emphasized word in a display headline ("The kitchen, *reimagined*"), at most once per page.
- Numbers in specs (weeks, sq ft) use `font-variant-numeric: tabular-nums`.

---

## 5. Space, grid and shape

### Spacing scale (8px base)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`

```css
:root {
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 24px; --space-6: 32px;  --space-7: 48px;  --space-8: 64px;
  --space-9: 96px; --space-10: 128px; --space-11: 160px;
  --section-y: clamp(64px, 10vw, 160px);
}
```

Sections breathe. Vertical padding between sections is `--section-y` (64px on phones, up to 160px on desktop). The magazine reference depends on that room.

### Grid
- 12 columns, max content width **1280px**, gutter 24px (16px on mobile).
- Page side margin: **16px** on mobile, `clamp(24px, 5vw, 80px)` above that.
- Photos may break out to full bleed. Text never does.
- **Asymmetric project layouts:** hero image across 12 columns, then a 7/5 or 5/7 pair, then a single 8-column detail shot offset to one side. Never three equal thumbnails in a row on a project page.

### Shape
- Corner radius: **2px** on buttons and inputs, **0** on photos. Square-cut photos read as editorial; rounded ones read as app UI.
- Shadows: almost none. One allowed: `0 1px 2px rgb(30 29 27 / 0.06), 0 8px 24px rgb(30 29 27 / 0.06)` for the shrunk sticky header.
- Dividers: 1px `--greige-deep`.

---

## 6. Photography direction

The photos carry the brand, so they need rules too.

- **Before and after must match.** Same camera position, same lens, same height. A mismatched pair breaks the slider. Shoot the "before" with the after angle already in mind, and mark the tripod spot.
- **Afters:** natural daylight, lights on, staged but lived-in (a bowl of lemons, a folded towel). Shoot slightly wider than feels necessary so there's room to crop.
- **Befores:** shoot honestly, not to make them look worse. Same exposure as the after. A credible before makes the after believable.
- **Process shots** (framing, tile layout, Nathan on site) are allowed in a "How we work" section, in a smaller size. They show craft and are never the hero image.
- **Aspect ratios:** 3:2 landscape for heroes and sliders, 4:5 portrait for detail shots. Pairs in a slider must have identical dimensions.
- **Format:** AVIF with WebP fallback via `<picture>`. Always set `width` and `height` to prevent layout shift. Hero images `fetchpriority="high"`, everything else `loading="lazy"`.

---

## 7. Components

### 7.1 Sticky header (shrinks on scroll, tap-to-call always visible)

**Structure, left to right:** wordmark · nav (desktop) · **Call button** · "Get an estimate" button (desktop only)

| State | Height | Background | Wordmark | Shadow |
|---|---|---|---|---|
| Top of page | 88px desktop / 72px mobile | `--paper` at 0% → transparent over the hero | 100% | none |
| Scrolled (> 80px) | 64px desktop / 56px mobile | `--paper` at 92% + `backdrop-filter: blur(12px)` | scales to 80% | header shadow (§5) |

**Tap-to-call is always visible at every width and every scroll position.**
- It's a real link: `<a href="tel:+1302XXXXXXX">`. Replace with the business number.
- **Desktop:** a teal outline button with a phone icon plus the full number, "(302) XXX-XXXX". The number itself is the label.
- **Mobile:** a solid teal button with a phone icon and the word "Call", minimum **44×44px** tap target, pinned to the right of the header. The hamburger sits to its left. The Call button never collapses into the menu.
- Accessible name: `aria-label="Call New Look Homes at (302) XXX-XXXX"`.
- When the header sits transparent over a dark hero photo, the Call button stays solid teal with white text (9.42:1), so it never depends on the photo behind it.

**Motion:**
- Height, padding and wordmark scale change over **240ms**, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Animate with `transform: scale()` on the wordmark and a class toggle on the header, not by animating `height` every frame.
- Trigger: an IntersectionObserver on a 1px sentinel at the top of the page, not a scroll listener. There's no hide-on-scroll-down: the header is always present, because the Call button is always needed.
- Under `prefers-reduced-motion: reduce`, the shrink is instant, with no transition.

```css
.site-header { position: sticky; top: 0; z-index: 50; height: 88px;
  transition: height 240ms var(--ease-out), background-color 240ms var(--ease-out), box-shadow 240ms var(--ease-out); }
.site-header.is-condensed { height: 64px; background: rgb(250 248 245 / 0.92);
  backdrop-filter: blur(12px); box-shadow: var(--shadow-header); }
.site-header .wordmark { transform-origin: left center; transition: transform 240ms var(--ease-out); }
.site-header.is-condensed .wordmark { transform: scale(0.8); }
@media (max-width: 767px) { .site-header { height: 72px; } .site-header.is-condensed { height: 56px; } }
```

### 7.2 Before-and-after slider (the signature component)

This is the "pulling the poster away" moment from §2A. It responds to drag. It never auto-plays or animates by itself.

**Anatomy**
- Two stacked images of identical size. The **after** sits underneath at full width, and the **before** sits on top, clipped with `clip-path: inset(0 calc(100% - var(--pos)) 0 0)`.
- **Divider:** a 2px `--white` vertical line with a subtle shadow so it reads on light photos.
- **Handle:** a 48px circle in `--teal` with a white ↔ chevron pair and a 2px white ring, centered on the divider. The hit area extends to 56px.
- **Labels:** "Before" top-left and "After" top-right. DM Sans 13px, 600, uppercase, 0.14em tracking, white on a `rgb(30 29 27 / 0.55)` pill (4.74:1+). Each label fades to 0 when the divider is within 15% of it, so it doesn't sit over the edge.
- **Caption below** (outside the image): the spec line from §2B.

**Interaction**
- **Initial position: 50%.**
- **Drag:** Pointer Events (`pointerdown` / `pointermove` / `pointerup` with `setPointerCapture`), so mouse, touch and pen use one code path. The divider tracks the pointer 1:1 with **no easing while dragging**. Lag makes it feel broken.
- **Click/tap anywhere on the image:** the divider moves to that point over **200ms** ease-out.
- **Touch and scrolling:** set `touch-action: pan-y` on the slider so vertical swipes still scroll the page and horizontal drags move the divider. This matters most on phones, where most visitors will arrive from Google and Facebook.
- **Keyboard:** the handle is an `<input type="range" min="0" max="100" value="50">` (visually hidden, with the handle as its visual) or `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and `aria-valuetext="Showing 50% before, 50% after"`. Arrow keys move 2% and Page Up/Down move 10%. Home shows the full before, End the full after. The focus ring is a 3px `--teal` outline with a 2px offset (`--teal-on-dark` on dark sections).
- **Accessible name:** `aria-label="Before and after comparison: Kitchen remodel, Camden"`. Both images keep real alt text.
- **Performance:** update one CSS custom property (`--pos`) inside `requestAnimationFrame`. No layout reads during drag. Both images are preloaded before the slider becomes interactive. Until they load, show `--greige-deep` at the correct aspect ratio.
- **No JS:** if JavaScript doesn't run, the before and after show side by side (stacked on mobile), each with its label. Nothing is hidden.

```css
.ba { position: relative; aspect-ratio: 3 / 2; overflow: hidden; touch-action: pan-y; cursor: ew-resize; --pos: 50%; }
.ba img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.ba .before { clip-path: inset(0 calc(100% - var(--pos)) 0 0); }
.ba .divider { position: absolute; top: 0; bottom: 0; left: var(--pos); width: 2px;
  transform: translateX(-1px); background: var(--white); box-shadow: 0 0 8px rgb(0 0 0 / 0.25); }
.ba .handle { position: absolute; top: 50%; left: var(--pos); width: 48px; height: 48px;
  transform: translate(-50%, -50%); border-radius: 50%; background: var(--teal); border: 2px solid var(--white); }
.ba.is-animating .before, .ba.is-animating .divider, .ba.is-animating .handle {
  transition: clip-path 200ms var(--ease-out), left 200ms var(--ease-out); }
```

**Where sliders appear:** one large slider at the top of each project page (the reveal), one featured slider on the homepage, and one per project in the portfolio index. Never more than one slider visible on screen at a time.

### 7.3 Section header

The editorial headline block from §2B, and the **only** element that gets a scroll reveal.

```
EYEBROW (DM Sans 13px, uppercase, --teal)
Headline in Cormorant (H2)
Optional one-line deck in DM Sans 19px, --charcoal-soft
```
- A 48px × 1px `--stone` rule may sit above the eyebrow as an ornament.
- Left-aligned by default. Centered only on the homepage hero and the final CTA.

### 7.4 Buttons

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--teal` → `--teal-hover` | `--white` | none | "Get a free estimate", "Call" |
| Secondary | transparent | `--teal` | 1px `--teal` | "See the project", desktop phone number |
| Text link | none | `--teal`, underline 1px offset 3px | none | Inline links, "View all projects →" |
| On dark | `--paper` | `--ink` | none | Primary CTA inside the dark reveal band |

- Height 48px (44px minimum on mobile), horizontal padding 24px, radius 2px.
- Hover: color shift over 150ms. No lift, no scale, no glow.
- Focus-visible: 3px outline in `--teal` with a 2px offset on every interactive element.
- Labels are verbs and specific: "Get a free estimate", "See this kitchen". Never "Submit" or "Learn more".

### 7.5 Project card (portfolio index)
- An after photo at 4:5 or 3:2, square corners, with nothing over it.
- On hover (desktop only): a 400ms crossfade to the before photo, so the reveal works in reverse. Never on touch devices, where it's replaced by the slider on the project page.
- Below the photo: H3 project title in Cormorant ("A Victorian kitchen, opened up") and the spec line in DM Sans 14px, `--charcoal-soft` ("Kitchen · Dover · 8 weeks").

### 7.6 The dark reveal band
One full-width `--ink` section per page, at most. It's used for the featured transformation or a testimonial from a homeowner. Text is `--paper`, the accent is `--teal-on-dark`, the headline is Cormorant at H1 size and the photo is full-bleed. This band is the page's "lights down" moment. Using it twice weakens it.

### 7.7 Estimate form
- Fields: Name, Phone, Email (optional), Project type (select: Kitchen, Bathroom, Basement, Addition, Whole home, Other), Town, Short description, Photo upload (optional).
- Labels sit above fields, DM Sans 14px 500, `--charcoal`. No placeholder-only labels.
- Inputs: 48px height, 1px `--line-strong` border (3.88:1), `--white` background, 2px radius, and on focus a 2px `--teal` border plus focus ring.
- Errors: inline, under the field, in `--charcoal` with a ⚠ icon and a plain-language message ("Add a phone number so Nathan can call you back"). Don't rely on red alone.
- A tap-to-call alternative sits next to the submit button: "Rather talk? Call (302) XXX-XXXX."

### 7.8 Trust signals
Presented editorially, not as a badge wall: one line of DM Sans caption text ("Licensed & insured in Delaware · Serving Kent County since [year]"), a short quote from Nathan in Cormorant italic, and real reviews with first name and town. No stock "100% Satisfaction" seals.

---

## 8. Motion spec

Motion supports the reveal. It never decorates. **Only three things move on this site:**

| # | What | Trigger | Spec |
|---|---|---|---|
| 1 | Sticky header shrink | Scroll past 80px | 240ms, `--ease-out`, height + wordmark scale + background (§7.1) |
| 2 | Before-and-after slider | User drag / tap / keys | 1:1 during drag; 200ms `--ease-out` on tap-to-jump (§7.2) |
| 3 | Section header reveal | Header enters viewport | Rule draws in (520ms) → headline wipes on left-to-right (760ms), once. Not a fade-up |

Plus two hover-only micro-states: the button color shift (150ms) and the project card crossfade (400ms, desktop).

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 150ms;
  --dur-base: 240ms;
  --dur-reveal: 600ms;
}
```

### Scroll reveal rules (section headers only)
- Applies to section headers only: the ornament rule, eyebrow, headline and deck.
- **The motion is a wipe, not a fade-up.** The 48px rule scales in from the left (0ms, 520ms). The eyebrow fades in (120ms delay). The headline is revealed by `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)` (180ms delay, 760ms), moving left to right like the before-and-after divider. The deck fades in last (520ms delay). Nothing translates vertically.
- **Never** on photos, sliders, body text, cards, buttons, forms or the footer. Photos are already there when the visitor arrives, the way the finished room is already there behind the poster.
- IntersectionObserver with `threshold: 0.2` and `rootMargin: "0px 0px -10% 0px"`. Once revealed, unobserve. No reverse on scroll-up.
- **Progressive enhancement:** headers are fully visible by default. JS adds a `.js-reveal` class to `<html>` before first paint, and only then does the hidden starting state apply. If JS fails, nothing is invisible.
- Headers already in the viewport on load (the hero) don't animate. They're just there.

```css
.js-reveal .reveal:not(.is-visible) .reveal-rule { transform: scaleX(0); }
.js-reveal .reveal:not(.is-visible) .reveal-eyebrow,
.js-reveal .reveal:not(.is-visible) .reveal-deck { opacity: 0; }
.js-reveal .reveal:not(.is-visible) .reveal-title { clip-path: inset(0 100% 0 0); }
.reveal-rule  { transform-origin: left center; transition: transform 520ms var(--ease-out); }
.reveal-eyebrow { transition: opacity 400ms var(--ease-out) 120ms; }
.reveal-title { clip-path: inset(0 0 0 0); transition: clip-path 760ms var(--ease-out) 180ms; }
.reveal-deck  { transition: opacity 500ms var(--ease-out) 520ms; }
```
(The live implementation is in `app/globals.css`.)

### Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  .js-reveal .reveal .reveal-rule { transform: none !important; }
  .js-reveal .reveal .reveal-eyebrow, .js-reveal .reveal .reveal-deck { opacity: 1 !important; }
  .js-reveal .reveal .reveal-title { clip-path: none !important; }
}
```
The slider still works under reduced motion, since it's user-driven. Only its 200ms tap-to-jump becomes instant.

### Never
Parallax, auto-playing carousels, auto-animating sliders, counters that tick up, fade-in on every paragraph, scroll-jacking, cursor followers, loading spinners on page entry.

---

## 9. Page anatomy (homepage)

1. **Header.** Sticky, transparent over the hero, with Call always visible.
2. **Hero.** A full-bleed *after* photo of the strongest project. Display headline in Cormorant over a dark gradient at the bottom-left only (or set below the photo on mobile). One primary CTA, "Get a free estimate", next to the Call button.
3. **Featured reveal.** A section header plus one large before-and-after slider with its spec caption.
4. **Selected work.** An asymmetric grid of 4–6 project cards. "View all projects →".
5. **Services.** Kitchens, Bathrooms, Basements, Additions, Whole-home. Text-led with one photo each, no icons.
6. **Dark reveal band.** A homeowner testimonial over a full-bleed after photo.
7. **How we work.** Four steps with process photos, ending with "Nathan is on every job."
8. **Final CTA.** Centered Cormorant headline ("Let's see what your home could look like."), the estimate form and the phone number.
9. **Footer.** `--ink` background, NAP (name, address, phone), service area towns (Dover, Camden, Smyrna, Milford, Magnolia, Felton…), license number.

---

## 10. Accessibility and performance checklist

- [ ] Every text/background pair is from the contrast table in §3
- [ ] Tap-to-call is visible at 320px width and at every scroll position
- [ ] All tap targets are ≥ 44×44px
- [ ] Slider works with mouse, touch, pen and keyboard; has an accessible name and value text
- [ ] Visible focus ring on every interactive element
- [ ] `prefers-reduced-motion` respected
- [ ] Content is fully visible with JS disabled
- [ ] No horizontal scroll at 320px; 16px side gutters on mobile
- [ ] Fonts `display=swap`; only the 5 listed weights loaded
- [ ] Images AVIF/WebP with explicit dimensions; LCP hero `fetchpriority="high"`
- [ ] Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-range phone

---

## 11. Quick "is this on-brand?" test

1. Would this look at home in a Dwell before-and-after spread? If it looks like a template, it isn't on-brand.
2. Is the after photo the loudest thing on screen? If not, quiet everything else.
3. Is teal used in more than two places in this view? Remove one.
4. Is Cormorant below 28px anywhere? Switch to DM Sans.
5. Is something moving that the visitor didn't touch, other than a section header arriving? Remove the motion.
6. Can a visitor on a phone call Nathan from here in one tap? If not, fix that first.
