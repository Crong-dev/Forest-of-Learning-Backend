import * as focusService from '../services/focus.service.js';
import { success, fail } from '../utils/response.js';

export const createFocusSession = async (req, res, next) => {
  try {
    const { studyId, duration, earnedPoint, startedAt, completedAt } = req.body;
    const session = await focusService.createFocusSession({
      studyId: Number(studyId),
      duration: Number(duration),
      earnedPoint: Number(earnedPoint),
      startedAt: new Date(startedAt),
      completedAt: new Date(completedAt),
    });
    success(res, session, 'created', 201);
  } catch (err) {
    next(err);
  }
};

export const getFocusSessions = async (req, res, next) => {
  try {
    const { studyId } = req.query;
    if (!studyId) return fail(res, 'BAD_REQUEST', 'studyId가 필요합니다.', 400);
    const items = await focusService.findFocusSessionsByStudyId(Number(studyId));
    success(res, { items });
  } catch (err) {
    next(err);
  }
};
