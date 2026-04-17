import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generalLimiter } from './middlewares/rateLimiter.js';
import errorHandler from './middlewares/errorHandler.js';
import backgroundRouter from './routes/background.routes.js';
import studyRouter from './routes/study.routes.js';
import habitRouter from './routes/habit.routes.js';
import focusRouter from './routes/focus.routes.js';
import emojiRouter from './routes/emoji.routes.js';
import pointRouter from './routes/point.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(generalLimiter);

app.get('/', (_req, res) => {
  res.json({ message: 'Backend server is running.' });
});

app.get('/api/test', (_req, res) => {
  res.json({ message: 'API 연결 성공' });
});

app.use('/backgrounds', backgroundRouter);
app.use('/studies', studyRouter);
app.use('/habits', habitRouter);
app.use('/focuses', focusRouter);
app.use('/emojis', emojiRouter);
app.use('/points', pointRouter);

// 404 fallback처리
app.use((_req, res) => {
  res.status(404).json({
    error: { code: 'NOT_FOUND', message: '요청한 경로를 찾을 수 없습니다.' },
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
