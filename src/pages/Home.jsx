import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star } from 'lucide-react';
import { SITE } from '../config/site';
import { services } from '../data/services';
import { projects } from '../data/projects';
import { posts } from '../data/posts';
import { stats, testimonials, whyUs } from '../data/content';
import { projectItem, postItem, serviceItem } from '../utils/items';
import { ContentCard } from '../components/Cards';
import ArtImage from '../components/ArtImage';
import ContactForm from '../components/ContactForm';
import CountUp from '../components/CountUp';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import VideoBlank from '../components/VideoBlank';
import { useMotion } from '../hooks/useMotion';

export default function Home() {
  const m = useMotion();
  const fade = (d) => (m.off ? {} : { initial: { opacity: 0, y: m.distance }, animate: { opacity: 1, y: 0 }, transition: { duration: m.duration, delay: d, ease: m.ease } });

  return (
    <>
      {/* Hero */}
      <section className="bg-sand dark:bg-ink-soft">
        <div className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <motion.p {...fade(0)} className="eyebrow mb-4">{SITE.tagline}</motion.p>
            <motion.h1 {...fade(0.08)} className="text-4xl leading-[1.1] md:text-6xl">Rooms that look good and sound <em className="text-copper">even better.</em></motion.h1>
            <motion.p {...fade(0.16)} className="mt-6 max-w-xl text-lg muted">
              {SITE.name} is a fictional demo studio. We plan homes, offices and shops around light, materials and, above all, how a space sounds.
            </motion.p>
            <motion.div {...fade(0.24)} className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="btn-primary">See our projects <ArrowRight size={16} /></Link>
              <Link to="/contact" className="btn-outline">Start a demo enquiry</Link>
            </motion.div>
          </div>
          <motion.div {...fade(0.2)} className="lg:col-span-2">
            <div className="card p-5 shadow-xl">
              <h2 className="mb-1 text-xl">Drop us your query</h2>
              <p className="mb-4 text-xs muted">Demo form, saved only in your browser.</p>
              <ContactForm compact />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink text-sand">
        <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} index={i} className="text-center">
              <p className="font-display text-4xl text-copper-light md:text-5xl"><CountUp value={s.value} decimals={s.decimals || 0} suffix={s.suffix} /></p>
              <p className="mt-1 text-xs uppercase tracking-wider2 text-sand/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="container-page py-16 md:py-24">
        <SectionHeading eyebrow="Our projects" title="Recent sample work" intro="Illustrated demo projects across homes, offices, retail and hospitality." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p, i) => <ContentCard key={p.slug} item={projectItem(p)} index={i} />)}
        </div>
        <div className="mt-10 text-center"><Link to="/projects" className="btn-outline">View all projects</Link></div>
      </section>

      {/* About strip + video placeholder */}
      <section className="bg-sand dark:bg-ink-soft">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <Reveal x={-40}>
            <p className="eyebrow mb-3">Our approach</p>
            <h2 className="text-3xl leading-tight md:text-4xl">Design that starts with the sound of the room</h2>
            <p className="mt-4 muted">Most studios choose finishes first and fix noise later. We reverse that: measure, zone, then style. The result is spaces that feel as calm as they look.</p>
            <Link to="/about" className="btn-primary mt-6">About the studio</Link>
          </Reveal>
          <Reveal x={40}><VideoBlank label="Studio video placeholder" /></Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="container-page py-16 md:py-24">
        <SectionHeading eyebrow="What we do" title="Services" align="center" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ContentCard key={s.slug} item={serviceItem(s)} index={i} />)}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-ink text-sand">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-24">
          <Reveal x={-40} className="aspect-[4/3] overflow-hidden"><ArtImage art={{ palette: 'ink', scene: 'lounge' }} alt="Lounge illustration" /></Reveal>
          <div>
            <Reveal><p className="eyebrow mb-3">Why choose us</p><h2 className="mb-6 text-3xl md:text-4xl">Calm by design</h2></Reveal>
            <ul className="space-y-4">
              {whyUs.map((w, i) => (
                <Reveal as="li" key={w.title} index={i} className="flex gap-3">
                  <Check size={18} className="mt-1 shrink-0 text-copper-light" />
                  <span><strong className="block">{w.title}</strong><span className="text-sm text-sand/70">{w.text}</span></span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page py-16 md:py-24">
        <SectionHeading eyebrow="Testimonials" title="What (fictional) clients say" intro="Sample testimonials written for this demo. They are not from real customers." />
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} index={i} className="card p-6">
              <div className="mb-3 flex gap-0.5 text-copper" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={16} className={k < t.rating ? 'fill-copper' : ''} />)}
              </div>
              <p className="font-display text-lg leading-snug">"{t.text}"</p>
              <p className="mt-4 text-sm muted">{t.name} - {t.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="bg-sand dark:bg-ink-soft">
        <div className="container-page py-16 md:py-24">
          <SectionHeading eyebrow="From the journal" title="Latest articles" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((b, i) => <ContentCard key={b.slug} item={postItem(b)} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}
