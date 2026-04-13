import * as emojiService from '../services/emoji.service.js';
import { success, fail } from '../utils/response.js';

export const createEmojiReaction = async (req, res, next) => {
  try {
    const { studyId, emoji } = req.body;
    const reaction = await emojiService.createEmojiReaction({
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
    if (!studyId) return fail(res, 'BAD_REQUEST', 'studyId가 필요합니다.', 400);
    const items = await emojiService.findEmojiReactionsByStudyId(Number(studyId));
    success(res, { items });
  } catch (err) {
    next(err);
  }
};
