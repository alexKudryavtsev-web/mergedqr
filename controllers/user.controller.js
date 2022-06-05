import config from "config";
import UserService from "../services/user.service.js";

class UserController {
  async create(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await UserService.create(email, password);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async read(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async resetActivationMail(req, res, next) {
    try {
      const { email } = req.body;

      const userDto = await UserService.resetActivationMail(email);

      return res.json(userDto);
    } catch (error) {}
  }

  async activateUser(req, res, next) {
    try {
      const { link: activationLink } = req.params;

      await UserService.activateUser(activationLink);

      return res.redirect(config.get("CLIENT_URL"));
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email } = req.body;

      const userData = await UserService.resetPassword(email);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async setNewPassword(req, res, next) {
    try {
      const { link: resetPasswordLink } = req.params;
      const { password, confirmPassword } = req.body;

      const userData = await UserService.setNewPassword(
        resetPasswordLink,
        password,
        confirmPassword
      );

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
