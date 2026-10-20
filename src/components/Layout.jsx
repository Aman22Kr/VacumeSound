import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AdStrip from './AdStrip';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1"><Outlet /></main>
      <AdStrip />
      <Footer />
    </div>
  );
}
