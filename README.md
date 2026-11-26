# A-1 Drain Cleaning website

Astro static website for A-1 Drain Cleaning in Mason City, Iowa.

- Production domain: https://a-1drain.com/
- Repository: https://github.com/a1draincleaning/a1draincleaning.github.io
- Hosting: GitHub Pages
- Framework: Astro static site generation
- Business phone: 641-530-2728
- Business address: 206 29th St SW, Mason City, Iowa 50401

## Source of truth

- Confirmed services: `src/data/services.ts`
- JSON-LD service entities: `src/data/schemaServices.ts`
- Business details: `src/data/business.ts`
- Service-area directory communities: `src/data/serviceAreaCities.ts`
- Dedicated city-page routes: `src/data/serviceAreaCityPages.ts`
- Shared SEO and JSON-LD: `src/layouts/MainLayout.astro`

Keep distinct drain services separate. Do not turn symptom pages into service offerings or add services that A-1 has not confirmed.

## Contact form

The contact form is in `src/components/ContactCTA.astro` and posts through FormSubmit.co. Form delivery depends on the recipient address being verified with FormSubmit; test the form before relying on it for customer leads.

## Custom domain

- Canonical site URL in Astro: `https://a-1drain.com`
- Build-time CNAME file: `public/CNAME`
- CNAME contents: `a-1drain.com`

The CNAME file is a build artifact input. It does not, by itself, prove that GitHub Pages has the custom domain configured, that DNS is correct, or that HTTPS and redirects work. Verify those separately in GitHub Pages settings and with live DNS/HTTP checks.

## AI crawler policy

- Search/retrieval access remains allowed for OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Googlebot, and Applebot.
- GPTBot, ClaudeBot, Applebot-Extended, and CCBot are disallowed as training or broad dataset crawlers.
- Google-Extended is explicitly allowed to retain Gemini Apps grounding eligibility. Google documents that this also permits its stated Gemini model-training use. Blocking Google-Extended would not remove the site from Google Search or Search AI features, but would limit non-Search Gemini grounding.
- robots.txt is a voluntary crawler policy, not a security boundary. Malicious scrapers that ignore it require server/CDN controls.

## Local development and validation

```sh
npm install
npm test
npm run check
npm run build
```

Keep the existing Astro architecture and GitHub Pages deployment. Make changes on the assigned feature branch, not directly on `main`.
