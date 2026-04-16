import express from 'express';
import {
  createStudy,
  getStudies,
  getStudyById,
  verifyStudyPassword,
  updateStudy,
  deleteStudy,
} from '../controllers/study.controller.js';
import {
  validateCreateStudy,
  validateUpdateStudy,
  validateDeleteStudy,
} from '../middlewares/validateStudy.js';

const router = express.Router();

router.post('/', validateCreateStudy, createStudy);
router.get('/', getStudies);
router.get('/:studyId', getStudyById);
router.post('/:studyId/verify-password', verifyStudyPassword);
router.patch('/:studyId', validateUpdateStudy, updateStudy);
router.delete('/:studyId', validateDeleteStudy, deleteStudy);

export default router;
