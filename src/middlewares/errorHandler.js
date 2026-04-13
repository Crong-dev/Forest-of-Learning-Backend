export default (err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || '서버 오류가 발생했습니다.',
    },
  });
};