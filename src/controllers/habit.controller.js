import * as habitService from '../services/habit.service.js';
import { success, fail } from '../utils/response.js';

export const createHabit = async (req, res, next) => {
  try {
    const { studyId, name } = req.body;
    const habit = await habitService.createHabit({
      studyId: Number(studyId),
      name,
    });
    success(res, habit, 'created', 201);
  } catch (err) {
    next(err);
  }
};

export const getHabits = async (req, res, next) => {
  try {
    const { studyId } = req.query;
    if (!studyId) return fail(res, 'BAD_REQUEST', 'studyId가 필요합니다.', 400);
    const items = await habitService.findHabitsByStudyId(Number(studyId));
    success(res, { items });
  } catch (err) {
    next(err);
  }
};

export const updateHabit = async (req, res, next) => {
  try {
    const { habitId } = req.params;
    const habit = await habitService.updateHabit(Number(habitId), req.body);
    success(res, habit);
  } catch (err) {
    next(err);
  }
};

export const deleteHabit = async (req, res, next) => {
  try {
    const { habitId } = req.params;
    await habitService.deleteHabit(Number(habitId));
    success(res, null, 'deleted');
  } catch (err) {
    next(err);
  }
};

export const upsertHabitRecord = async (req, res, next) => {
  try {
    const { habitId } = req.params;
    const { date, completed } = req.body;
    const record = await habitService.upsertHabitRecord(
      Number(habitId),
      date,
      completed
    );
    success(res, record);
  } catch (err) {
    next(err);
  }
};

export const getHabitRecords = async (req, res, next) => {
  try {
    const { weekStart, weekEnd } = req.query;
    const { studyId } = req.params;
    const items = await habitService.findHabitRecords(
      Number(studyId),
      weekStart,
      weekEnd
    );
    success(res, { weekStart, weekEnd, items });
  } catch (err) {
    next(err);
  }
};
