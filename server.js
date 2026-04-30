import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const host = process.env.HOST ?? '0.0.0.0';

const app = express();

app.disable('x-powered-by');

app.use(
  express.static(join(__dirname, 'public'), {
    extensions: ['html'],
    maxAge: '1h',
    setHeaders(res, filePath) {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  }),
);

app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((_req, res) => {
  res.status(404).sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(port, host, () => {
  console.log(`BEN'ARCADE running on http://${host}:${port}`);
});
