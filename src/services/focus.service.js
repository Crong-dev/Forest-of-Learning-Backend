import prisma from '../lib/prisma.js';

export async function findFocusByStudyId(studyId) {
  const study = await prisma.study.findUnique({
    where: { id: studyId },
    include: {
      point: true,
      focusSessions: {
        orderBy: { completedAt: 'desc' },
        take: 1,
      },
    },
  });

  if (!study) {
    const error = new Error('해당 스터디를 찾을 수 없습니다.');
    error.status = 404;
    throw error;
  }

  return {
    latestSession: study.focusSessions[0] || null,
    totalPoint: study.point?.totalPoint ?? 0,
  };
}

export async function createFocusSessionByStudyId(
  studyId,
  { duration, earnedPoint, startedAt, completedAt }
) {
  const study = await prisma.study.findUnique({
    where: { id: studyId },
    include: { point: true },
  });

  if (!study) {
    const error = new Error('해당 스터디를 찾을 수 없습니다.');
    error.status = 404;
    throw error;
  }

  const result = await prisma.$transaction(async (tx) => {
    const focusSession = await tx.focusSession.create({
      data: {
        studyId,
        duration,
        earnedPoint,
        startedAt: new Date(startedAt),
        completedAt: new Date(completedAt),
      },
    });

    let point;

    if (study.point) {
      point = await tx.point.update({
        where: { studyId },
        data: {
          totalPoint: {
            increment: earnedPoint,
          },
        },
      });
    } else {
      point = await tx.point.create({
        data: {
          studyId,
          totalPoint: earnedPoint,
        },
      });
    }

    return {
      focusSession,
      totalPoint: point.totalPoint,
    };
  });

  return result;
}
