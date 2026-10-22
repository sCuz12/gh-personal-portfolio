export const problemMinerCaseStudy = {
  title: 'Problem Miner',
  subtitle: 'An AI research system that turns real user complaints into ranked, inspectable startup opportunities.',
  summary: {
    role: 'Product + AI Engineering',
    stack: 'Reddit data · AI analysis · Demand ranking',
    status: 'LIVE',
    outcome: 'Evidence-led problem discovery',
  },
  stake: 'A promising product idea starts with a painful problem—but anecdotes alone do not prove demand.',
  architectureSteps: [
    {
      id: 'collect',
      label: 'COLLECT',
      caption: 'Relevant Reddit discussions are gathered as raw evidence of recurring user problems.',
    },
    {
      id: 'extract',
      label: 'EXTRACT',
      caption: 'AI identifies the underlying problem, affected audience, and surrounding context.',
    },
    {
      id: 'group',
      label: 'GROUP',
      caption: 'Related signals are organized into themes so repeated demand becomes visible.',
    },
    {
      id: 'rank',
      label: 'RANK',
      caption: 'Opportunities are ordered using the available evidence while retaining their source context.',
    },
  ],
  decisions: [
    {
      number: '01',
      title: 'Keep evidence attached',
      choice: 'Every synthesized problem stays connected to the discussions that support it.',
      tradeoff: 'The product must retain and present more context around each insight.',
      rejected: 'Showing AI-generated opportunity summaries without their supporting signals.',
    },
    {
      number: '02',
      title: 'Separate extraction from ranking',
      choice: 'Understanding a problem and deciding its relative strength are distinct stages.',
      tradeoff: 'The pipeline has more intermediate data and evaluation points.',
      rejected: 'Asking one model response to collect, interpret, and score everything at once.',
    },
    {
      number: '03',
      title: 'Use signals, not certainty',
      choice: 'Rankings help prioritize research rather than claiming an idea is automatically validated.',
      tradeoff: 'The interface must explain why an opportunity ranks where it does.',
      rejected: 'Reducing product validation to one opaque AI score.',
    },
  ],
  insightDimensions: [
    { label: 'FREQUENCY', detail: 'How often the problem appears' },
    { label: 'INTENSITY', detail: 'How strongly users describe the pain' },
    { label: 'AUDIENCE', detail: 'Who repeatedly experiences it' },
    { label: 'EVIDENCE', detail: 'Which discussions support the insight' },
  ],
};
