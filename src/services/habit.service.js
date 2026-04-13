import prisma from '../lib/prisma.js';

export const createHabit = async (data) => {
  return await prisma.habit.create({ data });
};

export const findHabitsByStudyId = async (studyId) => {
  return await prisma.habit.findMany({
    where: { studyId },
    include: { habitRecords: { orderBy: { date: 'asc' } } },
    orderBy: { createdAt: 'asc' },
  });
};

export const findHabitById = async (id) => {
  return await prisma.habit.findUnique({
    where: { id },
    include: { habitRecords: true },
  });
};

export const updateHabit = async (id, data) => {
  return await prisma.habit.update({
    where: { id },
    data,
  });
};

export const deleteHabit = async (id) => {
  return await prisma.habit.delete({ where: { id } });
};

export const upsertHabitRecord = async (habitId, date, completed) => {
  return await prisma.habitRecord.upsert({
    where: { habitId_date: { habitId, date: new Date(date) } },
    create: { habitId, date: new Date(date), completed },
    update: { completed },
  });
};

export const findHabitRecords = async (habitId) => {
  return await prisma.habitRecord.findMany({
    where: { habitId },
    orderBy: { date: 'asc' },
  });
};
