export function PageHero({ kicker, title, children }) {
  return (
    <section className="page-hero shell">
      <p className="eyebrow reveal">{kicker}</p>
      <h1 className="reveal">{title}</h1>
      <div className="page-intro reveal">{children}</div>
    </section>
  );
}
