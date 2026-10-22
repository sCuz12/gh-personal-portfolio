export function CaseStudySummaryCard({ summary }) {
  return (
    <dl className="decree-summary-card">
      {Object.entries(summary).map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseStudyDecisionCard({ decision }) {
  return (
    <article className="decision-card">
      <span>{decision.number}</span>
      <h3>{decision.title}</h3>
      <p>{decision.choice}</p>
      <dl>
        <div><dt>TRADE-OFF</dt><dd>{decision.tradeoff}</dd></div>
        <div><dt>REJECTED</dt><dd>{decision.rejected}</dd></div>
      </dl>
    </article>
  );
}
