export const wooferryCaseStudy = {
  title: 'WooFerry',
  subtitle: 'A Shopify embedded app that moves WooCommerce stores safely—without installing anything on the WordPress site.',
  summary: {
    role: 'Solo Product + Full-stack Engineering',
    stack: 'Shopify · WooCommerce REST API · Background jobs',
    status: 'LIVE',
    outcome: 'Previewable, resumable store migration',
  },
  stake: 'A store migration is not a file import. It is a one-time operation where silent data loss can damage a live business.',
  problem: [
    'Moving from WooCommerce to Shopify usually means manual CSV work, a paid agency engagement, or installing another plugin on the old WordPress site. Each option adds setup, risk, or both.',
    'The platforms also disagree about how commerce data is shaped. WooCommerce permits unrestricted product variations; Shopify supports up to three options and 100 variants. Images, categories, SEO fields, metafields, customers, and account access all need deliberate translation rather than blind copying.',
  ],
  architectureSteps: [
    {
      id: 'connect',
      label: 'CONNECT',
      caption: 'The merchant enters the source URL and approves read access through WooCommerce’s own REST API authorization flow—no WordPress plugin required.',
    },
    {
      id: 'preview',
      label: 'PREVIEW',
      caption: 'WooFerry scans the catalog, detects compatibility issues, and previews representative Shopify products before anything is written.',
    },
    {
      id: 'migrate',
      label: 'MIGRATE',
      caption: 'A leased background job reads, transforms, writes, and checkpoints products, images, collections, metafields, SEO data, and customers.',
    },
    {
      id: 'verify',
      label: 'VERIFY',
      caption: 'Writes are verified, failures can be retried, and products that exceed Shopify limits are routed to manual review instead of being truncated.',
    },
  ],
  hardMoments: [
    {
      number: '01',
      title: 'The demo worked. 9,000 products did not.',
      problem: 'The first scanner ran inside one HTTP request and made an extra variation-count request for every variable product. Large catalogs timed out and lost all progress.',
      decision: 'Request only required fields, infer overflow from the existing product response, and move the scan to a background job that checkpoints after every page. The preview now uses a handful of filtered queries instead of walking the catalog, so its cost stays bounded as stores grow.',
      evidence: 'THOUSANDS OF REQUESTS → ABOUT 90',
      learning: 'Anything whose cost grows with merchant data belongs outside the request lifecycle.',
    },
    {
      number: '02',
      title: 'Retries had to be safe by construction.',
      problem: 'A crash, worker restart, or double-click could otherwise create duplicate products in a merchant’s live Shopify store.',
      decision: 'Assign every source product a stable hashed ID, upsert against it, lease jobs with owner checks, and enforce one unfinished migration per shop in the database.',
      evidence: 'AT-LEAST-ONCE PROCESSING / IDEMPOTENT WRITES',
      learning: 'Retry safety comes from the data model and constraints, not from hoping code runs once.',
    },
    {
      number: '03',
      title: 'Real WordPress sites were not like the docs.',
      problem: 'Wordfence, Sucuri, Cloudflare, hosting rules, and plain permalinks made valid stores appear unreachable even with correct credentials.',
      decision: 'Use a descriptive HTTP user agent, detect common REST-routing problems, and replace opaque connection errors with specific remediation guidance.',
      evidence: 'NO PLUGIN / MANY HOSTS / EXPLICIT DIAGNOSTICS',
      learning: 'The difficult part of a plugin-free integration is the ecosystem surrounding the API.',
    },
    {
      number: '04',
      title: 'Compliance changed the architecture.',
      problem: 'Customer data, installation, uninstall cleanup, consent, and retention are platform constraints—not paperwork that can be added after launch.',
      decision: 'Move to Shopify-managed installation and token exchange, add GDPR webhooks and data purging, and roll back customer scopes until existing installs can approve protected-data access.',
      evidence: 'SHOPIFY-MANAGED INSTALL / GDPR / RETENTION',
      learning: 'Marketplace rules shape the product, its rollout, and the underlying system design.',
    },
  ],
  trustRules: [
    {
      label: 'FLAG, NEVER TRUNCATE',
      detail: 'Products above Shopify’s three-option or 100-variant limit enter manual review rather than losing variants silently.',
    },
    {
      label: 'MAKE TRANSFORMS VISIBLE',
      detail: 'Shortcode removal, SEO trimming, ignored noise fields, and other fidelity changes are documented and testable.',
    },
    {
      label: 'PREFER REVERSIBLE STATES',
      detail: 'Empty categories become smart collections that can fill later instead of permanent skipped records with stale reasons.',
    },
    {
      label: 'TEST THE UGLY DATA',
      detail: 'The migration matrix covers slug collisions, empty prices, comma decimals, shortcode edge cases, and other imperfect inputs.',
    },
  ],
  productDecisions: [
    {
      title: 'Prove it before charging',
      detail: 'One product can be migrated free as a Shopify draft. Failed attempts do not consume the free run, and retries cannot create duplicates.',
    },
    {
      title: 'Charge for the job, not the calendar',
      detail: 'The complete migration is a single $8.99 purchase through Shopify Billing because migration is a one-time event, not a recurring service.',
    },
    {
      title: 'Keep the funnel flexible',
      detail: 'Merchants can purchase as soon as a preview exists; those who trust the preview are not forced through a demo migration first.',
    },
    {
      title: 'Explain inside the workflow',
      detail: 'Badges, tooltips, compatibility notices, and troubleshooting states reduce uncertainty for non-technical merchants during a high-stakes move.',
    },
  ],
  nextSteps: [
    'Connect WordPress-only sites through Application Passwords',
    'Migrate blog posts and page content',
    'Support multi-store agency workflows',
  ],
};
