import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { categories, projects } from '../data/projects';
import { projectItem } from '../utils/items';
import { ContentCard } from '../components/Cards';
import PageHero from '../components/PageHero';

// Filter state lives in the URL query (?cat=&q=&sort=) so it survives refresh and can be shared.
export default function Projects() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') || 'All';
  const q = params.get('q') || '';
  const sort = params.get('sort') || 'newest';

  const update = (k, v) => {
    const next = new URLSearchParams(params);
    if (!v || v === 'All' || (k === 'sort' && v === 'newest')) next.delete(k); else next.set(k, v);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const t = q.toLowerCase().trim();
    let r = projects.filter((p) => (cat === 'All' || p.category === cat) &&
      (!t || [p.title, p.summary, p.location, ...p.tags].join(' ').toLowerCase().includes(t)));
    if (sort === 'newest') r = [...r].sort((a, b) => b.year - a.year);
    if (sort === 'oldest') r = [...r].sort((a, b) => a.year - b.year);
    if (sort === 'az') r = [...r].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'area') r = [...r].sort((a, b) => b.area - a.area);
    return r;
  }, [cat, q, sort]);

  return (
    <>
      <PageHero title="Projects" intro="Browse illustrated sample projects. Filter by type, search, or sort." crumbs={[{ label: 'Projects' }]} />
      <section className="container-page py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project category">
            {['All', ...categories].map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => update('cat', c)}
                className={`border px-4 py-2 text-sm font-medium transition-colors ${cat === c ? 'border-copper bg-copper text-white' : 'border-ink/25 hover:border-copper dark:border-sand/25'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <label className="relative block">
              <span className="sr-only">Search projects</span>
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 muted" />
              <input value={q} onChange={(e) => update('q', e.target.value)} placeholder="Search projects" className="field !w-48 !pl-9 md:!w-60" />
            </label>
            <label>
              <span className="sr-only">Sort projects</span>
              <select value={sort} onChange={(e) => update('sort', e.target.value)} className="field !w-auto">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="az">A to Z</option>
                <option value="area">Largest area</option>
              </select>
            </label>
          </div>
        </div>
        <p className="mb-6 text-sm muted" aria-live="polite">{list.length} project{list.length === 1 ? '' : 's'}</p>
        {list.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="font-display text-xl">No projects match your filters.</p>
            <button onClick={() => setParams({}, { replace: true })} className="btn-outline mt-4">Clear filters</button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => <ContentCard key={p.slug} item={projectItem(p)} index={i % 3} />)}
          </div>
        )}
      </section>
    </>
  );
}
