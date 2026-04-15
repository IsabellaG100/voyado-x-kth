import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

const repoRoot = path.resolve(__dirname, '../..');

function copyDocsPlugin(): Plugin {
  const srcDir = path.join(repoRoot, 'docs');
  const files = ['slides.html'];

  return {
    name: 'copy-docs',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = files.find((f) => req.url === `/docs/${f}`);
        if (match) {
          const filePath = path.join(srcDir, match);
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    },
    closeBundle() {
      const outDir = path.join(__dirname, 'dist', 'docs');
      fs.mkdirSync(outDir, { recursive: true });
      for (const file of files) {
        fs.copyFileSync(path.join(srcDir, file), path.join(outDir, file));
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyDocsPlugin()],
  envDir: repoRoot,
  server: {
    port: 3000,
  },
});
