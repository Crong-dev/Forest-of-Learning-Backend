import express from 'express';
import { createFocusSession, getFocusSessions } from '../controllers/focus.controller.js';

const router = express.Router();

router.post('/', createFocusSession);
router.get('/', getFocusSessions);

export default router;
