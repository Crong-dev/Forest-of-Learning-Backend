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
  { sessionData }
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

  // 백단에서 completedAt 생성
  const serverCompletedAt = new Date();

  // 백단에서 포인트 계산
  const durationMinutes = sessionData.durationMinutes;
  const actualMinutes = calculateActualMinutes(sessionData, serverCompletedAt);

  // 1차 보상: 설정 시간 완료 시 3점
  const firstRewardPoint = actualMinutes >= durationMinutes ? 3 : 0;

  // 2차 보상: 초과 10분당 1점
  const overtimeMinutes = Math.max(actualMinutes - durationMinutes, 0);
  const overtimePoint = Math.floor(overtimeMinutes / 10);

  const totalEarned = firstRewardPoint + overtimePoint;

  const result = await prisma.$transaction(async (tx) => {
    const focusSession = await tx.focusSession.create({
      data: {
        studyId,
        duration: sessionData.durationSeconds,
        earnedPoint: totalEarned,
        startedAt: new Date(sessionData.startedAt),
        completedAt: serverCompletedAt,
      },
    });

    let point;

    if (study.point) {
      point = await tx.point.update({
        where: { studyId },
        data: {
          totalPoint: {
            increment: totalEarned,
          },
        },
      });
    } else {
      point = await tx.point.create({
        data: {
          studyId,
          totalPoint: totalEarned,
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

// 실제 공부 시간 계산 헬퍼 함수
function calculateActualMinutes(sessionData, completedAt) {
  const startedAt = new Date(sessionData.startedAt).getTime();
  const completedAtMs = completedAt.getTime();
  const totalPausedMs = sessionData.totalPausedMs || 0;

  return Math.round((completedAtMs - startedAt - totalPausedMs) / 60000);
}
