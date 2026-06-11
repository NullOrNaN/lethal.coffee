# UX Tweaks - Design Suggestions

## Summary of Review
Reviewed the current design in `index.astro` and `main.css`. The site has a strong dark-mode aesthetic with a cohesive color palette and modern card-based layout. The overall design is solid, but here are suggested tweaks from a UX standpoint:

---

## 1. Typography & Readability

### Hero Section Typography
**Current Issue:** The hero h2 has `text-wrap: balance` which can cause awkward reflow on some devices and may reduce readability on smaller screens.

**Suggestion:** Change to `text-wrap: pretty` or remove the `text-wrap` property entirely to let the text flow naturally.

```css
/* Current */
.hero-header h2 {
  text-wrap: balance;
}

/* Suggested */
.hero-header h2 {
  text-wrap: pretty;
}
```

### Hero Body Text
**Current Issue:** `.hero-body` has `max-width: 60ch` which is quite long and may cause the text to wrap awkwardly on smaller screens.

**Suggestion:** Reduce to `48ch` or `52ch` for better line length and readability.

```css
/* Current */
.hero-body {
  max-width: 60ch;
}

/* Suggested */
.hero-body {
  max-width: 52ch;
}
```

### Nicknote Box Padding
**Current Issue:** `.hero-nickname-note` has `padding: 0.85rem 1rem` which creates inconsistent horizontal padding.

**Suggestion:** Use `padding: 0.85rem 1.15rem` for more consistent proportions with button padding.

```css
/* Current */
.hero-nickname-note {
  padding: 0.85rem 1rem;
}

/* Suggested */
.hero-nickname-note {
  padding: 0.85rem 1.15rem;
}
```

---

## 2. Button UX Improvements

### Button Size
**Current Issue:** Buttons have `min-height: 2.9rem` which is slightly small on mobile.

**Suggestion:** Increase to `min-height: 3.25rem` for better thumb reachability on mobile devices.

```css
/* Current */
.button {
  min-height: 2.9rem;
}

/* Suggested */
.button {
  min-height: 3.25rem;
}
```

### Button Transition Timing
**Current Issue:** Button transitions are at `160ms` which feels a bit quick.

**Suggestion:** Increase to `200ms` for a more deliberate, premium feel.

```css
/* Current */
.button {
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease;
}

/* Suggested */
.button {
  transition:
    transform 200ms ease,
    border-color 200ms ease,
    background-color 200ms ease,
    box-shadow 200ms ease;
}
```

### Button Text Shadow
**Current Issue:** `.card:hover .card-link` has `text-shadow: 0 0 18px rgba(142, 240, 255, 0.18)` which may bleed into adjacent cards.

**Suggestion:** Reduce to `0 0 12px` or `0 0 15px` for less visual noise.

```css
/* Current */
.card:hover .card-link {
  text-shadow: 0 0 18px rgba(142, 240, 255, 0.18);
}

/* Suggested */
.card:hover .card-link {
  text-shadow: 0 0 12px rgba(142, 240, 255, 0.18);
}
```

---

## 3. Card Interactions

### Card Hover Transform
**Current Issue:** Cards have `transform: translateY(-2px)` on hover which may cause subtle layout shifts.

**Suggestion:** Add `will-change` for GPU acceleration and consider `translateY(-3px)` for more noticeable interaction.

```css
/* Current */
.card {
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

/* Suggested */
.card {
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}
.card:hover,
.card:focus-within {
  transform: translateY(-3px);
}

/* Add to both card and .card:hover for consistency */
.card {
  will-change: transform;
}
```

### Card Focus Scope
**Current Issue:** Cards have `.card:focus-within` which affects all nested elements.

**Suggestion:** Consider limiting to `.card-header:focus-within` or `.card-title:focus-within` to reduce unnecessary state changes.

```css
/* Current */
.card:focus-within {
  transform: translateY(-2px);
  border-color: var(--border-strong);
  box-shadow: var(--glow-mix);
}

/* Suggested */
.card-header:focus-within {
  transform: translateY(-2px);
  border-color: var(--border-strong);
  box-shadow: var(--glow-mix);
}
```

---

## 4. Logo/Icon Interactions

### Logo Scale on Card Focus
**Current Issue:** `.card:hover .project-logo` and `.card:focus-within .project-logo` both have `transform: scale(1.05)`.

**Suggestion:** Remove `transform: scale(1.05)` from `.card:focus-within` to keep focus state more subtle and less distracting.

```css
/* Current */
.card:hover .project-logo,
.card:focus-within .project-logo {
  transform: scale(1.05);
}

/* Suggested */
.card:hover .project-logo {
  transform: scale(1.05);
}

.card:focus-within .project-logo {
  /* Remove transform or make it subtle */
  border-color: rgba(255, 159, 232, 0.15);
}
```

---

## 5. Responsive Breakpoints

### Mobile Padding
**Current Issue:** At `max-width: 640px`, `.hero` has `padding: 1.25rem` which may be too much for small screens.

**Suggestion:** Reduce to `1rem` for tighter, more mobile-optimized spacing.

```css
/* Current */
@media (max-width: 640px) {
  .hero {
    padding: 1.25rem;
    gap: 1.25rem;
  }
}

/* Suggested */
@media (max-width: 640px) {
  .hero {
    padding: 1rem;
    gap: 1.1rem;
  }
}
```

### Skill Tags Spacing
**Current Issue:** `.skill-tags` has `gap: 0.45rem` which may be too tight on mobile.

**Suggestion:** Reduce to `0.35rem` for better tag readability on small screens.

```css
/* Current */
.skill-tags {
  gap: 0.45rem;
}

/* Suggested */
@media (max-width: 640px) {
  .skill-tags {
    gap: 0.35rem;
  }
}
```

---

## 6. Accessibility Enhancements

### Skip Link Visibility
**Current Issue:** `.skip-link` has `opacity: 0` and transitions.

**Suggestion:** Consider using `visibility: hidden` instead of `opacity: 0` to ensure screen readers can still find the link, then use `opacity: 1` with `visibility: visible` on focus.

```css
/* Current */
.skip-link {
  opacity: 0;
  transition: top 200ms ease, opacity 200ms ease;
}

.skip-link:focus {
  opacity: 1;
}

/* Suggested */
.skip-link {
  opacity: 0;
  visibility: hidden;
}

.skip-link:focus {
  opacity: 1;
  visibility: visible;
}
```

### Proof Card Focus
**Current Issue:** `.proof-card` has no specific focus state.

**Suggestion:** Add a subtle focus ring for better keyboard navigation visibility.

```css
/* Add to .proof-card */
.proof-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

---

## 7. Color & Contrast Tweaks

### Border Visibility
**Current Issue:** Some borders may be too subtle in dark mode.

**Suggestion:** Slightly increase border alpha values for better visibility.

```css
/* Current */
:root {
  --border: rgba(172, 239, 255, 0.22);
  --border-strong: rgba(255, 173, 240, 0.36);
}

/* Suggested */
:root {
  --border: rgba(172, 239, 255, 0.28);
  --border-strong: rgba(255, 173, 240, 0.42);
}
```

### Text Contrast
**Current Issue:** `.proof-meta` at `0.76rem` may be too small on some devices.

**Suggestion:** Increase to `0.82rem` for better readability.

```css
/* Current */
.proof-meta {
  font-size: 0.76rem;
}

/* Suggested */
.proof-meta {
  font-size: 0.82rem;
}
```

---

## 8. Performance Considerations

### Image Loading
**Current Issue:** Profile image uses `loading="eager"` which may delay initial page load.

**Suggestion:** Consider `loading="lazy"` with `decoding="auto"` for better perceived performance.

```astro
<!-- Current -->
<ResponsiveImage loading="eager" />

<!-- Suggested -->
<ResponsiveImage loading="lazy" decoding="auto" />
```

### Animation Performance
**Current Issue:** Multiple transitions on the same elements may cause performance issues.

**Suggestion:** Limit simultaneous transitions or use `will-change` more selectively.

```css
/* Add selective will-change */
.card:hover {
  will-change: transform, box-shadow;
}

.proof-card:hover {
  will-change: transform;
}
```

---

## 9. Layout Improvements

### Section Spacing
**Current Issue:** Consistent `margin-top: 2rem` on all sections may not account for varying content heights.

**Suggestion:** Use dynamic spacing based on content height or add a `margin-bottom` for better visual separation.

```css
/* Current */
section {
  margin-top: 2rem;
}

/* Suggested */
section {
  margin-top: 2rem;
  margin-bottom: 1.5rem;
}

/* Or use more dynamic spacing */
#what-i-do {
  margin-top: 2rem;
}

#selected-work {
  margin-top: 3rem;
}

#highlights {
  margin-top: 3.5rem;
}

#connect {
  margin-top: 3rem;
}
```

### Closing Section Padding
**Current Issue:** `.closing` has `padding: 2rem` which may be inconsistent with other sections.

**Suggestion:** Match the padding to other sections or make it responsive.

```css
/* Current */
.closing {
  padding: 2rem;
}

/* Suggested */
@media (max-width: 640px) {
  .closing {
    padding: 1.25rem;
  }
}
```

---

## 10. Visual Hierarchy

### Section Labels
**Current Issue:** Commented-out `.section-label` elements suggest they were considered but not implemented.

**Suggestion:** Uncomment and style the section labels for better visual hierarchy.

```astro
<!-- Current (commented) -->
<!-- <p class="section-label">What I Do</p> -->

<!-- Suggested -->
<p class="section-label">What I Do</p>
```

```css
/* Add to main.css */
.section-label {
  color: var(--accent-alt);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.78rem;
  margin-bottom: 0.85rem;
}
```

---

## Priority Recommendations

### High Priority (Quick Wins)
1. Increase button `min-height` to 3.25rem for mobile
2. Reduce hero body `max-width` to 52ch
3. Add `.section-label` elements back
4. Improve skip link accessibility (add `visibility`)

### Medium Priority (Enhancements)
1. Increase border alpha values for better visibility
2. Add `.proof-card:focus-visible` styles
3. Remove transform from focused logos
4. Increase skill tags gap on mobile

### Low Priority (Polish)
1. Reduce text shadow on card links
2. Increase button transition timing
3. Dynamic section spacing
4. Add `will-change` selectively

---

## Implementation Notes

- Test all changes on multiple devices (mobile, tablet, desktop)
- Verify color contrast ratios after color tweaks
- Check keyboard navigation flow
- Monitor performance with Lighthouse after animation changes
- Ensure ARIA attributes remain consistent with visual changes

---

*Document created on June 8, 2026*