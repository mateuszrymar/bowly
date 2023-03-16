import { defineConfig } from 'vite'
import { resolve } from 'path'

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
// const __dirname = './src/'

export default defineConfig({
  root,
  assetsInclude: [
    '**/*.txt',
    '**/*.svg',
  ],
  build: {
    outDir,
    emptyOutDir: false,
    build: {
      assetsInlineLimit: '0' // kb
    },
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        results: resolve(root, 'pages', 'results.html'),
      },
    },
    publicDir: resolve(root, 'assets'),
  },
  
})