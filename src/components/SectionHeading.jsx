export function SectionHeading({ kicker, title, description }) {
  return (
    <div className="section-head reveal">
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
