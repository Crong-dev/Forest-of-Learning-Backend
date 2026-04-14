import express from 'express';
import {
  getFocusByStudyId,
  createFocusSession,
} from '../controllers/focus.controller.js';

const router = express.Router();

router.get('/:studyId', getFocusByStudyId);
router.post('/:studyId', createFocusSession);

export default router;
