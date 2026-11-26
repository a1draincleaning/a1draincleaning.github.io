# Qwen Code Instructions — A-1 Drain Cleaning

## Project
- This repository is the production website for A-1 Drain Cleaning, based in Mason City, Iowa.
- Repository: https://github.com/a1draincleaning/a1draincleaning.github.io
- Production site: https://a-1drain.com
- Stack: Astro static site generation, Tailwind CSS, GitHub Pages, GitHub Actions.
- Default branch: main.

## Non-negotiable safeguards
- Work in the existing project. Do not start over, migrate frameworks, or redesign the site.
- Do not delete working files, dependencies, scripts, routes, content, or deployment configuration.
- Before editing, inspect the relevant files and current Git history. Make the smallest change that fixes a verified problem.
- Never overwrite a file without reading its current contents first.
- Do not add Qwen, AI SDKs, model runtimes, API keys, or server code as dependencies of the public website. Qwen Code is a development tool, not a production website feature.
- Never put API keys, tokens, credentials, or other secrets in tracked files, source code, commits, or GitHub Pages output.
- Do not change GitHub Actions, Astro configuration, sitemap behavior, canonical URLs, analytics, consent settings, or SEO metadata unless the task specifically requires it and the change is verified.
- Do not claim a fix, test, deployment, indexing result, or commit succeeded unless the relevant command or GitHub result confirms it.

## Business and content
- Always use the full business name: A-1 Drain Cleaning.
- Business location: 206 29th St SW, Mason City, Iowa 50401.
- Phone: 641-530-2728.
- Service area: Mason City and nearby communities. Do not add Hardin or Chickasaw County.
- Confirmed services: Floor Drain Cleaning; Basement Drain Cleaning; Garage Drain Cleaning; Utility Sink Drain Cleaning; Kitchen Drain Cleaning; Bathroom Drain Cleaning (including bathroom sink, shower, and bathtub drains); Roof Drain Cleaning; Storm Drain Cleaning; Yard Drain Cleaning; Main Drain Cleaning; Sewer Line Cleaning; Drain & Sewer Camera Inspections; Tree Root Removal and Cutting; Hydro Jetting; Smoke Testing; Sewer Line Locating; Laundry/Washing Machine Drain Cleaning; Toilet Unclogging; Emergency Drain Cleaning; Septic Line Cleaning; Dishwasher Drain Service; Garbage Disposal Repair and Installation; Sump Pump Repair; and Sewer Backup Emergency Service. Keep the service list limited to confirmed work.
- Floor Drain Cleaning is the service name; a floor-drain backup is a symptom. Keep Basement Drain Cleaning as a separate service. Bathroom Drain Cleaning covers bathroom sink, shower, and bathtub drains; kitchen drains remain a separate service.
- A-1 offers 24/7 service; do not describe this as a guarantee.
- The 25-years-experience statement belongs only on the About page.
- Write in direct, plain language with a practical Midwestern contractor's voice. Avoid corporate marketing language and generic filler.
- Keep city and service pages factually distinct. Do not fabricate local soil, pipe, housing, municipal, or service claims.

- Dedicated Iowa city pages: Mason City, Clear Lake, Charles City, Forest City, Garner, Hampton, Nora Springs, Northwood, and Rockwell. Albert Lea, Minnesota, is included in the service-area directory.
- The service-area directory covers communities in Cerro Gordo, Floyd, Franklin, Hancock, Mitchell, Winnebago, Worth, Wright, and Butler counties. These are directory communities, not county landing pages.

## Astro and deployment
- Preserve static GitHub Pages deployment and the existing Astro architecture.
- Use semantic HTML such as main, section, address, time, and article where appropriate.
- Keep pages accessible, responsive, and lightweight. Optimize images and provide explicit dimensions.
- Preserve the existing deployment workflow at .github/workflows/deploy.yml.
- Use the repository's existing package scripts. Validate relevant changes with:
  - npm run check
  - npm run build
- Inspect the build output and workflow implications before proposing deployment-sensitive changes.

## SEO and structured data
- Preserve the canonical production domain: https://a-1drain.com
- Preserve existing sitemap integration and trailing-slash routing unless a verified fix requires otherwise.
- Keep structured data accurate and use the most specific supported Schema.org types. Do not invent reviews, ratings, credentials, service coverage, or business attributes.
- Avoid keyword stuffing, duplicate city-page copy, and unsupported claims.
- Distinguish a sitemap being generated or fetched from URLs actually being indexed by search engines.

## Working method
1. State the exact issue and identify the files involved.
2. Inspect existing code and configuration before editing.
3. Make a minimal, isolated change.
4. Run the applicable checks and report actual output.
5. Summarize changed files, commit SHA, and any remaining manual steps.
6. Ask before destructive actions, broad refactors, or changes with production impact.
