# George Hadjisavva — Portfolio Branding and Website Brief

**Document status:** Working brief for a senior brand strategist / brand designer  
**Last updated:** 22 October 2026  
**Website type:** Personal portfolio, professional positioning site, and services lead-generation site

---

## 1. Project overview

This website positions **George Hadjisavva** as a software engineer and systems builder working across:

- Backend platforms and infrastructure
- Agentic AI workflows
- Custom MCP servers
- AI governance and human-in-the-loop systems
- Frontend/product interfaces
- Bespoke internal and commercial software

The intended experience is technical, editorial, interactive, and premium. It should communicate that George can understand a difficult operational problem, design the underlying system, and carry it through to a usable product.

The site is deliberately not presented as a conventional résumé template or a generic software agency landing page.

---

## 2. Primary audiences

The website serves two distinct audiences.

### Audience A — Recruiters and engineering teams

They need to understand quickly:

- What kind of engineer George is
- The depth and range of his technical work
- How he approaches architecture and trade-offs
- Whether he can own ambiguous work across multiple layers
- What he has genuinely built and shipped
- His location, availability, and CV/contact path

Primary journey:

```text
Home → Featured work → Work / case studies → About / CV → Contact
```

### Audience B — Founders, companies, and software buyers

They need to understand quickly:

- What George can build for them
- Whether he can translate a business problem into a reliable system
- His capabilities across backend, MCP, agents, and product UI
- How an engagement works
- Why he is credible enough to contact

Primary journey:

```text
Home → Featured work → Services → Engagement process → Contact
```

### Current strategic tension

The site currently gives both audiences equal importance. A branding expert should advise whether:

1. George should lead as an individual engineer available for employment;
2. George should lead as an independent systems/product partner;
3. One audience should be primary and the other secondary; or
4. Both can remain equal without weakening the message.

---

## 3. Current positioning

### Name

**George Hadjisavva**

### Current descriptors

- Software Engineer
- Systems Builder
- Backend systems
- Agentic workflows
- Custom MCP servers
- Product interfaces

### Current hero message

> I build the systems behind the magic.

Supporting statement:

> Backend infrastructure, agentic workflows, custom MCP servers, and interfaces engineered as one coherent product.

### Current philosophy statement

> Powerful underneath. Calm on the surface.

### Positioning idea beneath the current design

George works across boundaries that are often separated: backend and frontend, AI reasoning and deterministic systems, product needs and infrastructure constraints. The promise is not merely technical implementation; it is creating coherence across those layers.

### Brand strategist questions

- Is “systems builder” ownable and specific enough?
- Should “AI infrastructure,” “agentic systems,” or “human-governed automation” be more prominent?
- Does “behind the magic” feel confident and distinctive, or too abstract?
- What is the shortest credible description of George’s value?
- What should a recruiter remember after ten seconds?
- What should a founder remember after ten seconds?

---

## 4. Brand attributes currently expressed

The present visual and verbal system is attempting to communicate:

- Technically sophisticated
- Systems-oriented
- Experimental but controlled
- Precise
- Modern
- Independent
- Calm under complexity
- Product-aware
- Comfortable with emerging AI infrastructure

Attributes to avoid:

- Generic “AI expert” positioning
- Hacker/cybersecurity clichés
- Overly corporate consultancy language
- Empty futurism
- Unverified scale or performance claims
- Visual experimentation that makes the portfolio difficult to use

---

## 5. Site-wide navigation and interaction model

### Primary navigation

The header uses a dark technical-console treatment:

- Large black navigation band
- Inset dashed border
- Identity: `GH_ / GEORGE HADJISAVVA`
- Centered `MENU =` control
- Theme toggle icon
- Terminal-style text-mode shortcut (`>_`)
- Pastel-lime `WORK WITH ME »` call to action
- Expandable menu containing Work, Services, and About
- Keyboard-first `⌘K` / `Ctrl+K` command palette offering direct access to Ask My CV and the Work page

### Custom scrollbar

The browser scrollbar is visually hidden and replaced on desktop by:

- A fixed dashed orange rail
- A circular `GH` monogram thumb
- Scroll progress tracking
- Drag interaction
- Rail-click navigation
- Keyboard controls

Native wheel, trackpad, touch, keyboard, and browser scrolling remain intact.

### Text mode

The `>_` shortcut opens `/text`, a fast, semantic, terminal-style version of the complete portfolio:

- No Three.js, custom cursor, custom scrollbar, animated page chrome, or command palette
- Plain-text sections for work, services, about, technical territory, Brain, CV, and contact
- Reuses the same structured project and service data as the visual site
- Supports keyboard navigation, visible focus states, landmarks, headings, and a skip link
- Remains useful when JavaScript or motion is unavailable

### Cursor

Desktop uses a custom two-part cursor:

- Small immediate pointer dot
- Larger eased follower ring
- Context labels such as `VIEW`, `BUILD`, `OPEN`, and `CASE`

### Page transitions

Internal routes use a full-frame `GH_` transition before changing content.

### Accessibility behavior

- Touch devices remove custom pointer treatments.
- Reduced-motion preferences disable the major animations.
- Interactive controls remain semantic links or buttons.

---

## 6. Home page layout

### Section 1 — Hero / opening system

Purpose:

- Establish George’s identity and technical territory
- Create an immediate premium/creative impression
- Route recruiters and buyers to the correct journey

Content and elements:

- Full-width hero canvas with content aligned to a 1440px editorial grid
- Availability status
- Cyprus / working globally
- Full name and professional descriptor
- Main headline: “I build the systems behind the magic.”
- Supporting positioning statement
- Recruiter CTA: “See my engineering work”
- Company CTA: “Build a system with me”
- Live Cyprus local time
- Interactive Three.js agent-network visualization
- Technical grid background
- Scroll cue

Scroll behavior:

- The hero pins while the visitor scrolls.
- Interface elements and the Three.js network recede.
- A single six-arm asterisk in the pastel accent color accelerates toward the viewer.
- The asterisk scales and rotates before resolving into a full-width pastel field.
- The field forms an asymmetric curved lower edge that reveals the featured-work section.
- The signature transition becomes static for visitors who prefer reduced motion.

Brand review questions:

- Should the hero lead with the person, the work, or the systems philosophy?
- Does the Three.js network reinforce credibility or read as decoration?
- Should the hero show a portrait or remain abstract/systemic?
- Is the split CTA appropriate this early?
- Should the live time and availability communicate independent work, employment availability, or both?

### Section 2 — Featured work

Purpose:

- Establish credibility immediately after the hero
- Demonstrate that the visual identity is grounded in real work
- Lead into deeper case studies

Current heading:

> Selected systems. Built with intent.

Current supporting copy:

> A closer look at the architecture, tooling, and product decisions behind the work.

Presentation:

- Dark editorial background
- Oversized project presentation
- Project number, category, year, and role
- Branded product image
- Technical tags
- Animated system/orbit details where no real imagery exists
- Direct project link
- “View all case studies” CTA

#### Verified featured project

**Decree — Human Approval Platform**

Description:

> Decree is a centralized human-approval layer for AI agents and automated workflows. It evaluates actions against company policies and returns allow, require-approval, or block decisions — integrating with n8n, LangGraph, custom agents, and webhooks.

Current classification:

- Category: AI Governance
- Role label: Platform Engineering
- Status/year label: Current
- Technologies/topics: AI agents, policy engine, n8n, LangGraph, webhooks
- URL: <https://www.getdecree.com/>
- Assets: thumbnail, square portfolio image, dashboard, inbox, and policies interface

Brand review questions:

- How should Decree relate to George’s personal brand?
- Is it presented as a founder-built product, client work, employment work, or independent project?
- Which outcome, problem, or distinctive insight should lead the case study?
- What visual system should connect product imagery to the broader portfolio identity?

### Section 3 — Audience paths

Purpose:

- Make the dual-audience model explicit
- Let visitors self-select without navigating through irrelevant content

Recruiter card:

> I’m hiring an engineer.

Company/founder card:

> I need something built.

Presentation:

- Two large interactive panels
- Neutral/paper treatment for recruiters
- Pastel-lime treatment for companies
- 3D pointer tilt and light response

### Section 4 — Ask My CV preview

Purpose:

- Give recruiters a memorable way to explore George’s experience
- Demonstrate the CV assistant without loading the external chat on the homepage
- Direct interested visitors to the dedicated full assistant experience

Presentation:

- Native two-column editorial and console-style section
- Three example questions drawn from the assistant’s existing prompt set
- Pastel-lime CTA leading to `/ask-my-cv`
- Clear note that the CV and direct conversation remain authoritative
- No iframe or external assistant request on the homepage

### Section 5 — Selected systems grid

Purpose:

- Preview the full range of work
- Show breadth across agents, MCP, backend, and product UI

Current entries:

- Autonomous Operations Agent
- Business Systems Tool Layer
- Event-Driven Platform Core
- Operations Control Surface

**Important:** These four entries are currently conceptual case-study placeholders. They are clearly labelled in the implementation and must not be presented as verified client or employment work until replaced with real facts.

### Section 6 — Philosophy statement

Purpose:

- Summarize George’s product/engineering point of view
- Transition toward the About page

Current message:

> Software should be powerful underneath. Calm on the surface.

### Section 7 — Contact footer

Purpose:

- Provide a strong final conversion point

Current message:

> Have a hard problem? Let’s build what’s next.

Current metadata:

- Cyprus / working globally
- GitHub
- LinkedIn
- Email

The contact email, GitHub URL, and LinkedIn URL are configured in the shared site settings.

---

## 7. Work page layout

### Page hero

Headline:

> Systems with something at stake.

Supporting idea:

> The work behind the screenshot: constraints, contracts, failure modes, and the decisions that keep software useful.

### Project index

Each project row contains:

- Project number
- Project category/type
- Project name
- Short description
- Interaction cue

### Technical deep dive

Current illustrative topic:

> A reliable agent is a system, not a prompt.

Structure:

- The problem
- The approach
- The proof
- Architecture flow: Intent → Planner → Tool Gateway → Business Systems

The “proof” content is intentionally marked for replacement with verified metrics and outcomes.

### Brand/content opportunity

The page needs a reusable case-study storytelling template covering:

1. Context
2. Problem
3. George’s role
4. Constraints
5. System architecture
6. Key decisions and trade-offs
7. Interface/product outcome
8. Measured or observable result
9. Lessons or next iteration

---

## 8. Services page layout

### Page hero

Headline:

> Bring the hard part. I’ll build the path.

Audience:

- Founders
- Product leaders
- Companies needing technical implementation

### Service areas

1. **Backend systems**  
   APIs, data, queues, integrations, authentication, observability, and infrastructure.

2. **Custom MCP servers**  
   Safe, structured tools connecting assistants to products, knowledge, and operations.

3. **Agentic workflows**  
   Multi-step agents with durable execution, context, evaluations, guardrails, and human checkpoints.

4. **Custom software**  
   Internal tools, SaaS products, operational systems, and full-stack applications.

### Engagement process

Current four phases:

1. Frame
2. Design
3. Build
4. Harden

### Brand/content questions

- Is George selling fixed-scope projects, consulting, embedded engineering, employment, or a mix?
- Should services be packaged into named offers?
- What is the minimum credible engagement?
- Should pricing signals or qualification criteria be included?
- What is the strongest buyer-facing proof?

---

## 9. About page layout

### Page hero

Headline:

> Engineer across layers. Partner through ambiguity.

Current introduction:

> I’m George, a software engineer based in Cyprus, working across backend architecture, AI systems, developer tooling, and product interfaces.

### Profile section

Current idea:

> I like problems that cross boundaries.

Supporting narrative connects:

- Backend and frontend
- Models and deterministic code
- Product requirements and infrastructure constraints

Includes:

- Large `GH` monogram artwork
- CV download CTA
- Short personal/professional narrative

### Technical territory

Current placeholder groups:

- Languages
- Systems
- AI
- Product

The stack is still marked as placeholder content and must be reconciled with George’s verified experience.

---

## 10. Current visual identity

### Color palette

| Token | Current value | Current use |
|---|---:|---|
| Ink | `#151515` | Primary text, dark surfaces |
| Paper | `#efede6` | Main background |
| Acid / pastel lime | `#dff2a6` | Primary brand accent, CTA, AI/system signal, interaction highlight, hero transition |
| Signal blue / cornflower-indigo | `#5267c9` | Product energy, statement sections, secondary color field |
| Orange | `#ff6b00` | Limited scrollbar interaction accent; not part of the primary navigation CTA |
| Near black | `#050505` | Navigation and console surfaces |

### Typography

- **Manrope:** main sans-serif, headlines, product copy
- **DM Mono:** metadata, system labels, navigation, technical details
- **Georgia:** italic editorial contrast within major headlines

### Graphic language

- Dashed borders and rails
- Console/system metadata
- Large editorial typography
- `GH_` identity treatments and a single six-arm asterisk as the hero motion mark
- Technical grids
- Orbit and node diagrams
- Strong black and paper fields with softened pastel-lime and cornflower-indigo accents
- Full-width color transitions with shaped, asymmetric boundaries
- High contrast between product imagery and abstract system graphics

### Current creative territory

The visual direction can be described as:

> Editorial systems engineering meets an experimental control-room interface.

### Brand expert review questions

- Is pastel lime distinctive enough to serve as the primary recognizable brand asset?
- Should orange remain as a limited scrollbar accent or be removed from the shared identity?
- Does the softened cornflower-indigo provide enough energy beside the pastel lime?
- Should `GH_` become a formal identity mark?
- Should the asterisk become a reusable brand mark or remain exclusive to the hero transition?
- Does the console language feel authentic to George’s work or overly performative?
- How can the identity feel distinctive without resembling a generic creative developer portfolio?
- Should photography, portraiture, diagrams, or product UI dominate the visual story?

---

## 11. Motion and interaction system

Current motion includes:

- Interactive Three.js network responding to pointer movement
- Full-width hero-to-asterisk scroll zoom
- Asterisk-to-pastel-field transformation with a shaped lower boundary
- Pinned hero sequence
- Scroll-linked section scaling
- Reveal-on-scroll transitions
- 3D project and audience-card tilt
- Custom cursor labels
- Animated orbit diagrams
- Marquee/ticker motion
- Page-transition overlay
- Custom draggable `GH` scrollbar
- Command-palette entrance and keyboard focus treatment

Motion principles to preserve:

- Motion should explain depth, hierarchy, or system behavior.
- The most dramatic motion belongs at the opening transition.
- Repeated sections should use quieter motion.
- Product content must remain readable and usable.
- Touch and reduced-motion users need a complete experience without animation.

Questions for the branding expert:

- What should become the single signature interaction?
- Which animations currently compete with the work?
- Should the asterisk zoom and shaped section reveal become part of the permanent identity system?
- How should motion communicate trust and engineering maturity rather than spectacle alone?

---

## 12. Content and data model

Project content can be loaded from a database-backed API or local fallback data.

Current project fields:

- ID
- Slug
- Type/category
- Title
- Description
- Color tone
- Year/status
- Role
- Technology tags
- Featured state
- Display priority
- Thumbnail image
- External project URL
- Gallery images

Brain articles use a separate editorial taxonomy:

- One required category: Engineering, AI Systems, Business, or Mind & Growth
- One format: Essay, Note, or Log
- One or more granular topic references
- One maturity status: Thinking, Tested, or Shipped

The frontend expects a read-only `GET /projects` API. This allows project content and ordering to be managed independently from the React layout.

Content-system questions:

- Which fields should be mandatory for every case study?
- Should projects be grouped by capability, industry, role, or outcome?
- Should projects have separate recruiter-facing and buyer-facing summaries?
- How should confidential work be represented?
- What is the editorial standard for screenshots and diagrams?

---

## 13. What is real, provisional, and missing

### Verified / supplied

- George Hadjisavva’s name
- Cyprus location / timezone
- Primary practice areas
- Decree project description
- Decree URL and visual assets
- Decree integrations and product category

### Provisional positioning copy

- “I build the systems behind the magic.”
- “Powerful underneath. Calm on the surface.”
- “Bring the hard part. I’ll build the path.”
- “Engineer across layers. Partner through ambiguity.”
- Service descriptions and engagement language

### Conceptual placeholders

- Autonomous Operations Agent
- Business Systems Tool Layer
- Event-Driven Platform Core
- Operations Control Surface
- Unverified dates, roles, technical stacks, proof, and outcomes attached to those placeholders

### Missing inputs

- CV/resume file
- Verified technical stack
- Employment history
- Additional real projects
- Project roles and dates
- Outcomes, metrics, or evidence
- Testimonials, only if genuine and approved
- Final availability and engagement model
- Professional portrait, if the brand direction calls for one

---

## 14. Requested output from the branding expert

Please provide:

1. **Positioning recommendation**  
   A concise brand position that works across recruiter and buyer audiences.

2. **Audience hierarchy**  
   A recommendation on whether one audience should lead.

3. **Messaging architecture**  
   One-line descriptor, hero headline, support copy, proof themes, and calls to action.

4. **Brand idea / creative concept**  
   A central idea that can guide identity, layouts, diagrams, motion, and writing.

5. **Identity recommendations**  
   Guidance for `GH_`, wordmark, color hierarchy, typography, iconography, and imagery.

6. **Voice principles**  
   A compact set of rules and examples for headlines, project writing, services, and CTAs.

7. **Portfolio storytelling framework**  
   A repeatable structure for turning technical projects into compelling case studies.

8. **Motion direction**  
   What to preserve, reduce, or make signature.

9. **Trust and proof strategy**  
   How to communicate expertise without inflated claims.

10. **Homepage content hierarchy**  
    Recommended order and relative emphasis of hero, work, audience routing, capabilities, philosophy, and contact.

---

## 15. Constraints

- Do not invent clients, metrics, testimonials, employment history, or outcomes.
- The website must remain useful without animation.
- The two audience journeys must remain legible unless a new strategy deliberately prioritizes one.
- The design must support real product screenshots and system diagrams.
- The identity should feel credible to senior engineers and technical buyers.
- The experience should remain responsive and accessible.
- The brand system should scale to case studies, social profiles, a CV, proposals, and future products.

---

## 16. Desired outcome

The finished brand and website should leave visitors with a clear impression:

> George understands complex systems, makes sound technical decisions, and turns that complexity into software people can trust and use.

The branding engagement should make that message more distinctive, more credible, and easier to remember—without losing the creative technical energy already present in the portfolio.
