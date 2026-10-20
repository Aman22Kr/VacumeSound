// Original generated illustrations used instead of copied photos.
// They never break (no network) and keep a fixed aspect ratio.
const PALETTES = {
  sand:   { bg: '#e9dfcf', wall: '#f3ece0', accent: '#b8602f', dark: '#3a352e', soft: '#cdbfa5' },
  copper: { bg: '#d99a6c', wall: '#ecc7a5', accent: '#7a3a17', dark: '#2b1a10', soft: '#b8723f' },
  ink:    { bg: '#2c3037', wall: '#444a54', accent: '#d98b5c', dark: '#0f1114', soft: '#5d6470' },
  moss:   { bg: '#7e9784', wall: '#b9c9bc', accent: '#2f4637', dark: '#1b2a21', soft: '#5f7a68' },
};

function Scene({ scene, c }) {
  switch (scene) {
    case 'office':
      return (<g><rect x="40" y="190" width="320" height="10" fill={c.dark} /><rect x="60" y="150" width="90" height="40" fill={c.soft} /><rect x="170" y="150" width="90" height="40" fill={c.soft} /><rect x="280" y="150" width="70" height="40" fill={c.soft} /><rect x="75" y="125" width="60" height="25" fill={c.dark} /><rect x="185" y="125" width="60" height="25" fill={c.dark} /><rect x="60" y="40" width="280" height="12" fill={c.accent} opacity=".7" /></g>);
    case 'kitchen':
      return (<g><rect x="30" y="170" width="340" height="40" fill={c.dark} /><rect x="30" y="60" width="120" height="60" fill={c.soft} /><rect x="160" y="60" width="120" height="60" fill={c.soft} /><rect x="290" y="60" width="80" height="60" fill={c.soft} /><rect x="130" y="130" width="140" height="40" fill={c.accent} /></g>);
    case 'retail':
      return (<g><rect x="40" y="70" width="60" height="120" fill={c.soft} /><rect x="120" y="70" width="60" height="120" fill={c.soft} /><rect x="200" y="70" width="60" height="120" fill={c.soft} /><rect x="280" y="70" width="80" height="120" fill={c.soft} /><rect x="40" y="110" width="320" height="6" fill={c.accent} /><rect x="40" y="150" width="320" height="6" fill={c.accent} /></g>);
    case 'cafe':
      return (<g><circle cx="110" cy="150" r="26" fill={c.accent} /><rect x="106" y="170" width="8" height="30" fill={c.dark} /><circle cx="240" cy="150" r="26" fill={c.accent} /><rect x="236" y="170" width="8" height="30" fill={c.dark} /><rect x="60" y="50" width="280" height="8" fill={c.dark} /><circle cx="130" cy="75" r="10" fill={c.wall} /><circle cx="200" cy="75" r="10" fill={c.wall} /><circle cx="270" cy="75" r="10" fill={c.wall} /></g>);
    case 'lounge':
      return (<g><rect x="70" y="140" width="190" height="55" fill={c.accent} /><rect x="70" y="115" width="190" height="30" fill={c.soft} /><rect x="290" y="95" width="60" height="100" fill={c.dark} opacity=".5" /><rect x="40" y="60" width="140" height="30" fill={c.soft} /></g>);
    default: // living
      return (<g><rect x="60" y="145" width="170" height="50" fill={c.accent} /><rect x="60" y="120" width="170" height="30" fill={c.soft} /><rect x="260" y="120" width="70" height="75" fill={c.dark} opacity=".55" /><rect x="90" y="50" width="90" height="55" fill={c.wall} stroke={c.dark} strokeWidth="3" /><rect x="200" y="60" width="40" height="40" fill={c.soft} /></g>);
  }
}

export default function ArtImage({ art = {}, className = '', alt = '' }) {
  const c = PALETTES[art.palette] || PALETTES.sand;
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt || 'Illustration of an interior'}
      className={`block h-full w-full ${className}`}
    >
      <rect width="400" height="240" fill={c.bg} />
      <rect y="0" width="400" height="200" fill={c.wall} />
      <rect y="200" width="400" height="40" fill={c.soft} opacity=".6" />
      <Scene scene={art.scene} c={c} />
    </svg>
  );
}
