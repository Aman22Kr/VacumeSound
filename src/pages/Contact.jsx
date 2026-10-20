import { useState } from 'react';
import { Mail, MapPin, Phone, Trash2 } from 'lucide-react';
import { SITE } from '../config/site';
import { useApp } from '../context/AppContext';
import ContactForm from '../components/ContactForm';
import PageHero from '../components/PageHero';
import VideoBlank from '../components/VideoBlank';

export default function Contact() {
  const { enquiries, setEnquiries } = useApp();
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <PageHero title="Contact" intro="This is a demo form. Messages stay in your browser and are never sent." crumbs={[{ label: 'Contact' }]} />
      <section className="container-page grid gap-10 py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="mb-6 text-2xl">Send a demo enquiry</h2>
          <ContactForm />
        </div>
        <aside className="space-y-6 lg:col-span-2">
          <div className="card p-6">
            <h2 className="mb-4 text-xl">Studio details (placeholders)</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><Phone size={16} className="mt-0.5" /> {SITE.phone}</li>
              <li className="flex gap-2"><Mail size={16} className="mt-0.5" /> {SITE.email}</li>
              <li className="flex gap-2"><MapPin size={16} className="mt-0.5" /> {SITE.address}</li>
            </ul>
          </div>
          <VideoBlank label="Map or video placeholder" />
        </aside>
      </section>
      <section className="container-page pb-16">
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl">Your saved demo enquiries ({enquiries.length})</h2>
            {enquiries.length > 0 && <button onClick={() => setEnquiries([])} className="flex items-center gap-1 text-sm text-copper"><Trash2 size={14} /> Clear</button>}
          </div>
          {enquiries.length === 0 ? <p className="text-sm muted">Nothing saved yet. Submitted demo enquiries appear here, stored only in this browser.</p> : (
            <ul className="divide-y divide-ink/10 dark:divide-sand/10">
              {(showAll ? enquiries : enquiries.slice(0, 3)).map((e) => (
                <li key={e.id} className="py-3 text-sm">
                  <p className="font-semibold">{e.name} <span className="font-normal muted">- {new Date(e.at).toLocaleString()}</span></p>
                  <p className="muted">{e.message || '(no message)'}</p>
                </li>
              ))}
            </ul>
          )}
          {enquiries.length > 3 && <button onClick={() => setShowAll((s) => !s)} className="mt-3 text-sm text-copper underline">{showAll ? 'Show fewer' : 'Show all'}</button>}
        </div>
      </section>
    </>
  );
}
