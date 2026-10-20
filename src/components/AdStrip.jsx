import { Megaphone } from 'lucide-react';

// Small placeholder ad slot shown at the bottom of every page.
// Replace the inner block with your ad network snippet when ready.
export default function AdStrip() {
  return (
    <aside aria-label="Advertisement" className="border-t border-ink/10 bg-sand dark:bg-ink-soft dark:border-sand/10">
      <div className="container-page py-4">
        <p className="mb-1 text-[10px] uppercase tracking-wider2 muted">Advertisement</p>
        <div className="flex h-16 items-center justify-center gap-2 border border-dashed border-ink/30 text-xs muted dark:border-sand/30 md:h-[90px]">
          <Megaphone size={14} /> Ad space (demo placeholder, 728 x 90)
        </div>
      </div>
    </aside>
  );
}
