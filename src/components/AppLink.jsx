import { navigateTo } from '../routing';

export function AppLink({ to, children, className = '', cursor = '', ...linkProps }) {
  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey) return;
    event.preventDefault();
    navigateTo(to);
  };

  return (
    <a href={to} className={className} data-cursor={cursor} onClick={handleClick} {...linkProps}>
      {children}
    </a>
  );
}
