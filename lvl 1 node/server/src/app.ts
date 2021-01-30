import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app: express.Application = express();
app.set('port', process.env.API_PORT || 3001);

export { app };
