import express from 'express';
import { getPoint, addPoints } from '../controllers/point.controller.js';

const router = express.Router();

router.get('/:studyId', getPoint);
router.patch('/:studyId', addPoints);

export default router;
