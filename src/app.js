import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.js';

import userRoutes from './routes/user.routes.js';
import backgroundRouter from './routes/background.routes.js';
import studyRouter from './routes/study.routes.js';
import habitRouter from './routes/habit.routes.js';
import focusRouter from './routes/focus.routes.js';
import emojiRouter from './routes/emoji.routes.js';
import pointRouter from './routes/point.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.get('/', (_req, res) => {
  res.json({ message: 'Backend server is running.' });
});

app.get('/api/test', (_req, res) => {
  res.json({ message: 'API 연결 성공' });
});

app.use('/users', userRoutes);
app.use('/backgrounds', backgroundRouter);
app.use('/studies', studyRouter);
app.use('/habits', habitRouter);
app.use('/focuses', focusRouter);
app.use('/emojis', emojiRouter);
app.use('/points', pointRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
