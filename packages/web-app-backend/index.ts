import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { FeatureVoteController } from './src/feature-vote/feature-vote.controller.js';
import { FeedbackController } from './src/feedback/feedback.controller.js';
import { UserController } from './src/user/user.controller.js';

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT ?? 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicFolder = resolve(__dirname, '..', '..', 'web-app', 'public');
const clientHtml = resolve(__dirname, '..', '..', 'web-app', 'public', 'index.html');
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const databaseUri = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@chrome-extension.w0mag.mongodb.net/`;

mongoose.connect(databaseUri)
.then(() => console.log(`[Server]: Successfully connected to database`))
.catch((error) => console.error(`[Server]: Error connecting to database - ${error}`));

app.use(express.json({ limit: '5mb' }));
app.use(express.static(publicFolder));

// Controllers
new FeatureVoteController(app);
new FeedbackController(app);
new UserController(app);

app.get('/api', (req, res) => {
  res.send('[Server]: This endpoint is working as intended.');
});

app.get('*', (req, res) => {
  res.sendFile(clientHtml);
});

app.listen(
  port,
  () => console.log(`[Server]: App listening on port ${port}`)
);
