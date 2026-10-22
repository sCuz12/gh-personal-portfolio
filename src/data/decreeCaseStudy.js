export const decreeCaseStudy = {
  title: 'Decree',
  subtitle: 'A human-approval layer for agents that need to act in the real world.',
  summary: {
    role: 'Platform Engineering',
    stack: 'Go · Redis · React · LangGraph · Webhooks',
    status: 'MVP / CURRENT',
    outcome: 'One policy boundary for agent actions',
  },
  stake: 'When an AI agent can change real systems, “should it?” has to be answered before “can it?”',
  architectureSteps: [
    {
      id: 'request',
      label: 'REQUEST',
      caption: 'An agent submits an action, with an idempotency key.',
    },
    {
      id: 'policy',
      label: 'POLICY ENGINE',
      caption: 'The policy engine evaluates it against versioned rules.',
    },
    {
      id: 'decision',
      label: 'DECISION',
      caption: 'It’s allowed, sent for approval, or blocked.',
    },
    {
      id: 'delivery',
      label: 'DELIVERY',
      caption: 'A signed webhook delivers the decision, with an audit record.',
    },
  ],
  decisions: [
    {
      number: '01',
      title: 'Centralize the policy boundary',
      choice: 'Agents call one decision service before executing sensitive actions.',
      tradeoff: 'This adds a network boundary that must remain fast and available.',
      rejected: 'Embedding separate policy logic inside every agent and workflow.',
    },
    {
      number: '02',
      title: 'Make approval asynchronous',
      choice: 'Approval is a first-class state rather than a process that blocks indefinitely.',
      tradeoff: 'Callers must handle pending decisions and resumable execution.',
      rejected: 'Keeping an agent process open while a person decides.',
    },
    {
      number: '03',
      title: 'Treat auditability as product data',
      choice: 'Rules, decisions, and delivery attempts form a traceable record.',
      tradeoff: 'The data model and retention strategy require more care.',
      rejected: 'Relying on application logs as the only history of a decision.',
    },
  ],
  gallery: [
    { src: '/images/portfolio/decree/decree-portfolio-square.png', alt: 'Decree product overview' },
    { src: '/images/portfolio/decree/decree-branded-dashboard.png', alt: 'Decree dashboard' },
    { src: '/images/portfolio/decree/decree-branded-inbox.png', alt: 'Decree approval inbox' },
    { src: '/images/portfolio/decree/decree-branded-policies.png', alt: 'Decree policy configuration' },
  ],
};
