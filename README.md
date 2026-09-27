# Uncooked Jobs landing page

A complete visual rebuild of the supplied landing page, informed by the Mobbin report and saved references.

## Preview

Open `index.html` in a browser, or run `python3 -m http.server 8765` from this folder and visit http://localhost:8765.

No build or installation is required. Instrument Serif and Satoshi load from their existing font providers; local system fallbacks are included.

## Design

Warm paper surfaces, red accents, large editorial type, a readable front-facing product preview, a compact university strip, and consistent illustration cards. The dark belief section, event photography, polaroid reveal and oversized footer wordmark remain.

Desktop scrolling synchronizes the four product screens, text and progress indicator. Step buttons also work by mouse and keyboard. Mobile and reduced-motion layouts use direct step controls without a long pinned scroll. The passport preview supports summary/work selection. FAQ controls and the mobile menu work by keyboard.

## Files

- `index.html`: semantic page markup and existing FAQ structured data.
- `styles.css`: responsive visual system.
- `app.js`: product steps, passport preview, photo reveal, menu and FAQ behavior.
- `uploads/`: original supplied assets.

## Checked

Browser checks passed at 320, 390, 768, 1024 and 1440px, with no horizontal overflow. All four scroll-driven and click-driven stages, passport selection, mobile menu, FAQ and photo reveal were exercised. Reduced-motion behavior, image loading and JavaScript errors were checked. Source headings, paragraphs, FAQ copy and testimonial fields were compared programmatically and retained.

## Existing content dependencies

Testimonial attribution placeholders remain exactly as supplied. The source also mixes WhatsApp notification badges with iMessage-labelled screenshots and live-versus-launch wording; these were retained for a separate content decision. Several destination URLs (including hiring, privacy and the founder story) were placeholders in the original project and still need their real destinations. Existing signup and social URLs remain. No site was published.
