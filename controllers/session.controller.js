import SessionService from "../services/session.service.js";

const cookiesConfig = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
};

class SessionController {
  async create(req, res, next) {
    try {
      const { email, password } = req.body;
      const userAgent = req.headers["user-agent"];

      const sessionData = await SessionService.create(
        email,
        password,
        userAgent
      );

      res.cookie("refreshToken", sessionData.refreshToken, cookiesConfig);

      return res.json(sessionData);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userAgent = req.headers["user-agent"];

      await SessionService.delete(refreshToken, userAgent);

      res.clearCookie("refreshToken");

      return res.json({ message: "OK" });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userAgent = req.headers["user-agent"];

      const sessionData = await SessionService.update(refreshToken, userAgent);

      res.cookie("refreshToken", sessionData.refreshToken, cookiesConfig);

      return res.json(sessionData);
    } catch (error) {
      next(error);
    }
  }
}

export default new SessionController();
