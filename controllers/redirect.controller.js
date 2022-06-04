class RedirectController {
  async redirect(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new RedirectController();
