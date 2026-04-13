import prisma from '../lib/prisma.js';

export const findPointByStudyId = async (studyId) => {
  return await prisma.point.findUnique({ where: { studyId } });
};

export const addPoints = async (studyId, amount) => {
  return await prisma.point.upsert({
    where: { studyId },
    create: { studyId, totalPoint: amount },
    update: { totalPoint: { increment: amount } },
  });
};
