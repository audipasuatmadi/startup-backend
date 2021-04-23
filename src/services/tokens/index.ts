import jwt from 'jsonwebtoken';
import Token from '../../models/Token';
import User from '../../models/User';
import {
  UserInstance,
  AuthenticationTokens,
  loginServiceReturnSchema,
  LoginSuccessResponse,
} from '../user/usertypes';
import UserRepository from '../../repositories/UserRepository';
import TokenRepository from '../../repositories/TokenRepository';

export const generateAccessToken = (
  payload: string | object,
  expiresIn: string = '60m'
) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn });
};

export const generateRefreshToken = async (
  payload: string | object,
  User: User
) => {
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!);
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getUTCDate() + 30);

  try {
    await User.createToken({
      token,
      expiresIn: expirationDate,
    });
  } catch (e) {
    console.log(e);
  }

  return token;
};

export const getTokenFromBearer = (fullToken: string) =>
  fullToken.split(' ')[1];

export const generateAccessTokenByRefreshToken = async (
  refreshToken: string
) => {
  let tokenInstance;

  try {
    tokenInstance = await Token.findOne({ where: { token: refreshToken } });
  } catch (e) {
    return loginServiceReturnSchema(200, {
      otherMessage: 'refresh token tidak ditemukan',
    });
  }

  if (!tokenInstance)
    return loginServiceReturnSchema(403, {
      otherMessage: 'refresh token tidak ditemukan',
    });

  if (tokenInstance.expiresIn < new Date()) {
    tokenInstance.destroy();
    return loginServiceReturnSchema(403, {
      otherMessage: 'refresh token kadaluarsa',
    });
  }

  let userInstance;

  try {
    userInstance = await UserRepository.getUserById(tokenInstance.userId);
  } catch (e) {
    console.log(e);
  }

  if (!userInstance)
    return loginServiceReturnSchema(403, {
      otherMessage: 'user tidak ditemukan',
    });

  try {
    const { id, username, name } = userInstance;

    const accessToken = generateAccessToken({
      id,
      username,
      name,
    });
    const response: LoginSuccessResponse = {
      id,
      username,
      name,
      accessToken,
      refreshToken,
    };
    return loginServiceReturnSchema(200, response);
  } catch (e) {
    return loginServiceReturnSchema(
      500,
      'something is wrong in generating tokens'
    );
  }
};

export const validateAccessToken = (accessToken: string) => {
  if (accessToken == null)
    return loginServiceReturnSchema(403, {
      otherMessage: 'sesi tidak ditemukan',
    });
  try {
    const hasil = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    return loginServiceReturnSchema(200, { otherMessage: 'token valid' });
  } catch (e) {
    return loginServiceReturnSchema(403, { otherMessage: 'sesi berakhir' });
  }
};

export const removeTokenByUserId = async (userId: number) => {
  const result = await TokenRepository.removeTokenByUserId(userId);
  return result;
};

const TokensServiceObject = {
  generateAccessToken,
  generateRefreshToken,
  generateAccessTokenByRefreshToken,
  validateAccessToken,
  removeTokenByUserId,
};

export default TokensServiceObject;
