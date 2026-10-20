import { services } from '../data/services';
import { projects } from '../data/projects';
import { posts } from '../data/posts';

// Normalises demo records into the shape ContentCard expects.
export const serviceItem = (s) => ({
  key: `service:${s.slug}`, to: `/services/${s.slug}`, type: 'Service', title: s.title, summary: s.short, art: s.art,
});
export const projectItem = (p) => ({
  key: `project:${p.slug}`, to: `/projects/${p.slug}`, type: 'Project', badge: p.category, title: p.title,
  summary: p.summary, art: p.art, meta: `${p.location} - ${p.year}`,
});
export const postItem = (b) => ({
  key: `post:${b.slug}`, to: `/blog/${b.slug}`, type: 'Article', title: b.title, summary: b.excerpt, art: b.art,
  meta: `${new Date(b.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} - ${b.readMins} min read`,
});

export function itemFromKey(key) {
  const [kind, slug] = key.split(':');
  if (kind === 'service') { const s = services.find((x) => x.slug === slug); return s && serviceItem(s); }
  if (kind === 'project') { const p = projects.find((x) => x.slug === slug); return p && projectItem(p); }
  if (kind === 'post') { const b = posts.find((x) => x.slug === slug); return b && postItem(b); }
  return null;
}
