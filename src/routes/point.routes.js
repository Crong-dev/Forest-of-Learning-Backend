import express from 'express';
import { getPoint, addPoints } from '../controllers/point.controller.js';
import { numericParams } from '../middlewares/validateParams.js';

const router = express.Router();

router.get('/:studyId', numericParams('studyId'), getPoint);
router.patch('/:studyId', numericParams('studyId', 'amount'), addPoints);

export default router;
