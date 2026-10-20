import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { buildIndex, searchIndex } from '../utils/search';
import { ContentCard } from '../components/Cards';
import PageHero from '../components/PageHero';
import { useApp } from '../context/AppContext';

const TYPES = ['All', 'Service', 'Project', 'Article'];

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const type = params.get('type') || 'All';
  const sort = params.get('sort') || 'relevance';
  const { addHistory } = useApp();
  const index = useMemo(buildIndex, []);
  const results = useMemo(() => searchIndex(index, q, type, sort), [index, q, type, sort]);

  useEffect(() => {
    const t = setTimeout(() => addHistory(q), 700);
    return () => clearTimeout(t);
  }, [q, addHistory]);

  const update = (k, v) => {
    const n = new URLSearchParams(params);
    if (!v || v === 'All' || (k === 'sort' && v === 'relevance')) n.delete(k); else n.set(k, v);
    setParams(n, { replace: true });
  };

  return (
    <>
      <PageHero title={q ? `Search: ${q}` : 'Search'} intro="Search all services, projects and articles." crumbs={[{ label: 'Search' }]} />
      <section className="container-page py-12">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <label className="relative block flex-1">
            <span className="sr-only">Search</span>
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 muted" />
            <input value={q} onChange={(e) => update('q', e.target.value)} placeholder="Try kitchen, office, acoustic..." className="field !pl-10" autoFocus />
          </label>
          <select aria-label="Sort" value={sort} onChange={(e) => update('sort', e.target.value)} className="field !w-auto">
            <option value="relevance">Relevance</option>
            <option value="az">A to Z</option>
          </select>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button key={t} onClick={() => update('type', t)} aria-pressed={type === t}
              className={`border px-4 py-2 text-sm ${type === t ? 'border-copper bg-copper text-white' : 'border-ink/25 hover:border-copper dark:border-sand/25'}`}>{t}</button>
          ))}
        </div>
        <p className="mb-6 text-sm muted" aria-live="polite">{results.length} result{results.length === 1 ? '' : 's'}</p>
        {results.length === 0 ? (
          <div className="card p-10 text-center"><p className="font-display text-xl">No results found.</p><p className="mt-2 text-sm muted">Check the spelling or try a broader word such as "home".</p></div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r, i) => <ContentCard key={r.key} item={r} index={i % 3} />)}
          </div>
        )}
      </section>
    </>
  );
}
