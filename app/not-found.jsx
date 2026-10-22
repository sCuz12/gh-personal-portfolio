import Link from 'next/link';

export default function NotFound() {
  return <section className="not-found shell"><span>404 / SIGNAL LOST</span><h1>This path has<br /><em>no system behind it.</em></h1><Link href="/">RETURN HOME →</Link></section>;
}
