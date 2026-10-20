import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path.
// './' (relative) works under ANY GitHub Pages repository name because the app
// uses hash routing (#/path), so no server rewrites are needed.
// Override with VITE_BASE=/my-repo/ if you prefer absolute asset URLs.
const base = process.env.VITE_BASE || './';

export default defineConfig({
  base,
  plugins: [react()],
});
