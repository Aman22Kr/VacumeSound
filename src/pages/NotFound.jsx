import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

export default function NotFound({ what = 'page' }) {
  return (
    <>
      <PageHero title="404: Not found" intro={`We could not find that ${what}.`} />
      <section className="container-page py-16 text-center">
        <p className="mb-6 muted">The link may be mistyped or the item may not exist in the demo data.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">Back to home</Link>
          <Link to="/search" className="btn-outline">Search the site</Link>
        </div>
      </section>
    </>
  );
}
