import jwt from 'jsonwebtoken'
import Token from '../../models/Token'
import { UserInstance } from '../user/usertypes'

export const generateAccessToken = (payload: string | object, expiresIn: string = '60m') => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {expiresIn})
}

export const generateRefreshToken = async (payload: string | object, userId: number) => {
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!);
  const date = new Date()
  date.setDate(date.getUTCDate() + 30);
  
  await Token.create({
    token,
    expiresIn: date,
    userId: userId,
  })
  
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