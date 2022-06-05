import config from "config";
import jwt from "jsonwebtoken";

import ResetPasswordToken from "../models/resetPasswordToken.model.js";

const ACCESS_TOKEN_OPTIONS = {
  expiresIn: "1h",
};

const REFRESH_TOKEN_OPTIONS = {
  expiresIn: "30d",
};

const RESET_PASSWORD_TOKEN_OPTIONS = {
  expiresIn: "1h",
};

class TokenService {
  async createTokens(payload) {
    const accessToken = jwt.sign(
      payload,
      config.get("ACCESS_SECRET"),
      ACCESS_TOKEN_OPTIONS
    );
    const refreshToken = jwt.sign(
      payload,
      config.get("REFRESH_SECRET"),
      REFRESH_TOKEN_OPTIONS
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async createResetPasswordToken(payload) {
    const resetPasswordToken = jwt.sign(
      payload,
      config.get("RESET_PASSWORD_SECRET"),
      RESET_PASSWORD_TOKEN_OPTIONS
    );

    return resetPasswordToken;
  }

  async saveResetPasswordToken(userId, token) {
    const candidate = await ResetPasswordToken.findOne({ userId });

    if (candidate) {
      candidate.token = token;

      return await candidate.save();
    }

    const newToken = await ResetPasswordToken.create({
      userId,
      token,
    });

    return newToken;
  }

  async verifyResetPasswordToken(token) {
    try {
      const dataFromToken = jwt.verify(
        token,
        config.get("RESET_PASSWORD_SECRET")
      );

      return dataFromToken;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
