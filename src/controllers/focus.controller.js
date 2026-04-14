import {
  findFocusByStudyId,
  createFocusSessionByStudyId,
} from '../services/focus.service.js';
import response from '../utils/response.js';

export async function getFocusByStudyId(req, res, next) {
  try {
    const studyId = Number(req.params.studyId);

    if (Number.isNaN(studyId)) {
      return res
        .status(400)
        .json(response({ message: '유효한 studyId가 아닙니다.' }));
    }

    const data = await findFocusByStudyId(studyId);

    return res.status(200).json(response({ data, message: 'focus 조회 성공' }));
  } catch (error) {
    next(error);
  }
}

export async function createFocusSession(req, res, next) {
  try {
    const studyId = Number(req.params.studyId);
    const { duration, earnedPoint, startedAt, completedAt } = req.body;

    if (Number.isNaN(studyId)) {
      return res
        .status(400)
        .json(response({ message: '유효한 studyId가 아닙니다.' }));
    }

    if (duration == null || earnedPoint == null || !startedAt || !completedAt) {
      return res.status(400).json(
        response({
          message:
            'duration, earnedPoint, startedAt, completedAt는 필수입니다.',
        })
      );
    }

    const data = await createFocusSessionByStudyId(studyId, {
      duration,
      earnedPoint,
      startedAt,
      completedAt,
    });

    return res
      .status(201)
      .json(response({ data, message: 'focus 세션 저장 성공' }));
  } catch (error) {
    next(error);
  }
}
