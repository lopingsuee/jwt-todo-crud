exports.successResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    data,
  });
};

exports.errorResponse = (res, statusCode, message, errors = null) => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    errors,
  });
};
