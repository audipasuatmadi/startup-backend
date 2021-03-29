import jwt from 'jsonwebtoken'
import Token from '../../models/Token'
import User from '../../models/User'
import { UserInstance, AuthenticationTokens, loginServiceReturnSchema } from '../user/usertypes'

export const generateAccessToken = (payload: string | object, expiresIn: string = '60m') => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {expiresIn})
}

export const generateRefreshToken = async (payload: string | object, User: User) => {
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!);
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getUTCDate() + 30);
  
  try {
    await User.createToken({
      token,
      expiresIn: expirationDate,
    });
  } catch (e) {
    console.log(e)
  }
  
  return token;
}

// export const getTokenFromBearer = (fullToken: string) => fullToken.split('.')[1];
export const getTokenFromBearer = (fullToken: string) => fullToken.split(' ')[1];

export const generateAccessTokenByRefreshToken = () => {
  
}

export const validateAccessToken = (accessToken: string) => {
  if (accessToken == null) return loginServiceReturnSchema(403, { otherMessage:'sesi tidak ditemukan' });
  try {
    const hasil = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    return loginServiceReturnSchema(200, {otherMessage: 'token valid'});
  } catch (e) {
    return loginServiceReturnSchema(403, { otherMessage:'sesi berakhir' });
  }
}

const TokensServiceObject = {
  generateAccessToken,
  generateRefreshToken,
  generateAccessTokenByRefreshToken,
  validateAccessToken
}

export default TokensServiceObject