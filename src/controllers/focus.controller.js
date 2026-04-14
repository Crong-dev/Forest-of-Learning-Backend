import {
  findFocusByStudyId,
  createFocusSessionByStudyId,
} from '../services/focus.service.js';
import { success, fail } from '../utils/response.js';

export async function getFocusByStudyId(req, res, next) {
  try {
    const studyId = Number(req.params.studyId);

    if (Number.isNaN(studyId)) {
      return fail(res, 'BAD_REQUEST', '유효한 studyId가 아닙니다.', 400);
    }

    const data = await findFocusByStudyId(studyId);

    return success(res, data, 'focus 조회 성공', 200);
  } catch (error) {
    next(error);
  }
}

export async function createFocusSession(req, res, next) {
  try {
    const studyId = Number(req.params.studyId);
    const { duration, earnedPoint, startedAt, completedAt } = req.body;

    if (Number.isNaN(studyId)) {
      return fail(res, 'BAD_REQUEST', '유효한 studyId가 아닙니다.', 400);
    }

    if (duration == null || earnedPoint == null || !startedAt || !completedAt) {
      return fail(
        res,
        'BAD_REQUEST',
        'duration, earnedPoint, startedAt, completedAt는 필수입니다.',
        400
      );
    }

    const data = await createFocusSessionByStudyId(studyId, {
      duration,
      earnedPoint,
      startedAt,
      completedAt,
    });

    return success(res, data, 'focus 세션 저장 성공', 201);
  } catch (error) {
    next(error);
  }
}
