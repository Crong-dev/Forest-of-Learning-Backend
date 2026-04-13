import prisma from '../lib/prisma.js';

export const createEmojiReaction = async (data) => {
  return await prisma.emojiReaction.create({ data });
};

export const findEmojiReactionsByStudyId = async (studyId) => {
  return await prisma.emojiReaction.findMany({
    where: { studyId },
    orderBy: { createdAt: 'desc' },
  });
};
