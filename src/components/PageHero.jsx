import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

export default function PageHero({ title, intro, crumbs = [] }) {
  return (
    <section className="bg-ink text-sand">
      <div className="container-page py-14 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-sand/70">
          <Link to="/" className="hover:text-copper-light">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight size={12} />
              {c.to ? <Link to={c.to} className="hover:text-copper-light">{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        <Reveal>
          <h1 className="max-w-3xl text-4xl leading-tight md:text-5xl">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-sand/80">{intro}</p>}
        </Reveal>
      </div>
    </section>
  );
}
