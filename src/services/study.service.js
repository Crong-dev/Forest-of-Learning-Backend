import argon2 from 'argon2';
import prisma from '../lib/prisma.js';

export const createStudy = async (data) => {
  const hashedPassword = await argon2.hash(data.password);

  return await prisma.study.create({
    data: {
      ...data,
      password: hashedPassword,
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

export const updateStudy = async (id, password, data) => {
  const study = await prisma.study.findUnique({ where: { id } });

  if (!study) {
    return { error: 'NOT_FOUND' };
  }

  const isMatch = await argon2.verify(study.password, password);
  if (!isMatch) {
    return { error: 'INVALID_PASSWORD' };
  }

  const { password: _pw, ...safeData } = data;

  return await prisma.study.update({
    where: { id },
    data: safeData,
  });
};

export const deleteStudy = async (id, password) => {
  const study = await prisma.study.findUnique({
    where: { id },
  });

  if (!study) {
    return { error: 'NOT_FOUND' };
  }

  const isMatch = await argon2.verify(study.password, password);
  if (!isMatch) {
    return { error: 'INVALID_PASSWORD' };
  }

  return await prisma.study.delete({
    where: { id },
  });
};
