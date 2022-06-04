function authMiddleware(req, res, next) {
  try {
    next();
  } catch (error) {
    next(error);
  }
}

export default authMiddleware;
