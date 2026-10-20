import { services } from '../data/services';
import { serviceItem } from '../utils/items';
import { ContentCard } from '../components/Cards';
import PageHero from '../components/PageHero';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <>
      <PageHero title="Services" intro="Six demo service lines, each with its own detail page." crumbs={[{ label: 'Services' }]} />
      <section className="container-page py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ContentCard key={s.slug} item={serviceItem(s)} index={i} />)}
        </div>
        <div className="mt-12 text-center">
          <p className="mb-4 muted">Not sure which service fits?</p>
          <Link to="/contact" className="btn-primary">Send a demo enquiry</Link>
        </div>
      </section>
    </>
  );
}
