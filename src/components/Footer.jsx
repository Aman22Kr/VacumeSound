import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { NAV, SITE } from '../config/site';
import { services } from '../data/services';
import { Logo } from './Header';

export default function Footer() {
  return (
    <footer className="bg-ink text-sand">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm text-sand/70">{SITE.description}</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm uppercase tracking-wider2 text-copper-light">Explore</h3>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="text-sand/80 hover:text-copper-light">{n.label}</Link></li>)}
            <li><Link to="/settings" className="text-sand/80 hover:text-copper-light">Settings</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm uppercase tracking-wider2 text-copper-light">Services</h3>
          <ul className="space-y-2 text-sm">
            {services.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} className="text-sand/80 hover:text-copper-light">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm uppercase tracking-wider2 text-copper-light">Contact (demo)</h3>
          <ul className="space-y-3 text-sm text-sand/80">
            <li className="flex gap-2"><Phone size={15} className="mt-0.5 shrink-0" /> {SITE.phone}</li>
            <li className="flex gap-2"><Mail size={15} className="mt-0.5 shrink-0" /> {SITE.email}</li>
            <li className="flex gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /> {SITE.address}</li>
          </ul>
          <p className="mt-4 text-xs text-sand/50">All contact details are placeholders.</p>
        </div>
      </div>
      <div className="border-t border-sand/10">
        <div className="container-page flex flex-col gap-1 py-5 text-xs text-sand/60 md:flex-row md:justify-between">
          <span>&copy; {new Date().getFullYear()} {SITE.name}. Fictional demo site. All content is sample data.</span>
          <span>Preferences and saved items are stored only in this browser.</span>
        </div>
      </div>
    </footer>
  );
}
