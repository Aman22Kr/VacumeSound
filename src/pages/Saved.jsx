import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { itemFromKey } from '../utils/items';
import { ContentCard } from '../components/Cards';
import PageHero from '../components/PageHero';

export default function Saved() {
  const { favourites, recent } = useApp();
  const saved = favourites.map(itemFromKey).filter(Boolean);
  const viewed = recent.map(itemFromKey).filter(Boolean);
  return (
    <>
      <PageHero title="Saved and recently viewed" intro="Stored only in this browser on this device. It does not sync and is not an account." crumbs={[{ label: 'Saved' }]} />
      <section className="container-page py-12">
        <h2 className="mb-6 text-2xl">Saved ({saved.length})</h2>
        {saved.length === 0 ? (
          <div className="card p-10 text-center"><p className="font-display text-xl">Nothing saved yet.</p><p className="mt-2 text-sm muted">Tap the heart on any card to save it here.</p><Link to="/projects" className="btn-primary mt-5">Browse projects</Link></div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{saved.map((i, k) => <ContentCard key={i.key} item={i} index={k % 3} />)}</div>
        )}
        <h2 className="mb-6 mt-16 text-2xl">Recently viewed ({viewed.length})</h2>
        {viewed.length === 0 ? <p className="text-sm muted">Pages you open will appear here.</p> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{viewed.map((i, k) => <ContentCard key={i.key} item={i} index={k % 4} />)}</div>
        )}
      </section>
    </>
  );
}
