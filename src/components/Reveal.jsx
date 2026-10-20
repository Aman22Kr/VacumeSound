import { motion } from 'framer-motion';
import { useMotion } from '../hooks/useMotion';

// Scroll-in animation driven by the user's speed/intensity settings.
export default function Reveal({ children, delay = 0, index = 0, className = '', as = 'div', x = 0 }) {
  const m = useMotion();
  const Comp = motion[as] || motion.div;
  if (m.off) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: m.distance, x: x * (m.distance / 28) }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: m.duration, ease: m.ease, delay: delay + index * m.stagger }}
    >
      {children}
    </Comp>
  );
}
