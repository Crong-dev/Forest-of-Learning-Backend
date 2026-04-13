import prisma from '../lib/prisma.js';

export const findAllBackgrounds = async () => {
  return await prisma.background.findMany({
    orderBy: { createdAt: 'asc' },
  });
};

export const findBackgroundById = async (id) => {
  return await prisma.background.findUnique({
    where: { id },
  });
};