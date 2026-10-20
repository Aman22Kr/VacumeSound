import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { services } from '../data/services';
import { projects } from '../data/projects';
import { projectItem } from '../utils/items';
import { ContentCard } from '../components/Cards';
import PageHero from '../components/PageHero';
import ArtImage from '../components/ArtImage';
import FavButton from '../components/FavButton';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import NotFound from './NotFound';
import { useApp } from '../context/AppContext';

const catFor = { residential: 'Residential', luxury: 'Residential', office: 'Office', 'modular-kitchen': 'Residential', retail: 'Retail', commercial: 'Commercial' };

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const { addRecent } = useApp();
  useEffect(() => { if (service) addRecent(`service:${service.slug}`); }, [service, addRecent]);
  if (!service) return <NotFound what="service" />;

  const related = projects.filter((p) => p.category === catFor[service.slug]).slice(0, 3);
  return (
    <>
      <PageHero title={service.title} intro={service.short} crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]} />
      <section className="container-page grid gap-10 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative mb-8 aspect-[16/9] overflow-hidden">
            <ArtImage art={service.art} alt={service.title} />
            <FavButton itemKey={`service:${service.slug}`} className="absolute right-3 top-3" />
          </div>
          {service.body.map((p) => <p key={p} className="mb-4 muted">{p}</p>)}
          <h2 className="mb-4 mt-8 text-2xl">How it works</h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {service.process.map((s, i) => (
              <Reveal as="li" key={s} index={i} className="card flex items-center gap-3 p-4">
                <span className="flex h-8 w-8 items-center justify-center bg-copper text-sm font-bold text-white">{i + 1}</span>{s}
              </Reveal>
            ))}
          </ol>
        </div>
        <aside className="space-y-6">
          <div className="card p-6">
            <h2 className="mb-3 text-xl">What is included</h2>
            <ul className="space-y-2 text-sm">
              {service.includes.map((i) => <li key={i} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-copper" />{i}</li>)}
            </ul>
            <Link to="/contact" className="btn-primary mt-6 w-full">Ask about this (demo)</Link>
          </div>
        </aside>
      </section>
      {related.length > 0 && (
        <section className="bg-sand dark:bg-ink-soft">
          <div className="container-page py-16">
            <SectionHeading title="Related sample projects" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => <ContentCard key={p.slug} item={projectItem(p)} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
