import prisma from '../lib/prisma.js';

export const createStudy = async (data) => {
  return await prisma.study.create({
    data: {
      ...data,
      point: {
        create: {},
      },
    },
    select: {
      id: true,
      nickname: true,
      name: true,
      description: true,
      background: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      createdAt: true,
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
    select: {
      id: true,
      nickname: true,
      name: true,
      description: true,
      background: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateStudy = async (id, data) => {
  const study = await prisma.study.findUnique({
    where: { id },
  });

  if (!study) {
    return { error: 'NOT_FOUND' };
  }

  // 불필요한 업데이트 방지
  const updateData = {
    ...(data.nickname !== undefined && { nickname: data.nickname }),
    ...(data.name !== undefined && { name: data.name }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.backgroundId !== undefined && { backgroundId: data.backgroundId }),
  };

  return await prisma.study.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      description: true,
      background: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
    },
  });
};

export const deleteStudy = async (id, password) => {
  const study = await prisma.study.findUnique({
    where: { id },
  });

  if (!study) {
    return { error: 'NOT_FOUND' };
  }

  if (study.password !== password) {
    return { error: 'INVALID_PASSWORD' };
  }

  return await prisma.study.delete({
    where: { id },
  });
};
