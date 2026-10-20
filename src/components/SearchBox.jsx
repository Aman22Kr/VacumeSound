import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { buildIndex, searchIndex } from '../utils/search';

// Global search: filters demo content as you type; Enter opens the full results page.
export default function SearchBox({ open, onClose }) {
  const [q, setQ] = useState('');
  const { history, addHistory, clearHistory } = useApp();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const index = useMemo(buildIndex, []);
  const results = useMemo(() => (q.trim() ? searchIndex(index, q).slice(0, 6) : []), [index, q]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    else setQ('');
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const go = (to, term) => {
    if (term) addHistory(term);
    onClose();
    navigate(to);
  };
  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) go(`/search?q=${encodeURIComponent(q.trim())}`, q);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-ink/70 px-4 pt-20 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search">
      <div className="mx-auto max-w-2xl bg-sand-light shadow-2xl dark:bg-ink-soft" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={submit} className="flex items-center gap-3 border-b border-ink/10 p-4 dark:border-sand/10">
          <Search size={18} className="muted" />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services, projects, articles..." className="w-full bg-transparent text-base outline-none" aria-label="Search" />
          <button type="button" onClick={onClose} aria-label="Close search"><X size={18} /></button>
        </form>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {q.trim() && results.length === 0 && <p className="p-4 text-sm muted">No matches for "{q}". Try "kitchen", "office" or "acoustic".</p>}
          {results.map((r) => (
            <button key={r.key} onClick={() => go(r.to, q)} className="flex w-full items-start gap-3 p-3 text-left hover:bg-sand dark:hover:bg-ink">
              <span className="mt-0.5 w-16 shrink-0 text-[10px] uppercase tracking-wider2 text-copper">{r.type}</span>
              <span><span className="block font-semibold">{r.title}</span><span className="block text-xs muted line-clamp-1">{r.summary}</span></span>
            </button>
          ))}
          {!q.trim() && history.length > 0 && (
            <div className="p-2">
              <div className="mb-1 flex items-center justify-between text-xs muted">
                <span>Recent searches</span>
                <button onClick={clearHistory} className="underline">Clear</button>
              </div>
              {history.map((h) => (
                <button key={h} onClick={() => go(`/search?q=${encodeURIComponent(h)}`, h)} className="flex w-full items-center gap-2 p-2 text-left text-sm hover:bg-sand dark:hover:bg-ink">
                  <History size={14} className="muted" /> {h}
                </button>
              ))}
            </div>
          )}
          {!q.trim() && history.length === 0 && <p className="p-4 text-sm muted">Start typing to search. Press Enter for full results.</p>}
        </div>
      </div>
    </div>
  );
}
