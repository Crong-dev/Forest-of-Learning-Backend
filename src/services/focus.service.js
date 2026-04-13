import prisma from '../lib/prisma.js';

export const createFocusSession = async (data) => {
  return await prisma.focusSession.create({ data });
};

export const findFocusSessionsByStudyId = async (studyId) => {
  return await prisma.focusSession.findMany({
    where: { studyId },
    orderBy: { startedAt: 'desc' },
  });
};
