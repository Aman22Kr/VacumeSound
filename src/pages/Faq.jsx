import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/content';
import PageHero from '../components/PageHero';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageHero title="Frequently asked questions" crumbs={[{ label: 'FAQ' }]} />
      <section className="container-page max-w-3xl py-14">
        {faqs.map((f, i) => (
          <div key={f.q} className="border-b border-ink/15 dark:border-sand/15">
            <h2>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-xl">
                {f.q}<ChevronDown size={20} className={`shrink-0 transition-transform ${open === i ? 'rotate-180 text-copper' : ''}`} />
              </button>
            </h2>
            {open === i && <p className="pb-5 muted">{f.a}</p>}
          </div>
        ))}
        <p className="mt-10 muted">Still curious? <Link to="/contact" className="text-copper underline">Send a demo enquiry</Link>.</p>
      </section>
    </>
  );
}
