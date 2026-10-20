import { useMemo, useState } from 'react';
import { posts } from '../data/posts';
import { postItem } from '../utils/items';
import { ContentCard } from '../components/Cards';
import PageHero from '../components/PageHero';

const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

export default function Blog() {
  const [tag, setTag] = useState('All');
  const list = useMemo(() => posts.filter((p) => tag === 'All' || p.tags.includes(tag)).sort((a, b) => b.date.localeCompare(a.date)), [tag]);
  return (
    <>
      <PageHero title="Blog" intro="Short, practical demo articles on acoustics and interiors." crumbs={[{ label: 'Blog' }]} />
      <section className="container-page py-12">
        <div className="mb-8 flex flex-wrap gap-2">
          {['All', ...allTags].map((t) => (
            <button key={t} onClick={() => setTag(t)} aria-pressed={tag === t}
              className={`border px-4 py-2 text-sm capitalize transition-colors ${tag === t ? 'border-copper bg-copper text-white' : 'border-ink/25 hover:border-copper dark:border-sand/25'}`}>{t}</button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b, i) => <ContentCard key={b.slug} item={postItem(b)} index={i % 3} />)}
        </div>
      </section>
    </>
  );
}
