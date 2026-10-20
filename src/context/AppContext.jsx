import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SITE } from '../config/site';
import { clearAllStore } from '../utils/storage';

const AppContext = createContext(null);

const isArr = (v) => Array.isArray(v);
const SPEEDS = ['off', 'slow', 'normal', 'fast'];
const INTENSITIES = ['subtle', 'medium', 'strong'];
const validAnim = (v) =>
  v && SPEEDS.includes(v.speed) && INTENSITIES.includes(v.intensity);

export function AppProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light', (v) => v === 'light' || v === 'dark');
  const [anim, setAnim] = useLocalStorage('anim', SITE.defaultAnimation, validAnim);
  const [favourites, setFavourites] = useLocalStorage('favourites', [], isArr);
  const [recent, setRecent] = useLocalStorage('recent', [], isArr);
  const [history, setHistory] = useLocalStorage('searchHistory', [], isArr);
  const [enquiries, setEnquiries] = useLocalStorage('enquiries', [], isArr);
  const [draft, setDraft] = useLocalStorage('contactDraft', { name: '', mobile: '', email: '', message: '' });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleFav = useCallback(
    (key) =>
      setFavourites((f) => (f.includes(key) ? f.filter((k) => k !== key) : [...f, key])),
    [setFavourites]
  );

  const addRecent = useCallback(
    (key) => setRecent((r) => [key, ...r.filter((k) => k !== key)].slice(0, 8)),
    [setRecent]
  );

  const addHistory = useCallback(
    (q) => {
      const t = q.trim();
      if (t.length < 2) return;
      setHistory((h) => [t, ...h.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 8));
    },
    [setHistory]
  );

  const resetAll = useCallback(() => {
    clearAllStore();
    setTheme('light');
    setAnim(SITE.defaultAnimation);
    setFavourites([]);
    setRecent([]);
    setHistory([]);
    setEnquiries([]);
    setDraft({ name: '', mobile: '', email: '', message: '' });
  }, [setTheme, setAnim, setFavourites, setRecent, setHistory, setEnquiries, setDraft]);

  const value = useMemo(
    () => ({
      theme, setTheme, anim, setAnim, favourites, toggleFav, recent, addRecent,
      history, addHistory, clearHistory: () => setHistory([]),
      enquiries, setEnquiries, draft, setDraft, resetAll,
    }),
    [theme, setTheme, anim, setAnim, favourites, toggleFav, recent, addRecent, history, addHistory, setHistory, enquiries, setEnquiries, draft, setDraft, resetAll]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
