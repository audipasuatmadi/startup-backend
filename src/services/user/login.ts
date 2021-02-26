import {
  LoginCredentials,
  LoginFailedResponse,
  loginServiceReturnSchema,
  LoginSuccessResponse,
} from './usertypes';
import UserRepository from '../../repositories/UserRepository';
import User from '../../models/User';
import TokenService from '../tokens';
import bcrypt from 'bcrypt'

const loginUser = async (credentials: LoginCredentials) => {
  let userModel: User | null;
  try {
    userModel = await UserRepository.getUserByUsername(credentials.username);
    if (userModel === null) {
      return loginServiceReturnSchema(403, { username: 'user tidak ditemukan' });
    }
  } catch (e) {
    const response: LoginFailedResponse = {
      username: 'user not found',
    };
    return loginServiceReturnSchema(403, response);
  }

  try {
    const isPasswordSame = await bcrypt.compare(credentials.password, userModel.password)
    if (!isPasswordSame) return loginServiceReturnSchema(403, {password: 'password anda salah'});
  } catch (e) {
    return loginServiceReturnSchema(403, {password: 'password anda salah'})
  }

  try {
    const { username, name } = userModel;
    const refreshToken = await TokenService.generateRefreshToken(
      { username, name },
      userModel
    );
    const accessToken = await TokenService.generateAccessToken({
      username,
      name,
    });
    const response: LoginSuccessResponse = {
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

export default loginUser;
