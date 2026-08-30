import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `--mode single` builds one self-contained .html (fonts + logo as data URIs)
// for sharing a preview. Normal `build` is the Vercel deploy.
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: {
    outDir: mode === 'single' ? 'dist-single' : 'dist',
    // Inline every asset so the single-file build has no external requests.
    assetsInlineLimit: mode === 'single' ? 20 * 1024 * 1024 : 4096,
    chunkSizeWarningLimit: 4000,
  },
}));
