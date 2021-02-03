import jwt from 'jsonwebtoken'
import Token from '../../models/Token'
import User from '../../models/User'
import { UserInstance } from '../user/usertypes'

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

export const generateAccessTokenByRefreshToken = () => {

}

export const validateAccessToken = () => {

}

const TokensServiceObject = {
  generateAccessToken,
  generateRefreshToken,
  generateAccessTokenByRefreshToken,
  validateAccessToken
}

export default TokensServiceObject