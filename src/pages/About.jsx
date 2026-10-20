import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import ArtImage from '../components/ArtImage';
import { SITE } from '../config/site';
import { whyUs } from '../data/content';

const team = [
  { name: 'Sample Person One', role: 'Principal designer (demo)', art: { palette: 'sand', scene: 'living' } },
  { name: 'Sample Person Two', role: 'Acoustic consultant (demo)', art: { palette: 'ink', scene: 'office' } },
  { name: 'Sample Person Three', role: 'Project manager (demo)', art: { palette: 'moss', scene: 'kitchen' } },
];

export default function About() {
  return (
    <>
      <PageHero title={`About ${SITE.name}`} intro="A fictional studio created for demonstration. Everything here is sample content." crumbs={[{ label: 'About' }]} />
      <section className="container-page grid gap-10 py-16 md:grid-cols-2 md:py-20">
        <Reveal x={-40} className="aspect-[4/3] overflow-hidden"><ArtImage art={{ palette: 'copper', scene: 'lounge' }} alt="Studio illustration" /></Reveal>
        <Reveal x={40}>
          <p className="eyebrow mb-3">Our story (fictional)</p>
          <h2 className="text-3xl md:text-4xl">Founded on a noisy flat</h2>
          <p className="mt-4 muted">The demo story goes like this: our founders lived above a busy street and learned how much comfort depends on sound. They started {SITE.name} to design spaces that look beautiful and stay quiet.</p>
          <p className="mt-4 muted">Today the imaginary team plans homes, offices, shops and studios with the same rule: measure first, style second.</p>
          <Link to="/contact" className="btn-primary mt-6">Talk to the studio (demo)</Link>
        </Reveal>
      </section>
      <section className="bg-sand dark:bg-ink-soft">
        <div className="container-page py-16 md:py-20">
          <SectionHeading eyebrow="Principles" title="How we work" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} index={i} className="card p-6">
                <h3 className="text-xl">{w.title}</h3><p className="mt-2 text-sm muted">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="container-page py-16 md:py-20">
        <SectionHeading eyebrow="Team" title="The (imaginary) team" intro="Placeholder profiles. No real people are depicted." />
        <div className="grid gap-6 sm:grid-cols-3">
          {team.map((t, i) => (
            <Reveal key={t.name} index={i} className="card overflow-hidden">
              <div className="aspect-[4/3]"><ArtImage art={t.art} alt={t.name} /></div>
              <div className="p-4"><h3 className="text-lg">{t.name}</h3><p className="text-sm muted">{t.role}</p></div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
