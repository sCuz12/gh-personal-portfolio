export const symvaseisCaseStudy = {
  title: 'Symvaseis.cy',
  subtitle: 'A procurement intelligence platform that turns fragmented European tender records into connected, searchable information about public awards in Cyprus.',
  summary: {
    role: 'Data Platform + Full-stack Engineering',
    stack: 'Go · PostgreSQL · Telegram API · MCP',
    status: 'PRODUCTION',
    outcome: 'Procurement data people and AI assistants can investigate',
  },
  stake: 'Public procurement data existed, but not in a form that made public spending easy to understand.',
  problem: [
    'Award data was distributed through spreadsheets and source records that were difficult to connect. Answering practical questions—such as which contracts a company had won or how much an authority had awarded—required manually interpreting rows with inconsistent names and little useful context.',
    'Symvaseis.cy was built to give those records structure: ingest notices from Tenders Electronic Daily, resolve recurring entities, and organize tenders and awards around the contractors and authorities involved.',
  ],
  architectureSteps: [
    {
      id: 'ingest',
      label: 'INGEST',
      caption: 'Go workers collect tender and award notices from Tenders Electronic Daily on a scheduled cadence.',
    },
    {
      id: 'extract',
      label: 'EXTRACT',
      caption: 'Relevant fields are separated from noisy source records and translated into a consistent procurement model.',
    },
    {
      id: 'resolve',
      label: 'RESOLVE',
      caption: 'Entity matching reconciles naming variations so the same contractor or authority can be followed across records.',
    },
    {
      id: 'publish',
      label: 'PUBLISH',
      caption: 'PostgreSQL-backed data becomes available through the web explorer, Telegram updates, and an MCP server for AI assistants.',
    },
  ],
  decisions: [
    {
      number: '01',
      title: 'Model entities, not spreadsheet rows',
      choice: 'Awards are connected to contractors and contracting authorities, making histories and aggregate values meaningful.',
      tradeoff: 'The database needs explicit relationships and careful handling of incomplete source fields.',
      rejected: 'Republishing the original flat records with a search box on top.',
    },
    {
      number: '02',
      title: 'Reconcile naming variations',
      choice: 'Entity-matching rules identify organizations that appear under different spellings or legal-name variations.',
      tradeoff: 'Matches must remain conservative because an incorrect merge can distort award histories and totals.',
      rejected: 'Treating every distinct source string as a different contractor or authority.',
    },
    {
      number: '03',
      title: 'Serve the same data three ways',
      choice: 'One normalized data layer supports focused web views, scheduled Telegram alerts, and natural-language access through MCP.',
      tradeoff: 'Each surface needs its own presentation and access patterns while preserving the same underlying meaning.',
      rejected: 'Limiting useful procurement data to a single dashboard interface.',
    },
  ],
  dimensions: [
    { label: 'CONTRACTOR HISTORY', detail: 'See the awards connected to each winning company' },
    { label: 'AUTHORITY SPENDING', detail: 'Follow awards and aggregate values by contracting authority' },
    { label: 'TENDERS & AWARDS', detail: 'Move between open opportunities and completed procurement outcomes' },
    { label: 'FOCUSED RECORDS', detail: 'Surface decision-useful fields without the noise of the source notice' },
  ],
  accessChannels: [
    {
      number: '01',
      title: 'Web explorer',
      detail: 'Browse contractors, authorities, tenders, awards, and their connected histories in a focused interface.',
      cadence: 'AWARDS UPDATED DAILY',
    },
    {
      number: '02',
      title: 'Telegram bot',
      detail: 'Receive newly opened procurement opportunities without repeatedly checking the source portal.',
      cadence: 'OPEN TENDERS UPDATED TWICE DAILY',
    },
    {
      number: '03',
      title: 'Custom MCP server',
      detail: 'Connect ChatGPT, Claude, or another MCP-compatible assistant and investigate tenders and awards in natural language.',
      cadence: 'STRUCTURED ACCESS FOR LLMS',
    },
  ],
};
