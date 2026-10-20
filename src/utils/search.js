import { services } from '../data/services';
import { projects } from '../data/projects';
import { posts } from '../data/posts';

// Unified, searchable index across all demo content.
export function buildIndex() {
  return [
    ...services.map((s) => ({
      type: 'Service', key: `service:${s.slug}`, to: `/services/${s.slug}`,
      title: s.title, summary: s.short, tags: s.tags, art: s.art,
      text: [s.title, s.short, ...s.tags].join(' ').toLowerCase(),
    })),
    ...projects.map((p) => ({
      type: 'Project', key: `project:${p.slug}`, to: `/projects/${p.slug}`,
      title: p.title, summary: p.summary, tags: p.tags, art: p.art, category: p.category,
      text: [p.title, p.summary, p.category, p.location, ...p.tags].join(' ').toLowerCase(),
    })),
    ...posts.map((b) => ({
      type: 'Article', key: `post:${b.slug}`, to: `/blog/${b.slug}`,
      title: b.title, summary: b.excerpt, tags: b.tags, art: b.art,
      text: [b.title, b.excerpt, ...b.tags].join(' ').toLowerCase(),
    })),
  ];
}

export function searchIndex(index, query, type = 'All', sort = 'relevance') {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  let res = index
    .filter((i) => type === 'All' || i.type === type)
    .map((i) => {
      if (!terms.length) return { i, score: 0 };
      let score = 0;
      for (const t of terms) {
        if (!i.text.includes(t)) return { i, score: -1 };
        score += i.title.toLowerCase().includes(t) ? 3 : 1;
      }
      return { i, score };
    })
    .filter((r) => r.score >= 0);
  if (sort === 'az') res.sort((a, b) => a.i.title.localeCompare(b.i.title));
  else res.sort((a, b) => b.score - a.score);
  return res.map((r) => r.i);
}

export function findByKey(index, key) {
  return index.find((i) => i.key === key);
}
