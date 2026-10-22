'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function AppLink({ to, children, className = '', cursor = '', ...linkProps }) {
  const router = useRouter();

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.querySelector('.app')?.classList.add('leaving');

    window.setTimeout(() => {
      router.push(to);
    }, 450);
  };

  return (
    <Link href={to} className={className} data-cursor={cursor} onClick={handleClick} {...linkProps}>
      {children}
    </Link>
  );
}
