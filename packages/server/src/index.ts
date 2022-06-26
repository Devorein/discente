import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { SERVER_PORT } from './config';
import { logger } from './middlewares';
import RootRouter from './routers';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());
app.use(logger);
app.use(cookieParser());

app.use('/v1', RootRouter);

app.get('/ping', (_, res) => {
  res.send('pong!');
});

app.listen(SERVER_PORT, async () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
