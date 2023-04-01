import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from "node:url";

const filesNeedToExclude = ["src/pluggables/Comp1.vue", "src/pluggables/Comp2.vue"];

const filesPathToExclude = filesNeedToExclude.map((src) => {
  return fileURLToPath(new URL(src, import.meta.url));
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    manifest: true,
    rollupOptions: {
      external: [
        ...filesPathToExclude
      ]
    }
  }
})
