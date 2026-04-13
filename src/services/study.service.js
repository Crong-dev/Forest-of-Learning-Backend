import prisma from '../lib/prisma.js';

export const createStudy = async (data) => {
  return await prisma.study.create({
    data,
    include: { background: true, point: true },
  });
};

export const findAllStudies = async () => {
  return await prisma.study.findMany({
    include: { background: true, point: true },
    orderBy: { createdAt: 'desc' },
  });
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
