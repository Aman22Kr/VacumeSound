import { useApp } from '../context/AppContext';
import PageHero from '../components/PageHero';

const Seg = ({ label, value, options, onChange }) => (
  <fieldset className="mb-8">
    <legend className="mb-3 text-sm font-semibold uppercase tracking-wide">{label}</legend>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)} aria-pressed={value === o}
          className={`border px-4 py-2 text-sm capitalize ${value === o ? 'border-copper bg-copper text-white' : 'border-ink/25 hover:border-copper dark:border-sand/25'}`}>{o}</button>
      ))}
    </div>
  </fieldset>
);

export default function Settings() {
  const { theme, setTheme, anim, setAnim, resetAll, favourites, recent, history, enquiries } = useApp();
  return (
    <>
      <PageHero title="Settings" intro="Preferences are saved in this browser only." crumbs={[{ label: 'Settings' }]} />
      <section className="container-page max-w-2xl py-14">
        <Seg label="Theme" value={theme} options={['light', 'dark']} onChange={setTheme} />
        <Seg label="Animation speed" value={anim.speed} options={['off', 'slow', 'normal', 'fast']} onChange={(speed) => setAnim({ ...anim, speed })} />
        <Seg label="Animation intensity" value={anim.intensity} options={['subtle', 'medium', 'strong']} onChange={(intensity) => setAnim({ ...anim, intensity })} />
        <p className="mb-8 text-sm muted">Animations also respect your system "reduce motion" setting.</p>
        <div className="card p-6">
          <h2 className="mb-3 text-xl">Stored in this browser</h2>
          <ul className="mb-4 text-sm muted">
            <li>Saved items: {favourites.length}</li><li>Recently viewed: {recent.length}</li>
            <li>Search history: {history.length}</li><li>Demo enquiries: {enquiries.length}</li>
          </ul>
          <p className="mb-4 text-sm muted">localStorage is specific to this browser and device. It does not sync and does not create an account. No passwords or payment details are stored.</p>
          <button onClick={() => window.confirm('Clear all saved data for this site?') && resetAll()} className="btn-outline">Reset all saved data</button>
        </div>
      </section>
    </>
  );
}
