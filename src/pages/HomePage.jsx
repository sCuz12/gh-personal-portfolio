import { AgentNetworkScene } from '../components/AgentNetworkScene';
import { AppLink } from '../components/AppLink';
import { Footer } from '../components/Footer';
import { FeaturedWork } from '../components/FeaturedWork';
import { Marquee } from '../components/Marquee';
import { LocalTime } from '../components/LocalTime';
import { ProjectGrid } from '../components/ProjectGrid';
import { TiltCard } from '../components/TiltCard';

function Hero() {
  return (
    <div className="hero-stage">
      <section className="hero shell">
        <AgentNetworkScene />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-zoom-monogram" aria-hidden="true">GH</div>

        <div className="hero-meta">
          <span><i /> AVAILABLE FOR SELECT PROJECTS</span>
          <span>CYPRUS · WORKING GLOBALLY</span>
        </div>

        <div className="hero-copy">
          <p className="hero-kicker">GEORGE HADJISAVVA / SOFTWARE ENGINEER / SYSTEMS BUILDER</p>
          <h1><span>I build the systems</span><br /><em>behind the magic.</em></h1>
          <p className="hero-lede">
            Backend infrastructure, agentic workflows, custom MCP servers, and interfaces
            engineered as one coherent product.
          </p>
        </div>

        <div className="hero-bottom">
          <div className="audience-actions">
            <AppLink to="/work" className="hero-action" cursor="VIEW">
              <small>FOR RECRUITERS</small><span>See my engineering work</span><b>↗</b>
            </AppLink>
            <AppLink to="/services" className="hero-action acid-action" cursor="BUILD">
              <small>FOR COMPANIES</small><span>Build a system with me</span><b>↗</b>
            </AppLink>
          </div>
          <div className="scroll-cue"><i /><span>SCROLL TO EXPLORE</span></div>
        </div>

        <LocalTime />
      </section>
    </div>
  );
}

function AudiencePaths() {
  return (
    <div className="zoom-section">
      <Marquee />
      <section className="paths shell">
        <p className="eyebrow reveal">CHOOSE YOUR PATH</p>
        <div className="path-grid">
          <TiltCard to="/work" className="path recruiter">
            <span>01 / RECRUITERS & TEAMS</span>
            <h2>I’m hiring<br />an engineer.</h2>
            <p>See how I reason about architecture, trade-offs, reliability, and product delivery.</p>
            <b>VIEW EXPERIENCE ↗</b>
          </TiltCard>
          <TiltCard to="/services" className="path client">
            <span>02 / FOUNDERS & COMPANIES</span>
            <h2>I need something<br />built.</h2>
            <p>Explore focused engagements for backends, MCPs, AI workflows, and complete software.</p>
            <b>EXPLORE SERVICES ↗</b>
          </TiltCard>
        </div>
      </section>
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <AudiencePaths />
      <div className="zoom-section"><ProjectGrid /></div>
      <section className="statement zoom-section">
        <div className="shell reveal">
          <p>SOFTWARE SHOULD BE</p>
          <h2>Powerful underneath.<br /><em>Calm on the surface.</em></h2>
          <AppLink to="/about">HOW I WORK ↗</AppLink>
        </div>
      </section>
      <Footer />
    </>
  );
}
