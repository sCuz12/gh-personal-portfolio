import { Footer } from '../components/Footer';

import { PageHero } from '../components/PageHero';
import { ProjectChoreography } from '../components/ProjectChoreography';

export function WorkPage() {
  return (
    <>
      <PageHero kicker="01 / SELECTED WORK" title={<>Systems with<br /><em>something at stake.</em></>}>
        <p>I care about the work behind the screenshot: constraints, contracts, failure modes, and decisions that keep software useful.</p>
      </PageHero>

      <ProjectChoreography />
      <Footer />
    </>
  );
}
