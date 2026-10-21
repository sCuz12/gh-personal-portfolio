import { Fragment } from 'react';

const items = ['BACKEND SYSTEMS', 'AGENTIC WORKFLOWS', 'CUSTOM MCPS', 'PRODUCT INTERFACES'];

export function Marquee() {
  return (
    <div className="marquee" aria-label={items.join(', ')}>
      <div aria-hidden="true">
        {[0, 1].map((copy) => (
          <Fragment key={copy}>
            {items.map((item) => (
              <Fragment key={`${copy}-${item}`}><span>{item}</span><i>✦</i></Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
