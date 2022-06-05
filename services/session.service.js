import bcrypt from "bcrypt";

import ApiError from "../error/api.error.js";
import RefreshToken from "../models/refreshToken.model.js";
import User from "../models/user.model.js";
import TokenService from "../services/token.service.js";
import UserDto from "../utils/dto/user.dto.js";

class SessionService {
  async create(email, password, userAgent) {
    const user = await User.findUserByEmail(email);

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      throw ApiError.BadRequest("Wrong password");
    }

    const userDto = new UserDto(user);
    const tokens = await TokenService.createTokens({ ...userDto });

    const res = await TokenService.saveRefreshPasswordToken(
      userDto.userId,
      userAgent,
      tokens.refreshToken
    );

    console.log(res);

    return { user: userDto, ...tokens };
  }

  async delete(refreshToken, userAgent) {
    await RefreshToken.findOneAndDelete({
      token: refreshToken,
      userAgent,
    });
  }

  async update(refreshToken, userAgent) {
    const token = await RefreshToken.findOne({
      token: refreshToken,
      userAgent,
    });

    const user = await User.findById(token.userId);

    if (!token || !user) {
      throw ApiError.BadRequest("User not found");
    }

    const userDto = new UserDto(user);
    const tokens = await TokenService.createTokens({ ...userDto });

    token.token = tokens.refreshToken;

    await token.save();

    return {
      user: userDto,
      ...tokens,
    };
  }
}

export default new SessionService();
