export const symvaseisCaseStudy = {
  title: 'Symvaseis.cy',
  subtitle: 'A public procurement explorer that turns fragmented contract records into searchable, connected information.',
  summary: {
    role: 'Data Platform + Full-stack Engineering',
    stack: 'Data ingestion · Normalization · Search',
    status: 'PRODUCTION',
    outcome: 'One place to explore Cyprus procurement activity',
  },
  stake: 'Public data creates transparency only when people can find it, connect it, and understand what it says.',
  architectureSteps: [
    {
      id: 'collect',
      label: 'COLLECT',
      caption: 'Procurement records are gathered from public sources into one ingestion flow.',
    },
    {
      id: 'normalize',
      label: 'NORMALIZE',
      caption: 'Dates, values, authorities, companies, and identifiers are shaped consistently.',
    },
    {
      id: 'connect',
      label: 'CONNECT',
      caption: 'Tenders and awards become linked records instead of isolated documents.',
    },
    {
      id: 'explore',
      label: 'EXPLORE',
      caption: 'Search and filters expose spending, participants, values, and history.',
    },
  ],
  decisions: [
    {
      number: '01',
      title: 'Preserve the source record',
      choice: 'Normalized fields stay connected to the public record they came from.',
      tradeoff: 'The model must retain both source-specific detail and a common shape.',
      rejected: 'Replacing source context with a simplified copy of the data.',
    },
    {
      number: '02',
      title: 'Normalize around questions',
      choice: 'The model makes authorities, suppliers, values, dates, tenders, and awards consistently explorable.',
      tradeoff: 'Ambiguous or incomplete source values need explicit handling.',
      rejected: 'Indexing raw documents without a shared procurement model.',
    },
    {
      number: '03',
      title: 'Design the read path first',
      choice: 'Search and exploration needs determine how records are indexed and related.',
      tradeoff: 'The read model adds another representation of the underlying data.',
      rejected: 'Making the interface query ingestion tables directly.',
    },
  ],
  dimensions: [
    { label: 'CONTRACTING AUTHORITIES', detail: 'Who is buying' },
    { label: 'WINNING COMPANIES', detail: 'Who received the award' },
    { label: 'AWARD VALUES', detail: 'How much was committed' },
    { label: 'PROCUREMENT HISTORY', detail: 'How activity changes over time' },
  ],
};
