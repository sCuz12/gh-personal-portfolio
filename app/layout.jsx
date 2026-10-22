import '../src/site.css';
import { SiteChrome } from '../src/components/SiteChrome';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'George Hadjisavva — Systems & Software',
    template: '%s — George Hadjisavva',
  },
  description: 'George Hadjisavva builds backend systems, agentic workflows, custom MCPs, and complete software products.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
