import * as pointService from '../services/point.service.js';
import { success, fail } from '../utils/response.js';

export const getPoint = async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const point = await pointService.findPointByStudyId(Number(studyId));
    if (!point) return fail(res, 'NOT_FOUND', '포인트 정보를 찾을 수 없습니다.', 404);
    success(res, point);
  } catch (err) {
    next(err);
  }
};

export const addPoints = async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const { amount } = req.body;
    const point = await pointService.addPoints(Number(studyId), Number(amount));
    success(res, point);
  } catch (err) {
    next(err);
  }
};
