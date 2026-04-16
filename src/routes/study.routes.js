import express from 'express';
import {
  createStudy,
  getStudies,
  getStudyById,
  verifyStudyPassword,
  updateStudy,
  deleteStudy,
} from '../controllers/study.controller.js';

const router = express.Router();

router.post('/', createStudy);
router.get('/', getStudies);
router.get('/:studyId', getStudyById);
router.post('/:studyId/verify-password', verifyStudyPassword);
router.patch('/:studyId', updateStudy);
router.delete('/:studyId', deleteStudy);

export default router;
