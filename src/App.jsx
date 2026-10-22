import { Navigation } from './components/Navigation';
import { CustomScrollbar } from './components/CustomScrollbar';
import { useCustomCursor } from './hooks/useCustomCursor';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import { useScrollZoom } from './hooks/useScrollZoom';
import { AboutPage } from './pages/AboutPage';
import { DecreeCaseStudyPage } from './pages/DecreeCaseStudyPage';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ShopifyStockSyncCaseStudyPage } from './pages/ShopifyStockSyncCaseStudyPage';
import { WorkPage } from './pages/WorkPage';
import { useClientRouter } from './routing';

const pages = {
  '/': HomePage,
  '/work': WorkPage,
  '/work/decree': DecreeCaseStudyPage,
  '/work/shopify-stock-synchronization-app': ShopifyStockSyncCaseStudyPage,
  '/services': ServicesPage,
  '/about': AboutPage,
};

export function App() {
  const { path, isTransitioning } = useClientRouter();
  const CurrentPage = pages[path] ?? HomePage;

  useRevealOnScroll(path);
  useCustomCursor(path);
  useScrollZoom(path);

  const appClassName = [
    'app',
    'antialiased',
    'selection:bg-acid',
    'selection:text-ink',
    isTransitioning ? 'leaving' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={appClassName}>
      <div className="cursor-dot" />
      <div className="cursor-ring" />
      <div className="transition">GH_</div>
      <CustomScrollbar />
      <Navigation currentPath={path} />
      <main id="page-content"><CurrentPage /></main>
    </div>
  );
}
