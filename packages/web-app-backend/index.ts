import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT ?? 3000;

app.get('/api', (req, res) => {
  res.send('[Server]: This endpoint is working as intended.');
});

app.listen(
  port,
  () => console.log(`[Server]: App listening on port ${port}`)
);
