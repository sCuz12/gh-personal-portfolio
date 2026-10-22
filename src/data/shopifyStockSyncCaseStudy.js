export const shopifyStockSyncCaseStudy = {
  title: 'Stock Sync',
  subtitle: 'A Go CLI that keeps Shopify inventory aligned with existing stock-control systems.',
  summary: {
    role: 'Backend + Integration Engineering',
    stack: 'Go · Shopify · Powersoft · Esoft',
    status: 'PRODUCTION',
    outcome: 'Repeatable daily inventory synchronization',
  },
  stake: 'Inventory is only trustworthy when every system agrees on what can actually be sold.',
  architectureSteps: [
    {
      id: 'extract',
      label: 'EXTRACT',
      caption: 'The CLI reads the latest inventory export from Powersoft or Esoft.',
    },
    {
      id: 'normalize',
      label: 'NORMALIZE',
      caption: 'Source records are mapped into one predictable stock model.',
    },
    {
      id: 'compare',
      label: 'COMPARE',
      caption: 'Current Shopify inventory is compared by product and location.',
    },
    {
      id: 'update',
      label: 'UPDATE',
      caption: 'Only required changes are sent to Shopify, then reported for review.',
    },
  ],
  decisions: [
    {
      number: '01',
      title: 'Normalize before integrating',
      choice: 'Each stock-control format is translated into one internal inventory model.',
      tradeoff: 'Every source adapter must explicitly maintain its mapping rules.',
      rejected: 'Letting Shopify-specific logic leak into each source-system parser.',
    },
    {
      number: '02',
      title: 'Update only the difference',
      choice: 'The sync compares states and sends only inventory values that changed.',
      tradeoff: 'Comparison adds a read phase before writes can begin.',
      rejected: 'Rewriting every product quantity during every daily run.',
    },
    {
      number: '03',
      title: 'Make the run observable',
      choice: 'The CLI reports what was read, matched, changed, skipped, or rejected.',
      tradeoff: 'Structured run reporting requires deliberate error classification.',
      rejected: 'Returning one success or failure message for the entire operation.',
    },
  ],
  operationStages: [
    { label: 'SOURCE', command: '$ stock-sync import powersoft.csv', output: 'Inventory records loaded and validated' },
    { label: 'DIFF', command: '$ stock-sync compare --store cy-main', output: 'Changes isolated before writing' },
    { label: 'DELIVERY', command: '$ stock-sync apply --confirm', output: 'Updates sent with a final run report' },
  ],
};
