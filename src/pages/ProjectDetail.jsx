import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Maximize2, Ruler, X } from 'lucide-react';
import { projects } from '../data/projects';
import { projectItem } from '../utils/items';
import { ContentCard } from '../components/Cards';
import PageHero from '../components/PageHero';
import ArtImage from '../components/ArtImage';
import FavButton from '../components/FavButton';
import SectionHeading from '../components/SectionHeading';
import NotFound from './NotFound';
import { useApp } from '../context/AppContext';

const VARIANTS = [{}, { palette: 'ink' }, { palette: 'copper' }, { palette: 'moss' }];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const { addRecent } = useApp();
  const [shot, setShot] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => { setShot(0); setOpen(false); if (project) addRecent(`project:${project.slug}`); }, [project, addRecent]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') setShot((s) => (s + 1) % VARIANTS.length);
      if (e.key === 'ArrowLeft') setShot((s) => (s + VARIANTS.length - 1) % VARIANTS.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!project) return <NotFound what="project" />;
  const art = (i) => ({ ...project.art, ...VARIANTS[i] });
  const related = projects.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 3);
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx + projects.length - 1) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <PageHero title={project.title} intro={project.summary} crumbs={[{ label: 'Projects', to: '/projects' }, { label: project.title }]} />
      <section className="container-page grid gap-10 py-14 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-[16/10] overflow-hidden">
            <ArtImage art={art(shot)} alt={`${project.title} view ${shot + 1}`} />
            <button onClick={() => setOpen(true)} aria-label="Open larger view" className="absolute bottom-3 right-3 bg-white/90 p-2 text-ink hover:bg-white"><Maximize2 size={18} /></button>
            <FavButton itemKey={`project:${project.slug}`} className="absolute right-3 top-3" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {VARIANTS.map((_, i) => (
              <button key={i} onClick={() => setShot(i)} aria-label={`Show view ${i + 1}`} aria-current={shot === i}
                className={`aspect-[4/3] overflow-hidden border-2 ${shot === i ? 'border-copper' : 'border-transparent'}`}>
                <ArtImage art={art(i)} alt="" />
              </button>
            ))}
          </div>
          <h2 className="mb-3 mt-10 text-2xl">About this project</h2>
          <p className="muted">{project.details}</p>
          <p className="mt-4 text-xs muted">Fictional demo project. Illustrations are generated, not photographs of real work.</p>
        </div>
        <aside className="card h-fit p-6">
          <h2 className="mb-4 text-xl">Project facts</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="muted">Type</dt><dd>{project.category}</dd></div>
            <div className="flex justify-between"><dt className="muted flex items-center gap-1"><MapPin size={14} /> Location</dt><dd>{project.location}</dd></div>
            <div className="flex justify-between"><dt className="muted">Year</dt><dd>{project.year}</dd></div>
            <div className="flex justify-between"><dt className="muted flex items-center gap-1"><Ruler size={14} /> Area</dt><dd>{project.area.toLocaleString()} sq ft</dd></div>
            <div className="flex justify-between"><dt className="muted">Budget band</dt><dd>{project.budget}</dd></div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">{project.tags.map((t) => <span key={t} className="bg-sand px-2 py-1 text-xs dark:bg-ink">#{t}</span>)}</div>
          <Link to="/contact" className="btn-primary mt-6 w-full">Enquire (demo)</Link>
        </aside>
      </section>
      <div className="container-page flex justify-between border-t border-ink/10 py-6 text-sm dark:border-sand/10">
        <Link to={`/projects/${prev.slug}`} className="flex items-center gap-1 hover:text-copper"><ChevronLeft size={16} /> {prev.title}</Link>
        <Link to={`/projects/${next.slug}`} className="flex items-center gap-1 hover:text-copper">{next.title} <ChevronRight size={16} /></Link>
      </div>
      {related.length > 0 && (
        <section className="bg-sand dark:bg-ink-soft">
          <div className="container-page py-16">
            <SectionHeading title="More like this" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((p, i) => <ContentCard key={p.slug} item={projectItem(p)} index={i} />)}</div>
          </div>
        </section>
      )}
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <button className="absolute right-4 top-4 text-white" aria-label="Close" onClick={() => setOpen(false)}><X size={28} /></button>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}><div className="aspect-[16/10]"><ArtImage art={art(shot)} alt={project.title} /></div></div>
        </div>
      )}
    </>
  );
}
