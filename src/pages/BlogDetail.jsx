import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { posts } from '../data/posts';
import { postItem } from '../utils/items';
import { ContentCard } from '../components/Cards';
import PageHero from '../components/PageHero';
import ArtImage from '../components/ArtImage';
import FavButton from '../components/FavButton';
import SectionHeading from '../components/SectionHeading';
import NotFound from './NotFound';
import { useApp } from '../context/AppContext';

export default function BlogDetail() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const { addRecent } = useApp();
  useEffect(() => { if (post) addRecent(`post:${post.slug}`); }, [post, addRecent]);
  if (!post) return <NotFound what="article" />;
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <PageHero title={post.title} crumbs={[{ label: 'Blog', to: '/blog' }, { label: post.title }]} />
      <article className="container-page max-w-3xl py-14">
        <div className="relative mb-8 aspect-[16/9] overflow-hidden"><ArtImage art={post.art} alt={post.title} /><FavButton itemKey={`post:${post.slug}`} className="absolute right-3 top-3" /></div>
        <p className="mb-6 flex items-center gap-3 text-sm muted">
          <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {post.readMins} min read</span>
        </p>
        {post.body.map((p) => <p key={p} className="mb-5 text-lg leading-relaxed">{p}</p>)}
        <p className="mt-8 text-xs muted">Demo article written for this sample site.</p>
        <div className="mt-6 flex flex-wrap gap-2">{post.tags.map((t) => <span key={t} className="bg-sand px-2 py-1 text-xs dark:bg-ink-soft">#{t}</span>)}</div>
        <Link to="/blog" className="btn-outline mt-8">Back to blog</Link>
      </article>
      <section className="bg-sand dark:bg-ink-soft">
        <div className="container-page py-16">
          <SectionHeading title="Keep reading" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{more.map((b, i) => <ContentCard key={b.slug} item={postItem(b)} index={i} />)}</div>
        </div>
      </section>
    </>
  );
}
