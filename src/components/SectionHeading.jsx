import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, intro, align = 'left' }) {
  return (
    <Reveal className={`mb-10 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl leading-tight md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 muted">{intro}</p>}
    </Reveal>
  );
}
