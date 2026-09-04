import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Builds the whole site into a single, self-contained HTML file
// that can be opened directly by double-click, no server needed.
// Output lands in .standalone-build/index.html and is renamed to
// hochzeitsseite.html by the build:standalone npm script.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    outDir: '.standalone-build',
  },
})
