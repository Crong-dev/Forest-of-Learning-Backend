import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running.' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API 연결 성공' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
