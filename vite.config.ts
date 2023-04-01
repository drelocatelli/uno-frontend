import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from "node:url";
import 'dotenv/config';

const filesNeedToExclude = ["testing/**/*"];

const filesPathToExclude = filesNeedToExclude.map((src) => {
  return fileURLToPath(new URL(src, import.meta.url));
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000
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
