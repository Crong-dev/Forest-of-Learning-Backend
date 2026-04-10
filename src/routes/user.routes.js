import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, nickname } = req.body;

  const study = await prisma.study.create({
    data: { email, nickname },
  });
  res.json(study);
});

router.get('/', async (req, res) => {
  const study = await prisma.study.findMany();
  res.json(study);
});

export default router;
