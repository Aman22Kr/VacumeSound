import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ArtImage from './ArtImage';
import FavButton from './FavButton';
import Reveal from './Reveal';
import { useMotion } from '../hooks/useMotion';

// Generic content card used for projects, services, posts and search results.
export function ContentCard({ item, index = 0 }) {
  const m = useMotion();
  return (
    <Reveal index={index}>
      <Link to={item.to} className="group card block overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            className="h-full w-full transition-transform ease-out"
            style={{ transitionDuration: m.off ? '0ms' : '500ms' }}
            data-zoom={m.scale}
          >
            <div className="h-full w-full group-hover:scale-[1.06]">
              <ArtImage art={item.art} alt={item.title} />
            </div>
          </div>
          <span className="absolute left-3 top-3 bg-ink px-2 py-1 text-[10px] uppercase tracking-wider2 text-sand">{item.badge || item.type}</span>
          <FavButton itemKey={item.key} className="absolute right-3 top-3" />
        </div>
        <div className="p-5">
          <h3 className="flex items-start justify-between gap-2 text-xl leading-snug">
            {item.title}
            <ArrowUpRight size={18} className="mt-1 shrink-0 text-copper opacity-0 transition group-hover:opacity-100" />
          </h3>
          <p className="mt-2 text-sm muted line-clamp-2">{item.summary}</p>
          {item.meta && <p className="mt-3 text-xs uppercase tracking-wide text-copper">{item.meta}</p>}
        </div>
      </Link>
    </Reveal>
  );
}
