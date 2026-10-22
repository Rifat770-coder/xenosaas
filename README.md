# XenoSaas

An original, responsive single-page technology agency website built with Next.js App Router, TypeScript, React, Tailwind CSS, Motion, and Lucide. No database or separate backend is required.

## Run locally

Use Node.js 22.13+ (or a current supported LTS) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. On Windows PowerShell with restricted script execution, use `npm.cmd` in place of `npm`.

## Validate and build

```sh
npm run typecheck
npm run lint
npm run build
npm start
```

`next/font` downloads Geist at build time, so the first production build requires access to Google Fonts. All illustration assets are original local SVGs; no external image service is required.

## Content and configuration

- `src/config/site.ts`: company name, phone, WhatsApp, optional email and social links.
- `src/data/projects.ts`: clearly marked demonstration projects and dialog descriptions.
- `src/data/clients.ts`: placeholder partnership spaces. Replace these only with authorized client information and logos.
- `src/data/services.ts`: the six services.
- `src/data/testimonials.ts`: explicitly labeled sample feedback. Replace with verified testimonials before launch.
- `src/data/blogs.ts`: editorial previews with dialog copy. No fabricated publication dates.
- `src/data/navigation.ts`: section navigation.
- `src/app/globals.css`: design tokens, responsive layouts, interaction and ambient animation styles.

The homepage composes hero, work, clients, services, testimonials, blogs, and footer in the required order. Static sections are server components. Navigation, dialogs, motion wrappers, hero parallax, and testimonial controls use small client components.

All project actions and article previews open native modal dialogs with Escape support and focus restoration. Contact CTAs use the configured WhatsApp number. Telephone links use `tel:`. Email and social placeholders remain plain text until configured.

## Deploy

Deploy as a standard Next.js application on Vercel or a Node-capable host. Build with `npm run build`, then serve with `npm start`. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS production origin to enable canonical metadata. Do not configure an assumed domain. The app needs no secrets.

For a self-hosted deployment, place the Node process behind your HTTPS reverse proxy and set the platform's `PORT` environment variable as needed. This is not configured as a static export.

## Accessibility and motion

Semantic landmarks, a skip link, visible focus styles, active section navigation, an accessible mobile menu, keyboard-controlled feedback carousel, labeled dialogs, and reduced-motion support are included. Animations never gate access to important content. Mobile visuals use a reduced scale and four decorative background particles.

## Browser checks

After starting the site, run `npx playwright test`. The checks cover all requested viewport widths, section order, overflow, images, dialogs, mobile navigation, feedback controls, contact links, and reduced motion. On Windows the checks use installed Microsoft Edge; elsewhere they use Playwright Chromium (`npx playwright install chromium`). Override the channel with `PLAYWRIGHT_CHANNEL` if needed. Firefox, Safari, and Edge require additional manual or platform-specific validation; do not assume cross-browser certification from Chromium checks alone.

The reference was reviewed for its agency content hierarchy. No reference text, source code, images, or branded assets were copied. All portfolio and editorial illustrations are original SVGs.

## Dependency audit

The production dependency audit reported zero vulnerabilities during validation. npm reports five high advisories in a development-only chain (`eslint-config-next` > `fast-glob` > `micromatch` > `braces`). No patched compatible braces version was offered; npm proposed downgrading the Next.js lint configuration to an older major. The current matching Next.js lint configuration is retained. Recheck advisories when updating dependencies.

## Validated locally

- Production build, TypeScript, and ESLint passed.
- Sixteen Playwright checks passed in Edge/Chromium, including widths 375, 390, 768, 1024, 1440, and 1920 pixels.
- Desktop and mobile screenshots were visually inspected; local project and blog illustrations loaded successfully.
- No Lighthouse score was measured. Firefox and Safari were not tested in this environment.
- Set the actual production origin before deployment: the unconfigured local build correctly omits a canonical URL, and Next.js warns that social-image resolution falls back to localhost.

## Cinematic hero and motion upgrade

The original section order, data, contact links, dialogs, and navigation are retained. The hero now uses a centered gradient headline, layered emerald orbital glow, and an original demo workspace with analytics, project progress, design tokens, and an automation flow. A proposed ongoing-support pricing section is rendered after Services.

- `HeroDashboard.tsx`, `HeroOrbitalGlow.tsx`, and the existing `HeroVisual.tsx` compose the new visual.
- `useEntrance.ts` coordinates mount and one-time viewport animations using Motion. Server-rendered content is visible; animation starts only after hydration. Badge, headline lines, description, CTAs, arc, and dashboard enter sequentially over approximately two seconds.
- `ScrollReveal.tsx`, `StaggerReveal.tsx`, and the compatible `FadeIn.tsx` share the animation implementation. Section labels, headings, descriptions, cards, client placeholders, and footer columns reveal in sequence.
- `useDesktopMotion.ts` enables scroll-driven headline, dashboard, glow, scale, and orbital-opacity transforms only for fine-pointer desktop users without a reduced-motion preference. Motion values update without per-frame React state.
- Mobile hides the sidebar and two floating cards, removes particles and continuous dashboard float, and keeps the message and CTAs above the decorative preview.
- The former route `loading.tsx` is retained as `components/layout/LoadingState.tsx`. Removing the implicit Suspense loading boundary ensures the static homepage is visible with JavaScript disabled.

Motion checks exercise real entrance playback, scroll interpolation, touch-device parallax exclusion, reduced motion, one-time reveals, and JavaScript-disabled content visibility. Existing tests retain the six requested viewport widths and check actions, imagery, section order, and runtime errors. The reference video was not attached; the implementation follows the supplied written motion description.

## Scroll reveal only refinement

The existing hero entrance, theme, content, layout, hover interactions, and carousel remain unchanged. `useScrollReveal.ts` now handles viewport reveals separately from hero mount animations: 20% visibility, 0.65 seconds, 40px desktop travel (24px on mobile), and one-time playback. Card spacing is unchanged; `StaggerReveal` uses 120ms increments. Section labels, headings, descriptions, supporting notes, and footer content share this system. Reduced motion and keyboard focus reveal content immediately, and server HTML remains visible without JavaScript.

Validation passed: TypeScript, ESLint, production build, and 15 browser checks. A before/after comparison found identical position, dimensions, font size, and text color for 28 representative desktop elements. The browser checks also cover the six requested widths, real card stagger playback, keyboard focus, hero entrance, dialogs, navigation, carousel, and reduced motion.

## Coordinated reveals and visible pricing

The desktop heading and card groups now use a shared viewport trigger instead of independently starting every child. Heading/description timing uses 120ms steps; grids use a 100ms lead-in and 150ms card stagger. Reveals last 0.8 seconds with 60px travel, reduced to 24px on mobile. Card groups add a subtle 0.98-to-1 scale; text remains unscaled. Mobile uses per-item triggers so cards below the fold retain their entrance. Hero entrance code is unchanged. Reduced motion, focus visibility, once-only playback, and server-rendered fallback remain supported.

`src/data/pricing.ts` contains the proposed Starter, Growth, and Enterprise support arrangements. `PricingSection.tsx` is imported and rendered between Services and Testimonials. Growth uses a Recommended badge, not a sales-popularity claim. Each Get Started CTA opens the configured WhatsApp number with the selected plan in the message. No fixed prices or commercial launch claims are provided.

Latest validation: TypeScript, ESLint, production build, and 16 Edge/Chromium browser checks passed. Desktop and mobile pricing screenshots were visually reviewed. The reference video was not attached in this session, so no exact video-match claim is made.
