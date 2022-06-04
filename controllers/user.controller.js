import EmailService from "../services/email.service.js";

class UserController {
  async create(req, res, next) {
    try {
      EmailService.sendActivationUserMail(
        // "alex-kudryavtsev-web@yandex.ru",
        "qwertyshurazh@gmail.com",
        "Alex",
        "https://www.youtube.com/watch?v=qU9mHegkTc4&ab_channel=ArcticMonkeys-Topic"
      );
      res.json("HERE");
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
}

export default new UserController();
