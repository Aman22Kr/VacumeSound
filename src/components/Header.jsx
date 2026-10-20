import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Heart, Menu, Moon, Phone, Search, Sun, X } from 'lucide-react';
import { NAV, SITE } from '../config/site';
import { services } from '../data/services';
import { useApp } from '../context/AppContext';
import SearchBox from './SearchBox';

export function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label={`${SITE.name} home`}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" fill={light ? '#f1ebe1' : '#16181c'} />
        <path d="M6 16h3l3-8 4 16 3-12 2 4h5" stroke="#d98b5c" strokeWidth="2" fill="none" />
      </svg>
      <span className={`font-display text-xl font-bold tracking-tight ${light ? 'text-sand' : ''}`}>{SITE.name}</span>
    </Link>
  );
}

const linkCls = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors hover:text-copper ${isActive ? 'text-copper' : ''}`;

export default function Header() {
  const [mobile, setMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const { theme, setTheme, favourites } = useApp();
  const { pathname } = useLocation();

  useEffect(() => { setMobile(false); setSub(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-sand-light/95 backdrop-blur dark:border-sand/10 dark:bg-ink/95">
      <div className="hidden bg-ink text-sand md:block">
        <div className="container-page flex items-center justify-between py-1.5 text-xs">
          <span>{SITE.tagline} - demo site, not a real business</span>
          <span className="flex items-center gap-1"><Phone size={12} /> {SITE.phone} (placeholder)</span>
        </div>
      </div>
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center lg:flex" aria-label="Main">
          {NAV.map((n) =>
            n.children ? (
              <div key={n.to} className="group relative" onMouseEnter={() => setSub(true)} onMouseLeave={() => setSub(false)}>
                <NavLink to={n.to} className={(s) => `${linkCls(s)} inline-flex items-center gap-1`}>
                  {n.label} <ChevronDown size={14} />
                </NavLink>
                <div className={`absolute left-0 top-full w-64 border border-ink/10 bg-sand-light py-2 shadow-xl transition duration-200 dark:border-sand/10 dark:bg-ink ${sub ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'}`}>
                  {services.map((s) => (
                    <Link key={s.slug} to={`/services/${s.slug}`} className="block px-4 py-2 text-sm hover:bg-sand hover:text-copper dark:hover:bg-ink-soft">{s.title}</Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkCls}>{n.label}</NavLink>
            )
          )}
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={() => setSearchOpen(true)} className="p-2 hover:text-copper" aria-label="Open search"><Search size={19} /></button>
          <Link to="/saved" className="relative p-2 hover:text-copper" aria-label="Saved items">
            <Heart size={19} />
            {favourites.length > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center bg-copper px-1 text-[10px] text-white">{favourites.length}</span>}
          </Link>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 hover:text-copper" aria-label="Toggle dark mode">
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button onClick={() => setMobile((m) => !m)} className="p-2 lg:hidden" aria-label="Toggle menu" aria-expanded={mobile}>
            {mobile ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {mobile && (
        <nav className="border-t border-ink/10 bg-sand-light lg:hidden dark:border-sand/10 dark:bg-ink" aria-label="Mobile">
          <div className="container-page flex flex-col py-3">
            {NAV.map((n) => (
              <div key={n.to}>
                <NavLink to={n.to} end={n.to === '/'} className={(s) => `${linkCls(s)} block py-3`}>{n.label}</NavLink>
                {n.children && (
                  <div className="mb-2 ml-4 border-l border-ink/15 pl-3 dark:border-sand/20">
                    {services.map((s) => (
                      <Link key={s.slug} to={`/services/${s.slug}`} className="block py-1.5 text-sm muted hover:text-copper">{s.title}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
      <SearchBox open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
