import * as studyService from '../services/study.service.js';
import { success, fail } from '../utils/response.js';

export const createStudy = async (req, res, next) => {
  try {
    const {
      nickname,
      name,
      description,
      backgroundId,
      password,
      passwordConfirm,
    } = req.body;

    const study = await studyService.createStudy({
      nickname,
      name,
      description,
      backgroundId: Number(backgroundId),
      password,
    });
    success(res, study, 'created', 201);
  } catch (err) {
    next(err);
  }
};

export const getStudies = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, keyword = '', order = 'latest' } = req.query;
    const result = await studyService.findAllStudies({
      page: Number(page),
      limit: Number(limit),
      keyword,
      order,
    });
    success(res, result);
  } catch (err) {
    next(err);
  }
};

export const getStudyById = async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const study = await studyService.findStudyById(Number(studyId));
    if (!study)
      return fail(res, 'NOT_FOUND', '해당 스터디를 찾을 수 없습니다.', 404);
    success(res, study);
  } catch (err) {
    next(err);
  }
};

export const updateStudy = async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const { password, ...rest } = req.body;
    const result = await studyService.updateStudy(Number(studyId), password, rest);

    if (result?.error === 'NOT_FOUND') {
      return fail(res, 'NOT_FOUND', '스터디가 존재하지 않습니다.', 404);
    }

    if (result?.error === 'INVALID_PASSWORD') {
      return fail(res, 'VALIDATION_ERROR', '비밀번호가 일치하지 않습니다.', 400);
    }

    success(res, result);
  } catch (err) {
    next(err);
  }
};

export const deleteStudy = async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const { password } = req.body;
    const result = await studyService.deleteStudy(Number(studyId), password);

    if (result?.error === 'NOT_FOUND') {
      return fail(res, 'NOT_FOUND', '스터디가 존재하지 않습니다.', 404);
    }

    if (result?.error === 'INVALID_PASSWORD') {
      return fail(
        res,
        'VALIDATION_ERROR',
        '비밀번호가 일치하지 않습니다.',
        400
      );
    }

    success(res, null, 'deleted');
  } catch (err) {
    next(err);
  }
};
