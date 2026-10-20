import { useReducedMotion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const DURATION = { slow: 0.9, normal: 0.55, fast: 0.25 };
const DISTANCE = { subtle: 12, medium: 28, strong: 56 };
const STAGGER = { slow: 0.14, normal: 0.09, fast: 0.04 };

// Returns the animation settings derived from the user's stored preferences.
export function useMotion() {
  const { anim } = useApp();
  const reduce = useReducedMotion();
  const off = reduce || anim.speed === 'off';
  return {
    off,
    duration: off ? 0 : DURATION[anim.speed],
    distance: off ? 0 : DISTANCE[anim.intensity],
    stagger: off ? 0 : STAGGER[anim.speed],
    ease: [0.22, 1, 0.36, 1],
    scale: off ? 1 : anim.intensity === 'strong' ? 1.06 : anim.intensity === 'medium' ? 1.03 : 1.015,
  };
}
