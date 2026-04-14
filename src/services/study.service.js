import prisma from '../lib/prisma.js';

export const createStudy = async (data) => {
  return await prisma.study.create({
    data: {
      ...data,
      point: {
        create: {},
      },
    },
    include: {
      background: true,
      point: true,
    },
  });
};

export const findAllStudies = async ({ page, limit, keyword, order }) => {
  const skip = (page - 1) * limit;

  const orderBy =
    order === 'oldest' ? { createdAt: 'asc' } : { createdAt: 'desc' };

  const where = keyword
    ? {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { nickname: { contains: keyword, mode: 'insensitive' } },
        ],
      }
    : {};

  const totalCount = await prisma.study.count({ where });

  const items = await prisma.study.findMany({
    where,
    select: {
      id: true,
      nickname: true,
      name: true,
      description: true,
      createdAt: true,
      background: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
    },
    orderBy,
    skip,
    take: limit,
  });

  return {
    items,
    totalCount,
    page,
    limit,
  };
};

export const findStudyById = async (id) => {
  return await prisma.study.findUnique({
    where: { id },
    include: { background: true, point: true, habits: true },
  });
};

export const updateStudy = async (id, data) => {
  return await prisma.study.update({
    where: { id },
    data,
  });
};

export const deleteStudy = async (id) => {
  return await prisma.study.delete({
    where: { id },
  });
};
