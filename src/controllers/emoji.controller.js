import * as emojiService from '../services/emoji.service.js';
import { success, fail } from '../utils/response.js';

export const addEmojiReaction = async (req, res, next) => {
  try {
    const { studyId, emoji } = req.body;
    const reaction = await emojiService.addEmojiReaction({
      studyId: Number(studyId),
      emoji,
    });
    success(res, reaction, 'created', 201);
  } catch (err) {
    next(err);
  }
};

export const getEmojiReactions = async (req, res, next) => {
  try {
    const { studyId } = req.query;
    const items = await emojiService.findEmojiReactionsByStudyId(Number(studyId));
    success(res, { items });
  } catch (err) {
    next(err);
  }
};
