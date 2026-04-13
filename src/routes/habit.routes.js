import express from 'express';
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  upsertHabitRecord,
  getHabitRecords,
} from '../controllers/habit.controller.js';

const router = express.Router();

router.post('/', createHabit);
router.get('/', getHabits);
router.patch('/:habitId', updateHabit);
router.delete('/:habitId', deleteHabit);
router.post('/:habitId/records', upsertHabitRecord);
router.get('/:habitId/records', getHabitRecords);

export default router;
