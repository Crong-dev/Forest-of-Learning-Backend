import express from 'express';
import { createEmojiReaction, getEmojiReactions } from '../controllers/emoji.controller.js';

const router = express.Router();

router.post('/', createEmojiReaction);
router.get('/', getEmojiReactions);

export default router;
