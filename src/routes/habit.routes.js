import express from 'express';
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  upsertHabitRecord,
  getHabitRecords,
} from '../controllers/habit.controller.js';
import { numericParams } from '../middlewares/validateParams.js';

const router = express.Router();

router.post('/', numericParams('studyId'), createHabit);
router.get('/', numericParams('studyId'), getHabits);
router.patch('/:habitId', numericParams('habitId'), updateHabit);
router.delete('/:habitId', numericParams('habitId'), deleteHabit);
router.post('/:habitId/records', numericParams('habitId'), upsertHabitRecord);
router.get('/:studyId/records', numericParams('studyId'), getHabitRecords);

export default router;
