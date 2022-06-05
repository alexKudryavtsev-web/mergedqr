import bcrypt from "bcrypt";
import config from "config";
import { v4 } from "uuid";

import ApiError from "../error/api.error.js";
import ResetPasswordToken from "../models/resetPasswordToken.model.js";
import User from "../models/user.model.js";
import UserDto from "../utils/dto/user.dto.js";
import {
  calculateResetPasswordURL,
  calculateUserActivationURL,
} from "../utils/url.js";
import EmailService from "./email.service.js";
import TokenService from "./token.service.js";

const SALT_ROUNDS = 10;

class UserService {
  async create(email, password) {
    const candidate = await User.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`User with this email already exists`);
    }

    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const activationLink = v4();

    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
    });

    const userDto = new UserDto(user);

    EmailService.sendActivationUserMail(
      email,
      calculateUserActivationURL(activationLink)
    );

    return {
      user: userDto,
    };
  }

  async resetActivationMail(email) {
    const user = await User.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(`User with this email not found`);
    }

    const activationLink = v4();
    user.activationLink = activationLink;
    await user.save();

    EmailService.sendActivationUserMail(
      email,
      calculateUserActivationURL(activationLink)
    );

    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }

  async activateUser(activationLink) {
    const user = await User.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest("Activation link is wrong");
    }

    user.isActivated = true;
    await user.save();
  }

  async resetPassword(email) {
    const user = await User.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    const resetPasswordLink = v4();
    user.resetPasswordLink = resetPasswordLink;

    await user.save();

    // TODO: remove all refresh tokens

    const userDto = new UserDto(user);
    const token = await TokenService.createResetPasswordToken({ ...userDto });

    await TokenService.saveResetPasswordToken(userDto.userId, token);

    EmailService.sendResetPasswordMail(
      email,
      calculateResetPasswordURL(resetPasswordLink)
    );

    return {
      user: userDto,
    };
  }

  async setNewPassword(resetPasswordLink, password, confirmPassword) {
    const user = await User.findOne({ resetPasswordLink });

    if (!user) {
      throw ApiError.BadRequest("User not found");
    }

    const token = await ResetPasswordToken.findOne({
      userId: user._id,
    });
    const dataFromToken = await TokenService.verifyResetPasswordToken(
      token.token
    );

    if (!token || !dataFromToken) {
      throw ApiError.BadRequest("Invalid token");
    }

    if (password !== confirmPassword) {
      throw ApiError.BadRequest("Passwords do not match");
    }

    const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);

    user.password = hashPassword;
    user.resetPasswordLink = "";

    await user.save();
    await ResetPasswordToken.deleteOne({ userId: user._id });
    const userDto = new UserDto(user);

    return {
      user: userDto,
    };
  }
}

export default new UserService();
