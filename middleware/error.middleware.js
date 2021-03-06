import ApiError from "../error/api.error.js";

function errorMiddleware(error, req, res, next) {
  if (error instanceof ApiError) {
    return res.status(error.status).json({
      message: error.message,
      errors: error.errors,
    });
  }
  return res.status(500).json({
    message: "Unrecognized error",
  });
}

export default errorMiddleware;
