import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function FavButton({ itemKey, className = '' }) {
  const { favourites, toggleFav } = useApp();
  const on = favourites.includes(itemKey);
  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFav(itemKey); }}
      aria-pressed={on}
      aria-label={on ? 'Remove from saved' : 'Save item'}
      className={`flex h-9 w-9 items-center justify-center bg-white/90 text-ink shadow transition hover:scale-110 ${className}`}
    >
      <Heart size={17} className={on ? 'fill-copper text-copper' : ''} />
    </button>
  );
}
