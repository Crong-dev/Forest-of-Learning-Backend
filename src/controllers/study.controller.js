import * as studyService from '../services/study.service.js';
import { success, fail } from '../utils/response.js';

export const createStudy = async (req, res, next) => {
  try {
    const { nickname, name, description, password, backgroundId } = req.body;
    const study = await studyService.createStudy({
      nickname,
      name,
      description,
      password,
      backgroundId: Number(backgroundId),
    });
    success(res, study, 'created', 201);
  } catch (err) {
    next(err);
  }
};

export const getStudies = async (req, res, next) => {
  try {
    const items = await studyService.findAllStudies();
    success(res, { items });
  } catch (err) {
    next(err);
  }
};

export const getStudyById = async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const study = await studyService.findStudyById(Number(studyId));
    if (!study) return fail(res, 'NOT_FOUND', '스터디를 찾을 수 없습니다.', 404);
    success(res, study);
  } catch (err) {
    next(err);
  }
};

export const updateStudy = async (req, res, next) => {
  try {
    const { studyId } = req.params;
    const study = await studyService.updateStudy(Number(studyId), req.body);
    success(res, study);
  } catch (err) {
    next(err);
  }
};

export const deleteStudy = async (req, res, next) => {
  try {
    const { studyId } = req.params;
    await studyService.deleteStudy(Number(studyId));
    success(res, null, 'deleted');
  } catch (err) {
    next(err);
  }
};
