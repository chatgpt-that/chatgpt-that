import express from 'express';
import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT ?? 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicFolder = resolve(__dirname, '..', '..', 'web-app', 'public');
const clientHtml = resolve(__dirname, '..', '..', 'web-app', 'public', 'index.html');

app.use(express.json({ limit: '5mb' }));
app.use(express.static(publicFolder));

app.get('/', (req, res) => {
  res.sendFile(clientHtml);
});

app.get('/api', (req, res) => {
  res.send('[Server]: This endpoint is working as intended.');
});

app.listen(
  port,
  () => console.log(`[Server]: App listening on port ${port}`)
);
