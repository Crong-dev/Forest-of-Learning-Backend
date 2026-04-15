import express from 'express';
import {
  addEmojiReaction,
  getEmojiReactions,
} from '../controllers/emoji.controller.js';

const router = express.Router();

router.post('/', addEmojiReaction);
router.get('/', getEmojiReactions);

export default router;
